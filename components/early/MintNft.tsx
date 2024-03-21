import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Button,
    Flex,
    Stack,
    Textarea,
    Link,
    Text,
    useColorMode,
    useMediaQuery,
    useDisclosure,
    useColorModeValue,
    HStack,
    Box,
    useToast,
    Badge,
    SimpleGrid,
    Spinner,
    Center,
  } from '@chakra-ui/react';
  import axios from 'axios';
  import ImageBox from 'components/claiming/ImageBox';
  import { LinkIcon } from 'components/logos';
  import {
    bioAtom,
    connectedAccountAtom,
    earlyAdopterContractAtom,
    twitterAuthAtom,
    twitterFollowedAtom,
    twitterRetweetedAtom,
    twitterVerifiedAtom,
  } from 'core/atoms';
  import { useTranslate } from 'core/lib/hooks/use-translate';
  import {
    CONTRACT_ADDRESS,
    CONTRACT_ADDRESS_V1,
    EARLY_ADOPTERS_CONTRACT_ADDRESS,
    EARLY_ADOPTER_IMAGES,
    ETHERSCAN_URLS,
    MARKETPLACE_URLS,
    MARKETPLACE_URLS_COLLECTION,
    ROOT_CONTRACT_ADDRESS,
    SITE_URL,
    TWITTER_FOLLOW_URL,
    TWITTER_RETWEET_URL,
    VENTORY_NFT_V1_ADDRESS,
    VENTORY_NFT_V2_ADDRESS,
    ZEALY_URL,
  } from 'core/utils/constants';
  import getNftsByAddress from 'core/utils/getNftsByAddress';
  import { getAddressesFromIndex, getNftByIndex, saltCode } from 'core/utils/nft';
  import { getTwitterAuthUrl, refreshAccessToken } from 'core/utils/twitterUtils';
  import { getZealyByTwitterId } from 'core/utils/zealyUtils';
  import { useAtom, useAtomValue } from 'jotai';
  import { useEffect, useState } from 'react';
  import { useConnect, useSendExternalMessage, useVenomProvider } from 'venom-react-hooks';
  import { Address, Transaction } from 'everscale-inpage-provider';
  import { sleep } from 'core/utils';
  import { BaseNftJson } from 'core/utils/reverse';
  import InfoModal from './InfoModal';
  
  export default function MintNft() {
    const { colorMode } = useColorMode();
    const [notMobile] = useMediaQuery('(min-width: 768px)');
    const [small] = useMediaQuery('(min-width: 375px)');
    const [minteds, setMinteds] = useState<BaseNftJson[] | undefined>(undefined);
    const [unMinteds, setUnMinteds] = useState<BaseNftJson[] | undefined>(undefined);
    const [mintedStrings, setMintedStrings] = useState<string[] | undefined>(undefined);
    const { onToggle, isOpen } = useDisclosure();
    const [twitterAuthUrl, setTwitterAuthUrl] = useState('');
    const connectedAccount = useAtomValue(connectedAccountAtom);
    const [twitterAuth, setTwitterAuth] = useAtom(twitterAuthAtom);
    const [twitterFollowed, setTwitterFollowed] = useAtom(twitterFollowedAtom);
    const [twitterRetweeted, setTwitterRetweeted] = useAtom(twitterRetweetedAtom);
    const [twitterUser, setTwitterUser] = useState({ id: '', name: '', username: '' });
    const [twitterVerified, setTwitterVerified] = useState(false);
    const [twitterLoading, setTwitterLoading] = useState(false);
    const [zealyLoading, setZealyLoading] = useState(false);
    const [zealyVerified, setZealyVerified] = useState(false);
    const [zealyUser, setZealyUser] = useState<any>({ id: '', xp: 0, rank: 0 });
    const [ownVidChecked, setOwnVidChecked] = useState(false);
    const [ownVid, setOwnVid] = useState(false);
    const [reload, setReload] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isMinting, setIsMinting] = useState(false);
    const [isConfirming, setIsConfirming] = useState(false);
    const [ownVid1, setOwnVid1] = useState(false);
    const [ownVid2, setOwnVid2] = useState(false);
    const [ownVids, setOwnVids] = useState(0);
    const [ownVidLoading, setOwnVidLoading] = useState(false);
    const [ownVidVen, setOwnVidVen] = useState(false);
    const [ownVidVenChecked, setOwnVidVenChecked] = useState(false);
    const [ownVidVenLoading, setOwnVidVenLoading] = useState(false);
    const earlyAdopterContract = useAtomValue(earlyAdopterContractAtom);
    const toast = useToast();
    const { t } = useTranslate();
    const { provider } = useVenomProvider();
  
    const getJson = (name: string, image: string, imageType: string = 'image/svg') => {
      const _json = {
        type: 'OAT',
        name: name,
        description:
          name +
          ' OAT (On-Chain Achievement Token) is a badge to record your on-chain and off-chain activities from the Venom ID Early Adopter Program Collection',
        preview: {
          source: image,
          mimetype: imageType,
        },
        files: [
          {
            source: image,
            mimetype: imageType,
          },
        ],
        external_url: SITE_URL,
      };
  
      console.log(_json);
      return _json;
    };
  
    const mintBadge = async (name: string, image: string, imageType: string = 'image/svg') => {
      if (!connectedAccount || connectedAccount === '' || !provider || !provider.isInitialized) {
        toast({
          status: 'info',
          title: t('connectWallet'),
          description: t('venomWalletConnect'),
          duration: 3000,
          isClosable: true,
        });
        return;
      }
  
      setIsMinting(true);
      toast.closeAll();
      toast({
        status: 'loading',
        title: t('minting'),
        description: t('confirmInWallet'),
        duration: null,
      });
  
      // @ts-ignore: Unreachable code error
      try {
        const mintTx = await earlyAdopterContract?.methods
          .mintBadge({
            _json: JSON.stringify(getJson(name, image, imageType)),
            _owner: new Address(connectedAccount),
          })
          .send({
            amount: String(1660000000),
            bounce: true,
            from: connectedAccount,
          })
          .catch((e: any) => {
            if (e.code === 3) {
              // rejected by a user
              setIsMinting(false);
              toast.closeAll();
              return Promise.resolve(null);
            } else {
              setIsMinting(false);
              // console.log(e);
              toast.closeAll();
              return Promise.reject(e);
            }
          });
  
        if (mintTx) {
          toast.closeAll();
          toast({
            status: 'loading',
            title: t('confirming'),
            description: t('confirmingTx'),
            duration: null,
          });
  
          //// console.log('mint tx : ', mintTx);
          setIsConfirming(true);
          let receiptTx: Transaction | undefined;
          const subscriber = provider && new provider.Subscriber();
          if (subscriber)
            await subscriber
              .trace(mintTx)
              .tap((tx_in_tree: any) => {
                //// console.log('tx_in_tree : ', tx_in_tree);
                if (tx_in_tree.account.equals(EARLY_ADOPTERS_CONTRACT_ADDRESS)) {
                  receiptTx = tx_in_tree;
                }
              })
              .finished();
  
          // Decode events by using abi
          // we are looking for event Game(address player, uint8 bet, uint8 result, uint128 prize);
  
          let events = await earlyAdopterContract.decodeTransactionEvents({
            transaction: receiptTx as Transaction,
          });
  
          if (events.length !== 1 || events[0].event !== 'NftCreated') {
            toast.closeAll();
            toast({
              status: 'error',
              title: t('error'),
              description: t('commonErrorMsg'),
              isClosable: true,
            });
          } else {
            // @ts-ignore: Unreachable code error
            const nftAddress = String(events[0].data?.nft && events[0].data?.nft?._address);
            const __json = getJson(name, image, imageType) as BaseNftJson;
            __json.address = nftAddress;
            setMintedStrings((s) => [...(s ? s : []), name]);
            setMinteds((nfts) => [...(nfts ? nfts : []), __json]);
            toast.closeAll();
          }
          setIsMinting(false);
          setIsConfirming(false);
        } else {
          toast.closeAll();
          toast({
            status: 'error',
            title: t('error'),
            description: t('commonErrorMsg'),
            isClosable: true,
          });
          setIsMinting(false);
          setIsConfirming(false);
        }
      } catch (e: any) {
        toast.closeAll();
        toast({
          status: 'error',
          title: t('failed'),
          description: t('commonFailedMsg'),
          isClosable: true,
        });
        console.log(e);
      }
    };
  
    
    const openWindow = (url: string, e: any) => {
      window.open(url, 'newwindow', 'width=420,height=800');
      e !== null && e.preventDefault();
    };
  
    const loadMinteds = async () => {
      setIsLoading(true);
      if (!provider || !provider.isInitialized) return;
      setMinteds([]);
      setMintedStrings([]);
      const saltedCode = await saltCode(
        provider,
        String(connectedAccount),
        EARLY_ADOPTERS_CONTRACT_ADDRESS
      );
      // Hash it
      const codeHash = await provider.getBocHash(String(saltedCode));
      if (!codeHash) {
        console.log('codehash error');
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
          const _nftJson = await getNftByIndex(provider, indexAddress);
          setMintedStrings((ss) => [...(ss ? ss : []), String(_nftJson.name)]);
          setMinteds((nfts) => [...(nfts ? nfts : []), _nftJson]);
        } catch (e: any) {
          console.log('error getting venomid nft ', indexAddress);
        }
      });
      await sleep(1000);
      setIsLoading(false);
    };
  
    
  
    const loadByDb = async () => {
      const result = (await getNftsByAddress(String(connectedAccount))).data;
      //console.log(result);
      //console.log(rows[0]);
      if (result.nfts) {
        return result.nfts.length;
      } else {
        return 0;
      }
    };
  
    
  
    useEffect(() => {
      
  
      const checkMinteds = async () => {
        await loadMinteds();
      };
  
      if (!provider || !provider.isInitialized) return;
      if (!connectedAccount || connectedAccount === '') return;

      checkMinteds();
    }, [provider, connectedAccount]);
  
    return (
      <Accordion
        allowToggle
        allowMultiple={false}
        defaultIndex={[0]}
        className="bio"
        borderRadius={10}
        minWidth={'100%'}
        size="lg"
        backgroundColor={colorMode === 'dark' ? 'whiteAlpha.100' : 'blackAlpha.100'}
        display={'flex'}>
        <AccordionItem border={0} borderRadius={10} width={'100%'}>
          <AccordionButton
            width={'100%'}
            as={Button}
            color={'white'}
            justifyContent={'center'}
            bgGradient={useColorModeValue(
              'linear(to-r, var(--venom1), var(--bluevenom1))',
              'linear(to-r, var(--venom2), var(--bluevenom2))'
            )}
            _expanded={{
              bgGradient: useColorModeValue(
                'linear(to-r, var(--venom1), var(--bluevenom1))',
                'linear(to-r, var(--venom2), var(--bluevenom2))'
              ),
              borderBottomRadius: 0,
            }}
            _hover={{
              bgGradient: useColorModeValue(
                'linear(to-r, var(--venom0), var(--bluevenom0))',
                'linear(to-r, var(--venom0), var(--bluevenom0))'
              ),
            }}
            h={'120px'}>
            <Flex gap={[3, 4]} alignItems={'center'} justify={'center'}>
              <LinkIcon type="RiPlantLine" size={small ? '46' : '36'} />
              <Stack gap={1}>
              <Text fontWeight={'bold'} display={'flex'} flex={1} fontSize={['xl', '2xl']}>
              Spring Burst NFT
              </Text>
              <Text fontWeight={'light'} textAlign={'left'}>Live till March 21, 23:59 UTC</Text>

              </Stack>
              
            </Flex>
          </AccordionButton>
          <AccordionPanel py={4} minWidth="100%">
            {connectedAccount.length > 60 ? <Stack gap={4} fontSize={['md', 'lg']}>
            {!notMobile && <Flex
              align={'center'}
              bg={colorMode === 'light' ? 'blackAlpha.100' : 'whiteAlpha.100'}
              p={4}
              direction={'column'}
              gap={2}
              rounded={'lg'}
              fontSize={['lg','xl']}>
              <Text>➡️ For an smooth experience during mint we recommend using a desktop 💻</Text><Text>If not possible, <Link href="https://oneart.digital/en" fontWeight={'bold'} target='_blank' color={colorMode === 'dark' ? 'venom.300' : 'venom.700'} >OneArt Wallet</Link> is the preferred option as it performs best in the process.</Text>

            </Flex>}
              {!isLoading ? (
                <Flex
                  align={'center'}
                  //bg={useColorModeValue('blackAlpha.100', 'blackAlpha.100')}
                  p={4}
                  rounded={'lg'}
                  justify={'center'}>
                      <Flex justify={'center'} gap={8} align={'center'} w={'100%'} flexDirection={['column','column','row']}>
                        <ImageBox srcUrl={EARLY_ADOPTER_IMAGES['spring'].src} size={[240]} rounded='lg' />
                        <Stack gap={4}>
                        <Text>Venom ID Spring Burst NFT</Text>
                        {mintedStrings?.includes('Venom ID Spring Burst NFT') && <Badge colorScheme='green' zIndex={1000} rounded={'lg'} display={'flex'} gap={2} p={2} justifyContent={'center'} alignItems={'center'}><LinkIcon type="RiVerifiedBadgeFill" size={'24'} />Minted</Badge>}
                        <Button
                          w={'100%'}
                          isDisabled={isMinting || isConfirming}
                          isLoading={isMinting || isConfirming}
                          loadingText={
                            isMinting
                              ? 'Minting ...'
                              : isConfirming
                              ? 'Confirming ...'
                              : 'Loading ...'
                          }
                          onClick={() =>
                            mintedStrings?.includes('Venom ID Spring Burst NFT')
                              ? openWindow(
                                  ETHERSCAN_URLS['venom'] +
                                    minteds?.filter((m) => m.name === 'Venom ID Spring Burst NFT')[0].address,
                                  null
                                )
                              : mintBadge(
                                  'Venom ID Spring Burst NFT',
                                  EARLY_ADOPTER_IMAGES['spring'].src,
                                  EARLY_ADOPTER_IMAGES['spring'].type
                                )
                          }
                          rounded={'full'}
                          bgGradient={
                            colorMode === 'light'
                              ? 'linear(to-r, var(--venom1), var(--bluevenom1))'
                              : 'linear(to-r, var(--venom2), var(--bluevenom2))'
                          }>
                          {mintedStrings?.includes('Venom ID Spring Burst NFT')
                            ? 'Minted. View on explorer'
                            : 'Mint'}
                        </Button>
                        </Stack>
                      </Flex>
                </Flex>
              ) : (<Center minH={'100px'}><Spinner size={'lg'} /></Center>)}
            </Stack> : <Center gap={4} p={4}><Text>Connect Your Wallet</Text></Center>}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    );
  }
  