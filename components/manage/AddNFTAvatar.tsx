import {
  useDisclosure,
  Button,
  Flex,
  useMediaQuery,
  useColorMode,
  Text,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Drawer,
  SimpleGrid,
  Center,
  Box,
  Spinner,
  Stack,
  HStack,
  Tooltip,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import {
  addLinkContentAtom,
  addLinkImageAtom,
  addLinkStylesAtom,
  addLinkTitleAtom,
  addLinkTypeAtom,
  addLinkUrlAtom,
  avatarAtom,
  avatarNftAtom,
  avatarShapeAtom,
  editingAvatarAtom,
  ethAtom,
  nftsNetworkAtom,
  nftSmallerViewAtom,
  nftTypeAtom,
  openAddLinkAtom,
  openAddNftAtom,
  socialsArrayAtom,
  editingAvatarFileAtom,
} from 'core/atoms';
import { capFirstLetter, getAvatarUrl, sleep, truncAddress } from 'core/utils';
import { LinkIcon } from 'components/logos';
import { useConnect, useVenomProvider } from 'venom-react-hooks';
import {
  BaseNftJson,
  getAddressesFromIndex,
  getNftByIndex,
  getNftsByIndexes,
  saltCode,
} from 'core/utils/nft';
import {
  AVATAR_API_URL,
  OPENSEA_URL,
  VENOMART_NFT,
  VENTORY_NFT,
  ZERO_ADDRESS,
} from 'core/utils/constants';
import { Avatar } from 'components/Profile';
import {
  RiCloseLine,
  RiGridFill,
  RiGridLine,
  RiLayoutGridLine,
  RiRestartLine,
} from 'react-icons/ri';
import axios from 'axios';
import NetworkModal from './NetworkModal';
import { ThirdwebNftMedia } from '@thirdweb-dev/react';
import ReactPlayer from 'react-player';

interface Props {
  defaultType: string;
  key?: string;
}

export default function AddNFTAvatar({ defaultType, key }: Props) {
  const { colorMode } = useColorMode();
  const [notMobile] = useMediaQuery('(min-width: 800px)');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [_open, _setOpen] = useAtom(openAddNftAtom);
  const [type, setType] = useAtom(nftTypeAtom);
  const _setAddLinkOpen = useSetAtom(openAddLinkAtom);
  const _setTitle = useSetAtom(addLinkTitleAtom);
  const _setType = useSetAtom(addLinkTypeAtom);
  const _setImage = useSetAtom(addLinkImageAtom);
  const _setUrl = useSetAtom(addLinkUrlAtom);
  const _setContent = useSetAtom(addLinkContentAtom);
  const _setStyles = useSetAtom(addLinkStylesAtom);
  const { provider } = useVenomProvider();
  const { isConnected, account } = useConnect();
  const [listIsEmpty, setListIsEmpty] = useState(false);
  const [listView, setListView] = useAtom(nftSmallerViewAtom);
  const [isLoading, setIsLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [network, setNetwork] = useAtom(nftsNetworkAtom);
  const [currentNetwork, setCurrentNetwork] = useState(network);
  const [nftjsons, setNftJsons] = useState<BaseNftJson[] | undefined>(undefined);
  const [editingAvatar, setEditingAvatar] = useAtom(editingAvatarAtom);
  const setEditingAvatarFile = useSetAtom(editingAvatarFileAtom);
  const [avatarNft, setAvatarNft] = useAtom(avatarNftAtom);
  const avatarShape = useAtomValue(avatarShapeAtom);

  const eth = useAtomValue(ethAtom);

  useEffect(() => {
    if (_open) {
      onOpen();
    }
  }, [_open]);

  useEffect(() => {
    _setOpen(isOpen);
  }, [isOpen]);

  async function setAsAvatar(index: number) {
    if (!nftjsons) return;
    let nft = nftjsons[index];
    if (!nft) return;
    let avatarURL;
    if (String(nft.name).slice(-4).toLowerCase() === '.vid') {
      const ipfsData = nft.attributes?.find((att) => att.trait_type === 'DATA')?.value;
      if (ipfsData === '') {
        avatarURL = String(nft.preview?.source);
      } else {
        const res = await axios.get('https://ipfs.io/ipfs/' + ipfsData);
        if (res) {
          avatarURL = res.data.avatar
            ? res.data.avatar
            : nft.files
            ? nft?.files[0]?.source
            : nft.preview?.source;
        }
      }
    } else {
      avatarURL = nft.files
        ? !nft?.files[0]?.mimetype.includes('metadata') || !nft?.files[0]?.mimetype.includes('json')
          ? nft.files[0].source
          : nft.preview?.source
        : nft.preview?.source;
    }

    setEditingAvatar(String(avatarURL));
    setEditingAvatarFile(undefined);
    setAvatarNft(String(nft.address));
    onClose();
  }

  async function addAsLink(index: number) {
    if (!nftjsons) return;
    let nft = nftjsons[index];
    if (!nft) return;
    let avatarURL;
    if (String(nft.name).slice(-4).toLowerCase() === '.vid') {
      const ipfsData = nft.attributes?.find((att) => att.trait_type === 'DATA')?.value;
      if (ipfsData === '') {
        avatarURL = String(nft.preview?.source);
      } else {
        const res = await axios.get('https://ipfs.io/ipfs/' + ipfsData);
        if (res) {
          avatarURL = res.data.avatar
            ? res.data.avatar
            : nft.files
            ? nft.files[0].source
            : nft.preview?.source;
        }
      }
    } else {
      avatarURL = nft.files
        ? !nft?.files[0]?.mimetype.includes('metadata') || !nft?.files[0]?.mimetype.includes('json')
          ? nft.files[0].source
          : nft.preview?.source
        : nft.preview?.source;
    }

    let _styleType;

    _setType('nft link');
    _setTitle(String(nft.name));
    _setImage(String(avatarURL));
    if (nft.network?.includes('venom')) {
      _setUrl(VENTORY_NFT + String(nft.address));
      _setContent(String(nft.address));
      _styleType = 'normal';
    } else {
      _setUrl(
        OPENSEA_URL + String(nft.network) + '/' + String(nft.address) + '/' + String(nft.tokenId)
      );
      _setContent(
        JSON.stringify({
          address: String(nft.address) + '/' + String(nft.tokenId),
          metadata: nft.metadata,
        })
      );
      if (
        (nft.metadata && nft.metadata?.animation_url) ||
        String(nft.preview?.mimetype).includes('mp4') ||
        String(nft.preview?.mimetype).includes('mp3')
      ) {
        _styleType = 'complex';
      } else {
        _styleType = 'normal';
      }
    }

    _setStyles({
      size: 'md',
      network: nft.network,
      scanLink: false,
      type: _styleType,
    });
    _setAddLinkOpen(true);
    onClose();
  }

  const loadNFTs = async () => {
    try {
      // Take a salted code
      //// console.log('loading all nfts', account?.address);
      if (network.includes('venom')) {
        if (!provider?.isInitialized) return;
        setNftJsons([]);
        setIsLoading(true);
        setListIsEmpty(false);
        const saltedCode = await saltCode(provider, String(account?.address), ZERO_ADDRESS);
        // Hash it
        const codeHash = await provider.getBocHash(String(saltedCode));
        if (!codeHash) {
          setIsLoading(false);
          return;
        }
        // Fetch all Indexes by hash
        const indexesAddresses = await getAddressesFromIndex(codeHash, provider);
        if (!indexesAddresses || !indexesAddresses.length) {
          if (indexesAddresses && !indexesAddresses.length) setListIsEmpty(true);
          setIsLoading(false);
          return;
        }
        // Fetch all nfts
        indexesAddresses.map(async (indexAddress) => {
          try {
            const _nftJson = await getNftByIndex(provider, indexAddress);
            setNftJsons((nfts) => [...(nfts ? nfts : []), _nftJson]);
          } catch (e: any) {
            //// console.log('error getting nft ', indexAddress);
          }
        });
      } else {
        setNftJsons([]);
        setIsLoading(true);
        setListIsEmpty(false);
        const options = { method: 'GET', headers: { accept: 'application/json' } };
        await fetch(
          'https://eth-mainnet.g.alchemy.com/nft/v3/k1sdbc-1ghcYlc8lhbbDu1e3j7kPMC74/getNFTsForOwner?owner=' +
            eth +
            '&withMetadata=true&pageSize=100',
          options
        )
          .then((response) => response.json())
          .then((response) => {
            //// console.log(response);
            response?.ownedNfts.map((nft: any) => {
              let thumbnailUrl = nft.image.thumbnailUrl
                ? nft.image.thumbnailUrl
                : nft.image.cachedUrl;
              const _nftJson = {
                name: nft.name,
                tokenId: nft.tokenId,
                collectionName: nft.contract.name,
                address: nft.contract.address,
                network: 'ethereum',
                metadata: nft.raw.metadata,
                preview: {
                  source: thumbnailUrl,
                  mimetype: nft.image.contentType,
                },
                files: [
                  {
                    source: nft.image.cachedUrl,
                    mimetype: nft.image.contentType,
                  },
                ],
              };
              nft.name !== null && setNftJsons((nfts) => [...(nfts ? nfts : []), _nftJson]);
            });
          })
          .catch((err) => console.error(err));

        await fetch(
          'https://arb-mainnet.g.alchemy.com/nft/v3/k1sdbc-1ghcYlc8lhbbDu1e3j7kPMC74/getNFTsForOwner?owner=' +
            eth +
            '&withMetadata=true&pageSize=100',
          options
        )
          .then((response) => response.json())
          .then((response) => {
            //// console.log(response);
            response?.ownedNfts.map((nft: any) => {
              let thumbnailUrl = nft.image.thumbnailUrl
                ? nft.image.thumbnailUrl
                : nft.image.cachedUrl;
              const _nftJson = {
                name: nft.name,
                tokenId: nft.tokenId,
                collectionName: nft.contract.name,
                address: nft.contract.address,
                network: 'arbitrum',
                metadata: nft.raw.metadata,
                preview: {
                  source: thumbnailUrl,
                  mimetype: nft.image.contentType,
                },
                files: [
                  {
                    source: nft.image.cachedUrl,
                    mimetype: nft.image.contentType,
                  },
                ],
              };
              nft.name !== null && setNftJsons((nfts) => [...(nfts ? nfts : []), _nftJson]);
            });
          })
          .catch((err) => console.error(err));

        await fetch(
          'https://polygon-mainnet.g.alchemy.com/nft/v3/k1sdbc-1ghcYlc8lhbbDu1e3j7kPMC74/getNFTsForOwner?owner=' +
            eth +
            '&withMetadata=true&pageSize=100',
          options
        )
          .then((response) => response.json())
          .then((response) => {
            response?.ownedNfts.map((nft: any) => {
              let thumbnailUrl = nft.image.thumbnailUrl
                ? nft.image.thumbnailUrl
                : nft.image.cachedUrl;
              const _nftJson = {
                name: nft.name,
                tokenId: nft.tokenId,
                collectionName: nft.contract.name,
                address: nft.contract.address,
                network: 'polygon',
                metadata: nft.raw.metadata,
                preview: {
                  source: thumbnailUrl,
                  mimetype: nft.image.contentType,
                },
                files: [
                  {
                    source: nft.image.cachedUrl,
                    mimetype: nft.image.contentType,
                  },
                ],
              };
              nft.name !== null && setNftJsons((nfts) => [...(nfts ? nfts : []), _nftJson]);
            });
          })
          .catch((err) => console.error(err));

        await fetch(
          'https://opt-mainnet.g.alchemy.com/nft/v3/k1sdbc-1ghcYlc8lhbbDu1e3j7kPMC74/getNFTsForOwner?owner=' +
            eth +
            '&withMetadata=true&pageSize=100',
          options
        )
          .then((response) => response.json())
          .then((response) => {
            response?.ownedNfts.map((nft: any) => {
              let thumbnailUrl = nft.image.thumbnailUrl
                ? nft.image.thumbnailUrl
                : nft.image.cachedUrl;
              const _nftJson = {
                name: nft.name,
                tokenId: nft.tokenId,
                collectionName: nft.contract.name,
                address: nft.contract.address,
                network: 'optimism',
                metadata: nft.raw.metadata,
                preview: {
                  source: thumbnailUrl,
                  mimetype: nft.image.contentType,
                },
                files: [
                  {
                    source: nft.image.cachedUrl,
                    mimetype: nft.image.contentType,
                  },
                ],
              };
              nft.name !== null && setNftJsons((nfts) => [...(nfts ? nfts : []), _nftJson]);
            });
          })
          .catch((err) => console.error(err));
        nftjsons?.length === 0 && setListIsEmpty(true);
      }

      setLoaded(true);
      setIsLoading(false);
    } catch (e) {
      console.error(e);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    async function getNfts() {
      if (account && isConnected && provider) {
        if (!provider?.isInitialized) {
          //// console.log('provider not ready');
          await sleep(1000);
          getNfts();
          return;
        }
      }
      if (isOpen && !loaded) {
        loadNFTs();
      }

      if (isOpen && network !== currentNetwork) {
        setCurrentNetwork(network);
        loadNFTs();
      }

      if (!account) setListIsEmpty(false);
    }
    if (isOpen) {
      getNfts();
    }
  }, [isOpen, network]);

  return (
    <>
      <Button
        key={key}
        colorScheme="green"
        variant={'outline'}
        onClick={() => {
          _setAddLinkOpen(false);
          setType(defaultType);
          _setOpen(true);
          onOpen();
        }}>
        {defaultType === 'avatar' ? 'Pick NFT Avatar' : 'Pick NFT'}
      </Button>
      <Drawer key={key} onClose={onClose} isOpen={_open} size={'full'} placement="bottom">
        <DrawerOverlay />
        <DrawerContent bg={colorMode === 'dark' ? 'var(--dark1)' : 'var(--white)'} py={4}>
          <DrawerHeader gap={3} display={'flex'} flexDirection={notMobile ? 'row' : 'column'}>
            <HStack gap={2} flexGrow={1}>
              <Text flexGrow={1}>Pick {type === 'avatar' ? 'Avatar' : 'NFT'}</Text>
              <Button aria-label="change-view" onClick={() => setListView(!listView)} gap={2}>
                {notMobile ? (listView ? 'Bigger' : 'Smaller') : ''}{' '}
                {listView ? <RiLayoutGridLine size={'24'} /> : <RiGridLine size={'24'} />}
              </Button>
              <Button aria-label="reload-nfts" onClick={loadNFTs} gap={2}>
                {notMobile ? 'Reload' : ''} <RiRestartLine size={'24'} />
              </Button>
              {notMobile && <NetworkModal />}
              <Button aria-label="close-nfts-modal" onClick={onClose} gap={2}>
                <RiCloseLine size={'24'} />
              </Button>
            </HStack>
            {!notMobile && <NetworkModal />}
          </DrawerHeader>
          <DrawerBody>
            <SimpleGrid
              columns={[
                listView ? 2 : 1,
                nftjsons && nftjsons?.length > 1 ? (listView ? 3 : 2) : 1,
                nftjsons && nftjsons?.length > 1 ? (listView ? 4 : 3) : 1,
                nftjsons && nftjsons?.length > 1 ? (listView ? 5 : 3) : 1,
                nftjsons && nftjsons?.length > 1 ? (listView ? 6 : 3) : 1,
              ]}
              gap={4}
              width={'100%'}>
              {nftjsons?.map((nft, index) => (
                <Button
                  key={'nft-' + index}
                  variant={'outline'}
                  width={'100%'}
                  borderColor={'gray'}
                  height={300}
                  p={0}
                  onClick={() => (type === 'avatar' ? setAsAvatar(index) : addAsLink(index))}>
                  <Center
                    width={'100%'}
                    key={'nft-div-' + index}
                    flexDirection={'column'}
                    gap={2}
                    background={colorMode === 'dark' ? 'blackAlpha.300' : 'blackAlpha.100'}
                    height={300}
                    borderRadius={12}>
                    <Box position={'absolute'} left={4} top={4}>
                      <LinkIcon type={String(nft.network)} line />
                    </Box>
                    <Box position={'absolute'} right={4} top={4}>
                      <LinkIcon type={String(nft.preview?.mimetype)} line />
                    </Box>
                    <Flex
                      key={nft.name + ' name' + index}
                      gap={2}
                      flexDirection={'column'}
                      alignItems={'center'}
                      justifyContent={'center'}>
                      <Box width={listView ? 100 : 150} maxH={250}>
                        {String(nft.preview?.mimetype).includes('mp4') &&
                        !nft.network?.includes('venom') ? (
                          <Center width={listView ? 100 : 150} height={180}>
                            <ThirdwebNftMedia
                              metadata={nft.metadata}
                              width={listView ? '100px' : '150px'}
                              controls={false}
                              height="150px"
                              style={{ borderRadius: 12 }}
                            />
                          </Center>
                        ) : String(nft.preview?.mimetype).includes('mp4') ? (
                          <ReactPlayer url={nft?.preview?.source} width={'100%'} loop muted playing height={230}/>
                        ) : (
                          <Avatar
                            noanimate
                            maxH={230}
                            nodrag
                            shape={type === 'avatar' ? avatarShape : 'round'}
                            shadow="none"
                            url={
                              String(nft.name).slice(-4).toLowerCase() === '.vid'
                                ? ''
                                : String(nft.preview?.source)
                            }
                            nft={
                              String(nft.name).slice(-4).toLowerCase() === '.vid' ? nft : undefined
                            }
                          />
                        )}
                      </Box>
                      <Text
                        fontWeight={'bold'}
                        fontSize={
                          listView
                            ? String(nft.name).length > 15
                              ? String(nft.name).length > 18
                                ? 'xs'
                                : 'sm'
                              : 'md'
                            : 'lg'
                        }>
                        {listView
                          ? String(nft.name).length > 18
                            ? String(nft.name).slice(0, 18) + '...'
                            : String(nft.name)
                          : String(nft.name).length > 23
                          ? String(nft.name).slice(0, 23) + '...'
                          : String(nft.name)}
                      </Text>
                    </Flex>
                  </Center>
                </Button>
              ))}
            </SimpleGrid>
            {isLoading && (
              <Center width={'100%'} height={200}>
                <Spinner size="lg" />
              </Center>
            )}

            {listIsEmpty && !isLoading && (
              <Center display="flex" flexDirection="column" gap={4} minH={200}>
                <Text fontSize="xl">
                  Looks like You don't own any NFTs on {capFirstLetter(network)}
                </Text>
              </Center>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
