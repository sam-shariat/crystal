import {
  useMediaQuery,
  Button,
  Container,
  Heading,
  Text,
  Stack,
  Box,
  Center,
  SimpleGrid,
  HStack,
  Grid,
  GridItem,
  useColorMode,
  Highlight,
  useColorModeValue,
  Progress,
  IconButton,
  Flex,
  LightMode,
  DarkMode,
  Link,
  useToast,
  Spinner,
  useDisclosure,
} from '@chakra-ui/react';
import { useTranslate } from 'core/lib/hooks/use-translate';
import RaffleAbi from 'abi/RaffleCollection.abi.json';
import { Address, Transaction } from 'everscale-inpage-provider';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  connectedAccountAtom,
  openModalAtom,
  raffleContractAtom,
  venomProviderAtom,
} from 'core/atoms';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import {
  BG_COLORS,
  RAFFLE_CONTRACT_ADDRESS,
  ROOT_CONTRACT_ADDRESS,
  SITE_URL,
  TESTNET_ROOT_CONTRACT_ADDRESS,
} from 'core/utils/constants';
import {
  motion,
  motionValue,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'framer-motion';
import { LinkIcon, Logo } from 'components/logos';
import { wrap } from '@motionone/utils';
import Prize from 'components/features/Prize';
import RRRItem from 'components/features/RRRItem';
import ImageBox from 'components/claiming/ImageBox';
import { BaseNftJson, getAddressesFromIndex, getNftByIndex } from 'core/utils/reverse';
import { saltCode } from 'core/utils/nft';
import { sleep } from 'core/utils';
import { ConnectButton } from 'components/venomConnect';
import MintSuccessModal from 'components/claiming/MintSuccessModal';

export default function RRRSection() {
  const { t } = useTranslate();
  const [notMobile] = useMediaQuery('(min-width: 769px)');
  const { colorMode } = useColorMode();
  const [_open, _setOpen] = useAtom(openModalAtom);
  const [raffleContract, setRaffleContract] = useAtom(raffleContractAtom);
  const connectedAccount = useAtomValue(connectedAccountAtom);
  const provider = useAtomValue(venomProviderAtom);
  const [isLoading, setIsLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isMinting, setIsMinting] = useState(false);
  const [totalSupply, setTotalSupply] = useState<number>(0);
  const [isConfirming, setIsConfirming] = useState(false);
  const [minted, setMinted] = useState(false);
  const [mints, setMints] = useState<number | null>(null);
  const [idMints, setIdMints] = useState<number | null>(null);
  const [mintedNft, setMintedNft] = useState<BaseNftJson | null>();
  const win = useRef(null);
  const toast = useToast();
  const maxSupply = 2222;
  const { scrollYProgress } = useScroll();
  const bg = useMotionValue('#dbdbdb00');
  const bgcolor = useTransform(
    scrollYProgress,
    [0, 1],
    [
      colorMode === 'light' ? '#13131300' : '#2bb67300',
      colorMode === 'light' ? '#239960ff' : '#2bb673ff',
    ]
  );
  useAnimationFrame((_t, delta) => {
    bg.set(bgcolor.get());
  });

  interface ParallaxProps {
    children: JSX.Element;
    baseVelocity: number;
  }

  function getRandomFixedNumber(min: number, max: number) {
    // Generate a random floating-point number between 0 and 1
    const random = Math.random();

    // Scale the random number to fit within the desired range
    const scaled = random * (max - min);

    // Shift the scaled number to the correct starting point (min)
    const result = scaled + min;

    // Round the result to the nearest integer to make it a fixed number
    return Math.round(result);
  }

  function Parallax({ children, baseVelocity = 100 }: ParallaxProps) {
    const baseX = useMotionValue(0);
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
      damping: 50,
      stiffness: 400,
    });
    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 7], {
      clamp: false,
    });
    const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

    const directionFactor = useRef<number>(1);
    useAnimationFrame((_t, delta) => {
      let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
      if (velocityFactor.get() < 0) {
        directionFactor.current = -1;
      } else if (velocityFactor.get() > 0) {
        directionFactor.current = 1;
      }

      moveBy += directionFactor.current * moveBy * velocityFactor.get();

      baseX.set(baseX.get() + moveBy);
    });
    return (
      <div className="parallax">
        <motion.div className="scroller" style={{ x }}>
          <span>{children} </span>
          <span>{children} </span>
          <span>{children} </span>
        </motion.div>
      </div>
    );
  }

  const getJson = (name: string, image: string, imageType: string = 'image/svg') => {
    const _json = {
      type: 'Venom ID Wallpaper NFT',
      name: name,
      description:
        name +
        ' is an NFT that Offers an exciting opportunity To Win 🎁 1 Prize from The Prize Pool (~$6000), EVERYDAY, FOR 30 DAYS, Starting Right After All Items Are Minted!',
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
      external_url: SITE_URL + 'rrraffle',
    };

    console.log(_json);
    return _json;
  };

  const calculatePercentageString = (numerator: number, denominator: number) => {
    const percentage = (numerator / denominator) * 100;
    const formattedPercentage = `${percentage.toFixed(0)}%`;

    return formattedPercentage;
  };

  const loadByContract = async (_contractAddress: string) => {
    if (!provider || !provider.isInitialized) return 0;
    const saltedCode = await saltCode(provider, String(connectedAccount), _contractAddress);
    // Hash it
    const codeHash = await provider.getBocHash(String(saltedCode));
    // Fetch all Indexes by hash
    const indexesAddresses = await getAddressesFromIndex(codeHash, provider);
    if (indexesAddresses) {
      return indexesAddresses?.length;
    } else {
      return 0;
    }
  };

  function getImageNumber(currentId: number) {
    const totalImages = 272;
    const imageNumber = ((currentId - 1) % totalImages) + 1;
    return imageNumber;
  }

  const loadMinteds = async () => {
    setIsLoading(true);
    if (!provider || !provider.isInitialized) return;
    setMints(null);

    const { count } = await raffleContract.methods.totalSupply({ answerId: 0 }).call();

    console.log('total supply : ', count);
    setTotalSupply(count);

    const _mints = await loadByContract(RAFFLE_CONTRACT_ADDRESS);
    const _idMints = await loadByContract(ROOT_CONTRACT_ADDRESS);

    setMints(_mints);
    setIdMints(_idMints);

    console.log('ids : ', _idMints);

    await sleep(1000);
    setIsLoading(false);
  };

  useEffect(() => {
    const checkMinteds = async () => {
      await loadMinteds();
    };

    if (!provider || !provider.isInitialized) return;
    if (!connectedAccount || connectedAccount === '') return;
    //if (!isOpen) return;

    //checkOwnVid();
    //checkOwnVidVen();
    if (!raffleContract?.methods) {
      const _raffleContract = new provider.Contract(
        RaffleAbi,
        new Address(RAFFLE_CONTRACT_ADDRESS)
      );
      setRaffleContract(_raffleContract);
      return;
    }

    checkMinteds();
  }, [provider, connectedAccount, raffleContract, minted]);

  const mintRaffle = async () => {
    if (mints === null || idMints === null) {
      return;
    }

    if (mints > 2) {
      toast({
        status: 'info',
        title: t('Max Minted'),
        description: t('You Already Have Minted 3 NFTs'),
        duration: 3000,
        isClosable: true,
      });
    }

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

    setMinted(false);
    setMintedNft(null);

    setIsMinting(true);
    toast.closeAll();
    toast({
      status: 'loading',
      title: t('minting'),
      description: t('confirmInWallet'),
      duration: null,
    });

    const { count } = await raffleContract.methods.totalSupply({ answerId: 0 }).call();
    console.log('id : ', count);
    const imageNumber = getImageNumber(Number(count === 0 ? 1 : count));
    const randomNumber = getRandomFixedNumber(11111, 22222);
    const name = 'RRRaffle Wallpaper NFT #' + randomNumber;
    const image = `https://ipfs.io/ipfs/QmYroF6MGX8NfABN4Um4VZWwSD9FZRY12ujXHF7VqeJN3d/raffle%20(${imageNumber}).png`;
    const imageType = 'image/png';

    console.log(getJson(name, image, imageType));

    //return ;

    // @ts-ignore: Unreachable code error
    try {
      const mintTx = await raffleContract?.methods
        .mintRaffle({
          _json: JSON.stringify(getJson(name, image, imageType)),
          _owner: new Address(connectedAccount),
        })
        .send({
          amount: String(idMints > 0 ? 400000000 : 1100000000),
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
              if (tx_in_tree.account.equals(RAFFLE_CONTRACT_ADDRESS)) {
                receiptTx = tx_in_tree;
              }
            })
            .finished();

        // Decode events by using abi
        // we are looking for event Game(address player, uint8 bet, uint8 result, uint128 prize);

        let events = await raffleContract.decodeTransactionEvents({
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
          setMinted(true);
          setMintedNft(__json);
          onOpen();
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

  return (
    <motion.div style={{ backgroundColor: bg }} key={'whatnwhy'}>
      <Container
        ref={win}
        maxW="container.xl"
        display="grid"
        placeContent="center"
        placeItems="center"
        minH="90vh"
        py={16}
        pb={0}>
        <SimpleGrid columns={[1]} gap={10}>
          <GridItem>
            <Stack px={[4, 4, 6, 10]} gap={12} align={'center'}>
              <Heading
                as={'h3'}
                fontWeight="bold"
                fontSize={['4xl', '4xl', '5xl', '5xl', '6xl']}
                textAlign={['center']}>
                the Radiant Riddle Raffle
              </Heading>
              <ImageBox srcUrl="/logos/rrraffle.svg" />
              <Button
                as={Link}
                href="https://tokenforge.gg/"
                target="_blank"
                py={4}
                style={{ textDecoration: 'none' }}
                px={6}
                width={'max-content'}
                justifyContent={'center'}
                gap={2}
                colorScheme={colorMode === 'light' ? 'dark' : 'light'}
                rounded={'full'}
                variant={'outline'}
                display={'block'}
                height={['48px', '56px']}
                fontSize={['sm', 'xl']}>
                Presented for the TokenForge Hackathon
              </Button>
              <Text fontWeight="bold" fontSize={['xl', 'xl', '2xl', '2xl']} textAlign={['center']}>
                A Lottery NFT Collection featuring{' '}
                <Text fontWeight={'bold'} color={'var(--venom0)'}>
                  {' '}
                  2,222 items{' '}
                </Text>
              </Text>
              <Flex
                minW={'100%'}
                width={'100%'}
                flexDirection={'column'}
                gap={[8, 12, 16]}
                opacity={0.7}>
                <Parallax baseVelocity={-0.5}>
                  <Flex gap={[4, 6, 8]} pr={[2, 3, 4]}>
                    {BG_COLORS.map(
                      (bg, i) =>
                        i > 5 && (
                          <RRRItem
                            color={bg.color}
                            light={bg.lightMode}
                            key={`VenomID-RRR-${i}-item`}
                          />
                        )
                    )}
                  </Flex>
                </Parallax>
              </Flex>
              {mints !== null ? (
                <Center
                  flexDirection={'column'}
                  w={['100%', 'sm', 'md']}
                  gap={4}
                  minH={'200px'}
                  pb={8}>
                  <Flex gap={3} justify={'space-between'} fontSize={['lg', 'lg', 'xl', '2xl']}>
                    <Text fontWeight={'bold'}>TOTAL MINTED</Text>
                    <Text fontWeight={'bold'}>
                      {calculatePercentageString(totalSupply, maxSupply)} ({totalSupply}/{maxSupply}
                      )
                    </Text>
                  </Flex>
                  <Flex gap={3} justify={'space-between'} fontSize={['lg', 'lg', 'xl', '2xl']}>
                    {notMobile ? <Button
                      color={'white'}
                      bgGradient={'linear(to-r, var(--venom1), var(--bluevenom1))'}
                      _hover={{
                        bgGradient:
                          colorMode === 'light'
                            ? 'linear(to-r, var(--venom0), var(--bluevenom0))'
                            : 'linear(to-r, var(--venom0), var(--bluevenom0))',
                      }}
                      w={'xs'}
                      size={'lg'}
                      isDisabled={mints > 2 || isMinting || isConfirming}
                      isLoading={isMinting || isConfirming}
                      onClick={mintRaffle}>
                      Mint RRRaffle
                    </Button> : <Text>💻 Please Use Desktop/PC 💻</Text>}
                  </Flex>

                  {idMints !== null && (
                    <>
                      {idMints > 0 ? (
                        <Flex gap={3} fontSize={['lg', 'lg', 'xl', '2xl']}>
                          <LinkIcon type="venom" /> Whitelisted, 0.4 For Gas
                        </Flex>
                      ) : (
                        <Flex gap={3} fontSize={['lg', 'lg', 'xl', '2xl']}>
                          <LinkIcon type="venom" /> 1 VENOM + 0.4 Gas
                        </Flex>
                      )}
                    </>
                  )}

                  {mints > 0 && (
                    <Flex gap={3} fontSize={['lg', 'lg', 'xl', '2xl']}>
                      You own {mints} RRRaffle(s)!
                    </Flex>
                  )}
                </Center>
              ) : (
                <Center flexDirection={'column'} w={['100%', 'sm', 'md']} minH={'200px'} gap={8}>
                  {connectedAccount ? <Spinner /> : <ConnectButton />}
                </Center>
              )}
            </Stack>
          </GridItem>
        </SimpleGrid>
        {mintedNft && (
          <MintSuccessModal
            address={String(mintedNft?.address)}
            image={String(mintedNft?.preview?.source)}
            name={String(mintedNft?.name)}
            open={isOpen}
            _onClose={onClose}
          />
        )}
      </Container>
      <Container
        maxW="container.xl"
        display="grid"
        placeContent="center"
        placeItems="center"
        minH="100vh"
        pb={16}>
        <SimpleGrid columns={[1]} gap={10}>
          <GridItem
            display={'flex'}
            justifyContent={'center'}
            bg={colorMode === 'light' ? 'whiteAlpha.800' : 'blackAlpha.600'}
            rounded={'2xl'}
            border={'1px solid #77777750'}>
            <Stack px={[4, 4, 6, 10]} py={12} textAlign={'center'}>
              <Text fontWeight="bold" fontSize={['2xl']} textAlign={['center']} py={2}>
                Each NFT Offers an exciting opportunity
              </Text>
              <Text
                fontWeight="bold"
                fontSize={['4xl', '5xl']}
                color={colorMode === 'light' ? 'black' : 'white'}>
                🎁 To Win 🎁
              </Text>
              <Text fontWeight="bold" fontSize={['2xl', '3xl']} textAlign={['center']}>
                1 Prize from The Pool
              </Text>

              <Text
                fontWeight="bold"
                fontSize={['5xl', '6xl']}
                bgGradient={'linear(to-r, var(--venom1), var(--bluevenom1))'}
                bgClip={'text'}
                textAlign={['center']}>
                EVERYDAY
              </Text>
              <Text fontWeight="bold" fontSize={['4xl', '5xl']} textAlign={['center']}>
                FOR 30 DAYS
              </Text>
              <SimpleGrid columns={[1, 1, 1, 2]} gap={6} py={6}>
                <Prize
                  name={'3-letter .venom domains'}
                  value="$2400"
                  icon={<Logo w={notMobile ? '76px' : '38px'} h={notMobile ? '60px' : '30px'} />}
                  number={30}
                />
                <Prize
                  name={'4-letter .venom domains'}
                  value="$2400"
                  icon={<Logo w={notMobile ? '76px' : '38px'} h={notMobile ? '60px' : '30px'} />}
                  number={60}
                />
                <Prize
                  name={'5-letter .venom domains'}
                  value="$400"
                  icon={<Logo w={notMobile ? '76px' : '38px'} h={notMobile ? '60px' : '30px'} />}
                  number={90}
                />
                <Prize
                  name={'40 $VENOM Tokens'}
                  value="$600"
                  icon={<LinkIcon type="venom" size={notMobile ? 76 : 38} />}
                  number={30}
                />
              </SimpleGrid>
              <Text fontWeight="bold" fontSize={['xl', '3xl']} textAlign={['center']}>
                🪙 Total Prize Pool Value: ~$6,000 🪙
              </Text>
              <Text fontWeight="bold" fontSize={['xl']} textAlign={['center']} pt={8}>
                Items from this collection can be used as wallpaper images on the Venom ID platform
              </Text>
            </Stack>
          </GridItem>
        </SimpleGrid>
      </Container>
      <Container
        ref={win}
        maxW="container.xl"
        display="grid"
        placeContent="center"
        placeItems="center"
        minH="100vh"
        pb={16}>
        <Grid templateColumns={[`repeat(1, 1fr)`]} gap={16} my={10} alignItems={'center'}>
          <GridItem colSpan={[3, 3]}>
            <Stack
              px={[4, 4, 6, 10]}
              gap={[6]}
              color={colorMode === 'light' ? 'white' : 'var(--dark)'}>
              <Heading
                as={'h3'}
                fontWeight="bold"
                borderBottom={'2px solid'}
                fontSize={['4xl', '4xl', '5xl', '5xl', '6xl']}
                textAlign={['center', 'center', 'center', 'left']}>
                Utility
              </Heading>
              <Text fontWeight="normal" fontSize={['xl', 'xl', '2xl', '2xl']} textAlign={['left']}>
                <li>Daily raffles with mentioned prizes for 30 days to random NFT holders</li>
              </Text>
              <Text fontWeight="normal" fontSize={['xl', 'xl', '2xl', '2xl']} textAlign={['left']}>
                <li>Usage of NFTs as wallpaper images on the Venom ID platform</li>
              </Text>
              <Text fontWeight="normal" fontSize={['xl', 'xl', '2xl', '2xl']} textAlign={['left']}>
                <li>Get Whitelisted for our 1:1 Art NFT collection revealing soon</li>
              </Text>
              <Text fontWeight="normal" fontSize={['xl', 'xl', '2xl', '2xl']} textAlign={['left']}>
                <li>Be A Part of Venom ID Early Adopters And Enjoy future perks and Rewards!</li>
              </Text>
            </Stack>
          </GridItem>
          <GridItem colSpan={[3, 3]}>
            <Stack
              px={[4, 4, 6, 10]}
              gap={[6, 8]}
              color={colorMode === 'light' ? 'white' : 'var(--dark)'}>
              <Heading
                as={'h3'}
                fontWeight="bold"
                borderBottom={'2px solid'}
                fontSize={['4xl', '4xl', '5xl', '5xl', '6xl']}
                textAlign={['center', 'center', 'center', 'left']}>
                FAQ
              </Heading>

              <Text fontWeight="normal" fontSize={['xl', 'xl', '2xl', '2xl']} textAlign={['left']}>
                <li>Free For Venom ID Owners!</li>
              </Text>

              <Text fontWeight="normal" fontSize={['xl', 'xl', '2xl', '2xl']} textAlign={['left']}>
                <li>1 VENOM For Public Minting, 1 Per Wallet</li>
              </Text>
              <Text fontWeight="normal" fontSize={['xl', 'xl', '2xl', '2xl']} textAlign={['left']}>
                <li>Mint Starts on 17th April ~ 17:00 UTC </li>
              </Text>
              <Text fontWeight="normal" fontSize={['xl', 'xl', '2xl', '2xl']} textAlign={['left']}>
                <li>Stay tuned for more details as we provide updates!</li>
              </Text>
            </Stack>
          </GridItem>
        </Grid>
      </Container>
    </motion.div>
  );
}
