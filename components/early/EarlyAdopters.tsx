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
  Link,
  Center,
  Spinner,
  Avatar,
  Card,
  CardBody,
  CardFooter,
  Heading,
  IconButton,
  Tooltip,
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
  VARIATIONS_VIDS,
  VENTORY_NFT_V1_ADDRESS,
  VENTORY_NFT_V2_ADDRESS,
  ZEALY_URL,
} from 'core/utils/constants';
import getNftsByAddress from 'core/utils/getNftsByAddress';
import {
  getAccountsFromIndex,
  getAddressesFromIndex,
  getNftByIndex,
  saltCode,
} from 'core/utils/nft';
import { getTwitterAuthUrl, refreshAccessToken } from 'core/utils/twitterUtils';
import { getZealyByTwitterId } from 'core/utils/zealyUtils';
import { useAtom, useAtomValue } from 'jotai';
import { useEffect, useMemo, useState } from 'react';
import { useConnect, useSendExternalMessage, useVenomProvider } from 'venom-react-hooks';
import { Address, Transaction } from 'everscale-inpage-provider';
import { sleep } from 'core/utils';
import { BaseNftJson } from 'core/utils/reverse';
import InfoModal from './InfoModal';
import ImageSlide from 'components/Profile/ImageSlide';

export default function EarlyAdopters() {
  const { colorMode } = useColorMode();
  const [notMobile] = useMediaQuery('(min-width: 768px)');
  const [small] = useMediaQuery('(min-width: 375px)');
  const [minteds, setMinteds] = useState<BaseNftJson[] | undefined>(undefined);
  const [unMinteds, setUnMinteds] = useState<BaseNftJson[] | undefined>(undefined);
  const [mintedStrings, setMintedStrings] = useState<string[] | undefined>(undefined);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [twitterAuthUrl, setTwitterAuthUrl] = useState('');
  const connectedAccount = useAtomValue(connectedAccountAtom);
  const [twitterAuth, setTwitterAuth] = useAtom(twitterAuthAtom);
  const [twitterFollowed, setTwitterFollowed] = useAtom(twitterFollowedAtom);
  const [totalSupply, setTotalSupply] = useState<number>(0);
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

  const images = useMemo(() => [VARIATIONS_VIDS[2].avatar, VARIATIONS_VIDS[7].avatar, VARIATIONS_VIDS[8].avatar, VARIATIONS_VIDS[9].avatar], [])

  const captions = useMemo(() => [VARIATIONS_VIDS[2].vid, VARIATIONS_VIDS[7].vid, VARIATIONS_VIDS[8].vid, VARIATIONS_VIDS[9].vid], [])

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

  useEffect(() => {
    async function getTwitterUrl() {
      if (connectedAccount === '') return;
      const _urlData = await getTwitterAuthUrl(btoa(connectedAccount));
      if (_urlData.data.status === 'ok') {
        setTwitterAuthUrl(_urlData.data.auth);
      }
    }

    getTwitterUrl();
  }, [connectedAccount]);

  useEffect(() => {
    async function validateTwitter() {
      setTwitterLoading(true);
      const _auth = Buffer.from(twitterAuth, 'base64').toString();
      const _authJson = JSON.parse(_auth);
      //console.log(_authJson);
      if (_authJson.status === 'ok') {
        try {
          const _token = Buffer.from(_authJson.token, 'base64').toString();
          const token = JSON.parse(_token);
          //console.log(token);
          const isValidToken = (token.ex - new Date().getTime()) / 1000 / 60 > 0;
          //console.log((token.ex - new Date().getTime()) / 1000 / 60);
          if (isValidToken) {
            const _user = Buffer.from(_authJson.u, 'base64').toString();
            const user = JSON.parse(_user);
            setTwitterUser(user.data);
            setTwitterLoading(false);
          } else {
            const refresh = await refreshAccessToken(token.refresh);
            if (refresh.data.status === 'ok') {
              setTwitterAuth(btoa(JSON.stringify(refresh.data)));
            }
            setTwitterLoading(false);
          }

          //setTwitterVerified(true);
        } catch (error) {
          console.log('error in validating twitter auth');
          setTwitterLoading(false);
        }
      } else {
        setTwitterLoading(false);
      }
    }

    if (twitterAuth.length > 20) {
      validateTwitter();
    }
  }, [twitterAuth]);

  useEffect(() => {
    if (twitterFollowed && twitterUser.id !== '') {
      if (twitterUser.id !== '') {
        setTwitterVerified(true);
      } else {
        setTwitterVerified(false);
      }
    }
  }, [twitterFollowed, twitterUser]);

  const _validateZealy = async () => {
    setZealyLoading(true);
    const _zealyUser = await getZealyByTwitterId(twitterUser.id);
    //console.log(_zealyUser.data);
    if (_zealyUser) {
      const zealyUser_ = _zealyUser.data.data;
      if (_zealyUser.status === 200 && zealyUser_) {
        setZealyUser(zealyUser_);
        if (zealyUser_.xp > 195) {
          setZealyVerified(true);
        } else {
          setZealyVerified(false);
        }
      }
    }
    setZealyLoading(false);
  };

  useEffect(() => {
    async function validateZealy() {
      await _validateZealy();
    }

    if (twitterUser.id !== '') {
      validateZealy();
    }
  }, [twitterUser]);

  const handleTwitter = async () => {
    if (twitterUser.id === '') {
      if (twitterAuthUrl.length > 10) {
        setTwitterLoading(true);
        window.open(twitterAuthUrl, 'self', 'width=420,height=800');
      } else {
        toast.closeAll();
        toast({
          status: 'info',
          title: t('connectWallet'),
          description: t('venomWalletConnect'),
          duration: 3000,
          isClosable: true,
        });
        return;
      }
    } else {
      if (twitterFollowed.length > 10) {
        //   if (twitterRetweeted.length > 10) {
        setTwitterVerified(true);
        setTwitterLoading(false);
        return;
        //   } else {
        //     setTwitterLoading(true);
        //     window.open(TWITTER_RETWEET_URL, 'self', 'width=420,height=800');
        //     setTimeout(() => {
        //       setTwitterRetweeted(Buffer.from(`retweeted-on-${Date.now()}`).toString('base64'));
        //       setTwitterLoading(false);
        //     }, 3000);
        //   }
      } else {
        setTwitterLoading(true);
        window.open(TWITTER_FOLLOW_URL, 'self', 'width=420,height=800');
        setTimeout(() => {
          setTwitterFollowed(Buffer.from(`followed-on-${Date.now()}`).toString('base64'));
          setTwitterLoading(false);
        }, 5000);
      }
    }
  };

  const loadByContract = async (_contractAddress: string): Promise<number> => {
    if (!provider || !provider.isInitialized) return 0;
    setIsLoading(true);
    let score: number = 0;
    const saltedCode = await saltCode(provider, String(connectedAccount), ROOT_CONTRACT_ADDRESS);
    console.log('salted code ', saltedCode);
    // Hash it
    const codeHash = await provider.getBocHash(String(saltedCode));
    if (!codeHash) {
      //setIsLoading(false);
      return 0;
    }

    // Fetch all Indexes by hash
    const indexesAddresses = await getAccountsFromIndex(codeHash, provider, 50);
    if (!indexesAddresses.accounts || !indexesAddresses.accounts.length) {
      //setIsLoading(false);
      return 0;
    }

    if (indexesAddresses.continuation) {
      score += 10;
    }

    // Fetch all nfts
    await Promise.all(
      indexesAddresses.accounts.map(async (indexAddress) => {
        try {
          let _nftJson = await getNftByIndex(provider, indexAddress);
          switch (_nftJson.name?.length) {
            case 9:
              score += 100;
              break;

            case 10:
              score += 40;
              break;

            case 11:
              score += 2;
              break;

            default:
              score += 1;
              break;
          }
          //console.log(_nftJson)
        } catch (e: any) {
          // console.log('error getting venomid nft ', indexAddress);
          return {};
        }
      })
    );

    console.log(score);
    return score;
  };

  const loadMinteds = async () => {
    setIsLoading(true);
    if (!provider || !provider.isInitialized) return;
    setMinteds([]);
    setMintedStrings([]);
    const { count } = await earlyAdopterContract.methods.totalSupply({ answerId: 0 }).call();
    setTotalSupply(count);
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

  useEffect(() => {
    let _unMinteds = [];
    if (twitterVerified) {
      if (mintedStrings?.includes('Crypto Explorer')) {
        console.log('Explorer already minted');
      } else {
        _unMinteds.push(
          getJson(
            'Crypto Explorer',
            EARLY_ADOPTER_IMAGES['explorer'].src,
            EARLY_ADOPTER_IMAGES['explorer'].type
          )
        );
      }
    }

    if (zealyVerified || ownVids > 1) {
      if (mintedStrings?.includes('Venom ID Pioneer')) {
        console.log('Pioneer already minted');
      } else {
        _unMinteds.push(
          getJson(
            'Venom ID Pioneer',
            EARLY_ADOPTER_IMAGES['pioneer'].src,
            EARLY_ADOPTER_IMAGES['pioneer'].type
          )
        );
      }
    }

    if (ownVidVen) {
      if (mintedStrings?.includes('Venom ID Identorian')) {
        console.log('Identorian already minted');
      } else {
        _unMinteds.push(
          getJson(
            'Venom ID Identorian',
            EARLY_ADOPTER_IMAGES['identorian'].src,
            EARLY_ADOPTER_IMAGES['identorian'].type
          )
        );
      }
    }

    if (ownVids > 0) {
      if (mintedStrings?.includes('Venom ID Family')) {
        console.log('Family already minted');
      } else {
        _unMinteds.push(
          getJson(
            'Venom ID Family',
            EARLY_ADOPTER_IMAGES['family'].src,
            EARLY_ADOPTER_IMAGES['family'].type
          )
        );
      }
    }

    if (
      (ownVids > 2 && zealyVerified) ||
      (zealyVerified && zealyUser.xp > 500 && zealyUser.rank < 201)
    ) {
      if (mintedStrings?.includes('Venom ID Maverick')) {
        console.log('Maverick already minted');
      } else {
        _unMinteds.push(
          getJson(
            'Venom ID Maverick',
            EARLY_ADOPTER_IMAGES['maverick'].src,
            EARLY_ADOPTER_IMAGES['maverick'].type
          )
        );
      }
    }

    if (
      twitterVerified &&
      ownVids > 1 &&
      zealyVerified &&
      zealyUser.xp > 1000 &&
      zealyUser.rank < 50
    ) {
      if (mintedStrings?.includes('Venom ID Champion')) {
        console.log('Champion already minted');
      } else {
        _unMinteds.push(
          getJson(
            'Venom ID Champion',
            EARLY_ADOPTER_IMAGES['champion'].src,
            EARLY_ADOPTER_IMAGES['champion'].type
          )
        );
      }
    }

    console.log('unMinteds');
    console.log(_unMinteds);
    if (_unMinteds.length > 0) {
      setUnMinteds(_unMinteds);
    } else {
      setUnMinteds([]);
    }
    setReload(false);
  }, [mintedStrings, twitterVerified, zealyVerified, ownVids, ownVidVen, reload]);

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

  const _checkOwnVid = async () => {
    setOwnVidLoading(true);
    const v0nfts = await loadByContract(ROOT_CONTRACT_ADDRESS);
    //const v1nfts = await loadByContract(CONTRACT_ADDRESS);
    //const v2nfts = await loadByContract(CONTRACT_ADDRESS_V1);
    //const v3nfts = await loadByDb();

    //console.log(v1nfts, v2nfts, v3nfts);
    let _no = 0;
    if (Number(v0nfts) > 0) {
      _no += 1;
    }

    // if (Number(v1nfts) > 0) {
    //   setOwnVid(true);
    //   _no += 1;
    // } else {
    //   setOwnVid(false);
    // }
    // if (Number(v2nfts) > 0) {
    //   setOwnVid1(true);
    //   _no += 1;
    // } else {
    //   setOwnVid1(false);
    // }

    // if (Number(v3nfts) > 0) {
    //   setOwnVid2(true);
    //   _no += 1;
    // } else {
    //   setOwnVid2(false);
    // }

    console.log(v0nfts);

    setOwnVidChecked(true);
    setOwnVidLoading(false);
    setOwnVids(v0nfts);
  };

  const _checkOwnVidVen = async () => {
    setOwnVidVenLoading(true);
    const v1nfts = await loadByContract(VENTORY_NFT_V1_ADDRESS);
    const v2nfts = await loadByContract(VENTORY_NFT_V2_ADDRESS);

    console.log(v1nfts);
    if (Number(v1nfts + v2nfts) > 0) {
      setOwnVidVen(true);
    } else {
      setOwnVidVen(false);
    }

    setOwnVidVenChecked(true);
    setOwnVidVenLoading(false);
  };

  useEffect(() => {
    const checkOwnVid = async () => {
      await _checkOwnVid();
    };

    const checkOwnVidVen = async () => {
      await _checkOwnVidVen();
    };

    const checkMinteds = async () => {
      await loadMinteds();
    };

    if (!provider || !provider.isInitialized) return;
    if (!connectedAccount || connectedAccount === '') return;
    //if (!isOpen) return;

    checkOwnVid();
    //checkOwnVidVen();
    //checkMinteds();
  }, [provider, connectedAccount]);

  return (
    <Accordion
      allowToggle
      allowMultiple={false}
      //defaultIndex={[0]}
      // onChange={(e) => {
      //   if(e === 0){
      //     onOpen();
      //   } else {
      //     onClose();
      //   }
      // }}
      className="earlyAdopters"
      borderRadius={10}
      w={'100%'}
      size="lg"
      backgroundColor={colorMode === 'dark' ? 'blackAlpha.700' : 'whiteAlpha.700'}
      display={'flex'}>
      <AccordionItem border={0} borderRadius={10} width={'100%'}>
        <AccordionButton
          width={'100%'}
          as={Button}
          justifyContent={'center'}
          _expanded={{ bgColor: colorMode === 'light' ? 'whiteAlpha.400' : 'blackAlpha.400' }}
          border={'1px solid #77777733'}
          //color={colorMode === 'dark' ? 'white' : 'black'}
          h={'140px'}>
            
          <Flex gap={[3, 4]} alignItems={'center'} justify={'center'}>
            <Avatar src={VARIATIONS_VIDS[9].avatar} size={['md', 'lg', 'lg', 'lg', 'xl']} />
            <Stack gap={1} justify={'left'}>
              <Text fontWeight={'bold'} display={'flex'} flex={1} fontSize={['xl', '2xl']}>
                Early Adopters Program
              </Text>
              <Text
                fontSize={'2xl'}
                fontWeight={'bold'}
                textAlign={'left'}
                fontFamily={'Pixelify Sans'}>
                Angry Venomites
              </Text>
              {totalSupply > 0 && (
                <Text fontSize={'2xl'} fontWeight={'light'} textAlign={'left'}>
                  {totalSupply} total mints
                </Text>
              )}
            </Stack>
          </Flex>
        </AccordionButton>
        <AccordionPanel py={8} minWidth="100%" px={4} fontFamily={'Pixelify Sans'}>
        <SimpleGrid columns={[1,1,1,2]} placeItems={'center'} alignItems={'center'}>
        <Box maxW={'sm'} p={4}>
            
            
        <ImageSlide images={images} captions={captions} controls={false} showCaptions={false} rounded='2xl' minH='300'/>

              
          </Box>
          <Flex flexDirection={'column'} gap={4} p={2} fontSize={['lg']} align={['center','center','center','start']} textAlign={['center','center','center','left']}>
            <Heading fontFamily={'Pixelify Sans'}>
              Angry Venomites
            </Heading>
            <Text >
              Collection of 3333 Angry Avatars Coming to the Venom Blockchain!
            </Text>
            <Text >Part of Venom ID Early Adopters Program</Text>
            {/* <Flex
              align={'center'}
              bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
              p={4}
              gap={4}
              rounded={'lg'}
              justify={'space-between'}>
              <HStack gap={4}>
                <LinkIcon type="x" size={notMobile ? '48' : '32'} />
                <Box>
                  Follow us on twitter
                  <Text color={useColorModeValue('var(--blue3)', 'var(--blue0)')}>
                    <a
                      href={TWITTER_FOLLOW_URL}
                      onClick={(e) => {
                        openWindow(TWITTER_FOLLOW_URL, e);
                      }}
                      target="_blank"
                      rel="noreferrer">
                      @venomid_network
                    </a>
                  </Text>
                </Box>
              </HStack>
              <Button
                size={['md', 'lg']}
                variant={'pop'}
                colorScheme={twitterVerified ? 'green' : 'darker'}
                color={'white'}
                isLoading={twitterLoading}
                loadingText={'Checking'}
                rounded={'full'}
                isDisabled={twitterVerified}
                gap={1}
                h={'56px'}
                onClick={handleTwitter}>
                {twitterUser.id === ''
                  ? 'Login' : !twitterFollowed ? 'Follow'
                  : 'Done'}
              </Button>
            </Flex>
            <Flex
              align={'center'}
              bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
              p={4}
              gap={2}
              rounded={'lg'}
              justify={'space-between'}>
              <HStack gap={4}>
                <LinkIcon type="zealy" size={notMobile ? '48' : '32'} />
                <Box>
                  Zealy Member (Min 195 XP)
                  <Text color={useColorModeValue('var(--blue3)', 'var(--blue0)')}>
                    <a
                      href={ZEALY_URL}
                      onClick={(e) => {
                        openWindow(ZEALY_URL, e);
                      }}
                      target="_blank"
                      rel="noreferrer">
                      Earn Xps
                    </a>
                  </Text>
                </Box>
              </HStack>
              <Button
                size="lg"
                variant={'pop'}
                isLoading={zealyLoading}
                loadingText={'Checking'}
                colorScheme={zealyVerified ? 'green' : 'darker'}
                color={'white'}
                rounded={'full'}
                h={'56px'}
                onClick={twitterUser.id === '' ? handleTwitter : _validateZealy}>
                {zealyUser.id !== '' ? `${zealyUser.xp} XP` : 'Login'}{' '}
                {zealyUser.xp > 500 && zealyUser.rank < 101 && (
                  <Badge
                    color={'white'}
                    bg={'var(--redGradient)'}
                    position={'absolute'}
                    mt={-12}
                    p={1}
                    px={2}
                    rounded={'full'}>
                    {' '}
                    {zealyUser.rank < 11 ? `Top 1%` : `Top 10%`}
                  </Badge>
                )}
                {zealyUser.rank > 0 && zealyUser.xp > 0 && (
                  <Badge
                    color={'white'}
                    bg={'var(--venomGradient)'}
                    position={'absolute'}
                    mb={-12}
                    p={1}
                    px={2}
                    rounded={'full'}>
                    {' '}
                    {`Rank ${zealyUser.rank}`}
                  </Badge>
                )}
              </Button>
            </Flex>
            <Flex
              align={'center'}
              bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
              p={4}
              gap={2}
              rounded={'lg'}
              justify={'space-between'}>
              <HStack gap={4}>
                <LinkIcon
                  type="https://ipfs.io/ipfs/Qmejr9qRtG3YYxqRCEVmjD1bW17mgQio8W1TjXjNSJn3DL"
                  size="md"
                />
                <Text>Own Venom ID NFT</Text>
              </HStack>
              <Button
                size="lg"
                variant={'pop'}
                colorScheme={ownVids > 0 ? 'green' : 'darker'}
                color={'white'}
                isLoading={ownVidLoading}
                loadingText={'Checking'}
                rounded={'full'}
                onClick={_checkOwnVid}>
                {ownVidChecked ? (ownVids > 0 ? 'Yes' : 'No') : 'Check'}
                {ownVids > 1 && (
                  <Badge
                    color={'white'}
                    bg={'var(--venomGradient)'}
                    position={'absolute'}
                    mb={-12}
                    p={1}
                    px={2}
                    rounded={'full'}>
                    {ownVids === 2
                      ? `Pioneer`
                      : zealyVerified && twitterVerified
                      ? `Maverick`
                      : zealyVerified || twitterVerified
                      ? `Pioneer`
                      : `Family`}
                  </Badge>
                )}
              </Button>
            </Flex>
            <Flex
              align={'center'}
              bg={colorMode === 'light' ? 'blackAlpha.100' : 'whiteAlpha.100'}
              p={4}
              gap={2}
              rounded={'lg'}
              justify={'space-between'}>
              <HStack gap={4}>
                <LinkIcon
                  type="https://ipfs.io/ipfs/QmPYnkNSK1TzqzxAEsK1DXNRsk1wuMgzncEUJgMauMC423/3dgifmaker60629.gif"
                  size="md"
                />
                <Box>
                  Own Venom ID x Ventory NFT
                  <Text color={colorMode === 'light' ? 'var(--blue3)' : 'var(--blue0)'}>
                    <a
                      href={MARKETPLACE_URLS_COLLECTION['venom'] + VENTORY_NFT_V2_ADDRESS}
                      onClick={(e) => {
                        openWindow(
                          MARKETPLACE_URLS_COLLECTION['venom'] + VENTORY_NFT_V2_ADDRESS,
                          e
                        );
                      }}
                      target="_blank"
                      rel="noreferrer">
                      View Collection
                    </a>
                  </Text>
                </Box>
              </HStack>
              <Button
                size="lg"
                variant={'pop'}
                colorScheme={ownVidVen ? 'green' : 'darker'}
                isLoading={ownVidVenLoading}
                loadingText={'Checking'}
                color={'white'}
                rounded={'full'}
                onClick={_checkOwnVidVen}>
                {ownVidVenChecked ? (ownVidVen ? 'Yes' : 'No') : 'Check'}
              </Button>
            </Flex> */}
            {/* <SimpleGrid
              gap={[2, 2, 4]}
              columns={[2, 2, 4]}
              py={4}
              placeContent={'center'}
              alignContent={'center'}>
              {[VARIATIONS_VIDS[2], VARIATIONS_VIDS[7], VARIATIONS_VIDS[8], VARIATIONS_VIDS[9]].map(
                (vid) => (
                  <Card
                    bg={colorMode === 'light' ? 'var(--lightGradient)' : 'var(--darkGradient)'}
                    rounded={'xl'}>
                    <CardBody>
                      <Avatar
                        src={vid.avatar}
                        rounded={'none'}
                        size={['xl', '2xl']}
                        key={`VenomID-${vid.vid}`}
                      />
                    </CardBody>
                    <CardFooter>
                      <Text fontWeight={'bold'} textAlign={'center'} w={'100%'}>
                        {vid.vid}
                      </Text>
                    </CardFooter>
                  </Card>
                )
              )}
            </SimpleGrid> */}
            <Text fontSize={['xl']} fontWeight={'bold'}>
              For The first 3333 .venom domain owners
            </Text>

            <Button
              w={'300px'}
              size={'lg'}
              isDisabled={true}
              isLoading={isMinting || isConfirming}
              colorScheme="venom"
              loadingText={
                isMinting ? 'Minting ...' : isConfirming ? 'Confirming ...' : 'Loading ...'
              }
              rounded={'full'}>
              MINT COMING SOON
            </Button>
            

            {/*                   


                </SimpleGrid>
              </Flex>
            ) : (<Center minH={'100px'}><Spinner size={'lg'} /></Center>)} */}

            {/* <InfoModal /> */}
          </Flex>
          </SimpleGrid>
          <Stack justify={'center'} align={'center'} gap={4} textAlign={'center'} pt={12}>
              
              <Text>Score is based on the number and length of your domains</Text>
              <Text>Rarity of your NFT will be based on your Score</Text>
              <Center gap={4} w={['100%','xs']}><Stack gap={0} w={'100%'}>
                <Text fontSize={'2xl'} textAlign={'left'}>Your</Text>
                <Text fontSize={'2xl'} textAlign={'left'}>Score</Text>
              </Stack>
              <Text
                color={colorMode === 'dark' ? 'var(--venom0)' : 'var(--venom)'}
                fontSize={'6xl'}>
                {ownVids}
              </Text></Center>
            </Stack>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}
