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
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import {
  nameAtom,
  venomContractAtom,
  venomContractAddressAtom,
  primaryNameAtom,
  localeAtom,
  signHashAtom,
  signDateAtom,
  signRequestAtom,
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
} from 'core/utils/constants';
import { Transaction } from 'everscale-inpage-provider';
import { isValidSignHash, isValidUsername, sleep } from 'core/utils';
import ClaimModal from 'components/claiming/ClaimModal';
import ImageBox from 'components/Layout/ImageBox';
import TextCard from 'components/Layout/TextCard';

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
  const { provider } = useVenomProvider();
  const signHash = useAtomValue(signHashAtom);
  const signDate = useAtomValue(signDateAtom);
  const setSignRequest = useSetAtom(signRequestAtom);
  const { colorMode } = useColorMode();
  const locale = useAtomValue(localeAtom);
  const venomContract = useAtomValue(venomContractAtom);
  const [feeIsLoading, setFeeIsLoading] = useState(false);
  const [isMinting, setIsMinting] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [fee, setFee] = useState<number | null>();
  const [d, setD] = useState<number | null>();
  const [m, setM] = useState<number | null>();
  const [h, setH] = useState<number | null>();
  const [s, setS] = useState<number | null>();
  const [typing, setTyping] = useState<boolean>(false);
  const [message, setMessage] = useState<Message>({ type: '', title: '', msg: '', link: '' });
  const [nameExists, setNameExists] = useState(false);
  const [claimedName, setClaimedName] = useState('');
  const { add } = addAsset(String(account?.address), CONTRACT_ADDRESS);
  const VenomContractAddress = useAtomValue(venomContractAddressAtom);
  //const [venomContract, setVenomContract] = useState<any>(undefined);
  const minFee = 660000000;
  const [name, setName] = useAtom(nameAtom);
  const [primaryName, setPrimaryName] = useAtom(primaryNameAtom);
  const toast = useToast();

  const json = {
    type: 'Basic NFT',
    name: name + '.VID',
    description: name + '.VID, a Venom ID',
    preview: {
      source: NFT_IMAGE_URL,
      mimetype: 'image/svg',
    },
    files: [
      {
        source: NFT_IMAGE_URL,
        mimetype: 'image/svg',
      },
    ],
    external_url: SITE_PROFILE_URL + name,
  };

  const updateTimer = () => {
    let future = Date.parse(MINT_DATE);
    let now = Date.now();
    let diff = future - now;

    let days = Math.floor(diff / (1000 * 60 * 60 * 24));
    let hours = Math.floor(diff / (1000 * 60 * 60));
    let mins = Math.floor(diff / (1000 * 60));
    let secs = Math.floor(diff / 1000);

    setD(days);
    setH(hours - days * 24);
    setM(mins - hours * 60);
    setS(secs - mins * 60);
  };

  async function inputChange() {
    window.clearTimeout(timer);
    clearTimeout(timer);
    if (venomContract && venomContract.methods !== undefined) {
      try {
        setFeeIsLoading(true);
        setTyping(false);
        toast.closeAll();
        // @ts-ignore: Unreachable code error
        const { value0: _fee } = await venomContract.methods
          .calculateMintingFee({ name: String(name).toLowerCase() })
          .call();

        // @ts-ignore: Unreachable code error
        const { value0: _nameExists } = await venomContract?.methods
          .nameExists({ name: String(name).toLowerCase() })
          .call();
        setNameExists(_nameExists);
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
    if (!isConnected && name.length > 0) {
      toast({
        status: 'info',
        title: t('connectWallet'),
        description: t('venomWalletConnect'),
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (name.length > 2 && !isValidUsername(name) && name.length < 30) {
      toast({
        status: 'warning',
        title: t('invalidName'),
        description: t('invalidNameMsg'),
        isClosable: true,
      });
      return;
    }

    if (name.length > 0) {
      window.clearTimeout(timer);
      clearTimeout(timer);
      setTyping(true);
      timer = window.setTimeout(inputChange, 2000);
    }
  }, [name]);

  useEffect(() => {
    if (!MINT_OPEN) {
      setInterval(updateTimer, 1000);
    }
  }, []);

  async function claimVid(e: string) {
    if (!isConnected && name.length > 0) {
      toast({
        status: 'info',
        title: t('connectWallet'),
        description: t('venomWalletConnect'),
        isClosable: true,
      });
      return;
    }

    if (name.length > 2 && !isValidUsername(name) && name.length < 30) {
      toast({
        status: 'warning',
        title: t('invalidName'),
        description: t('invalidNameMsg'),
        isClosable: true,
      });
      return;
    }

    if (!isValidSignHash(signHash, signDate)) {
      setSignRequest(true);
      console.log('need to sign');
      return;
    }

    setMessage({ type: '', title: '', msg: '' });

    if (name.length >= 3 && !nameExists && venomContract?.methods) {
      setIsMinting(true);
      toast({
        status: 'loading',
        title: t('minting'),
        description: t('confirmInWallet'),
        duration: null,
      });
      // @ts-ignore: Unreachable code error
      const mintTx = await venomContract?.methods
        .mintNft({ json: JSON.stringify(json), name: name.toLowerCase() })
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
            console.log(e);
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
        //console.log('mint tx : ', mintTx);
        setIsConfirming(true);
        let receiptTx: Transaction | undefined;
        const subscriber = provider && new provider.Subscriber();
        if (subscriber)
          await subscriber
            .trace(mintTx)
            .tap((tx_in_tree: any) => {
              //console.log('tx_in_tree : ', tx_in_tree);
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
        minH="85vh"
        py={6}>
        <Box gap={4} width={'100%'}>
          <SimpleGrid
            columns={[1, 1, 2]}
            spacing={['0px', '16px', '32px']}
            py={4}
            alignItems={'center'}
            minWidth={['100%', '100%', '100%', 'container.md', 'container.lg']}>
            <Box display="flex" flexDirection="column" alignItems={'center'}>
              <ImageBox srcUrl="/logos/venomid.png" />
            </Box>
            <Box display="flex" flexDirection="column" py={notMobile ? 10 : 4}>
              <Heading
                textAlign={['center', 'center', locale === 'fa' ? 'right' : 'left']}
                fontWeight="bold"
                fontSize={['6xl', '6xl', '6xl', '6xl', '7xl']}>
                {t('title')}
              </Heading>
              <Heading
                h={'3'}
                py={0}
                textAlign={['center', 'center', locale === 'fa' ? 'right' : 'left']}
                fontWeight="bold"
                fontSize={['2xl', '2xl', '3xl', '4xl', '4xl']}
                my={notMobile ? 10 : 4}>
                {t('description')}
              </Heading>
            </Box>
          </SimpleGrid>
          <ClaimModal claimedName={claimedName} message={message} />
          <Stack py={10} w={'100%'} align={'center'}>
            {MINT_OPEN ? (
              <Stack direction={['column', 'column', 'row']} w={'100%'} align={'center'}>
                <InputGroup size="lg">
                  <InputLeftAddon
                    border={'1px solid gray'}
                    bg={'whiteAlpha.200'}
                    height={'58px'}
                    fontSize={['xl']}>
                    venomid.link/
                  </InputLeftAddon>
                  <Input
                    height={'58px'}
                    placeholder="samy"
                    value={name}
                    _focus={{
                      borderColor: 'white',
                    }}
                    fontSize={['xl']}
                    border={'1px solid gray'}
                    onChange={(e) => setName(e.target.value.toLowerCase())}
                    bg={colorMode === 'dark' ? 'blackAlpha.300' : 'white'}
                    disabled={isMinting || isConfirming}
                  />
                </InputGroup>
                <Button
                  minWidth={['100%', '100%', 'fit-content']}
                  colorScheme="green"
                  size="lg"
                  fontSize={'xl'}
                  height={'58px'}
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
                  {t('claimButton')}
                </Button>
              </Stack>
            ) : (
              <>
                <Text my={2} w={'100%'} textAlign={'center'} fontSize={['lg', 'lg', 'xl', '2xl']}>
                  {MINT_MESSAGE} <strong>{MINT_DATE}</strong>
                </Text>
                <Flex
                  direction={'column'}
                  gap={4}
                  w={['100%', '100%', '100%', 'container.md', 'container.lg']}>
                  <Flex
                    w={'100%'}
                    rounded={'xl'}
                    my={2}
                    flexGrow={1}
                    bg={useColorModeValue('var(--venom1)','var(--venom)')}
                    justify={['space-evenly', 'space-evenly', 'center']}
                    gap={8}
                    py={4}>
                    <Stack justify={'center'} align={'center'}>
                      <Text fontWeight={'bold'} fontSize={'4xl'}>
                        {d}
                      </Text>
                      <Text>Days</Text>
                    </Stack>
                    <Stack justify={'center'} align={'center'}>
                      <Text fontWeight={'bold'} fontSize={'4xl'}>
                        {h}
                      </Text>
                      <Text>Hours</Text>
                    </Stack>
                    <Stack justify={'center'} align={'center'}>
                      <Text fontWeight={'bold'} fontSize={'4xl'}>
                        {m}
                      </Text>
                      <Text>Mins</Text>
                    </Stack>
                    <Stack justify={'center'} align={'center'}>
                      <Text fontWeight={'bold'} fontSize={'4xl'}>
                        {s}
                      </Text>
                      <Text>Secs</Text>
                    </Stack>
                  </Flex>
                  <TextCard
                    domain="+4500 minted names"
                    text="minting phase one is completed"
                    header=""
                  />
                </Flex>
              </>
            )}
          </Stack>
          {name.length > 2 && !typing && fee !== -1 && venomContract?.methods && (
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
                  {nameExists ? name + '.VID ' + t('taken') : name + '.VID ' + t('available')}
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
