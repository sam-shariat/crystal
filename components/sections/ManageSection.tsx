import React, { useEffect, useState } from 'react';
import { getAccountsFromIndex, getAddressesFromIndex, getNft, getNftByIndex, saltCode } from 'core/utils/nft';
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
  Badge,
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
  connectedAccountAtom,
} from 'core/atoms';
import { useAtom, useAtomValue } from 'jotai';
import { Address, Transaction } from 'everscale-inpage-provider';
import {
  AVATAR_API_URL,
  CONTRACT_ADDRESS,
  CONTRACT_ADDRESS_V1,
  CONTRACT_ADDRESS_V2,
  OASIS_NFT,
  ROOT_CONTRACT_ADDRESS,
  SITE_PROFILE_URL,
  SITE_URL,
  VENOMART_NFT,
  VENOMSCAN_NFT,
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
import MigrateModal from 'components/manage/MigrateModal';
import { useRouter } from 'next/router';
import { BaseNftJson, getAllNames } from 'core/utils/reverse';
import { LinkIcon } from 'components/logos';
import { formatDateDifference } from 'core/utils/stringUtils';

function ManageSection() {
  const { provider } = useVenomProvider();
  const { isConnected, account } = useConnect();
  const connectedAccount = useAtomValue(connectedAccountAtom);
  const ethAddress = ''; //useAddress();
  const [_ethAddress, _setEthAddress] = useState(ethAddress);
  const [listIsEmpty, setListIsEmpty] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [names, setNames] = useState<string[]>();
  const [loaded, setLoaded] = useState(false);
  const [nftjsons, setNftJsons] = useState<BaseNftJson[] | undefined>(undefined);
  const network = useAtomValue(networkAtom);
  const [_network, _setNetwork] = useState(network);
  const { t } = useTranslate();
  const ipfsGateway = useAtomValue(ipfsGatewayAtom);
  const [primaryName, setPrimaryName] = useAtom(primaryNameAtom);
  const [notMobile] = useMediaQuery('(min-width: 800px)');
  const { colorMode } = useColorMode();
  const [nextPage, setNextPage] = useState('');
  const [pageNum, setPageNum] = useState(1);
  const web3Name = createWeb3Name();  
  const { pathname} = useRouter();
  const [page, setPage] = useState<string | undefined>();

  const loadByContract = async (_contractAddress: string) => {
    if (!provider || !provider.isInitialized) return;
    setIsLoading(true);
    setNames([]);
    const saltedCode = await saltCode(provider, String(account?.address), ROOT_CONTRACT_ADDRESS);
    console.log('salted code ',saltedCode)
    // Hash it
    const codeHash = await provider.getBocHash(String(saltedCode));
    if (!codeHash) {
      //setIsLoading(false);
      return;
    }

    // Fetch all Indexes by hash
    const indexesAddresses = await getAccountsFromIndex(codeHash, provider, 50, page === '' ? undefined : page);
    if (!indexesAddresses.accounts || !indexesAddresses.accounts.length) {
      //setIsLoading(false);
      return;
    }

    console.log(indexesAddresses);

    if(indexesAddresses.continuation){
      setNextPage(indexesAddresses.continuation);
    } else {
      setNextPage('');
    }
    // Fetch all nfts
    const _nfts = await Promise.all(
      indexesAddresses.accounts.map(async (indexAddress) => {
        try {
          let _nftJson = await getNftByIndex(provider, indexAddress);
          //console.log(_nftJson)

          if(_nftJson.avatar === 'not set') {
            const ipfsData = _nftJson.hash;
            if (!ipfsData?.includes('not set') && ipfsData) {
              const res = await axios.get(ipfsGateway + ipfsData);
              if (res) {
                _nftJson.avatar = res.data.avatar ?? ''; //_nftJson.preview?.source;
              } else {
                _nftJson.avatar = ''; //_nftJson.preview?.source;
              }                                       
            } else {
              _nftJson.avatar = ''; //_nftJson.preview?.source;
            }
          };

          const options = { year: 'numeric', month: 'short', day: 'numeric' };
          _nftJson.init_date = new Date(Number(_nftJson.init_time) * 1000).toLocaleString(
            'en-US',
            options as Intl.DateTimeFormatOptions
          );
          //_nftJson.expire_date = new Date(Number(_nftJson.expire_time) * 1000).toLocaleString();
          _nftJson.expire_date = formatDateDifference(new Date(Number(_nftJson.expire_time) * 1000))
          
          setNames((n) => [...(n ? n : []), String(_nftJson.name)]);
          _nftJson.manageUrl = '/manage/' + _nftJson.address;

          _nftJson.network = 'venom';
          return _nftJson;
        } catch (e: any) {
          // console.log('error getting venomid nft ', indexAddress);
          return {};
        }
      })
    );

    setNftJsons(_nfts.filter((nft) => nft && nft.name && nft.name.length > 3));
    //setNftJsons()
  };

  // const loadByDb = async () => {
  //   if (!provider || !provider.isInitialized) return;
  //   setIsLoading(true);
  //   console.log('loading db');
  //   const result = (await getNftsByAddress(String(account?.address))).data;
  //   console.log(result);
  //   //console.log(rows[0]);
  //   if (result.nfts.length > 0) {
  //     result.nfts.map(async (nft: any) => {
  //       try {
  //         let _nftJson = await getNft(provider, nft.address);
  //         const ipfsData = _nftJson.attributes?.find(
  //           (att: any) => att.trait_type === 'DATA'
  //         )?.value;
  //         // if (ipfsData !== '') {
  //         //   _nftJson.avatar = SITE_URL + 'api/avatar?name=' + _nftJson.name?.slice(0,-4) ;
  //         // }

  //         if (ipfsData !== '') {
  //           const res = await axios.get(ipfsGateway + ipfsData);
  //           if (res) {
  //             _nftJson.avatar = res.data.avatar ?? ''; //_nftJson.preview?.source;
  //           } else {
  //             _nftJson.avatar = ''; //_nftJson.preview?.source;
  //           }
  //         } else {
  //           _nftJson.avatar = ''; //_nftJson.preview?.source;
  //         }
  //         _nftJson.manageUrl = '/oldManage/' + _nftJson.address;
  //         _nftJson.external_url = `${SITE_PROFILE_URL}o/${_nftJson.name}`;
  //         _nftJson.network = 'venom';
  //         setNftJsons((nfts) => [...(nfts ? nfts : []), _nftJson]);
  //       } catch (e: any) {
  //         // console.log('error getting venomid nft ', indexAddress);
  //       }
  //     });
  //   } else {
  //     console.log('nothing in db');
  //   }
  // };

  const loadVenomNFTs = async () => {
    try {
      // Take a salted code
      // console.log('loading all nfts', account?.address);
      if (!provider?.isInitialized) return;
      setNftJsons([]);
      setIsLoading(true);
      setListIsEmpty(false);
      await loadByContract(ROOT_CONTRACT_ADDRESS);
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
      console.log(ethAddress, nfts);

      nfts.map(async (nft: any) => {
        try {
          //let r = await web3Name.getDomainRecord({name: nft});
          let _avatar = await web3Name.getDomainRecord({ name: nft, key: 'avatar' });
          let _nftJson: BaseNftJson = {
            name: nft,
            avatar: _avatar ?? '',
            address: nft,
            init_time: 0,
            expire_time: 0,
          };
          //_nftJson.ipfsData = _venomid;
          _nftJson.address = nft; //_nftJson.preview?.source;
          _nftJson.network = nft.slice(nft.indexOf('.') + 1); //_nftJson.preview?.source;
          _nftJson.external_url = SITE_PROFILE_URL + 'sid/' + _nftJson.name;
          _nftJson.manageUrl = '/managesid/' + _nftJson.address;
          console.log(_nftJson);
          setNftJsons((nfts) => [...(nfts ? nfts : []), _nftJson]);
        } catch (e: any) {
          // console.log('error getting venomid nft ', indexAddress);
        }
      });

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

        if (!loaded || network !== _network || ethAddress !== _ethAddress || page || page === '') {
          console.log(network);
          if (network === 'venom') {
            loadVenomNFTs();
          } else {
            loadEthNFTs();
          }
          _setNetwork(network);
          _setEthAddress(ethAddress);
        }
      }

      if (!isConnected) setNftJsons([]);
    }
    getNfts();
  }, [isConnected, provider, network, ethAddress, page]);

  const reload = async ()=> {
    if(network === 'venom'){
      await loadVenomNFTs();
    } else {
      await loadEthNFTs();
    }
  }

  return (
    <Box>
      <Container
        as="main"
        maxW="container.lg"
        display="grid"
        flexDir={'column'}
        minH={'90vh'}
        flexGrow={1}>
        <Box py={6} gap={2} width={'100%'} pb={12}>
          {isConnected && (
            <Stack gap={10} width={'100%'} my={4}>
              <Flex
                minWidth={['350px', '420px', '580px', '800px']}
                align={'center'}
                height={'64px'}
                gap={3}>
                <Text
                  flexGrow={1}
                  fontWeight="bold"
                  fontSize={notMobile ? '4xl' : '2xl'}
                  my={notMobile ? 10 : 4}>
                  {network === 'venom'
                    ? pathname.includes('old')
                      ? t('yourOldVids')
                      : t('yourVids')
                    : t('yourSids')}
                </Text>
                {/* {!pathname.includes('old') ? <Tooltip
                        borderRadius={4}
                        label={
                          <Text p={2}>
                            All Venom ID(s) Minted before 2024 have to migrate to the new contract
                          </Text>
                        }
                        hasArrow
                        color="white"
                        bgColor={'black'}>
                        <Button
                as={Link}
                href='/oldManage'
                  aria-label="old-nfts"
                  key={`link-to-old-nfts`}
                  rounded={'full'}
                  size={'lg'}
                  variant={'outline'}
                  gap={2}>
                  show old
                </Button></Tooltip> : <Button
                as={Link}
                href='/manage'
                  aria-label="old-nfts"
                  key={`link-to-old-nfts`}
                  rounded={'full'}
                  size={'lg'}
                  variant={'outline'}
                  gap={2}>
                  show main
                </Button>} */}

                <Button
                  aria-label="reload-nfts"
                  key={`reload-${network}-nfts`}
                  rounded={'full'}
                  size={'lg'}
                  onClick={reload}
                  gap={2}>
                  {notMobile ? 'Reload' : ''} <RiRestartLine size={'24'} />
                </Button>
              </Flex>
              {isLoading && (
                <Center width={'100%'} height={500}>
                  <Spinner size="lg" />
                </Center>
              )}
            </Stack>
          )}

          <Stack
            gap={2}
            width={'100%'}
            background={colorMode === 'dark' ? 'blackAlpha.300' : 'white'}
            rounded={'2xl'}>
            {nftjsons?.map((nft, i) => (
              <Flex
                key={nft.name + '-manage-item'}
                flexDirection={'row'}
                gap={2}
                minWidth={['100%', '420px', '580px', '800px']}
                height={['72px', '68px', '80px']}
                alignItems={'center'}
                borderBottom={i === nftjsons.length - 1 ? 'none' : '1px solid #77777755'}
                p={2}
                rounded={'none'}>
                <Flex gap={3} w={'100%'} align={'center'}>
                  <Box width={['48px', '48px', '56px']} key={nft.name + '-box-name'}>
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
                  <Stack gap={0}>
                    <Text flexGrow={1} fontWeight={'bold'} fontSize={['xl', 'xl', '2xl']}>
                      {String(nft.name).toLowerCase()}
                    </Text>
                    <Text flexGrow={1} fontWeight={'normal'} fontSize={['md', 'lg']} opacity={0.5}>
                      expires in {String(nft.expire_date).toLowerCase()}
                    </Text>
                  </Stack>
                </Flex>

                <Flex gap={2} align={'center'}>
                  {nft.manageUrl?.includes('old') && nft.name && nft.address && !isLoading && (
                    <MigrateModal nft={nft} />
                  )}

                  {!nft.manageUrl?.includes('old') && (
                    <Menu>
                      <IconButton
                        size={'lg'}
                        rounded={'full'}
                        as={MenuButton}
                        aria-label="more-settings"
                        variant={'ghost'}
                        p={2}>
                        <RiMoreFill size={32} />
                      </IconButton>
                      <MenuList p={0} bgColor={colorMode === 'light' ? 'white' : 'var(--dark)'}>
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
                        {nft.network === 'venom' && !nft.manageUrl?.includes('old') && (
                          <MenuItem
                            height={'48px'}
                            bgColor={colorMode === 'light' ? 'whiteAlpha.400' : 'blackAlpha.400'}
                            sx={{
                              textDecoration: 'none',
                              _hover: {
                                textDecoration: 'none',
                                bgColor:
                                  colorMode === 'light' ? 'blackAlpha.200' : 'whiteAlpha.300',
                              },
                            }}
                            as={Link}
                            target="_blank"
                            href={String(nft.manageUrl)}
                            gap={2}
                            borderBottomRadius={0}>
                            <LinkIcon type="RiSettings4Line" size={24} /> Customize
                          </MenuItem>
                        )}
                        <MenuItem
                          size={'lg'}
                          as={Link}
                          height={'48px'}
                          bgColor={colorMode === 'light' ? 'whiteAlpha.400' : 'blackAlpha.400'}
                          sx={{
                            textDecoration: 'none',
                            _hover: {
                              textDecoration: 'none',
                              bgColor: colorMode === 'light' ? 'blackAlpha.200' : 'whiteAlpha.300',
                            },
                          }}
                          href={nft.external_url}
                          target="_blank"
                          icon={<MdOutlineVisibility size={24} />}>
                          View {nft.network === 'venom' ? 'Profile' : 'Space ID Link'}
                        </MenuItem>

                        {nft.network === 'venom' && !nft.manageUrl?.includes('old') && (
                          <MenuItem
                            size={'lg'}
                            as={Link}
                            height={'48px'}
                            bgColor={colorMode === 'light' ? 'whiteAlpha.400' : 'blackAlpha.400'}
                            sx={{
                              textDecoration: 'none',
                              _hover: {
                                textDecoration: 'none',
                                bgColor:
                                  colorMode === 'light' ? 'blackAlpha.200' : 'whiteAlpha.300',
                              },
                            }}
                            href={VENOMSCAN_NFT + nft.address}
                            target="_blank"
                            icon={<LinkIcon type="venomscan" size={24} />}>
                            View on VenomScan
                          </MenuItem>
                        )}

                        {nft.network === 'venom' && !nft.manageUrl?.includes('old') && (
                          <MenuItem
                            size={'lg'}
                            as={Link}
                            height={'48px'}
                            bgColor={colorMode === 'light' ? 'whiteAlpha.400' : 'blackAlpha.400'}
                            sx={{
                              textDecoration: 'none',
                              _hover: {
                                textDecoration: 'none',
                                bgColor:
                                  colorMode === 'light' ? 'blackAlpha.200' : 'whiteAlpha.300',
                              },
                            }}
                            href={VENOMART_NFT + nft.address}
                            target="_blank"
                            icon={
                              <LinkIcon
                                type="https://ipfs.io/ipfs/QmVBqPuqcH8VKwFVwoSGFHXUdG6ePqjmhEoNaQMsfd2xau/venomart.jpg"
                                size={'sm'}
                              />
                            }>
                            Sell on VenomArt
                          </MenuItem>
                        )}

                        {nft.network === 'venom' && !nft.manageUrl?.includes('old') && (
                          <MenuItem
                            size={'lg'}
                            as={Link}
                            height={'48px'}
                            bgColor={colorMode === 'light' ? 'whiteAlpha.400' : 'blackAlpha.400'}
                            sx={{
                              textDecoration: 'none',
                              _hover: {
                                textDecoration: 'none',
                                bgColor:
                                  colorMode === 'light' ? 'blackAlpha.200' : 'whiteAlpha.300',
                              },
                            }}
                            href={OASIS_NFT + nft.address}
                            target="_blank"
                            icon={
                              <LinkIcon
                                type="https://ipfs.io/ipfs/QmNXPY57PSu72UZwoDyXsmHJT7UQ4M9EfPcyZwpi3xqMQV/oasisgallery.svg.svg"
                                size={'sm'}
                              />
                            }>
                            Sell on Oasis Gallery
                          </MenuItem>
                        )}
                        <MenuItem
                          size={'lg'}
                          as={Link}
                          height={'48px'}
                          bgColor={colorMode === 'light' ? 'whiteAlpha.400' : 'blackAlpha.400'}
                          isDisabled
                          sx={{
                            textDecoration: 'none',
                            _hover: {
                              textDecoration: 'none',
                              bgColor: colorMode === 'light' ? 'blackAlpha.200' : 'whiteAlpha.300',
                            },
                          }}
                          icon={<LinkIcon type="RiExpandRightLine" size={24} />}>
                          Extend
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  )}
                </Flex>
              </Flex>
            ))}
            
          </Stack>
          {nftjsons && nftjsons?.length > 0 && (
          <Flex align={'center'} py={8} gap={4} justify={'end'}>
            
            <Text fontSize={['xl']} textAlign={'center'}>
                  Page {pageNum}
                </Text>
          <Button
                  rounded={'full'}
                  isDisabled={page === undefined || page === '' || isLoading}
                  colorScheme="venom"
                  size={'lg'}
                  onClick={() => {setPageNum(1);setPage('');}}>
                  <LinkIcon type='RiArrowLeftDoubleFill' />
                </Button>
                <Button
                  colorScheme="venom"
                  rounded={'full'}
                  isDisabled={nextPage === undefined || nextPage === '' || isLoading}
                  size={'lg'}
                  onClick={() => {setPageNum((y) => y + 1);setPage(nextPage);}}>
                  <LinkIcon type='RiArrowRightSLine' />
                  
                </Button>

                
          </Flex>)}
          {listIsEmpty && !isLoading && (
            <Center display="flex" flexDirection="column" gap={4} minH={'75%'}>
              <Text fontSize="xl">
                You don't own any {pathname.includes('old') ? ' old ' : ''} Venom IDs
              </Text>
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
