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
import { LinkIcon, VenomFoundation, VenomScanIcon } from 'components/logos';
import {
  CONTRACT_ADDRESS,
  CONTRACT_ADDRESS_V1,
  CONTRACT_ADDRESS_V2,
  EARLY_ADOPTERS_CONTRACT_ADDRESS,
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
import OATCollectionABI from 'abi/OATCollection.abi.json';
import {
  RiLogoutBoxRLine,
  RiFileCopyLine,
  RiCheckDoubleFill,
  RiShuffleLine,
  RiRefund2Line,
  RiWallet3Line,
} from 'react-icons/ri';
import LogoIcon from '../logos/LogoIcon';
import {
  connectedAccountAtom,
  earlyAdopterContractAtom,
  ethAtom,
  ethPrimaryNameAtom,
  isConnectedAtom,
  networkAtom,
  primaryNameAtom,
  signDateAtom,
  signHashAtom,
  signRequestAtom,
  venomContractAddressAtom,
  venomContractAtom,
  venomContractAtomV1,
  venomContractAtomV2,
} from 'core/atoms';
import {
  ConnectWallet,
  useAddress,
  useBalance,
  useChain,
  useConnectionStatus,
  useSwitchChain,
} from '@thirdweb-dev/react';
import getVid from 'core/utils/getVid';
import { createWeb3Name } from '@web3-name-sdk/core';

export default function ConnectButton() {
  const [notMobile] = useMediaQuery('(min-width: 800px)');
  const { login, disconnect, isConnected, account } = useConnect();
  const web3Name = createWeb3Name();
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
  const [network, setNetwork] = useAtom(networkAtom);
  //const ethAddress = useAtomValue(ethAtom);
  const ethAddress = useAddress();
  const _status = useConnectionStatus();
  const ethBalance = useBalance();
  const symbol = network === 'venom' ? 'VENOM' : 'BNB' ;//ethBalance.data?.symbol;
  const chain = useChain();
  const switchChain = useSwitchChain();
  const currentChain = 'BNB';
  const { colorMode } = useColorMode();
  const address =
    network === 'venom'
      ? account?.address !== undefined
        ? account?.address.toString()
        : ''
      : ethAddress !== undefined
      ? ethAddress
      : '';
  const balance =
    network === 'venom'
      ? account?.balance !== undefined
        ? Math.round(Number(account?.balance) / 10e5) / 10e2
        : 'Loading'
      : ethBalance.data
      ? ethBalance.data?.displayValue.slice(0, ethBalance.data?.displayValue.indexOf('.') + 4)
      : 'Loading';

  const [primaryName, setPrimaryName] = useAtom(primaryNameAtom);
  const [ethPrimaryName, setEthPrimaryName] = useAtom(ethPrimaryNameAtom);
  const [connected, setIsConnected] = useAtom(isConnectedAtom);
  const [primaryLoaded, setPrimaryLoaded] = useState(false);
  const [ethPrimaryLoaded, setEthPrimaryLoaded] = useState(false);
  const [isSigning, setIsSigning] = useState(false);
  const [signRequest, setSignRequest] = useAtom(signRequestAtom);
  const [signHash, setSignHash] = useAtom(signHashAtom);
  const [signDate, setSignDate] = useAtom(signDateAtom);
  const [connectedAccount, setConnectedAccount] = useAtom(connectedAccountAtom);
  const venomContractAddress = useAtomValue(venomContractAddressAtom);
  const [venomContract, setVenomContract] = useAtom(venomContractAtom);
  const [venomContractV1, setVenomContractV1] = useAtom(venomContractAtomV1);
  const [venomContractV2, setVenomContractV2] = useAtom(venomContractAtomV2);
  const [earlyAdopterContract, setEarlyAdopterContract] = useAtom(earlyAdopterContractAtom);
  const { onCopy, hasCopied } = useClipboard(String(address));

  async function getPrimary() {
    if (!provider || !provider?.isInitialized || !account?.address) return;
    setIsConnected(true);
    setConnectedAccount(account?.address.toString() ?? '');
    try {

      const _earlyAdopterContract = new provider.Contract(OATCollectionABI, new Address(EARLY_ADOPTERS_CONTRACT_ADDRESS));
      setEarlyAdopterContract(_earlyAdopterContract);

      const _venomContract = new provider.Contract(VenomAbi, new Address(CONTRACT_ADDRESS));
      setVenomContract(_venomContract);

      const _venomContractV1 = new provider.Contract(VenomAbi, new Address(CONTRACT_ADDRESS_V1));
      setVenomContractV1(_venomContractV1);

      const _venomContractV2 = new provider.Contract(VenomAbi, new Address(CONTRACT_ADDRESS_V2));
      setVenomContractV2(_venomContractV2);

      // @ts-ignore: Unreachable code error
      const { value0 }: any = await _venomContract?.methods.getPrimaryName({ _owner: new Address(String(account.address)) })
        .call();

      // if (value0?.name !== '' && !primaryName?.nftAddress) {
      //   setPrimaryName(value0);
      // } else {
      await getVid(String(account.address))
        .then((res) => {
          if (res.status === 200) {
            setPrimaryName({ name: res.data + '.vid', nftAddress: res.data });
          } else {
            setPrimaryName({ name: '', nftAddress: undefined });
          }
        })
        .catch((e) => {
          setPrimaryName({ name: '', nftAddress: undefined });
          // console.log('no primary', e);
        });

      if (_status !== 'connected' && _status !== 'connecting') {
        switchNetwork('venom');
      }
      //}
    } catch {
      (e: any) => {
        console.log('error in primary', e);
      };
    }

    setPrimaryLoaded(true);
    //console.log('primary loaded')

    if (!isValidSignHash(signHash, signDate) && network === 'venom') {
      try {
        !isSigning && sign();
        setIsSigning(true);
      } catch (e) {
        setIsSigning(false);
      }
    }
  }

  async function getEthPrimary() {
    if (!ethAddress) return;
    //console.log(ethAddress);
    try {
      const _name = await web3Name.getDomainName({ address: ethAddress });
      setEthPrimaryName({ name: _name ?? '', nftAddress: '' });
    } catch {
      (e: any) => {
        console.log('error in eth primary', e);
      };
    }

    setEthPrimaryLoaded(true);
  }

  const switchAccount = async () => {
    await logout();
    login();
  };

  const logout = async () => {
    await disconnect();
    setIsConnected(false);
    if (_status !== 'connected') {
      switchNetwork('');
    }
    console.log(_status);
    setConnectedAccount('');
    setPrimaryName({ name: '', nftAddress: '' });
  };

  const switchNetwork = async (_network: string) => {
    setNetwork(_network);
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
        if (!ethPrimaryLoaded || address !== ethAddress) {
          getEthPrimary();
        }

        if (account && isConnected && provider) {
          if (!provider?.isInitialized) {
            // console.log('provider not ready yet');
            await sleep(7000);
            checkPrimary();
            return;
          }

          if (!primaryLoaded || connectedAccount !== String(account?.address)) {
            network === '' && switchNetwork('venom');
            getPrimary();
          }
        }
      } catch {
        (e: any) => {
          // console.log('error getting primary');
        };
      }
    }

    checkPrimary();
  }, [primaryName, account, network, ethAddress]);

  return (
    <>
      <Box>
        <Menu>
          <MenuButton
            as={Button}
            size={'lg'}
            px={4}
            bgColor={colorMode === 'light' ? 'whiteAlpha.900' : 'var(--dark)'}>
            <Center gap={2} justifyContent={'left'}>
              <LinkIcon type={network === '' ? 'wallet' : network.toLowerCase()} />
              {network === '' || (!isConnected && !ethAddress) ? (
                <Stack gap={1}>
                  <Text>
                  Connect
                  </Text>
                </Stack>
              ) : (
                <Stack gap={1}>
                  <Text
                    fontWeight={'semibold'}
                    textAlign={'left'}
                    my={'0 !important'}
                    fontSize="14px">
                    {balance} {notMobile ? (balance !== 'Loading' ? symbol : '') : ''}
                  </Text>
                  <Text
                    fontWeight={'semibold'}
                    textAlign={'left'}
                    fontSize="14px"
                    bgGradient={
                      colorMode === 'light'
                        ? 'linear(to-r, var(--venom2), var(--bluevenom2))'
                        : 'linear(to-r, var(--venom0), var(--bluevenom0))'
                    }
                    bgClip="text"
                    my={'0 !important'}>
                    {network === 'venom'
                      ? primaryName && primaryName?.name !== ''
                        ? capFirstLetter(String(primaryName.name))
                        : truncAddress(String(address))
                      : ethPrimaryName && ethPrimaryName?.name !== ''
                      ? capFirstLetter(String(ethPrimaryName.name))
                      : truncAddress(String(address))}
                  </Text>
                </Stack>
              )}
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
            <Stack gap={4} my={4} justify={'center'} align={'center'}>
              {!isConnected ? (
                <Button
                  variant="outline"
                  onClick={() => {
                    login();
                  }}
                  minH={'60px'}
                  w="280px">
                  <Center gap={2}>
                    {/* <LinkIcon type="venom" key={'connect-wallet-venom'} /> */}
                    Connect Venom
                  </Center>
                </Button>
              ) : (
                <Menu>
                  <MenuButton
                    as={Button}
                    minH={'60px'}
                    borderRadius={12}
                    w="280px"
                    bgColor={colorMode === 'light' ? 'whiteAlpha.900' : 'var(--dark)'}
                    variant={colorMode === 'light' ? 'solid' : 'outline'}>
                    <Flex gap={2} align={'center'}>
                      <VenomFoundation />
                      <Stack gap={1} mx={1}>
                        <Text
                          fontWeight={'semibold'}
                          textAlign={'left'}
                          my={'0 !important'}
                          fontSize="14px">
                          {account?.balance !== undefined
                            ? Math.round(Number(account?.balance) / 10e5) / 10e2
                            : 'Loading'}{' '}
                          {notMobile ? (account?.balance !== undefined ? 'VENOM' : '') : ''}
                        </Text>
                        <Text
                          fontWeight={'semibold'}
                          textAlign={'left'}
                          fontSize="14px"
                          bgGradient={
                            colorMode === 'light'
                              ? 'linear(to-r, var(--venom2), var(--bluevenom2))'
                              : 'linear(to-r, var(--venom0), var(--bluevenom0))'
                          }
                          bgClip="text"
                          my={'0 !important'}>
                          {primaryName?.name !== ''
                            ? capFirstLetter(String(primaryName.name))
                            : truncAddress(String(account?.address))}
                        </Text>
                      </Stack>
                    </Flex>
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
                            : truncAddress(String(account?.address))}
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
                        <IconButton
                          onClick={onCopy}
                          variant="ghost"
                          aria-label="copy-venom-address">
                          {hasCopied ? (
                            <RiCheckDoubleFill size={22} />
                          ) : (
                            <RiFileCopyLine size={22} />
                          )}
                        </IconButton>
                      </Tooltip>
                      <Tooltip
                        borderRadius={4}
                        label={<Text p={2}>Disconnect Wallet</Text>}
                        hasArrow
                        color="white"
                        bgColor={'black'}>
                        <IconButton onClick={logout} variant="ghost" aria-label="disconnect-wallet">
                          <RiLogoutBoxRLine size={22} />
                        </IconButton>
                      </Tooltip>
                    </Flex>
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
              <ConnectWallet
                theme={colorMode}
                btnTitle="Connect Ethereum"
                modalTitle="Connect Wallet"
                modalTitleIconUrl={`${SITE_URL}/logos/vidicon.svg`}
                auth={{
                  loginOptional: false,
                  onLogin(token) {
                    console.log('network ', network);
                    console.log('network ', token);
                    network === '' && switchNetwork(currentChain);
                  },
                  onLogout() {
                    !isConnected ? switchNetwork('') : switchNetwork('venom');
                  },
                }}
                switchToActiveChain
                style={{
                  backgroundColor: colorMode === 'light' ? 'var(--white)' : 'var(--dark)',
                  color: colorMode === 'dark' ? 'white' : 'black',
                  border: '1px solid #77777750',
                  borderRadius: 8,
                  margin: '0px 16px',
                  display: 'flex',
                  minWidth: '280px',
                  height: '60px',
                  position: 'relative',
                }}
                welcomeScreen={{
                  img: {
                    src: `${SITE_URL}/logos/vidicon.svg`,
                    width: 150,
                    height: 150,
                  },
                  title: 'One Link To Showcase All Your Assets',
                }}
                modalSize={notMobile ? 'wide' : 'compact'}
              />
              {network !== '' && (
                <>
                  <Text key={`${network}-network-title`}>
                    Connected To {capFirstLetter(network)}
                  </Text>
                  {isConnected && ethAddress && (
                    <Button
                      variant="outline"
                      onClick={() => {
                        switchNetwork(network === 'venom' ? String(currentChain) : 'venom');
                        if (network === 'venom' && chain?.shortName.toUpperCase() !== 'BNB') {
                          switchChain(56);
                        }
                      }}
                      minH={'48px'}
                      w="280px">
                      <Center gap={2}>
                        {/* <LinkIcon type="venom" key={'connect-wallet-venom'} /> */}
                        <Text>Switch to {network === 'venom' ? currentChain : 'Venom'}</Text>
                      </Center>
                    </Button>
                  )}
                </>
              )}
            </Stack>
          </MenuList>
        </Menu>
      </Box>
    </>
  );
}
