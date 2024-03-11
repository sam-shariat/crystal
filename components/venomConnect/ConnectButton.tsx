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
  Avatar,
  Icon,
  MenuDivider,
} from '@chakra-ui/react';
import { LinkIcon, VenomFoundation, VenomScanIcon } from 'components/logos';
import {
  AVATAR_API_URL,
  CONTRACT_ADDRESS,
  CONTRACT_ADDRESS_V1,
  CONTRACT_ADDRESS_V2,
  EARLY_ADOPTERS_CONTRACT_ADDRESS,
  FAUCET_URL,
  MINT_OPEN,
  ROOT_CONTRACT_ADDRESS,
  SIGN_MESSAGE,
  SITE_PROFILE_URL,
  SITE_URL,
  VENOMSCAN_NFT,
} from 'core/utils/constants';
import { sleep, truncAddress, capFirstLetter, isValidSignHash } from 'core/utils';
import { useConnect, useSignMessage, useVenomProvider } from 'venom-react-hooks';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { Address } from 'everscale-inpage-provider';
import VenomAbi from 'abi/Collection.abi.json';
import RootAbi from 'abi/Root.abi.json';
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
  rootContractAtom,
  signDateAtom,
  signHashAtom,
  signMessageAtom,
  signRequestAtom,
  venomContractAddressAtom,
  venomContractAtom,
  venomContractAtomV1,
  venomContractAtomV2,
  venomProviderAtom,
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
import { getAddressesFromIndex, getNftByIndex, saltCode } from 'core/utils/nft';
import Link from 'next/link';
//import { lookupName } from 'vid-sdk';

export default function ConnectButton() {
  const [notMobile] = useMediaQuery('(min-width: 800px)');
  const [small] = useMediaQuery('(min-width: 480px)');
  const { login, disconnect, isConnected, account } = useConnect();
  const web3Name = createWeb3Name();
  const { provider } = useVenomProvider();
  const [network, setNetwork] = useAtom(networkAtom);
  //const ethAddress = useAtomValue(ethAtom);
  const ethAddress = useAddress();
  const _status = useConnectionStatus();
  const ethBalance = useBalance();
  const symbol = network === 'venom' ? 'VENOM' : 'BNB'; //ethBalance.data?.symbol;
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
  // const balance =
  //   network === 'venom'
  //     ? account?.balance !== undefined
  //       ? Math.round(Number(account?.balance) / 10e5) / 10e2
  //       : 'Loading'
  //     : ethBalance.data
  //     ? ethBalance.data?.displayValue.slice(0, ethBalance.data?.displayValue.indexOf('.') + 4)
  //     : 'Loading';

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
  const setVenomProvider = useSetAtom(venomProviderAtom);
  const setVenomContract = useSetAtom(venomContractAtom);
  const setRootContract = useSetAtom(rootContractAtom);
  const setVenomContractV1 = useSetAtom(venomContractAtomV1);
  const setVenomContractV2 = useSetAtom(venomContractAtomV2);
  const setEarlyAdopterContract = useSetAtom(earlyAdopterContractAtom);
  const [signMessage, setSignMessage] = useAtom(signMessageAtom);
  const { onCopy, hasCopied } = useClipboard(String(address));
  const { sign, status } = useSignMessage({
    publicKey: String(account?.publicKey),
    data: signMessage,
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

  async function getPrimary() {
    if (!provider || !provider?.isInitialized || !account?.address) return;
    setVenomProvider(provider);
    setIsConnected(true);
    setConnectedAccount(account?.address.toString() ?? '');

    try {
      const _rootContract = new provider.Contract(RootAbi, new Address(ROOT_CONTRACT_ADDRESS));
      setRootContract(_rootContract);

      const _earlyAdopterContract = new provider.Contract(
        OATCollectionABI,
        new Address(EARLY_ADOPTERS_CONTRACT_ADDRESS)
      );
      setEarlyAdopterContract(_earlyAdopterContract);

      const _venomContract = new provider.Contract(VenomAbi, new Address(CONTRACT_ADDRESS));
      setVenomContract(_venomContract);

      const _venomContractV1 = new provider.Contract(VenomAbi, new Address(CONTRACT_ADDRESS_V1));
      setVenomContractV1(_venomContractV1);

      const _venomContractV2 = new provider.Contract(VenomAbi, new Address(CONTRACT_ADDRESS_V2));
      setVenomContractV2(_venomContractV2);

      if (
        !_venomContract?.methods ||
        !_venomContractV1?.methods ||
        !_venomContractV2?.methods ||
        !_rootContract?.methods
      ) {
        return;
      }

      const saltedCode = await saltCode(provider, String(account?.address), ROOT_CONTRACT_ADDRESS);
      // Hash it
      const codeHash = await provider.getBocHash(String(saltedCode));
      if (!codeHash) {
        //setIsLoading(false);
        return;
      }
      // Fetch all Indexes by hash
      const indexesAddresses = await getAddressesFromIndex(codeHash, provider, 5);
      if (!indexesAddresses || !indexesAddresses.length) {
        //setIsLoading(false);
        return;
      }
      // Fetch all nfts
      let primary = false;
      indexesAddresses.map(async (indexAddress) => {
        try {
          if (!primary) {
            let _nftJson = await getNftByIndex(provider, indexAddress);
            if (_nftJson.target === account.address.toString() && !primary) {
              primary = true;
              setPrimaryName({ name: _nftJson.name, nftAddress: _nftJson.address });
              setSignMessage(`Hey there ${_nftJson.name} ,${SIGN_MESSAGE}`);
              return;
            }
          }
        } catch (e: any) {
          // console.log('error getting venomid nft ', indexAddress);
        }
      });

      // @ts-ignore: Unreachable code error
      // const { value0: name1 }: any = await _venomContract?.methods.getPrimaryName({ _owner: new Address(String(account.address)) })
      //   .call();

      // if (name1?.name !== '' && !primaryName?.nftAddress) {
      //   setPrimaryName(name1);
      //   setSignMessage(`Hey there ${name1.name}.vid ,${SIGN_MESSAGE}`);
      // } else {
      //   console.log('cheking second ...');
      //   // @ts-ignore: Unreachable code error
      //   const { value0: namev1 }: any = await _venomContractV1?.methods.getPrimaryName({ _owner: new Address(String(account.address)) })
      //     .call();
      //   console.log(namev1);
      //   if (namev1?.name !== '') {
      //     setPrimaryName(namev1);
      //     setSignMessage(`Hey there ${namev1.name}.vid ,${SIGN_MESSAGE}`);
      //   } else {
      //     console.log('cheking third ...');
      //     // @ts-ignore: Unreachable code error
      //     const { value0: namev2 }: any = await _venomContractV2?.methods.getPrimaryName({ _owner: new Address(String(account.address)) })
      //       .call();
      //     console.log(namev2);
      //     if (namev2?.naame !== '') {
      //       setPrimaryName(namev2);
      //       setSignMessage(`Hey there ${namev2.name}.vid ,${SIGN_MESSAGE}`);
      //     } else {
      //       setPrimaryName({ name: '', nftAddress: undefined });
      //       setSignMessage(SIGN_MESSAGE);
      //     }
      //   }
      // }

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

  useEffect(() => {
    //console.log(network,signMessage,isValidSignHash(signHash, signDate))
    if (!isValidSignHash(signHash, signDate) && network === 'venom' && signMessage.length > 10) {
      try {
        !isSigning && sign();
        setIsSigning(true);
      } catch (e) {
        setIsSigning(false);
      }
    }
  }, [signMessage, network]);

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

  // useEffect(() => {
  //   if (signRequest && !isValidSignHash(signHash, signDate)) {
  //     sign();
  //     setIsSigning(true);
  //     setSignRequest(false);
  //   }
  // }, [signRequest]);

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
        {/* <Menu>
          <MenuButton
            as={Button}
            size={'lg'}
            px={4}
            bgColor={colorMode === 'light' ? 'whiteAlpha.900' : 'var(--dark)'}>
            <Center gap={2} justifyContent={'left'}>
              <LinkIcon type={network === '' ? 'wallet' : network.toLowerCase()} />
              {network === '' || (!isConnected && !ethAddress) ? (
                <Stack gap={1}>
                  <Text>Connect</Text>
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
            bg={colorMode === 'light' ? 'var(--white)' : 'var(--dark)'}> */}
        {!isConnected ? (
          <Button
            onClick={() => {
              login();
            }}
            rounded={'full'}
            bgGradient={
              colorMode === 'light'
                ? 'linear(to-r, var(--venom2), var(--bluevenom2))'
                : 'linear(to-r, var(--venom0), var(--bluevenom0))'
            }
            size={['md','lg']}
            color={'white'}
            colorScheme="venom"
            w={['160px', '192px']}>
            <Center gap={2}>
              {/* <LinkIcon type="venom" key={'connect-wallet-venom'} /> */}
              Connect Venom
            </Center>
          </Button>
        ) : (
          <Menu>
            <MenuButton
              as={Button}
              size={'lg'}
              rounded={'full'}
              w={['160px', '192px']}
              px={0}
              bgColor={colorMode === 'light' ? 'whiteAlpha.900' : 'var(--dark)'}
              variant={colorMode === 'light' ? 'solid' : 'outline'}>
              <Flex gap={2} align={'center'}>
                {primaryName?.name !== '' ? (
                  <Avatar
                    color="white"
                    bgGradient={
                      colorMode === 'light'
                        ? 'linear(to-r, var(--venom2), var(--bluevenom2))'
                        : 'linear(to-r, var(--venom0), var(--bluevenom0))'
                    }
                    icon={<LinkIcon type="RiUserLine" size={22} color="#ffffff" />}
                    rounded={'full'}
                    src={AVATAR_API_URL + primaryName?.name}
                    size={['md']}
                  />
                ) : (
                  <Box p={3} rounded={'full'} border={'1px #77777750 solid'}>
                    <LinkIcon type="RiUserLine" size={22} color="#27aa6b" />
                  </Box>
                )}
                {/* <Stack gap={1} mx={1}> 
                        <Text
                          fontWeight={'semibold'}
                          textAlign={'left'}
                          my={'0 !important'}
                          fontSize="14px">
                          {account?.balance !== undefined
                            ? Math.round(Number(account?.balance) / 10e5) / 10e2
                            : 'Loading'}{' '}
                          {notMobile ? (account?.balance !== undefined ? 'VENOM' : '') : ''}
                        </Text>*/}
                <Text
                  fontWeight={'semibold'}
                  textAlign={'left'}
                  fontSize="lg"
                  bgGradient={
                    colorMode === 'light'
                      ? 'linear(to-r, var(--venom2), var(--bluevenom2))'
                      : 'linear(to-r, var(--venom0), var(--bluevenom0))'
                  }
                  bgClip="text"
                  my={'0 !important'}>
                  {primaryName?.name && primaryName?.name !== ''
                    ? primaryName.name.length > (!small ? 7 : 12) ? primaryName.name?.slice(0,(!small ? 7 : 12)) + '...' : primaryName.name
                    : truncAddress(String(account?.address))}
                </Text>
                {/* </Stack> */}
              </Flex>
            </MenuButton>
            <MenuList
              width={320}
              mt={1}
              py={2}
              border={colorMode === 'light' ? 'none' : '1px #77777750 solid'}
              shadow={colorMode === 'light' ? 'md' : 'none'}
              position={'relative'}
              zIndex={1500}
              rounded={'2xl'}
              bg={colorMode === 'light' ? 'var(--white)' : 'var(--dark0)'}>
              <Flex p={5} alignItems="center" gap={2}>
                {primaryName?.name !== '' ? (
                  <Avatar
                    color="white"
                    bgGradient={
                      colorMode === 'light'
                        ? 'linear(to-r, var(--venom2), var(--bluevenom2))'
                        : 'linear(to-r, var(--venom0), var(--bluevenom0))'
                    }
                    icon={<LinkIcon type="RiUserLine" size={22} color="#ffffff" />}
                    rounded={'full'}
                    src={AVATAR_API_URL + primaryName?.name}
                    size={'md'}
                  />
                ) : (
                  <Box p={3} rounded={'full'} border={'1px #77777750 solid'}>
                    <LinkIcon type="RiUserLine" size={22} color="#27aa6b" />
                  </Box>
                )}
                <Stack gap={0.5} mx={1} flexGrow={1}>
                  <Text
                    fontWeight={'semibold'}
                    textAlign={'left'}
                    fontFamily={'Poppins'}
                    fontSize="14px"
                    my={'0 !important'}>
                    {primaryName?.name !== ''
                      ? String(primaryName.name)
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
                  color={colorMode === 'light' ? 'white' : 'black'}
                  bgColor={colorMode === 'light' ? 'black' : 'white'}
                  placement="bottom"
                  hasArrow>
                  <IconButton onClick={onCopy} variant="ghost" aria-label="copy-venom-address">
                    {hasCopied ? <RiCheckDoubleFill size={22} /> : <RiFileCopyLine size={22} />}
                  </IconButton>
                </Tooltip>
                <Tooltip
                  borderRadius={4}
                  label={<Text p={2}>Disconnect Wallet</Text>}
                  hasArrow
                  placement="bottom-end"
                  color={colorMode === 'light' ? 'white' : 'black'}
                  bgColor={colorMode === 'light' ? 'black' : 'white'}>
                  <IconButton onClick={logout} variant="ghost" aria-label="disconnect-wallet">
                    <RiLogoutBoxRLine size={22} />
                  </IconButton>
                </Tooltip>
              </Flex>
              <Stack gap={2} my={4} justify={'center'}>
                {primaryName &&
                  primaryName?.nftAddress &&
                  primaryName?.nftAddress?.toString().length > 60 && (
                    <LinkBox px={5}>
                      <Link href={'manage/' + primaryName?.nftAddress?.toString()} passHref>
                        <Button
                          borderColor={'gray.800'}
                          gap={2}
                          variant="outline"
                          width={'100%'}
                          size="md">
                          <LinkIcon type="RiUserLine" size={22} />
                          Profile
                        </Button>
                      </Link>
                    </LinkBox>
                  )}
                {isConnected && (
                  <LinkBox px={5}>
                    <LinkOverlay href={'/settings'}>
                      <Button
                        borderColor={'gray.800'}
                        gap={2}
                        variant="outline"
                        width={'100%'}
                        size="md">
                        <LinkIcon type="RiSettings4Line" size={22} />
                        Settings
                      </Button>
                    </LinkOverlay>
                  </LinkBox>
                )}

                <MenuDivider />
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
        {/* <Stack gap={4} my={4} justify={'center'} align={'center'}>
              {!isConnected ? (
                <Button
                  variant="outline"
                  onClick={() => {
                    login();
                  }}
                  minH={'60px'}
                  w="280px">
                  <Center gap={2}>
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
                        
                        <Text>Switch to {network === 'venom' ? currentChain : 'Venom'}</Text>
                      </Center>
                    </Button>
                  )}
                </>
              )}
            </Stack> 
          </MenuList>
        </Menu>*/}
      </Box>
    </>
  );
}
