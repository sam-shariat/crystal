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
import { useEffect, useState } from 'react';
import { Address } from 'everscale-inpage-provider';
import DomainAbi from 'abi/Domain.abi.json';
import TokenWalletAbi from 'abi/TokenWallet.abi.json';
import {
  nameAtom,
  venomContractAtom,
  venomContractAddressAtom,
  primaryNameAtom,
  localeAtom,
  signHashAtom,
  signDateAtom,
  signRequestAtom,
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
} from 'core/atoms';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { addAsset, useConnect, useVenomProvider } from 'venom-react-hooks';
import { useTranslate } from 'core/lib/hooks/use-translate';
import {
  SITE_PROFILE_URL,
  NFT_IMAGE_URL,
  CONTRACT_ADDRESS,
  MINT_OPEN,
  MINT_DATE,
  MINT_MESSAGE,
  MINT_TOTAL_SUPPLY,
  TOKEN_WALLET_ADDRESS,
  ROOT_CONTRACT_ADDRESS,
  MIN_NAME_LENGTH,
  SIGN_MESSAGE,
} from 'core/utils/constants';
import { Transaction } from 'everscale-inpage-provider';
import {
  base64ToBlob,
  invalidUsernameMessage,
  isValidSignHash,
  isValidUsername,
  sleep,
} from 'core/utils';
import ClaimModal from 'components/claiming/ClaimModal';
import TextCard from 'components/claiming/TextCard';
import ImageBox from 'components/claiming/ImageBox';
import { useSDK, useStorageUpload } from '@thirdweb-dev/react';
import VIDImage from 'components/claiming/VIDImage';
import { renderToStaticMarkup } from 'react-dom/server';
import { LinkIcon } from 'components/logos';
import Link from 'next/link';
import { isValidName } from 'ethers/lib/utils';

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
  const signHash = useAtomValue(signHashAtom);
  const signDate = useAtomValue(signDateAtom);
  const setSignMessage = useSetAtom(signMessageAtom);
  const { colorMode } = useColorMode();
  const locale = useAtomValue(localeAtom);
  const venomContract = useAtomValue(venomContractAtom);
  const rootContract = useAtomValue(rootContractAtom);
  const venomContractV1 = useAtomValue(venomContractAtomV1);
  const venomContractV2 = useAtomValue(venomContractAtomV2);
  const [feeIsLoading, setFeeIsLoading] = useState(false);
  const [isMinting, setIsMinting] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const { mutateAsync: upload } = useStorageUpload();
  const [fee, setFee] = useState<number | null>();
  //const [totalSupply, setTotalSupply] = useState<number | null>(0);
  const [typing, setTyping] = useState<boolean>(false);
  const [message, setMessage] = useState<Message>({ type: '', title: '', msg: '', link: '' });
  const [nameExists, setNameExists] = useState(false);
  const [nameStatus, setNameStatus] = useState<number | null>();
  const [claimedName, setClaimedName] = useState('');
  const VenomContractAddress = useAtomValue(venomContractAddressAtom);
  const [mintOpen, setMintOpen] = useAtom(mintOpenAtom);
  //const [venomContract, setVenomContract] = useState<any>(undefined);
  const minFee = 330000000;
  const [name, setName] = useAtom(claimingNameAtom);
  const [path, setPath] = useAtom(pathAtom);
  //const [vidUrl, setVidUrl] = useState('');
  const [primaryName, setPrimaryName] = useAtom(primaryNameAtom);
  const toast = useToast();
  const sdk = useSDK();

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
        duration:6000
      });
      setFee(null);
      return;
    }

    if (provider && provider?.isInitialized && connected && rootContract && rootContract.methods !== undefined) {
      try {
        setFeeIsLoading(true);
        setTyping(false);
        toast.closeAll();
        // @ts-ignore: Unreachable code error
        // const { amount: _fee } = await rootContract.methods
        //   .expectedRegisterAmount({
        //     name: `${path}.vid`,
        //     duration: 60 * 60 * 24 * 365,
        //     answerId: 22,
        //   })
        //   .call({ responsible: true });

        // @ts-ignore: Unreachable code error
        const certificateAddr = await rootContract.methods
          .resolve({ path: `${path}.vid`, answerId: 0 })
          .call({ responsible: true });
        console.log(certificateAddr);

        const domainContract = new provider.Contract(DomainAbi, certificateAddr.certificate);
        console.log(domainContract);
        try {
          // @ts-ignore: Unreachable code error
          let result: { status: string | number } = await domainContract.methods.getStatus({ answerId: 0 })
            .call();
          if (result && result?.status) {
            setNameStatus(Number(result?.status));
            console.log(result);
          }
          setNameExists(result ? true : false);
        } catch (e) {
          setNameExists(false);
          setNameStatus(7);
        }

        //setFee(_fee);
        setFeeIsLoading(false);
      } catch (er) {
        console.log(er);
        return;
      }
    } else if (venomContract?.methods === undefined) {
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
      const totalSupply = await rootContract.methods.totalSupply({answerId:0}).call();
      //console.log('totalSupply')
      console.log(totalSupply)
    }
    if (provider?.isInitialized && rootContract && rootContract.methods._active() && connected) {
      checkActive();
    }
  }, [provider, rootContract]);

  async function claimVid(e: string) {
    // if (!connected && path.length > 0) {
    //   toast.closeAll();
    //   toast({
    //     status: 'info',
    //     colorScheme: colorMode === 'dark' ? 'light' : 'dark',
    //     title: t('connectWallet'),
    //     description: t('venomWalletConnect'),
    //     isClosable: true,
    //   });
    //   return;
    // }

    if (!isValidUsername(path)) {
      toast.closeAll();
      toast({
        status: 'info',
        colorScheme: colorMode === 'dark' ? 'light' : 'dark',
        title: t('invalidName'),
        description: invalidUsernameMessage(path),
        isClosable: true,
      });
      return;
    }

    if (!isValidSignHash(signHash, signDate)) {
      toast.closeAll();
      toast({
        status: 'warning',
        title: t('signWarning'),
        description: t('signWarningMsg'),
        isClosable: true,
      });
      setSignMessage(primaryName && primaryName?.name !== '' ? `Hey there ${primaryName.name}, ${SIGN_MESSAGE}` : SIGN_MESSAGE);
      // console.log('need to sign');
      return;
    }

    setMessage({ type: '', title: '', msg: '' });

    if (
      provider &&
      provider?.isInitialized &&
      rootContract &&
      rootContract.methods !== undefined &&
      !nameExists &&
      connectedAccount.length > 60
    ) {
      setIsMinting(true);
      toast.closeAll();
      toast({
        status: 'loading',
        colorScheme: colorMode === 'dark' ? 'light' : 'dark',
        title: t('minting'),
        description: t('confirmInWallet'),
        duration: null,
      });

      // @ts-ignore: Unreachable code error
      const mintTx = await rootContract.methods
        .betaReg({
          path: `${path}.vid`,
          domainOwner: new Address(connectedAccount),
        })
        .send({
          from: new Address(connectedAccount),
          amount: String((1e9)),
          bounce: true,
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
          colorScheme: colorMode === 'dark' ? 'light' : 'dark',
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
              //console.log('tx_in_tree : ', tx_in_tree);
              if (tx_in_tree.account.equals(rootContract.address)) {
                receiptTx = tx_in_tree;
              }
            })
            .finished();

        
        let events = await rootContract.decodeTransactionEvents({
          transaction: receiptTx as Transaction,
        });

        console.log(events);

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
          setClaimedName(path);
          toast.closeAll();
          setMessage({
            type: 'success',
            title: t('mintSuccess'),
            msg: t('mintSuccessMsg'),
            link: nftAddress,
          });
          setPath('');
          if (primaryName?.name === '') {
            setPrimaryName({ name: `${path}.vid`, nftAddress: nftAddress });
          }
        }
        setIsMinting(false);
        setIsConfirming(false);
        await sleep(1000);
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
    }
  }

  const [notMobile] = useMediaQuery('(min-width: 768px)');

  return (
    <Box  id="claim">
      <Container
        as="main"
        maxW={['container.md', 'container.md', 'container.md', 'container.lg']}
        display="grid"
        placeContent="center"
        placeItems="center"
        minH="100vh"
        py={6}>
        <Box gap={4} width={'100%'}>
          <SimpleGrid
            columns={[1, 1, 2]}
            spacing={['64px', '64px', '32px']}
            gap={['64px', '64px', '32px']}
            py={10}
            alignItems={'center'}
            minWidth={['100%', '100%', '100%', 'container.md', 'container.lg']}>
            <Box display="flex" flexDirection="column">
              <Heading
                textAlign={['center', 'center', locale === 'fa' ? 'right' : 'left']}
                fontWeight="bold"
                fontSize={['5xl', '5xl', '6xl', '6xl', '7xl']}>
                {t('title')}
              </Heading>
              <Heading
                h={'3'}
                py={0}
                pb={[4, 4, 12]}
                textAlign={['center', 'center', locale === 'fa' ? 'right' : 'left']}
                fontWeight="bold"
                fontSize={['2xl', '2xl', '3xl', '4xl', '4xl']}
                my={notMobile ? 10 : 4}>
                {t('description')}
              </Heading>
            </Box>
            <Box display="flex" flexDirection="column" alignItems={['center', 'center', 'end']}>
              <ImageBox
                srcUrl="/logos/vidicon.svg"
                size={['180px', '200px', '220px', '240px', '280px']}
              />
            </Box>
          </SimpleGrid>
          <ClaimModal claimedName={claimedName} message={message} />
          {/* {totalSupply ? ( */}
          <Stack py={[10]} w={'100%'} align={'center'} gap={8}>
            {mintOpen ? (
              <Flex direction={'column'} w={'100%'} align={'center'}>
                <InputGroup size="lg">
                  <Input
                    height={['64px', '72px', '80px']}
                    placeholder="Enter Domain Name"
                    variant={'filled'}
                    value={path}
                    fontSize={['lg', 'xl', '2xl']}
                    borderWidth="1px"
                    borderColor={'whiteAlpha.200'}
                    rounded={'full'}
                    _focus={{
                      borderColor: 'whiteAlpha.500',
                      bg: colorMode === 'dark' ? 'blackAlpha.400' : 'white',
                    }}
                    _hover={{
                      borderColor: 'whiteAlpha.500',
                      bg: colorMode === 'dark' ? 'blackAlpha.400' : 'white',
                    }}
                    px={[4, 4, 6]}
                    onChange={(e) => setPath(e.target.value.toLowerCase())}
                    bg={colorMode === 'dark' ? 'blackAlpha.300' : 'whiteAlpha.700'}
                    disabled={isMinting || isConfirming}
                  />
                  <InputRightElement
                    w={'max-content'}
                    height={['64px', '72px', '80px']}
                    mx={[2, 2, 3]}>
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
                      height={['50px', '58px']}
                      isDisabled={!isValidName(path) || nameExists || isMinting || isConfirming}
                      isLoading={feeIsLoading || isMinting}
                      loadingText={
                        isMinting && !isConfirming
                          ? 'Claiming ...'
                          : isMinting && isConfirming
                          ? t('confirming')
                          : ''
                      }
                      onClick={(e) => claimVid(e.currentTarget.value)}>
                      {!typing && nameStatus !== -1 ? (
                        'Register'
                      ) : (
                        <>
                          {notMobile ? 'Search' : ''}
                          <LinkIcon type="RiSearchLine" />
                        </>
                      )}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </Flex>
            ) : (
              <>
                <Flex direction={'column'} gap={4} w={'100%'}>
                  <Text my={2} w={'100%'} textAlign={'center'} fontSize={['lg', 'lg', 'xl', '2xl']}>
                    {MINT_MESSAGE} <strong>{MINT_DATE}</strong>
                  </Text>
                </Flex>
              </>
            )}
          </Stack>
          {/* ) : (
            <Center width={'100%'} gap={8} height={160} bg={colorMode === 'light' ? 'var(--venom1)':'var(--venom)'} rounded={'xl'}>
              
              {isConnected ? <><Spinner size="lg" />
              <Text fontSize={'xl'}>Loading Contracts Data</Text></> : <Text fontSize={'xl'}>{t('venomWalletConnect')}</Text>}

            </Center>
          )} */}

          {path.length > MIN_NAME_LENGTH && rootContract?.methods && (
            <Flex
              minWidth={notMobile ? 'md' : 'xs'}
              borderColor={'whiteAlpha.200'}
              borderWidth={1}
              rounded={'full'}
              gap={2}
              justifyContent={'space-between'}
              alignItems={'center'}
              p={5}
              bgColor={colorMode === 'light' ? 'whiteAlpha.700' : 'blackAlpha.200'}>
              {typing ? (
                <>
                  <Flex gap={2} align={'center'}>
                    <SkeletonCircle w={'64px'} h={'64px'} />
                    <Stack gap={2}>
                      <Skeleton w={'160px'} h={'30px'} />
                      <Skeleton w={'210px'} h={'28px'} />
                    </Stack>
                  </Flex>
                </>
              ) : (
                <>
                  {!feeIsLoading ? (
                    <Flex gap={2} align={'center'}>
                      <LinkIcon
                        type={nameExists ? 'RiCloseCircleFill' : 'RiCheckboxCircleFill'}
                        color={nameExists ? 'var(--red)' : 'var(--venom1)'}
                        size={64}
                      />
                      <Stack gap={0}>
                        <Text
                          fontSize={'2xl'}
                          fontWeight={colorMode === 'light' ? 'bold' : 'normal'}>
                          {path + '.vid '}
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
                  ) : (
                    <Flex gap={2} align={'center'}>
                      <Box w={'64px'}>
                        <Spinner size={'xl'} />
                      </Box>
                      <Stack gap={0}>
                        <Text
                          fontSize={'2xl'}
                          fontWeight={colorMode === 'light' ? 'bold' : 'normal'}>
                          {path + '.vid '}
                        </Text>
                        <Text fontSize={'xl'} fontWeight={colorMode === 'light' ? 'bold' : 'light'}>
                          {' '}
                          {t('availability')}
                        </Text>
                      </Stack>
                    </Flex>
                  )}
                </>
              )}
            </Flex>
          )}

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
