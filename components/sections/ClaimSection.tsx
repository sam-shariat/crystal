import {
  Button,
  Container,
  Heading,
  Text,
  InputGroup,
  Input,
  InputLeftAddon,
  Stack,
  SimpleGrid,
  Box,
  useMediaQuery,
  useColorMode,
  Flex,
  useToast,
  useColorModeValue,
  Center,
  Spinner,
  InputRightAddon,
  InputRightElement,
  SkeletonCircle,
  SkeletonText,
  Skeleton,
} from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import DomainAbi from 'abi/Domain.abi.json';
import TokenWalletAbi from 'abi/TokenWallet.abi.json';
import {
  nameAtom,
  venomContractAtom,
  venomContractAddressAtom,
  primaryNameAtom,
  localeAtom,
  venomContractAtomV1,
  venomContractAtomV2,
  mintOpenAtom,
  isConnectedAtom,
  claimingNameAtom,
  rootContractAtom,
  pathAtom,
  signMessageAtom,
  venomProviderAtom,
  connectedAccountAtom,
  openRegisterAtom,
} from 'core/atoms';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { addAsset, useConnect, useVenomProvider } from 'venom-react-hooks';
import { useTranslate } from 'core/lib/hooks/use-translate';
import {
  MINT_DATE,
  MINT_MESSAGE,
  MIN_NAME_LENGTH,
  OASIS_COLLECTION,
  ROOT_CONTRACT_ADDRESS,
  SIGN_MESSAGE,
  TLD,
  VARIATIONS_VIDS,
  VENOMART_COLLECTION,
} from 'core/utils/constants';
import { invalidUsernameMessage, isValidUsername, sleep } from 'core/utils';
import { LinkIcon, Logo, LogoIcon } from 'components/logos';
import Link from 'next/link';
import { isValidName } from 'ethers/lib/utils';
import RegisterModal from 'components/claiming/RegisterModal';
import AnimateOpacity from 'components/animate/AnimateOpacity';
import {
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
  motion,
} from 'framer-motion';
import DomainName from 'components/features/DomainName';
import AnimateScale from 'components/animate/AnimateScale';
import getRootConfigs from 'core/utils/getRootConfigs';

interface Message {
  type: any;
  title: string;
  msg: string;
  link?: string;
}

interface Fee {
  value0: number;
}

const ClaimSection = () => {
  let timer: any;
  const { t } = useTranslate();
  const connected = useAtomValue(isConnectedAtom);
  const connectedAccount = useAtomValue(connectedAccountAtom);
  const provider = useAtomValue(venomProviderAtom);
  const { colorMode } = useColorMode();
  const lightMode = colorMode === 'light';
  const rootContract = useAtomValue(rootContractAtom);
  const [fee, setFee] = useState<number | null>();
  const [typing, setTyping] = useState<boolean>(false);
  const [mintedOnTestnet, setMintedOnTestnet] = useState(0);
  const [earlyLoading, setEarlyLoading] = useState(true);
  const [feeIsLoading, setFeeIsLoading] = useState(false);
  const [nameExists, setNameExists] = useState(false);
  const [nameStatus, setNameStatus] = useState<number | null>();
  const [reload, setReload] = useState(false);
  const [totalSupply, setTotalSupply] = useState<number | null>(null);
  const VenomContractAddress = useAtomValue(venomContractAddressAtom);
  const [mintOpen, setMintOpen] = useAtom(mintOpenAtom);
  //const [venomContract, setVenomContract] = useState<any>(undefined);

  const [name, setName] = useAtom(claimingNameAtom);
  const [openRegister, setOpenRegister] = useAtom(openRegisterAtom);
  const [path, setPath] = useAtom(pathAtom);
  //const [vidUrl, setVidUrl] = useState('');
  const [primaryName, setPrimaryName] = useAtom(primaryNameAtom);
  const toast = useToast({containerStyle : {
    gap : 2,
  }});

  async function inputChange() {
    if (path === '') return;
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
      setFee(null);
      return;
    }

    if (
      provider &&
      provider?.isInitialized &&
      connected &&
      rootContract &&
      rootContract.methods !== undefined
    ) {
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
            setNameStatus(Number(result?.status));
            console.log(result);
          }
          setNameExists(result ? true : false);
        } catch (e) {
          setNameExists(false);
          setNameStatus(7);
          setName(path);
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
    if (!connected && path.length > MIN_NAME_LENGTH) {
      toast.closeAll();
      toast({
        status: 'info',
        colorScheme: colorMode === 'dark' ? 'light' : 'dark',
        title: t('connectWallet'),
        description: t('venomWalletConnect'),
        duration: 3000,
        isClosable: true,
      });
      return;
    }

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

  useEffect(() => {
    async function checkActive() {
      
      setTotalSupply(null);
      
      
        const configs = await getRootConfigs(connectedAccount);
        if(configs.status === 200){
          let _total = configs.data.total.count;
          console.log(configs.data);
          setTotalSupply(_total);
        } else {
          console.log('error fetching total registered')
          console.log(configs);
        }
      
    }

    checkActive();
    
  }, [connectedAccount, reload]);

  const [notMobile] = useMediaQuery('(min-width: 992px)');

  return (
    <Box id="claim">
      <Container
        as="main"
        width={'100%'}
        display="grid"
        placeContent="center"
        placeItems="center"
        minH="100vh"
        p={[4]}
        py={16}>
        <Box gap={4} width={'100%'}>
          <SimpleGrid
            columns={[1]}
            spacing={['64px', '64px', '32px']}
            gap={['64px', '64px', '32px']}
            py={8}
            alignItems={'center'}
            minWidth={['100%', '100%', '100%', 'container.md', 'container.lg']}>
            <Flex flexDirection="column" gap={4}>
              <AnimateOpacity delay={0}>
                <Center gap={4} alignItems={'flex-start'}>
                  {notMobile && <LogoIcon />}
                  <Heading
                    h={'2'}
                    textAlign={['center', 'center']}
                    fontWeight="bold"
                    fontSize={['4xl']}
                    height={[98, 98, 54]}
                    bgGradient={
                      lightMode
                        ? 'linear(to-r, var(--venom1), var(--bluevenom1))'
                        : 'linear(to-r, var(--venom1), var(--bluevenom1))'
                    }
                    bgClip="text">
                    {t('description')}
                  </Heading>
                </Center>
              </AnimateOpacity>
              <AnimateOpacity delay={0.3}>
                <Text textAlign={['center', 'center']} fontSize={['lg', 'lg', 'xl']}>
                  {t('claimDescription')}
                </Text>
              </AnimateOpacity>
            </Flex>
          </SimpleGrid>

          {/* {totalSupply ? ( */}
          <AnimateOpacity delay={0.6}>
            <Stack py={[8]} w={'100%'} align={'center'} gap={4}>
              {mintOpen ? (
                <Flex direction={'column'} w={'100%'} align={'center'}>
                  <InputGroup size="lg">
                    <Input
                      height={['80px']}
                      placeholder="Enter Domain Name"
                      variant={'filled'}
                      value={path}
                      fontSize={['2xl']}
                      borderWidth="1px"
                      borderColor={'whiteAlpha.500'}
                      rounded={'full'}
                      _focus={{
                        borderColor: 'whiteAlpha.800',
                        bg: colorMode === 'dark' ? 'blackAlpha.400' : 'white',
                      }}
                      _hover={{
                        borderColor: 'whiteAlpha.700',
                        bg: colorMode === 'dark' ? 'blackAlpha.400' : 'white',
                      }}
                      px={[6]}
                      onChange={(e) => setPath(e.target.value.toLowerCase())}
                      bg={colorMode === 'dark' ? 'blackAlpha.300' : 'whiteAlpha.700'}
                      isDisabled={openRegister}
                    />
                  </InputGroup>
                </Flex>
              ) : (
                <>
                  <Flex direction={'column'} gap={4} w={'100%'}>
                    <Text
                      my={2}
                      w={'100%'}
                      textAlign={'center'}
                      fontSize={['lg', 'lg', 'xl', '2xl']}>
                      {MINT_MESSAGE} <strong>{MINT_DATE}</strong>
                    </Text>
                  </Flex>
                </>
              )}
            </Stack>
          </AnimateOpacity>

          {/* ) : (
            <Center width={'100%'} gap={8} height={160} bg={colorMode === 'light' ? 'var(--venom1)':'var(--venom)'} rounded={'xl'}>
              
              {isConnected ? <><Spinner size="lg" />
              <Text fontSize={'xl'}>Loading Contracts Data</Text></> : <Text fontSize={'xl'}>{t('venomWalletConnect')}</Text>}

            </Center>
          )} */}

          {path.length > MIN_NAME_LENGTH && rootContract?.methods && (
            <AnimateOpacity delay={0}>
              <Flex
                minWidth={['100%', 'md', 'xl', 'container.md', 'container.lg']}
                borderColor={'whiteAlpha.200'}
                borderWidth={1}
                rounded={['3xl', '3xl', 'full']}
                gap={2}
                justifyContent={'space-between'}
                alignItems={'center'}
                p={5}
                bgColor={colorMode === 'light' ? 'whiteAlpha.700' : 'blackAlpha.200'}>
                {typing ? (
                  <>
                    <Flex
                      gap={4}
                      align={'center'}
                      direction={['column', 'column', 'row']}
                      w={'100%'}>
                      <Flex gap={2} align={'center'} w={'100%'}>
                        <SkeletonCircle w={'64px'} h={'64px'} />
                        <Stack gap={2}>
                          <Skeleton w={'160px'} h={'30px'} />
                          <Skeleton w={'210px'} h={'28px'} />
                        </Stack>
                      </Flex>
                      <Skeleton w={['100%', '100%', 150]} h={66} rounded={'full'} />
                    </Flex>
                  </>
                ) : (
                  <>
                    {!feeIsLoading ? (
                      <Flex
                        direction={['column', 'column', 'row']}
                        gap={4}
                        w={'100%'}
                        align={'center'}>
                        <Flex gap={2} align={'center'} w={'100%'}>
                          <LinkIcon
                            type={nameExists ? 'RiCloseCircleFill' : 'RiCheckboxCircleFill'}
                            color={nameExists ? 'var(--red)' : 'var(--venom1)'}
                            size={64}
                          />
                          <Stack gap={0}>
                            <Text
                              fontSize={['xl', '2xl']}
                              fontWeight={colorMode === 'light' ? 'bold' : 'normal'}>
                              {path + '.' + TLD}
                            </Text>
                            <Text
                              fontSize={'xl'}
                              textAlign={'left'}
                              fontWeight={colorMode === 'light' ? 'bold' : 'normal'}
                              color={nameExists ? 'var(--red1)' : 'var(--venom2)'}>
                              {nameExists ? t('taken') : t('available')}
                            </Text>
                          </Stack>
                        </Flex>
                        <Button
                          minWidth={['100%', '100%', 'fit-content']}
                          colorScheme="green"
                          size="lg"
                          gap={2}
                          fontSize={'xl'}
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
                          height={['66px']}
                          isDisabled={
                            !isValidName(path) || nameExists || typing //|| mintedOnTestnet === 0
                          }
                          //onClick={(e) => claimVid(e.currentTarget.value)}>
                          onClick={(e) => setOpenRegister(true)}>
                          {!typing && nameStatus !== -1 ? (
                            'Register'
                          ) : (
                            <>
                              {notMobile ? 'Search' : ''}
                              <LinkIcon type="RiSearchLine" />
                            </>
                          )}
                        </Button>
                      </Flex>
                    ) : (
                      <Flex
                        gap={4}
                        align={'center'}
                        direction={['column', 'column', 'row']}
                        w={'100%'}>
                        <Flex gap={2} align={'center'} w={'100%'}>
                          <Box w={'64px'}>
                            <Spinner size={'xl'} />
                          </Box>
                          <Stack gap={0}>
                            <Text
                              fontSize={['xl', '2xl']}
                              fontWeight={colorMode === 'light' ? 'bold' : 'normal'}>
                              {path + '.' + TLD}
                            </Text>
                            <Text
                              fontSize={'xl'}
                              fontWeight={colorMode === 'light' ? 'bold' : 'light'}>
                              {' '}
                              {t('availability')}
                            </Text>
                          </Stack>
                        </Flex>
                        <Skeleton w={['100%', '100%', 150]} h={66} rounded={'full'} />
                      </Flex>
                    )}
                  </>
                )}
              </Flex>
            </AnimateOpacity>
          )}

          <Flex gap={[4,4,2,6]} justify={'center'} direction={['column','column','row']} pt={[8,8,24]}>
            <AnimateScale delay={1}>
              <Button p={4} rounded={'2xl'} h={'100px'} display={'flex'} flexDir={'column'} gap={2} w={['100%','100%','auto']} onClick={()=> setReload((r)=> !r)}>
                <Text>Registered Domains</Text>
                {totalSupply ? <Text fontSize={['2xl','2xl','2xl','4xl']}>{totalSupply}</Text> : <Center minH={'44px'}><Spinner size={'md'}/></Center>}
              </Button>
            </AnimateScale>
            <AnimateScale delay={1.3}>
            <Button as={Link} target='_blank' href={VENOMART_COLLECTION + ROOT_CONTRACT_ADDRESS} p={4} rounded={'2xl'} h={'100px'} display={'flex'} flexDir={'column'} gap={2} w={['100%','100%','auto']}>
                <Flex gap={4} align={'center'}><LinkIcon type={!lightMode ? 'https://ipfs.io/ipfs/QmXd1mZJerqR8SbgwLpBkFeMPwRx2DWP67EGX4TYXHg1Dx/S5ZuI6i9_400x400.jpg' : 'https://ipfs.io/ipfs/QmVBqPuqcH8VKwFVwoSGFHXUdG6ePqjmhEoNaQMsfd2xau/venomart.jpg'} size={'lg'}/><Stack gap={0}><Text textAlign={'left'}>Collection On</Text><Text fontSize={['2xl','2xl','2xl']} fontWeight={'light'}><strong>VENOM</strong> ART</Text></Stack></Flex>
              </Button>
            </AnimateScale>
            <AnimateScale delay={1.6}>
            <Button as={Link} target='_blank' href={OASIS_COLLECTION + ROOT_CONTRACT_ADDRESS} p={4} rounded={'2xl'} h={'100px'} display={'flex'} flexDir={'column'} gap={2} w={['100%','100%','auto']}>
                <Flex gap={4} align={'center'}><LinkIcon type={'https://ipfs.io/ipfs/QmNXPY57PSu72UZwoDyXsmHJT7UQ4M9EfPcyZwpi3xqMQV/oasisgallery.svg.svg'} size={'lg'}/><Stack gap={0}><Text textAlign={'left'}>Collection On</Text><Text fontSize={['2xl','2xl','2xl']} fontWeight={'light'}>Oasis Gallery</Text></Stack></Flex>
              </Button>
            </AnimateScale>
          </Flex>

          <RegisterModal />
          {/* <Text fontWeight="light" fontSize={'xl'} py={6}>
            {t('claimDescription')}
          </Text> */}
          {/* <Flex gap={2} alignItems={'center'} flexDirection={notMobile ? 'row':'column'}>
            <Button height={100} colorScheme='twitter' variant={'outline'}>
              <RiTwitterFill size={'60px'} />
            </Button> */}
        </Box>
      </Container>
    </Box>
  );
};

export default ClaimSection;
