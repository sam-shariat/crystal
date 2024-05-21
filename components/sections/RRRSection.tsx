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
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Tbody,
  Tfoot,
  Th,
  Td,
  Tag,
  Tooltip,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Input,
  Modal,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalContent,
  ModalOverlay,
} from '@chakra-ui/react';
import { useTranslate } from 'core/lib/hooks/use-translate';
import RaffleAbi from 'abi/RaffleCollection.abi.json';
import { Address, Transaction } from 'everscale-inpage-provider';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  connectedAccountAtom,
  openModalAtom,
  raffleContractAtom,
  rootContractAtom,
  venomProviderAtom,
} from 'core/atoms';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import {
  BG_COLORS,
  OASIS_COLLECTION,
  RAFFLE_CONTRACT_ADDRESS,
  RAFFLE_IMAGES,
  RAFFLE_IMAGES2,
  RAFFLE_WINNERS,
  ROOT_CONTRACT_ADDRESS,
  SITE_URL,
  TESTNET_ROOT_CONTRACT_ADDRESS,
  TLD,
  VENOMART_COLLECTION,
  VENOMSCAN_NFT,
  VENOMSCAN_TX,
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
import DomainAbi from 'abi/Domain.abi.json';
import { LinkIcon, Logo, LogoIcon } from 'components/logos';
import { wrap } from '@motionone/utils';
import Prize from 'components/features/Prize';
import RRRItem from 'components/features/RRRItem';
import ImageBox from 'components/claiming/ImageBox';
import { BaseNftJson, getAddressesFromIndex, getNftByIndex } from 'core/utils/reverse';
import { saltCode } from 'core/utils/nft';
import { invalidUsernameMessage, isValidUsername, sleep, truncAddress } from 'core/utils';
import { ConnectButton } from 'components/venomConnect';
import MintSuccessModal from 'components/claiming/MintSuccessModal';
import Winner from 'components/raffle/Winner';
import { isValidName } from 'ethers/lib/utils';
import { checkPrize, reqPrize } from 'core/utils/prize';
import PrizePool from 'components/raffle/PrizePool';

export default function RRRSection() {
  let timer: any;
  const { t } = useTranslate();
  const [notMobile] = useMediaQuery('(min-width: 769px)');
  const { colorMode } = useColorMode();
  const [_open, _setOpen] = useAtom(openModalAtom);
  const [raffleContract, setRaffleContract] = useAtom(raffleContractAtom);
  const connectedAccount = useAtomValue(connectedAccountAtom);
  const provider = useAtomValue(venomProviderAtom);
  const [isLoading, setIsLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [typing, setTyping] = useState<boolean>(false);
  const [isMinting, setIsMinting] = useState(false);
  const [totalSupply, setTotalSupply] = useState<number>(0);
  const [isConfirming, setIsConfirming] = useState(false);
  const [path, setPath] = useState<string>('');
  const [feeIsLoading, setFeeIsLoading] = useState(false);
  const [nameExists, setNameExists] = useState(false);
  const [won, setWon] = useState<any>();
  const [prizeRequest, setPrizeRequest] = useState<any[]>();
  const [minted, setMinted] = useState(false);
  const [mints, setMints] = useState<number | null>(null);
  const [day, setDay] = useState<number>(29);
  const [idMints, setIdMints] = useState<number | null>(null);
  const [mintedNft, setMintedNft] = useState<BaseNftJson | null>();
  const rootContract = useAtomValue(rootContractAtom);
  const win = useRef(null);
  const toast = useToast();
  const maxSupply = 2222;
  let _domains = 0;
  RAFFLE_WINNERS.map((w) => w.winners.map((wallet) => {
    if(wallet.tx !== ''){
      _domains++;
    }}));
  const domains = _domains - RAFFLE_WINNERS.length;
  const { scrollYProgress } = useScroll();
  console.log(scrollYProgress);
  const bg = useMotionValue('#dbdbdb00');
  const bgcolor = useTransform(
    scrollYProgress,
    [0, 1],
    [
      colorMode === 'light' ? '#ffffff00' : '#ffffff00',
      colorMode === 'light' ? '#10a9b6ff' : '#10a9b6ff',
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
    //console.log(saltedCode);
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
    // const _idMints = await loadByContract(ROOT_CONTRACT_ADDRESS);
    // const _venomazzMints = await loadByContract(
    //   '0:62932d87cd4f78f7732d7dae2d89501a330ab8becbb9a6b384039917bc3133de'
    // );
    // const _staxidMints = await loadByContract(
    //   '0:cb5ea03dc5704baab86d9af572b23fb3c46f245cead72d2a2f8a4a1cc426fb9c'
    // );
    // const _punkMints = await loadByContract(
    //   '0:f283ba1b50a520b591f241a8e56ee4b3207d36a7ded0abef0e0f17c8a44ab3fc'
    // );
    // const _orphMints = await loadByContract(
    //   '0:63edc56ef6a0d37e28ec6a9b59be62cc491ebcfdb4d448eff80c88d04f6079c6'
    // );

    //console.log("_punkMints : ",_punkMints)

    const _count: number = 0;

    setMints(_mints);
    setIdMints(_count);

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

    RAFFLE_WINNERS.map((w) => {
      w.winners.map((wallet) => {
        if (wallet.owner === connectedAccount) {
          let _wallet: any = wallet;
          _wallet.day = w.day;
          _wallet.date = w.date;
          setWon(_wallet);
        }
      });
    });

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

  const checkOwnerPrize = async () => {
    const details = await checkPrize(won.owner);
    if (details.status === 200) {
      setPrizeRequest(details.data.nfts);
      console.log('prize request');
      console.log(details.data.nfts);
    }
  };

  const reqName = async () => {
    setIsLoading(true);
    const details = await reqPrize(won.owner, path + '.venom', won.prize, won.date);
    if (details.status === 200) {
      console.log(details);
      await checkOwnerPrize();
    } else {
      console.log('ERROR Requesting');
      console.log(details);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (won) {
      if (won.owner === connectedAccount) {
        checkOwnerPrize();
      }
    }
  }, [won]);

  async function inputChange() {
    if (!path) return;
    window.clearTimeout(timer);
    clearTimeout(timer);

    if (!isValidUsername(path)) {
      toast.closeAll();
      toast({
        status: 'info',
        colorScheme: colorMode === 'dark' ? 'light' : 'dark',
        title: t('invalidName'),
        description: invalidUsernameMessage(path),
        isClosable: true,
        duration: 6000,
      });
      return;
    }

    if (provider && provider?.isInitialized && rootContract && rootContract.methods !== undefined) {
      try {
        setFeeIsLoading(true);
        setTyping(false);
        toast.closeAll();
        //@ts-ignore: Unreachable code error
        const certificateAddr = await rootContract.methods
          .resolve({ path: `${path}.${TLD}`, answerId: 0 })
          .call({ responsible: true });
        console.log(certificateAddr);

        const domainContract = new provider.Contract(DomainAbi, certificateAddr.certificate);
        console.log(domainContract);
        try {
          // @ts-ignore: Unreachable code error
          let result: { status: string | number } = await domainContract.methods
            .getStatus({ answerId: 0 })
            .call();
          if (result && result?.status) {
            console.log(result);
          }
          setNameExists(result ? true : false);
        } catch (e) {
          setNameExists(false);
        }

        //setFee(_fee);
        //setFee(sumUint128(_fee ,minFee));
        //console.log(sumUint128(_fee ,minFee))
        setFeeIsLoading(false);
      } catch (er) {
        console.log(er);
        return;
      }
    } else if (rootContract?.methods === undefined) {
      toast({
        status: 'warning',
        title: t('contractConnection'),
        description: t('contractConnectionMsg'),
        isClosable: true,
      });
      return;
    }
  }

  useEffect(() => {
    window.clearTimeout(timer);
    clearTimeout(timer);
    setTyping(true);
    timer = window.setTimeout(inputChange, 1400);

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [path]);

  const mintRaffle = async () => {
    if (mints === null || idMints === null) {
      return;
    }

    if (mints > 1) {
      toast({
        status: 'warning',
        title: t('Max Minted'),
        description: t('You Already Have Minted Max Number of NFTs'),
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

    if (count >= maxSupply) {
      toast.closeAll();
      toast({
        status: 'warning',
        title: t('Sold Out'),
        description: t('All Items are minted! See you next time!'),
        duration: 3000,
        isClosable: true,
      });
      setIsMinting(false);
      return;
    }

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
          //onOpen();
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
          
        <SimpleGrid columns={[1,1,1]} gap={[10,10,10,2]} placeItems={'center'}>
          <GridItem>
            <Stack px={[0, 4, 6]} gap={12} align={'center'}>
              <Center flexDirection={'column'} p={[4,6,8,16]} rounded={'2xl'} gap={8} w={'100%'}>
                
              <ImageBox srcUrl="/logos/rrraffle.svg" />
              <Button
                as={Link}
                href="https://tokenforge.gg/"
                target="_blank"
                py={4}
                style={{ textDecoration: 'none' }}
                pl={1}
                width={'max-content'}
                justifyContent={'center'}
                gap={2}
                colorScheme={colorMode === 'light' ? 'black' : 'light'}
                rounded={'full'}
                variant={'outline'}
                display={'flex'}
                height={['48px', '56px']}
                fontSize={['sm', 'xl']}>
                  <LinkIcon type='https://ipfs.io/ipfs/QmV66mFU5LaPgczSy3Xbv2Fto5BdjP2TZNLeXztsWkAxgu/New%20Project%20(3).png' size={'md'} />
                Presented for the VenomTokenForge
              </Button>

              <Text fontWeight="bold" fontSize={['2xl', '4xl']} textAlign={['center']}>
              RRRaffle HAS WON
              <Text
                  fontWeight={'bold'}
                  bgGradient={
                    colorMode === 'light'
                      ? 'linear(to-r, var(--venom2), var(--bluevenom2))'
                      : 'linear(to-r, var(--venom0), var(--bluevenom0))'
                  }
                  bgClip="text">
              🏆 THE 12TH PLACE 🏆
              </Text>
              </Text>
              <Button
                as={Link}
                href="https://twitter.com/VenomFoundation/status/1783947503592685602"
                target="_blank"
                py={4}
                style={{ textDecoration: 'none' }}
                px={6}
                width={'max-content'}
                justifyContent={'center'}
                gap={2}
                colorScheme={'twitter'}
                rounded={'full'}
                variant={'outline'}
                display={'flex'}
                height={['48px', '56px']}
                fontSize={['sm', 'xl']}>
                  <LinkIcon type='x' />
                Winner Announcement Post
              </Button>
              <Stack gap={4} align={'center'} w={['100%', '100%', 'md']}>
                <Button
                  as={Link}
                  target="_blank"
                  href={OASIS_COLLECTION + RAFFLE_CONTRACT_ADDRESS}
                  p={4}
                  style={{ textDecoration: 'none' }}
                  rounded={'2xl'}
                  h={'100px'}
                  display={'flex'}
                  flexDir={'column'}
                  gap={2}
                  alignItems={'space-between'}
                  w={['100%', '100%', '100%']}>
                  <Flex gap={4} align={'center'} justify={'space-between'} w={'100%'}>
                    <LinkIcon
                      type={
                        'https://ipfs.io/ipfs/QmNXPY57PSu72UZwoDyXsmHJT7UQ4M9EfPcyZwpi3xqMQV/oasisgallery.svg.svg'
                      }
                      size={'lg'}
                    />
                    <Stack gap={0} w={'100%'} align={'center'} justify={'center'}>
                      <Text>Collection On</Text>
                      <Text fontSize={['2xl', '2xl', '2xl']} fontWeight={'light'}>
                        Oasis Gallery
                      </Text>
                    </Stack>
                  </Flex>
                </Button>
                <Button
                  as={Link}
                  target="_blank"
                  href={VENOMART_COLLECTION + RAFFLE_CONTRACT_ADDRESS}
                  p={4}
                  style={{ textDecoration: 'none' }}
                  rounded={'2xl'}
                  h={'100px'}
                  display={'flex'}
                  flexDir={'column'}
                  alignItems={'space-between'}
                  gap={2}
                  w={['100%']}>
                  <Flex gap={4} align={'center'} justify={'space-between'} w={'100%'}>
                    <LinkIcon
                      type={
                        'https://ipfs.io/ipfs/QmVBqPuqcH8VKwFVwoSGFHXUdG6ePqjmhEoNaQMsfd2xau/venomart.jpg'
                      }
                      size={'lg'}
                    />
                    <Stack gap={0} w={'100%'} align={'center'} justify={'center'}>
                      <Text>Collection On</Text>
                      <Text fontSize={['2xl', '2xl', '2xl']} fontWeight={'light'}>
                        <strong>VENOM</strong> ART
                      </Text>
                    </Stack>
                  </Flex>
                </Button>
              </Stack>
              </Center>
              </Stack>
              </GridItem>
        </SimpleGrid>
      </Container>
      <Container
        ref={win}
        maxW="100%"
        px={0}
        display="grid"
        placeContent="center"
        placeItems="center"
        pb={16}>
        <SimpleGrid columns={[1]} gap={10} px={0} >
          <GridItem>
            <Stack px={0} gap={12} align={'center'} py={20}>
              <Flex minW={'100%'} width={'100%'} flexDirection={'column'} gap={[8]}>
                <Parallax baseVelocity={-0.5}>
                  <Flex gap={[4, 6, 8]} pr={[2, 3, 4]}>
                    {RAFFLE_IMAGES.map(
                      (bg, i) => i > 5 && <RRRItem image={bg} key={`VenomID-RRR-${i}-item`} />
                    )}
                  </Flex>
                </Parallax>
                <Parallax baseVelocity={0.5}>
                  <Flex gap={[4, 6, 8]} pr={[2, 3, 4]}>
                    {RAFFLE_IMAGES2.map(
                      (bg, i) => i > 5 && <RRRItem image={bg} key={`VenomID-RRR-${i}-item`} />
                    )}
                  </Flex>
                </Parallax>
              </Flex>
              {/* {mints !== null ? (
                <Center
                  flexDirection={'column'}
                  w={['100%', 'sm', 'md', 'lg', 'xl', '2xl']}
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
                  {/* {totalSupply < maxSupply ? (
                    <Flex gap={3} justify={'space-between'} fontSize={['lg', 'lg', 'xl', '2xl']}>
                      {notMobile ? (
                        <Button
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
                          isDisabled={
                            mints > 1 || isMinting || isConfirming || totalSupply >= maxSupply
                          }
                          isLoading={isMinting || isConfirming}
                          onClick={mintRaffle}>
                          {totalSupply < maxSupply ? 'Mint RRRaffle' : 'Sold Out'}
                        </Button>
                      ) : (
                        <Text>💻 Please Use Desktop/PC 💻</Text>
                      )}
                    </Flex>
                  ) : ( */}

              {/* )} */}

              {/* {idMints !== null && totalSupply < maxSupply && (
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

                  
                </Center>
              ) : (
                <Center flexDirection={'column'} w={['100%', 'sm', 'md']} minH={'200px'} gap={8}>
                  {connectedAccount ? <Spinner /> : <ConnectButton />}
                </Center>
              )} */}
            </Stack>
          </GridItem>
          <GridItem>
          <Stack px={[4, 4, 6]} gap={4} align={'center'} minH={'90vh'} justify={'center'}>
              <Center flexDirection={'column'} p={[4,6,8,12]} bgColor={colorMode === 'light' ? 'whiteAlpha.800' : 'blackAlpha.700'} rounded={'2xl'} gap={6} w={'100%'} maxW={'container.lg'}>
              <Heading
                as={'h3'}
                fontWeight="bold"
                fontSize={['4xl','4xl','5xl','6xl']}
                textAlign={['center']}>
                <Box as={'span'} color={'pink.400'}>R</Box>adiant <Box as={'span'} color={'pink.500'}>R</Box>iddle <Box as={'span'} color={'pink.500'}>R</Box>affle
              </Heading>
              <Text fontWeight="bold" fontSize={['xl', 'xl', '2xl', '2xl']} textAlign={['center']} py={3}>
                A Lottery NFT Collection featuring <Box as='span'
                  fontWeight={'bold'}
                  color={colorMode === 'light' ? 'var(--venom3)' : 'var(--venom0)'}>
                  2,222 
                </Box> Items, Each NFT Offers an opportunity to Win 1 Prize from The Prize Pool
                
              </Text>
              <Stack>
              <Text
                fontSize={['2xl', '3xl']}
                border={'1px solid'}
                px={6}
                textAlign={'center'}
                w={['100%','sm','md']}
                rounded={'2xl'}>
                EVERYDAY, FOR 30 DAYS
              </Text>
              </Stack>
              <Stack gap={2} align={'center'} py={2} bgColor={colorMode === 'light' ? 'white' : 'blackAlpha.300'} rounded={'2xl'} fontSize={['lg','xl']} w={['100%','sm','md']}>
              <Text
                fontSize={['xl', '2xl']}
                px={6}
                fontWeight="bold"
                py={3}
                rounded={'2xl'}><strong>
                {RAFFLE_WINNERS.length} of 30</strong> Raffles Completed
              </Text>
              <Center gap={2} borderTop={'1px solid #77777777'} w={'100%'} p={4}><LinkIcon type='venom' size={32}/> {RAFFLE_WINNERS.length * 40} of 1200 $VENOM Airdropped</Center>
              <Center gap={2} borderTop={'1px solid #77777777'} w={'100%'} p={4}><LinkIcon type='venomid' size={22}/> {domains} of 210 .venom domains Sent</Center>
              </Stack>

              {won && (
              <Flex
                gap={3}
                w={['100%','sm','md']}
                fontSize={['lg', 'lg', 'xl']}
                p={4}
                justify={'center'}
                align={'center'}
                direction={'column'}
                textAlign={'center'}
                bgColor={colorMode === 'light' ? 'white' : 'blackAlpha.400'}
                rounded={'lg'}>
                <Text>🎁 You have won 🎁 </Text>
                <Text>
                  <strong>{won.prize}</strong> from the <strong>{won.date}</strong> Raffle
                </Text>
                {prizeRequest && prizeRequest.length === 0 ? (
                  <Stack gap={4} w={'100%'}>
                    {won.prize.includes('domain') && (
                      <Input
                        placeholder={`Enter ${won.prize} Name`}
                        size={'lg'}
                        variant={'filled'}
                        value={path}
                        fontSize={['lg']}
                        isDisabled={isLoading}
                        borderWidth="1px"
                        borderColor={colorMode === 'dark' ? 'whiteAlpha.500' : 'blackAlpha.500'}
                        rounded={'2xl'}
                        px={[6]}
                        onChange={(e) => setPath(e.target.value.toLowerCase())}
                        bg={colorMode === 'dark' ? 'blackAlpha.300' : 'whiteAlpha.700'}
                      />
                    )}
                    {!typing && (
                      <Button
                        minWidth={['100%', '100%', 'fit-content']}
                        colorScheme="green"
                        size={['md', 'lg']}
                        gap={2}
                        rounded={'full'}
                        bgGradient={
                          colorMode === 'light'
                            ? 'linear(to-r, var(--venom1), var(--bluevenom1))'
                            : 'linear(to-r, var(--venom2), var(--bluevenom2))'
                        }
                        _hover={{
                          bgGradient:
                            colorMode === 'light'
                              ? 'linear(to-r, var(--venom0), var(--bluevenom0))'
                              : 'linear(to-r, var(--venom0), var(--bluevenom0))',
                        }}
                        color={'white'}
                        height={['66px']}
                        isDisabled={
                          !isValidName(path) ||
                          nameExists ||
                          feeIsLoading ||
                          typing ||
                          path.length < won.prize.slice(0, 1) ||
                          isLoading //|| mintedOnTestnet === 0
                        }
                        onClick={reqName}
                        isLoading={feeIsLoading || typing || isLoading}>
                        {path}.venom {nameExists ? 'not available' : 'available. Get Name'}
                      </Button>
                    )}
                  </Stack>
                ) : (
                  <Stack>
                    <Text
                      bgGradient={
                        colorMode === 'light'
                          ? 'linear(to-r, var(--venom2), var(--bluevenom2))'
                          : 'linear(to-r, var(--venom0), var(--bluevenom0))'
                      }
                      bgClip="text"
                      fontSize={'3xl'}>
                      {prizeRequest && prizeRequest[0].winner_name}
                    </Text>
                    <Text>
                      {prizeRequest && prizeRequest[0].completed_tx
                        ? 'has been sent to your wallet ✅'
                        : 'is being sent to your wallet 🔃'}
                    </Text>
                    {prizeRequest && prizeRequest[0].completed_tx && (
                      <Link
                        style={{ textDecoration: 'underline' }}
                        href={
                          (prizeRequest[0].prize.includes('VENOM') ? VENOMSCAN_TX : VENOMSCAN_NFT) +
                          prizeRequest[0].completed_tx
                        }
                        target="_blank">
                        {' '}
                        TX Hash{' '}
                      </Link>
                    )}
                  </Stack>
                )}
              </Flex>
            )}

              <Button colorScheme='venom' onClick={onOpen} size={'lg'} variant={'solid'} w={['100%','sm','md']} height={'64px'} fontSize={'2xl'}><Center bg={colorMode === 'dark' ? 'blackAlpha.800':'white'} bgClip={'text'} gap={3}><Text > 🏆 </Text>Winners Table <Text> 🏆 </Text></Center></Button>
              <PrizePool />
              </Center>
              
            </Stack>
          </GridItem>
        </SimpleGrid>
      </Container>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={'full'}>
        <ModalOverlay bg="blackAlpha.700" backdropFilter="auto" backdropBlur={'6px'} />
        <ModalContent bg={colorMode === 'light' ? 'var(--white)' : 'var(--dark1)'}>
          <ModalHeader textAlign={'center'} display={'flex'} gap={2} justifyContent={'center'} fontSize={['2xl','3xl']} py={12}>
            🏆 Winners Table 🏆<ModalCloseButton /></ModalHeader>
          <ModalBody display={'flex'} justifyContent={'center'} alignContent={'center'} w={'100%'}>
        
     
        <Flex direction={'column'} gap={[16, 12, 10]} w={'100%'} >
          <Flex gap={6} direction={'column'} fontSize={['lg', 'lg', 'xl', '2xl']} w={'100%'}>

          {/* {mints !== null && mints > 0 && (
              <Flex
                gap={3}
                w={['100%', '100%']}
                fontSize={['lg', 'lg', 'xl', '2xl']}
                p={3}
                h={'80px'}
                justify={'center'}
                align={'center'}
                textAlign={'center'}
                bgColor={colorMode === 'light' ? 'white' : 'whiteAlpha.200'}
                rounded={'lg'}>
                You own {mints} RRRaffle(s)!
              </Flex>
            )} */}
            
            {/* <Text>Next Raffle / Day {RAFFLE_WINNERS.length+1}</Text>
            <Text fontSize={'3xl'} fontWeight={'bold'} borderBottom={'1px'} w={'100%'}>
              May 19th 23:59 UTC{' '}
            </Text> */}
            

            {/* <Text
              fontSize={'xl'}
              p={4}
              rounded={'2xl'}
              bgColor={colorMode === 'light' ? 'white' : 'blackAlpha.300'}>
              <strong>Note : </strong>Domain Winners of first round will be able to choose their
              preferred domain name on this page on April 23rd 22:00 UTC. ( this page will be
              updated )
            </Text> */}

            
          </Flex>
          {/* <Text  fontSize={'3xl'} fontWeight={'bold'} borderBottom={'1px'} w={'100%'} textAlign={'center'}>Raffles By Day</Text> */}
          <Center><Center maxW={'container.md'} gap={8}><Button
                  height={'68px'}
                  rounded={'full'}
                  isDisabled={day === 0}
                  colorScheme="venom"
                  size={'lg'}
                  onClick={() => setDay((y) => (y > 1 ? y - 1 : 1))}>
                  <LinkIcon type='RiArrowLeftSLine' />
                  
                </Button>
                <Text fontSize={['xl', '2xl', '3xl']} flexGrow={1} textAlign={'center'}>
                  Raffle Day {day+1}
                </Text>
                <Button
                  height={'68px'}
                  colorScheme="venom"
                  rounded={'full'}
                  isDisabled={day === 29}
                  size={'lg'}
                  onClick={() => setDay((y) => y + 1)}>
                  <LinkIcon type='RiArrowRightSLine' />
                </Button></Center></Center>
          <Flex gap={3} direction={'column'} w={'100%'}>
            <Tabs
              colorScheme="green"
              rounded={'2xl'}
              isFitted
              defaultIndex={RAFFLE_WINNERS.length - 1}
              index={day}
              variant={'solid-rounded'}
              size={['sm','md','lg']}
              px={0}
              w={['sm','md','100%']}
              isLazy>
              <TabList
                overflowY="hidden"
                sx={{
                  scrollbarWidth: 'none',
                  '::-webkit-scrollbar': {
                    display: 'none',
                  },
                }}>
                {RAFFLE_WINNERS.map((day, i) => (
                  <Tab fontWeight={'bold'} key={'tab-prize-' + day.date + '-' + i} flexShrink={0} onClick={()=> setDay(day.day-1)}>
                    {day.day}
                  </Tab>
                ))}
              </TabList>

              <TabPanels>
                {RAFFLE_WINNERS.map((day, i) => (
                  <TabPanel key={'tab-panel-prize-' + day.date + '-' + i} px={0}>
                    <Center display={'flex'} justifyContent={'left'} gap={3} fontSize={'3xl'} p={4} py={8}>
                      Winners of <Text
                      fontSize={'3xl'}
                  fontWeight={'bold'}
                  bgGradient={
                    colorMode === 'light'
                      ? 'linear(to-r, var(--venom2), var(--bluevenom2))'
                      : 'linear(to-r, var(--venom0), var(--bluevenom0))'
                  }
                  bgClip="text">{day.date}</Text>
                    </Center>
                    <Table
                      variant="simple"
                      bgColor={colorMode === 'light' ? 'white' : 'blackAlpha.400'}
                      fontSize={['lg', 'lg', 'xl']}
                      rounded={'xl'}
                      p={[2,3,4,5,6]}
                      px={[0,2,4,6]}
                      w={['100%']}>
                      {/* {day.txs.length > 0 && (
                        <TableCaption>
                          40 VENOMs prize has been sent to the winner{' '}
                          <Link
                            style={{ textDecoration: 'underline' }}
                            href={VENOMSCAN_TX + day.txs[0]}
                            target="_blank">
                            {' '}
                            TX Hash{' '}
                          </Link>
                        </TableCaption>
                      )} */}
                      <Thead h={'60px'}>
                        <Tr>
                          <Th>🎁 Prize</Th>
                          <Th>Wallet Address</Th>
                        </Tr>
                      </Thead>

                      <Tbody>
                        {day.winners.map((winner, i) => (
                          <Winner
                            owner={winner.owner}
                            prize={winner.prize}
                            tx={winner.tx}
                            name={winner.name}
                            key={`winner-${winner.owner}-${i}`}
                          />
                        ))}
                      </Tbody>
                      <Tfoot></Tfoot>
                    </Table>
                  </TabPanel>
                ))}
              </TabPanels>
            </Tabs>
          </Flex>
        </Flex>
      </ModalBody>
      </ModalContent>
      </Modal>

      {/* mintedNft && (
          <MintSuccessModal
            address={String(mintedNft?.address)}
            image={String(mintedNft?.preview?.source)}
            name={String(mintedNft?.name)}
            open={isOpen}
            _onClose={onClose}
          />
        )*/}
      
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
                <li>If you are among the .venom domain winners, you will be asked to input your desired domain and we will register it to your wallet (No Fee Required)!</li>
              </Text>

              <Text fontWeight="normal" fontSize={['xl', 'xl', '2xl', '2xl']} textAlign={['left']}>
                <li>If you are among the 40 VENOM token winners, your prize will be airdropped to your wallet!</li>
              </Text>
              <Text fontWeight="normal" fontSize={['xl', 'xl', '2xl', '2xl']} textAlign={['left']}>
                <li>All Previous Winners are/will be visible on this page until 1st august ( Winners Table above )</li>
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
