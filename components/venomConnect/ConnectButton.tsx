import React, { useEffect, useState } from 'react';
import {
  Button,
  Box,
  useMediaQuery,
  Text,
  Center,
  Stack,
  useColorMode,
  IconButton,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  Tooltip,
  LinkBox,
  LinkOverlay,
  useClipboard,
} from '@chakra-ui/react';
import { VenomFoundation, VenomScanIcon } from 'components/logos';
import {
  CONTRACT_ADDRESS,
  CONTRACT_ADDRESS_V1,
  CONTRACT_ADDRESS_V2,
  FAUCET_URL,
  MINT_OPEN,
  SIGN_MESSAGE,
  SITE_PROFILE_URL,
  SITE_URL,
  VENOMSCAN_NFT,
} from 'core/utils/constants';
import { sleep, truncAddress, capFirstLetter, isValidSignHash } from 'core/utils';
import { useConnect, useSignMessage, useVenomProvider } from 'venom-react-hooks';
import { useAtom, useAtomValue } from 'jotai';
import { Address } from 'everscale-inpage-provider';
import VenomAbi from 'abi/Collection.abi.json';
import {
  RiLogoutBoxRLine,
  RiFileCopyLine,
  RiCheckDoubleFill,
  RiShuffleLine,
  RiRefund2Line,
} from 'react-icons/ri';
import LogoIcon from '../logos/LogoIcon';
import {
  connectedAccountAtom,
  isConnectedAtom,
  primaryNameAtom,
  signDateAtom,
  signHashAtom,
  signRequestAtom,
  venomContractAddressAtom,
  venomContractAtom,
  venomContractAtomV1,
  venomContractAtomV2,
} from 'core/atoms';
import { ConnectWallet } from '@thirdweb-dev/react';
import getVid from 'core/utils/getVid';

export default function ConnectButton() {
  const [notMobile] = useMediaQuery('(min-width: 800px)');
  const { login, disconnect, isConnected, account } = useConnect();
  const { sign, status } = useSignMessage({
    publicKey: String(account?.publicKey),
    data: SIGN_MESSAGE,
    onComplete: (result) => {
      // console.log('Message signed successfully:', result);
      setIsSigning(false);
      setSignHash(result.signature);
      setSignDate(Date.now());
    },
    onError: (error) => {
      console.error('Error occurred while signing the message:', error);
      setIsSigning(false);
    },
    onSettled: () => {
      setIsSigning(false);
    },
  });

  const { provider } = useVenomProvider();
  const { colorMode } = useColorMode();
  const address = account?.address !== undefined ? account?.address.toString() : '';
  const [primaryName, setPrimaryName] = useAtom(primaryNameAtom);
  const [connected, setIsConnected] = useAtom(isConnectedAtom);
  const [primaryLoaded, setPrimaryLoaded] = useState(false);
  const [isSigning, setIsSigning] = useState(false);
  const [signRequest, setSignRequest] = useAtom(signRequestAtom);
  const [signHash, setSignHash] = useAtom(signHashAtom);
  const [signDate, setSignDate] = useAtom(signDateAtom);
  const [connectedAccount, setConnectedAccount] = useAtom(connectedAccountAtom);
  const venomContractAddress = useAtomValue(venomContractAddressAtom);
  const [venomContract, setVenomContract] = useAtom(venomContractAtom);
  const [venomContractV1, setVenomContractV1] = useAtom(venomContractAtomV1);
  const [venomContractV2, setVenomContractV2] = useAtom(venomContractAtomV2);
  const { onCopy, hasCopied } = useClipboard(String(address));
  const balance =
    account?.balance !== undefined ? Math.round(Number(account?.balance) / 10e5) / 10e2 : 'Loading';

  async function getPrimary() {
    if (!provider || !provider?.isInitialized || !account?.address) return;
    setIsConnected(true);
    setConnectedAccount(account?.address.toString() ?? '');
    try {
      const _venomContract = new provider.Contract(VenomAbi, new Address(CONTRACT_ADDRESS));
      setVenomContract(_venomContract);

      const _venomContractV1 = new provider.Contract(VenomAbi, new Address(CONTRACT_ADDRESS_V1));
      setVenomContractV1(_venomContractV1);

      const _venomContractV2 = new provider.Contract(VenomAbi, new Address(CONTRACT_ADDRESS_V2));
      setVenomContractV2(_venomContractV2);

      // @ts-ignore: Unreachable code error
      const { value0 }: any = await _venomContract?.methods.getPrimaryName({ _owner: new Address(String(address)) }).call();

      if (value0?.name !== '' && !primaryName?.nftAddress) {
        setPrimaryName(value0);
      } else {
        await getVid(String(address))
          .then((res) => {
            if (res.status === 200) {
              setPrimaryName({ name: res.data, nftAddress: res.data });
            } else {
              setPrimaryName({ name: '', nftAddress: undefined });
            }
          })
          .catch((e) => {
            setPrimaryName({ name: '', nftAddress: undefined });
            // console.log('no primary', e);
          });
      }
    } catch {
      (e: any) => {
        console.log('error in primary', e);
      };
    }

    setPrimaryLoaded(true);

    if (!isValidSignHash(signHash, signDate)) {
      try {
        !isSigning && sign();
        setIsSigning(true);
      } catch (e) {
        setIsSigning(false);
      }
    }
  }

  const switchAccount = async () => {
    await disconnect();
    setIsConnected(false);
    setConnectedAccount('');
    setPrimaryName({ name: '', nftAddress: '' });
    setPrimaryLoaded(false);
    login();
  };

  useEffect(() => {
    if (signRequest && !isValidSignHash(signHash, signDate)) {
      sign();
      setIsSigning(true);
      setSignRequest(false);
    }
  }, [signRequest]);

  useEffect(() => {
    async function checkPrimary() {
      try {
        if (account && isConnected && provider) {
          if (!provider?.isInitialized) {
            // console.log('provider not ready yet');
            await sleep(7000);
            checkPrimary();
            return;
          }
        }
        if (!primaryLoaded) {
          getPrimary();
        }
      } catch {
        (e: any) => {
          // console.log('error getting primary');
        };
      }
    }

    checkPrimary();
  }, [primaryName, account]);

  return (
    <>
      <Box>
        {!connected ? (
          <Button variant="solid" onClick={login}>
            <Center gap={2}>
              <VenomFoundation />
              Connect
            </Center>
          </Button>
        ) : (
          <Menu>
            <MenuButton
              as={Button}
              minH={'58px'}
              borderRadius={12}
              bgColor={colorMode === 'light' ? 'whiteAlpha.900' : 'var(--dark)'}
              variant={colorMode === 'light' ? 'solid' : 'outline'}>
              <Center gap={2}>
                <VenomFoundation />
                <Stack gap={0.5} mx={1}>
                  <Text
                    fontWeight={'semibold'}
                    textAlign={'left'}
                    my={'0 !important'}
                    fontSize="14px">
                    {balance} {notMobile ? (account?.balance !== undefined ? 'VENOM' : '') : ''}
                  </Text>
                  <Text
                    fontWeight={'semibold'}
                    textAlign={'left'}
                    fontSize="14px"
                    bgGradient={colorMode === 'light' ? 'linear(to-r, var(--venom2), var(--bluevenom2))':'linear(to-r, var(--venom0), var(--bluevenom0))'} 
                    bgClip='text'
                    my={'0 !important'}>
                    {primaryName?.name !== ''
                      ? capFirstLetter(String(primaryName.name))
                      : truncAddress(String(address))}
                  </Text>
                </Stack>
              </Center>
            </MenuButton>
            <MenuList
              width={320}
              py={0}
              borderWidth={1}
              position={'relative'}
              zIndex={1500}
              borderColor={'gray.800'}
              bg={colorMode === 'light' ? 'var(--white)' : 'var(--dark)'}>
              <Flex p={5} alignItems="center" gap={2}>
                <VenomFoundation />
                <Stack gap={0.5} mx={1} flexGrow={1}>
                  <Text
                    fontWeight={'semibold'}
                    textAlign={'left'}
                    fontFamily={'Poppins'}
                    fontSize="14px"
                    my={'0 !important'}>
                    {primaryName?.name !== ''
                      ? capFirstLetter(String(primaryName.name))
                      : truncAddress(String(address))}
                  </Text>
                  <Text
                    fontWeight={'semibold'}
                    textAlign={'left'}
                    fontFamily={'Poppins'}
                    my={'0 !important'}
                    fontSize="14px"
                    color="gray.500">
                    {account?.balance
                      ? Math.round(Number(account?.balance) / 10e5) / 10e2
                      : 'Loading'}{' '}
                    {notMobile ? 'VENOM' : ''}
                  </Text>
                </Stack>
                <Tooltip
                  borderRadius={4}
                  label={<Text p={2}>Copy Address</Text>}
                  color="white"
                  bgColor={'black'}
                  hasArrow>
                  <IconButton onClick={onCopy} variant="ghost" aria-label="copy-venom-address">
                    {hasCopied ? <RiCheckDoubleFill size={22} /> : <RiFileCopyLine size={22} />}
                  </IconButton>
                </Tooltip>
                <Tooltip
                  borderRadius={4}
                  label={<Text p={2}>Disconnect Wallet</Text>}
                  hasArrow
                  color="white"
                  bgColor={'black'}>
                  <IconButton
                    onClick={() => {
                      disconnect();
                      setIsConnected(false);
                      setConnectedAccount('');
                      setPrimaryName({ name: '', nftAddress: '' });
                    }}
                    variant="ghost"
                    aria-label="disconnect-wallet">
                    <RiLogoutBoxRLine size={22} />
                  </IconButton>
                </Tooltip>
              </Flex>
              <ConnectWallet
                theme={colorMode}
                btnTitle="EVM Wallet"
                auth={{ loginOptional: false }}
                style={{
                  backgroundColor: colorMode === 'light' ? 'var(--white)' : 'var(--dark)',
                  color: colorMode === 'dark' ? 'white' : 'black',
                  border: '1px solid #77777750',
                  borderRadius: 8,
                  margin: '0px 16px',
                  display: 'flex',
                  minWidth: '280px',
                  position: 'relative',
                }}
                welcomeScreen={{
                  img: {
                    src: `${SITE_URL}/logos/vidicon.png`,
                    width: 150,
                    height: 150,
                  },
                  title: 'One Link To Showcase All Your Assets',
                }}
                modalSize={notMobile ? 'wide' : 'compact'}
              />
              <Stack gap={2} my={4} justify={'center'}>
                <Box px={5}>
                  <Button
                    onClick={switchAccount}
                    borderColor={'gray.800'}
                    gap={2}
                    variant="outline"
                    width={'100%'}>
                    <RiShuffleLine size={22} />
                    Switch Account
                  </Button>
                </Box>

                <LinkBox px={5}>
                  <LinkOverlay href={FAUCET_URL} target="_blank">
                    <Button
                      borderColor={'gray.800'}
                      gap={2}
                      variant="outline"
                      width={'100%'}
                      size="md">
                      <RiRefund2Line size={22} />
                      Request Testnet Funds
                    </Button>
                  </LinkOverlay>
                </LinkBox>
              </Stack>
            </MenuList>
          </Menu>
        )}
      </Box>
    </>
  );
}
