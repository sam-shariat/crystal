import React, { useEffect, useState } from 'react';
import {
  BaseNftJson,
  getAddressesFromIndex,
  getNft,
  getNftByIndex,
  saltCode,
} from 'core/utils/nft';
import NextLink from 'next/link';
import { Avatar } from 'components/Profile';
import {
  Button,
  Container,
  Text,
  Stack,
  SimpleGrid,
  Box,
  Tooltip,
  Center,
  Flex,
  Link,
  useMediaQuery,
  useColorMode,
  Spinner,
  HStack,
  IconButton,
  Switch,
  useToast,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { useTranslate } from 'core/lib/hooks/use-translate';
import Logo from 'components/logos/Logo';
import { sleep } from 'core/utils';
import { sql } from '@vercel/postgres';
import { ConnectButton } from 'components/venomConnect';
import { useConnect, useVenomProvider } from 'venom-react-hooks';
import {
  primaryNameAtom,
  venomContractAtom,
  venomContractAddressAtom,
  manageListViewAtom,
  ipfsGatewayAtom,
  networkAtom,
} from 'core/atoms';
import { useAtom, useAtomValue } from 'jotai';
import { Address, Transaction } from 'everscale-inpage-provider';
import {
  AVATAR_API_URL,
  CONTRACT_ADDRESS,
  CONTRACT_ADDRESS_V1,
  CONTRACT_ADDRESS_V2,
  SITE_PROFILE_URL,
  ZERO_ADDRESS,
} from 'core/utils/constants';
import {
  RiExternalLinkLine,
  RiLayoutGridLine,
  RiListCheck2,
  RiMoreFill,
  RiRestartLine,
  RiSettings4Line,
} from 'react-icons/ri';
import { MdOutlinePreview, MdOutlineVisibility } from 'react-icons/md';
import axios from 'axios';
import VIDImage from 'components/claiming/VIDImage';
import getNftsByAddress from 'core/utils/getNftsByAddress';
import { useAddress } from '@thirdweb-dev/react';
import { createWeb3Name } from '@web3-name-sdk/core';

function ManageSection() {
  const { provider } = useVenomProvider();
  const { isConnected, account } = useConnect();
  const ethAddress = useAddress();
  const [_ethAddress, _setEthAddress] = useState(ethAddress);
  const [listIsEmpty, setListIsEmpty] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const [listView, setListView] = useAtom(manageListViewAtom);
  const [nftjsons, setNftJsons] = useState<BaseNftJson[] | undefined>(undefined);
  const network = useAtomValue(networkAtom);
  const [_network, _setNetwork] = useState(network);
  const venomContract = useAtomValue(venomContractAtom);
  const venomContractAddress = useAtomValue(venomContractAddressAtom);
  const { t } = useTranslate();
  const ipfsGateway = useAtomValue(ipfsGatewayAtom);
  const [primaryName, setPrimaryName] = useAtom(primaryNameAtom);
  const [notMobile] = useMediaQuery('(min-width: 800px)');
  const [isSaving, setIsSaving] = useState(false);
  const toast = useToast();
  const [isConfirming, setIsConfirming] = useState(false);
  const minFee = 660000000;
  const { colorMode } = useColorMode();
  const web3Name = createWeb3Name();
  if (nftjsons) {
    // console.log(nftjsons);
  }

  const loadByContract = async (_contractAddress: string) => {
    if (!provider || !provider.isInitialized) return;
    setIsLoading(true);
    const saltedCode = await saltCode(provider, String(account?.address), _contractAddress);
    // Hash it
    const codeHash = await provider.getBocHash(String(saltedCode));
    if (!codeHash) {
      setIsLoading(false);
      return;
    }
    // Fetch all Indexes by hash
    const indexesAddresses = await getAddressesFromIndex(codeHash, provider);
    if (!indexesAddresses || !indexesAddresses.length) {
      setIsLoading(false);
      return;
    }
    // Fetch all nfts
    indexesAddresses.map(async (indexAddress) => {
      try {
        let _nftJson = await getNftByIndex(provider, indexAddress);
        const ipfsData = _nftJson.attributes?.find((att: any) => att.trait_type === 'DATA')?.value;
        if (ipfsData !== '') {
          const res = await axios.get(ipfsGateway + ipfsData);
          if (res) {
            _nftJson.avatar = res.data.avatar ?? ''; //_nftJson.preview?.source;
          } else {
            _nftJson.avatar = ''; //_nftJson.preview?.source;
          }
        } else {
          _nftJson.avatar = ''; //_nftJson.preview?.source;
        }
        _nftJson.network = 'venom';
        setNftJsons((nfts) => [...(nfts ? nfts : []), _nftJson]);
      } catch (e: any) {
        // console.log('error getting venomid nft ', indexAddress);
      }
    });
  };

  const loadByDb = async () => {
    if (!provider || !provider.isInitialized) return;
    setIsLoading(true);
    console.log('loading db');
    const result = (await getNftsByAddress(String(account?.address))).data;
    console.log(result);
    //console.log(rows[0]);
    if (result.nfts.length > 0) {
      result.nfts.map(async (nft: any) => {
        try {
          let _nftJson = await getNft(provider, nft.address);
          const ipfsData = _nftJson.attributes?.find(
            (att: any) => att.trait_type === 'DATA'
          )?.value;
          if (ipfsData !== '') {
            const res = await axios.get(ipfsGateway + ipfsData);
            if (res) {
              _nftJson.avatar = res.data.avatar ?? ''; //_nftJson.preview?.source;
            } else {
              _nftJson.avatar = ''; //_nftJson.preview?.source;
            }
          } else {
            _nftJson.avatar = ''; //_nftJson.preview?.source;
          }
          _nftJson.network = 'venom';
          setNftJsons((nfts) => [...(nfts ? nfts : []), _nftJson]);
        } catch (e: any) {
          // console.log('error getting venomid nft ', indexAddress);
        }
      });
    } else {
      console.log('nothing in db');
    }
  };

  const loadVenomNFTs = async () => {
    try {
      // Take a salted code
      // console.log('loading all nfts', account?.address);
      if (!provider?.isInitialized) return;
      setNftJsons([]);
      setIsLoading(true);
      setListIsEmpty(false);
      await loadByContract(CONTRACT_ADDRESS);
      await loadByContract(CONTRACT_ADDRESS_V1);
      //await loadByContract(CONTRACT_ADDRESS_V2);
      await loadByDb();

      setLoaded(true);
      setIsLoading(false);
    } catch (e) {
      console.error(e);
      setIsLoading(false);
    }
  };

  const loadEthNFTs = async () => {
    try {
      // Take a salted code
      // console.log('loading all nfts', account?.address);
      if (!ethAddress) return;
      setNftJsons([]);
      setIsLoading(true);
      setListIsEmpty(false);

      const nfts = await web3Name.getDomainNames({ address: ethAddress });
      console.log(ethAddress, nfts)
      
      nfts.map(async (nft: any) => {
        try {
          //let r = await web3Name.getDomainRecord({name: nft});
          let _avatar = await web3Name.getDomainRecord({name: nft, key: 'avatar'});
          let _name = await web3Name.getDomainRecord({name: nft, key: 'name'});
          let _nftJson:BaseNftJson = {name : nft, avatar: _avatar ?? '', address: nft};
          //_nftJson.ipfsData = _venomid;
          _nftJson.address = nft; //_nftJson.preview?.source;
          _nftJson.network = nft.slice(nft.indexOf('.')+1); //_nftJson.preview?.source;
          _nftJson.external_url = SITE_PROFILE_URL + 'sid/'+  _nftJson.name
          console.log(_nftJson)
          setNftJsons((nfts) => [...(nfts ? nfts : []), _nftJson]);
        } catch (e: any) {
          // console.log('error getting venomid nft ', indexAddress);
        }
      })


      setLoaded(true);
      setIsLoading(false);
    } catch (e) {
      console.error(e);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (nftjsons?.length === 0 && loaded) {
      setListIsEmpty(true);
    } else {
      setListIsEmpty(false);
    }
  }, [nftjsons]);

  useEffect(() => {
    async function getNfts() {
      if (account && isConnected && provider) {
        if (!provider?.isInitialized) {
          // console.log('provider not ready');
          await sleep(1000);
          getNfts();
          return;
        }

        if (!loaded || network !== _network || ethAddress !== _ethAddress) {
          console.log(network);
          if (network === 'venom') {
            loadVenomNFTs();
          } else {
            loadEthNFTs();
          }
          _setNetwork(network)
          _setEthAddress(ethAddress)
        }
      }

      if (!isConnected) setNftJsons([]);
    }
    getNfts();
  }, [isConnected, provider, network, ethAddress]);

  async function setAsPrimary(_nftAddress: string, _name: string) {
    if (!isConnected) {
      toast({
        status: 'info',
        title: 'connect wallet',
        description: 'please connect your venom wallet',
        isClosable: true,
      });
      return;
    }
    if (!provider) {
      toast({
        status: 'info',
        title: 'Provider Not Ready',
        description:
          'Please wait a few seconds and try again, Your Wallet Provider is not ready, yet',
      });
      return;
    }
    // console.log('before saving', _nftAddress, _name.slice(0, -4));
    if (provider.isInitialized) {
      // console.log('saving ', provider);
      setIsSaving(true);
      toast({
        status: 'loading',
        title: 'setting ' + _name + ' as primary name',
        description: 'Please wait a few moments while your changes are saved',
        duration: null,
        isClosable: true,
      });
      const setPrimaryTx = await venomContract?.methods
        .setPrimaryName({ _nftAddress: new Address(_nftAddress), _name: _name.slice(0, -4) })
        .send({
          amount: String(minFee),
          bounce: true,
          from: account?.address,
        })
        .catch((e: any) => {
          if (e.code === 3) {
            // rejected by a user
            toast.closeAll();
            setIsSaving(false);
            return Promise.resolve(null);
          } else {
            setIsSaving(false);
            // console.log(e);
            toast.closeAll();
            return Promise.reject(e);
          }
        });

      if (setPrimaryTx) {
        // console.log('setPrimary tx : ', setPrimaryTx);
        setIsConfirming(true);
        let receiptTx: Transaction | undefined;
        const subscriber = provider && new provider.Subscriber();
        if (subscriber)
          await subscriber
            .trace(setPrimaryTx)
            .tap((tx_in_tree: any) => {
              // console.log('tx_in_tree : ', tx_in_tree);
              if (tx_in_tree.account.equals(venomContractAddress)) {
                toast.closeAll();
                toast({
                  status: 'success',
                  title: 'Update Successful',
                  description: _name + ' was succesfully set as your primary name',
                  duration: null,
                  isClosable: true,
                });
              }
            })
            .finished();

        setIsSaving(false);
        setIsConfirming(false);
        setPrimaryName({ nftAddress: new Address(_nftAddress), name: _name.slice(0, -4) });
        loadVenomNFTs();
      }
      // console.log('save primary finished');
    }
  }

  return (
    <Box>
      <Container
        as="main"
        maxW="container.lg"
        display="grid"
        flexDir={'column'}
        minH={'100vh'}
        flexGrow={1}>
        <Box py={6} gap={2} width={'100%'} pb={12}>
          {isConnected && (
            <Stack gap={10} width={'100%'}>
              <HStack minWidth={['350px', '420px', '580px', '800px']}>
                <Text
                  flexGrow={1}
                  fontWeight="bold"
                  fontSize={notMobile ? '4xl' : '2xl'}
                  my={notMobile ? 10 : 4}>
                  {network === 'venom' ? t('yourVids') : t('yourSids')}
                </Text>
                <Button aria-label="change-view" onClick={() => setListView(!listView)} gap={2}>
                  {notMobile ? (listView ? 'Grid' : 'List') : ''}{' '}
                  {!listView ? <RiListCheck2 size={'24'} /> : <RiLayoutGridLine size={'24'} />}
                </Button>
                <Button
                  aria-label="reload-nfts"
                  key={`reload-${network}-nfts`}
                  onClick={network === 'venom' ? loadVenomNFTs : loadEthNFTs}
                  gap={2}>
                  {notMobile ? 'Reload' : ''} <RiRestartLine size={'24'} />
                </Button>
              </HStack>
              {isLoading && (
                <Center width={'100%'} height={200}>
                  <Spinner size="lg" />
                </Center>
              )}
            </Stack>
          )}
          {listView ? (
            <Stack gap={2} width={'100%'}>
              {nftjsons?.map((nft) => (
                <Flex
                  key={nft.name}
                  flexDirection={'row'}
                  gap={2}
                  minWidth={['100%', '420px', '580px', '800px']}
                  alignItems={'center'}
                  background={colorMode === 'dark' ? 'blackAlpha.300' : 'white'}
                  borderColor={
                    nft?.name !== undefined && primaryName.name === nft?.name.slice(0, -4)
                      ? 'grey'
                      : 'blackAlpha.200'
                  }
                  borderWidth={1}
                  p={2}
                  borderRadius={10}>
                  <Flex key={nft.name + ' name'} flexDirection={'row'}>
                    <Box width={'28px'}>
                      <Avatar
                        my={'0px'}
                        noanimate
                        nodrag
                        alt={nft.name}
                        shadow="none"
                        url={String(nft.avatar)}
                        shape="circle"
                      />
                    </Box>
                  </Flex>
                  <Text flexGrow={1} fontWeight={'bold'} fontSize={['xl', 'xl', '2xl']}>
                    {String(nft.name).toLowerCase()}
                  </Text>

                  {notMobile ? (
                    <>
                      {/* {nft.network === 'venom' && <Button
                        colorScheme="green"
                        isLoading={isSaving || isConfirming}
                        onClick={() =>
                          nft?.name !== undefined &&
                          primaryName.name !== nft?.name &&
                          setAsPrimary(String(nft?.address), String(nft?.name))
                        }
                        isDisabled={
                          true
                          // isSaving ||
                          // isConfirming ||
                          // (nft?.name !== undefined && primaryName.name === nft?.name.slice(0, -4))
                        }
                        variant={
                          nft?.name !== undefined && primaryName.name === nft?.name
                            ? 'outline'
                            : 'solid'
                        }>
                        {nft?.name !== undefined && primaryName.name === nft?.name
                          ? 'Primary VID'
                          : 'Set Primary'}
                      </Button>} */}

                      
                        {nft.network === 'venom' && <NextLink href={(nft.network === 'venom' ? '/manage/' : '/managesid/') + nft.address} passHref>
                          <Button
                            aria-label="customize-venom-id"
                            gap={2}
                            variant={'outline'}
                            colorScheme="purple">
                            Customize
                            <RiSettings4Line />
                          </Button>
                        </NextLink>}
                      <Link href={nft.external_url} target="_blank">
                        <Tooltip
                          borderRadius={4}
                          label={<Text p={2}>View {nft.network === 'venom' ? 'Venom ID Link' : 'Space ID Link'}</Text>}
                          hasArrow
                          color="white"
                          bgColor={'black'}>
                          <IconButton
                            aria-label="view-venom-id"
                            variant={'outline'}
                            colorScheme="gray">
                            <MdOutlineVisibility />
                          </IconButton>
                        </Tooltip>
                      </Link>
                    </>
                  ) : (
                    <Menu>
                      <IconButton
                        as={MenuButton}
                        aria-label="more-settings"
                        variant={'ghost'}
                        p={2}>
                        <RiMoreFill size={24} />
                      </IconButton>
                      <MenuList p={0}>
                      {/* {nft.network === 'venom' && <Button
                          as={MenuItem}
                          colorScheme="green"
                          isLoading={isSaving || isConfirming}
                          onClick={() =>
                            nft?.name !== undefined &&
                            primaryName.name !== nft?.name &&
                            setAsPrimary(String(nft?.address), String(nft?.name))
                          }
                          isDisabled={
                            true
                            // isSaving ||
                            // isConfirming ||
                            // (nft?.name !== undefined && primaryName.name === nft?.name.slice(0, -4))
                          }
                          variant={
                            nft?.name !== undefined && primaryName.name === nft?.name
                              ? 'outline'
                              : 'solid'
                          }>
                          {nft?.name !== undefined && primaryName.name === nft?.name
                            ? 'Primary VID'
                            : 'Set Primary'}
                        </Button>} */}
                        {nft.network === 'venom' && <NextLink href={(nft.network === 'venom' ? '/manage/' : '/managesid/') + nft.address} passHref>
                          <MenuItem
                            sx={{ textDecoration: 'none', _hover: { textDecoration: 'none' } }}
                            icon={<RiSettings4Line />}>
                            Customize
                          </MenuItem>
                        </NextLink>}
                        <MenuItem
                          as={Link}
                          sx={{ textDecoration: 'none', _hover: { textDecoration: 'none' } }}
                          href={nft.external_url}
                          target="_blank"
                          icon={<MdOutlineVisibility />}>
                          View {nft.network === 'venom' ? 'Venom ID Link' : 'Space ID Link'}
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  )}
                </Flex>
              ))}
            </Stack>
          ) : (
            <SimpleGrid
              columns={[
                1,
                nftjsons && nftjsons?.length > 1 ? 2 : 1,
                nftjsons && nftjsons?.length > 1 ? 3 : 1,
                nftjsons && nftjsons?.length > 1 ? 3 : 1,
              ]}
              gap={2}
              width={'100%'}>
              {nftjsons?.map((nft) => (
                <Center
                  width={'100%'}
                  key={nft.name}
                  flexDirection={'column'}
                  gap={2}
                  background={colorMode === 'dark' ? 'blackAlpha.300' : 'white'}
                  borderColor={
                    nft?.name !== undefined && primaryName.name === nft?.name.slice(0, -4)
                      ? 'grey'
                      : 'blackAlpha.200'
                  }
                  borderWidth={1}
                  p={'16px !important'}
                  borderRadius={12}>
                  <Flex
                    width={'100%'}
                    key={nft.name + ' name'}
                    gap={2}
                    flexDirection={'column'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    my={2}>
                    <Box width={100}>
                      <Avatar
                        noanimate
                        nodrag
                        my={2}
                        url={String(nft.avatar)}
                        shape="circle"
                        alt={nft.name}
                      />
                    </Box>
                    <Text fontWeight={'bold'} fontSize={'3xl'}>
                      {String(nft.name).toLowerCase()}
                    </Text>
                  </Flex>
                  {/* {nft.network === 'venom' && <Button
                    colorScheme="green"
                    isLoading={isSaving || isConfirming}
                    onClick={() =>
                      nft?.name !== undefined &&
                      primaryName.name !== nft?.name &&
                      setAsPrimary(String(nft?.address), String(nft?.name))
                    }
                    isDisabled={ true
                      // isSaving ||
                      // isConfirming ||
                      // (nft?.name !== undefined && primaryName.name === nft?.name.slice(0, -4))
                    }
                    variant={
                      nft?.name !== undefined && primaryName.name === nft?.name
                        ? 'outline'
                        : 'solid'
                    }
                    width={'100%'}>
                    {nft?.name !== undefined && primaryName.name === nft?.name
                      ? 'Primary VID'
                      : 'Set Primary'}
                  </Button>} */}
                  {nft.network === 'venom' && <NextLink href={(nft.network === 'venom' ? '/manage/' : '/managesid/') + nft.address} passHref>
                    <Button variant={'outline'} colorScheme="purple" width={'100%'}>
                      Customize
                    </Button>
                  </NextLink>}
                  <Link href={nft.external_url} target="_blank" width={'100%'}>
                    <Button width={'100%'}>View {nft.network === 'venom' ? 'Venom ID Link' : 'Space ID Link'}</Button>
                  </Link>
                </Center>
              ))}
            </SimpleGrid>
          )}
          {listIsEmpty && !isLoading && (
            <Center display="flex" flexDirection="column" gap={4} minH={'75%'}>
              <Text fontSize="xl">You don't own any Venom IDs</Text>
              <NextLink href={'/'} passHref>
                <Button
                  variant="outline"
                  textAlign="left"
                  borderWidth={1}
                  gap={2}
                  borderColor="grey">
                  Claim Your Venom ID
                </Button>
              </NextLink>
            </Center>
          )}
        </Box>
        {!network && (
          <Center my={8} flexDirection="column" minH={'75vh'}>
            <Text my={4}>{t('venomWalletConnect')}</Text>
            <ConnectButton />
          </Center>
        )}
      </Container>
    </Box>
  );
}

export default ManageSection;
