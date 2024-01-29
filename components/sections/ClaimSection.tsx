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
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Address } from 'everscale-inpage-provider';
import DomainAbi from 'abi/Domain.abi.json';
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
} from 'core/utils/constants';
import { Transaction } from 'everscale-inpage-provider';
import { base64ToBlob, isValidSignHash, isValidUsername, sleep } from 'core/utils';
import ClaimModal from 'components/claiming/ClaimModal';
import TextCard from 'components/claiming/TextCard';
import ImageBox from 'components/claiming/ImageBox';
import { useStorageUpload } from '@thirdweb-dev/react';
import VIDImage from 'components/claiming/VIDImage';
import { renderToStaticMarkup } from 'react-dom/server';
import { LinkIcon } from 'components/logos';
import Link from 'next/link';

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
  const { isConnected, account } = useConnect();
  const connected = useAtomValue(isConnectedAtom);
  const { provider } = useVenomProvider();
  const signHash = useAtomValue(signHashAtom);
  const signDate = useAtomValue(signDateAtom);
  const setSignRequest = useSetAtom(signRequestAtom);
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
  const [claimedName, setClaimedName] = useState('');
  const { add } = addAsset(String(account?.address), CONTRACT_ADDRESS);
  const VenomContractAddress = useAtomValue(venomContractAddressAtom);
  const [mintOpen, setMintOpen] = useAtom(mintOpenAtom);
  //const [venomContract, setVenomContract] = useState<any>(undefined);
  const minFee = 660000000;
  const [name, setName] = useAtom(claimingNameAtom);
  const [path, setPath] = useAtom(pathAtom);
  //const [vidUrl, setVidUrl] = useState('');
  const [primaryName, setPrimaryName] = useAtom(primaryNameAtom);
  const toast = useToast();

  async function inputChange() {
    if (path === '') return;
    window.clearTimeout(timer);
    clearTimeout(timer);

    if (provider && provider?.isInitialized && rootContract && rootContract.methods !== undefined) {
      try {
        setFeeIsLoading(true);
        setTyping(false);
        toast.closeAll();
        // @ts-ignore: Unreachable code error
        const { amount: _fee } = await rootContract.methods
          .expectedRegisterAmount({
            name: `${path}.vid`,
            duration: 60 * 60 * 24 * 365,
            answerId: 22,
          })
          .call({ responsible: true });

        // @ts-ignore: Unreachable code error
        const certificateAddr = await rootContract.methods
          .resolve({ path: `${path}.vid`, answerId: 0 })
          .call({ responsible: true });
          console.log(certificateAddr);

        const domainContract = new provider.Contract(DomainAbi, certificateAddr.certificate);
        console.log(domainContract)
        try { 
        // @ts-ignore: Unreachable code error
          let result = await domainContract.methods.getStatus({ answerId: 0 }).call();
          console.log(result)
          setNameExists(result ? true : false);
        } catch (e){
          setNameExists(false);

        }
        
        console.log(_fee);
        setFee(_fee);
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
    if (!connected && path.length > 2) {
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

    if (path.length > 2 && !isValidUsername(path) && path.length < 30) {
      toast.closeAll();
      toast({
        status: 'warning',
        title: t('invalidName'),
        description: t('invalidNameMsg'),
        isClosable: true,
      });
      return;
    }

    if (path.length > 3) {
      window.clearTimeout(timer);
      clearTimeout(timer);
      setTyping(true);
      timer = window.setTimeout(inputChange, 2000);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [path]);

  // useEffect(() => {
  //   async function checkActive() {
  //     const isActive = await rootContract.methods._active().call();
  //     setMintOpen(isActive._active);
  //   }
  //   if (provider?.isInitialized && rootContract && rootContract.methods._active()) {
  //     checkActive();
  //   }
  // }, [provider, rootContract]);

  async function claimVid(e: string) {
    if (!isConnected && name.length > 0) {
      toast.closeAll();
      toast({
        status: 'info',
        title: t('connectWallet'),
        description: t('venomWalletConnect'),
        isClosable: true,
      });
      return;
    }

    if (name.length > 2 && !isValidUsername(name) && name.length < 30) {
      toast.closeAll();
      toast({
        status: 'warning',
        title: t('invalidName'),
        description: t('invalidNameMsg'),
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
      setSignRequest(true);
      // console.log('need to sign');
      return;
    }

    setMessage({ type: '', title: '', msg: '' });

    if (name.length >= 3 && !nameExists && venomContract?.methods) {
      setIsMinting(true);
      toast({
        status: 'loading',
        title: t('preparing'),
        description: t('preparingMint'),
        duration: null,
      });

      // const vidimage = renderToStaticMarkup(<VIDImage name={name} key={name} />);
      // const vidbase64 = btoa(vidimage);
      // const vidblob = base64ToBlob(vidbase64, 'image/svg+xml');

      // const uris = await upload({ data: [vidblob] });
      // let vidImageUrl = '';
      // if (uris[0].length > 30 && uris[0].includes('ipfs://')) {
      //   vidImageUrl = 'https://ipfs.io/ipfs/' + uris[0].slice(7);
      //   // console.log(vidImageUrl)
      // } else {
      //   toast.closeAll();
      //   toast({
      //     status: 'warning',
      //     title: t('uploading problem'),
      //     description: t('there is a problem with uploading the nft image to ipfs'),
      //     duration: null,
      //   });
      //   return;
      // }

      toast.closeAll();
      toast({
        status: 'loading',
        title: t('minting'),
        description: t('confirmInWallet'),
        duration: null,
      });
      // @ts-ignore: Unreachable code error
      const mintTx = await venomContract?.methods
        .mintNft({ json: JSON.stringify({}), name: name.toLowerCase() })
        .send({
          amount: String(minFee + Number(fee)),
          bounce: true,
          from: account?.address,
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
              if (tx_in_tree.account.equals(VenomContractAddress)) {
                receiptTx = tx_in_tree;
              }
            })
            .finished();

        // Decode events by using abi
        // we are looking for event Game(address player, uint8 bet, uint8 result, uint128 prize);

        let events = await venomContract.decodeTransactionEvents({
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
          setClaimedName(name);
          toast.closeAll();
          setMessage({
            type: 'success',
            title: t('mintSuccess'),
            msg: t('mintSuccessMsg'),
            link: nftAddress,
          });
          if (primaryName?.name === '') {
            setPrimaryName({ name: name });
          }
        }
        setIsMinting(false);
        setIsConfirming(false);
        await sleep(1000);
        setName('');
      }
    }
  }

  const [notMobile] = useMediaQuery('(min-width: 768px)');

  return (
    <Box backgroundColor={colorMode === 'dark' ? 'blackAlpha.200' : 'auto'} id="claim">
      <Container
        as="main"
        maxW={['container.md', 'container.md', 'container.md', 'container.lg']}
        display="grid"
        placeContent="center"
        placeItems="center"
        minH="90vh"
        py={6}>
        <Box gap={4} width={'100%'}>
          <SimpleGrid
            columns={[1, 1, 2]}
            spacing={['64px', '64px', '32px']}
            gap={'64px'}
            py={10}
            alignItems={'center'}
            minWidth={['100%', '100%', '100%', 'container.md', 'container.lg']}>
            <Box display="flex" flexDirection="column">
              <Heading
                textAlign={['center', 'center', locale === 'fa' ? 'right' : 'left']}
                fontWeight="bold"
                fontSize={['6xl', '6xl', '6xl', '6xl', '7xl']}>
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
                size={['240px', '240px', '240px', '280px', '320px']}
              />
            </Box>
          </SimpleGrid>
          <ClaimModal claimedName={claimedName} message={message} />
          {/* {totalSupply ? ( */}
          <Stack py={[10]} w={'100%'} align={'center'} gap={8}>
            <SimpleGrid columns={[1]} gap={8} w={'100%'}>
                <TextCard
                  domain={`10K unique names`}
                  text={"3.5k owners & 12k txs on Beta"}
                  header={''}
                />
              </SimpleGrid>
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
                    rounded={'full'}
                    px={[4, 4, 6]}
                    onChange={(e) => setPath(e.target.value.toLowerCase())}
                    //bg={colorMode === 'dark' ? 'blackAlpha.300' : 'white'}
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
                      disabled={name.length < 3 || nameExists || isMinting || isConfirming}
                      isLoading={feeIsLoading || isMinting}
                      loadingText={
                        isMinting && !isConfirming
                          ? 'Claiming ...'
                          : isMinting && isConfirming
                          ? t('confirming')
                          : ''
                      }
                      onClick={(e) => claimVid(e.currentTarget.value)}>
                      {notMobile ? 'Search' : ''}
                      <LinkIcon type="RiSearchLine" />
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
          

          {path.length > 2 && !typing && fee !== -1 && venomContract?.methods && (
            <Flex
              minWidth={notMobile ? 'md' : 'xs'}
              borderColor={'whiteAlpha.100'}
              borderWidth={1}
              borderRadius={10}
              justifyContent={'space-between'}
              alignItems={'center'}
              mb={4}
              p={5}
              bgColor={'blackAlpha.200'}>
              <Box>
                <Text fontWeight={'bold'}>
                  {t('mintingFee')} :{' '}
                  {fee && !feeIsLoading ? Math.round(fee / 1e3) / 1e6 : t('calculating')}
                </Text>
                <Text fontWeight={'light'}>
                  {t('reserveFee')} : {`${Math.round(minFee / 1e3) / 1e6}`}
                </Text>
              </Box>

              {!feeIsLoading ? (
                <Text
                  fontSize={'lg'}
                  textAlign={'right'}
                  fontWeight={colorMode === 'light' ? 'bold' : 'light'}
                  color={nameExists ? 'var(--red1)' : 'var(--venom2)'}>
                  {nameExists ? path + '.vid ' + t('taken') : path + '.vid ' + t('available')}
                </Text>
              ) : (
                <Text
                  fontSize={'lg'}
                  textAlign={'right'}
                  fontWeight={colorMode === 'light' ? 'bold' : 'light'}>
                  {' '}
                  {t('availability')}
                </Text>
              )}
            </Flex>
          )}

          <Button
            as={Link}
            href="\community"
            style={{ textDecoration: 'none' }}
            width={'100%'}
            py={4}
            justifyContent={'center'}
            gap={2}
            rounded={'full'}
            variant={'ghost'}
            height={['64px', '72px', '80px']}
            size={'lg'}>
            <LinkIcon type="RiVerifiedBadgeLine" size={notMobile ? '32' : '24'} color={colorMode === 'light' ? 'var(--venom2)': 'var(--venom0)'}/>
            <Text fontWeight={'bold'} fontSize={['lg', 'xl', '2xl']} bgGradient={
                      colorMode === 'light'
                        ? 'linear(to-r, var(--venom2), var(--bluevenom2))'
                        : 'linear(to-r, var(--venom0), var(--bluevenom0))'
                    }
                    bgClip="text">
              {notMobile ? 'Join The' : 'Join'} Early Adopter Program
            </Text>
          </Button>
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
