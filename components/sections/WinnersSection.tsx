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
import { Links } from 'components/Profile';
import DomainTag from 'components/features/DomainTag';

interface WinnersProps {
  challenge: any;
}

export default function WinnersSection({ challenge }: WinnersProps) {
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
  const [idMints, setIdMints] = useState<number | null>(null);
  const [mintedNft, setMintedNft] = useState<BaseNftJson | null>();
  const rootContract = useAtomValue(rootContractAtom);

  const toast = useToast();
  const maxSupply = 2222;
  console.log(challenge);
  let _domains = 0;
  challenge.winners.map((w:any) =>
    w.winners.map((wallet:any) => {
      if (wallet.tx !== '') {
        _domains++;
      }
    })
  );
  const domains = _domains;

  useEffect(() => {
    const checkMinteds = async () => {
      //await loadMinteds();
      setIsLoading(false);  
    };

    if (!provider || !provider.isInitialized) return;
    if (!connectedAccount || connectedAccount === '') return;
    //if (!isOpen) return;

    challenge.winners.map((w:any) => {
      w.winners.map((wallet:any) => {
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

  return (
    <>
      <Container
        maxW="container.xl"
        display="grid"
        placeContent="center"
        placeItems="center"
        minH="90vh"
        py={16}
        pb={0}>
        <SimpleGrid columns={[1, 1, 1]} gap={[10, 10, 10, 2]} placeItems={'center'}>
          <GridItem>
            <Stack px={[0, 4, 6]} gap={12} align={'center'}>
              <Center flexDirection={'column'} p={[4, 6, 8, 16]} rounded={'2xl'} gap={8} w={'100%'}>
                <Text fontWeight="bold" fontSize={['2xl', '4xl']} textAlign={['center']}>
                  {challenge.title}
                </Text>
                <ImageBox
                  srcUrl={`/screens/${challenge.screenImage}`}
                  rounded="2xl"
                  size={'100%'}
                />
                <SimpleGrid columns={[1, 1, 1,2]} gap={12} py={6} placeContent={'center'} placeItems={'center'}>
                  <Stack gap={3} w={'100%'} p={[4,6,8]} bgColor={colorMode === 'light' ? 'white' : 'blackAlpha.300'}
                  rounded={'2xl'}>
                    <DomainTag name={challenge.domain} />
                <Text fontSize={['lg', 'xl']} fontWeight={'bold'}>{challenge.title}</Text>
                <Text fontSize={['2xl']} fontWeight={'bold'} bgGradient={
                    colorMode === 'light'
                      ? 'linear(to-r, var(--venom2), var(--bluevenom2))'
                      : 'linear(to-r, var(--venom0), var(--bluevenom0))'
                  }
                  bgClip="text">Description</Text>
                <Text fontSize={['lg', 'xl']}>{challenge.challenge}</Text>

                <Text
                  fontWeight={'bold'}
                  fontSize={['2xl']}
                  bgGradient={
                    colorMode === 'light'
                      ? 'linear(to-r, var(--venom2), var(--bluevenom2))'
                      : 'linear(to-r, var(--venom0), var(--bluevenom0))'
                  }
                  bgClip="text">
                  Prize Pool
                </Text>
                <Text fontSize={['lg', 'xl']}>{challenge.prize}</Text>
                <Stack
                  gap={2}
                  align={'center'}
                  py={2}
                  bgColor={colorMode === 'light' ? 'white' : 'blackAlpha.300'}
                  rounded={'2xl'}
                  fontSize={'lg'}
                  w={['100%', 'sm', 'md']}>
                  <Text fontSize={['xl', '2xl']} px={6} fontWeight="bold" py={3} rounded={'2xl'}>
                    {challenge.status}
                  </Text>
                  <Center gap={2} borderTop={'1px solid #77777777'} w={'100%'} p={4}>
                    <LinkIcon type={challenge.prize_img} size={'md'} /> {challenge.sent} of {challenge.prizes[0]} Airdropped
                  </Center>
                  <Center gap={2} borderTop={'1px solid #77777777'} w={'100%'} p={4}>
                    <LinkIcon type="venomid" size={22} /> {domains} of {challenge.prizes[1]} Sent
                  </Center>
                </Stack>

                {won && (
              <Flex
                gap={3}
                w={['100%', '100%']}
                fontSize={['lg', 'lg', 'xl']}
                p={4}
                justify={'center'}
                align={'center'}
                direction={'column'}
                textAlign={'center'}
                bgColor={colorMode === 'light' ? 'white' : 'whiteAlpha.200'}
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
                
                <Button
                  colorScheme="venom"
                  onClick={onOpen}
                  isDisabled={challenge.status !== 'Winners Announced'}
                  size={'lg'}
                  variant={'solid'}
                  w={['100%', 'sm', 'md']}
                  height={'64px'}
                  fontSize={'2xl'}>
                  <Center
                    bg={colorMode === 'dark' ? 'blackAlpha.800' : 'white'}
                    bgClip={'text'}
                    gap={3}>
                    <Text> 🏆 </Text>Winners Table <Text> 🏆 </Text>
                  </Center>
                </Button>
                </Stack>
                <Flex w={'100%'}>
                {challenge.tweet !== '' ? <Links
                  json={{
                    links: [
                      {
                        type: 'tweet',
                        title: challenge.title,
                        url: challenge.tweet,
                        styles: {
                          size: 'lg',
                        },
                      },
                    ],
                  }}
                /> : <Center w={'100%'}>Twitter Post will be published soon</Center>}
                </Flex>
                </SimpleGrid>
              </Center>
            </Stack>
          </GridItem>
        </SimpleGrid>
      </Container>

      <Modal isOpen={isOpen} onClose={onClose} size={'full'}>
        <ModalOverlay bg="blackAlpha.700" backdropFilter="auto" backdropBlur={'6px'} />
        <ModalContent bg={colorMode === 'light' ? 'var(--white)' : 'var(--dark1)'}>
          <ModalHeader
            textAlign={'center'}
            display={'flex'}
            gap={2}
            justifyContent={'center'}
            fontSize={['2xl', '3xl']}>
            🏆 Winners Table 🏆
            <ModalCloseButton />
          </ModalHeader>
          <ModalBody display={'flex'} justifyContent={'center'} alignContent={'center'} w={'100%'}>
            <Flex direction={'column'} gap={[16, 12, 10]} w={'100%'}>
              <Flex gap={6} direction={'column'} fontSize={['lg', 'lg', 'xl', '2xl']} w={'100%'}>
                <Text fontSize={'3xl'} fontWeight={'bold'}  w={'100%'} p={4}
                rounded={'2xl'}
                bgColor={colorMode === 'light' ? 'white' : 'blackAlpha.300'}>
                  Winners of {challenge.title}
                </Text>
              </Flex>
              <Flex gap={3} direction={'column'} w={'100%'}>
                <Tabs
                  colorScheme="green"
                  rounded={'2xl'}
                  defaultIndex={1}
                  
                  variant={'solid-rounded'}
                  size={['sm', 'md', 'lg']}
                  px={0}
                  w={['sm', 'md', '100%']}
                  isLazy>
                  <TabList
                    overflowY="hidden"
                    sx={{
                      scrollbarWidth: 'none',
                      '::-webkit-scrollbar': {
                        display: 'none',
                      },
                    }}>
                    {challenge.winners.map((day:any, i:number) => (
                      <Tab
                        fontWeight={'bold'}
                        key={'tab-prize-' + day.date + '-' + i}
                        flexShrink={0}>
                        {day.date}
                      </Tab>
                    ))}
                  </TabList>

                  <TabPanels>
                    {challenge.winners.map((day:any,  i:number) => (
                      <TabPanel key={'tab-panel-prize-' + day.date + '-' + i} px={0}>
                        <Text fontSize={'2xl'} py={4}>
                          Winners of {day.date} prizes
                        </Text>
                        <Table
                          variant="simple"
                          bgColor={colorMode === 'light' ? 'white' : 'blackAlpha.400'}
                          fontSize={['lg', 'lg', 'xl']}
                          rounded={'xl'}
                          p={[2, 3, 4, 5, 6]}
                          px={[0, 2, 4, 6]}
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
                            {day.winners.map((winner:any,  i:number) => (
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
    </>
  );
}
