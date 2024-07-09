import {
  useMediaQuery,
  Button,
  Container,
  Heading,
  Text,
  Stack,
  Box,
  useColorMode,
  SimpleGrid,
  Link,
  InputGroup,
  InputLeftAddon,
  Input,
  InputRightElement,
  InputRightAddon,
  useColorModeValue,
  Flex,
  Center,
  Tag,
  TagCloseButton,
  TagLabel,
  useToast,
  Tooltip,
  IconButton,
  Avatar,
  CloseButton,
} from '@chakra-ui/react';
import { useTranslate } from 'core/lib/hooks/use-translate';
import { DOCS_URL, MINT_OPEN, VENOMSCAN_TX, ZERO_ADDRESS } from 'core/utils/constants';
import {
  RiCodeSSlashLine,
  RiExternalLinkLine,
  RiRestartLine,
  RiSendPlane2Line,
} from 'react-icons/ri';
import tokens from 'core/utils/tokens.json';
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from '@choc-ui/chakra-autocomplete';
import { useEffect, useState } from 'react';
import { isValidVenomAddress, truncAddress } from 'core/utils';
import { useAtom, useAtomValue } from 'jotai';
import { useSendMessage, useVenomProvider, useConnect } from 'venom-react-hooks';
import { connectedAccountAtom, rootContractAtom, venomContractAddressAtom } from 'core/atoms';
import { Address, Transaction } from 'everscale-inpage-provider';
import TokenRootAbi from 'abi/TokenRootUpgradeable.abi.json';
import TokenWalletAbi from 'abi/TokenWallet.abi.json';
import { lookupNames } from 'core/utils/reverse';
import { lookupAddress } from 'core/utils/lookUp';
import { LinkIcon } from 'components/logos';

export default function NSSection() {
  const { t } = useTranslate();
  const [notMobile] = useMediaQuery('(min-width: 769px)');
  const { colorMode } = useColorMode();
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState<any>(0.0);
  const [tokenWalletContract, setTokenWalletContract] = useState<any | null>();
  const [balance, setBalance] = useState<number | string | any>(0);
  const [selectedToken, setSelectedToken] = useState<any | undefined>();
  const [selectedTokenValue, setSelectedTokenValue] = useState<any | undefined>();
  const [searchedName, setSearchedName] = useState('');
  const [searchedNames, setSearchedNames] = useState<(string | null | undefined)[]>();
  const [isLoading, setIsLoadig] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [sent, setSent] = useState(false);
  const [sentTx, setSentTx] = useState<string | undefined>();
  const { provider } = useVenomProvider();
  const { account } = useConnect();
  const connectedAccount = useAtomValue(connectedAccountAtom);
  const venomContractAddress = useAtomValue(venomContractAddressAtom);
  const rootContract = useAtomValue(rootContractAtom);
  const toast = useToast();

  const { run, status } = useSendMessage({
    from: new Address(String(account?.address)),
    to: String(address),
    amount: String(Number(amount) * 1e9),
  });

  useEffect(() => {
    if (status.isSent) {
      setIsLoadig(false);
    } else if (status.isError) {
      setIsLoadig(false);
    }

    if (status.isSuccess) {
      setSent(true);
      setSentTx(status.result.transaction.id.hash)
    }
  }, [status]);

  const again = () => {
    setLoaded(false);
    setSent(false);
    setSearchedName('');
    setSearchedNames([]);
    setAddress('');
  };

  const getName = async () => {
    setIsLoadig(true);
    //if(MINT_OPEN){
    if (!provider || !provider.isInitialized) return;

    const names = await lookupNames(provider, address);
    if(names && names.length > 0){
      setSearchedNames(names.sort((a, b) => a.length - b.length));
    }
    // const saltedCode = await saltCode(provider, String(address), ROOT_CONTRACT_ADDRESS);
    // // Hash it
    // const codeHash = await provider.getBocHash(String(saltedCode));
    // if (!codeHash) {
    //   //setIsLoading(false);
    //   return;
    // }
    // // Fetch all Indexes by hash
    // const indexesAddresses = await getAddressesFromIndex(codeHash, provider,5);
    // if (!indexesAddresses || !indexesAddresses.length) {
    //   //setIsLoading(false);
    //   return;
    // }
    // // Fetch all nfts
    // let primary = false;
    // indexesAddresses.map(async (indexAddress) => {
    //   try {
    //     if(!primary){
    //       let _nftJson = await getNftByIndex(provider, indexAddress);
    //       if(_nftJson.target === address && !primary){
    //         primary = true ;
    //         setLoaded(true);
    //         setSearchedName(_nftJson.name);
    //         return
    //       };
    //     }
    //   } catch (e: any) {
    //     setSearchedName('');
    //     setLoaded(false);
    //   }
    // });

    setIsLoadig(false);
  };

  const getAddress = async () => {
    setIsLoadig(true);

    if (!provider) return;
    //   const certificateAddr = await rootContract.methods.resolve({ path: String(address), answerId: 0 })
    //       .call({ responsible: true });

    //   const domainContract = new provider.Contract(DomainAbi, certificateAddr.certificate);
    //   console.log(certificateAddr);
    try {
      //   // @ts-ignore: Unreachable code error
      //   const { target } = await domainContract.methods.resolve({ answerId:0 }).call({responsible:true});
      //     console.log(target)
      const target = await lookupAddress(provider, address);
      //console.log(target);
      if (target) {
        setLoaded(true);
        setSearchedName(address);
        setAddress(String(target));
        //console.log(String(address))
      } else {
        setSearchedName('');
        setLoaded(false);
      }
    } catch (e) {
      console.log(e);
      //       setSearchedName('');
      //       setLoaded(false);
    }
    setIsLoadig(false);
  };

  useEffect(() => {
    if (!loaded) {
      if (address.includes('.venom')) {
        getAddress();
      } else if (isValidVenomAddress(address)) {
        getName();
      } else {
        setSearchedName('');
        setSearchedNames([]);
      }
    } else {
      if (!String(address).includes('.venom') && !isValidVenomAddress(address)) {
        setSearchedName('');
        setLoaded(false);
      }
    }
  }, [address]);

  function formatNumber(num: number, decimalPlaces: number) {
    const divisor = Math.pow(10, decimalPlaces);
    console.log(divisor);
    return num / divisor;
  }

  useEffect(() => {
    async function getTokenInfo() {
      if (!provider || !connectedAccount ) return;

      
        if(!selectedTokenValue){
          setBalance(0);
          return;
        }
        if (selectedTokenValue.symbol === 'VENOM') {
          setBalance(formatNumber(Number(account?.balance), 9));
          setTokenWalletContract(null);
        } else {
          const tokenRoot = new provider.Contract(TokenRootAbi, selectedTokenValue.address);
          console.log(selectedTokenValue.address);
          try {
            // @ts-ignore: Unreachable code error
            let result: { value0 } = await tokenRoot.methods
              .walletOf({ answerId: 0, walletOwner: new Address(connectedAccount) } as never)
              .call();
            console.log(result.value0);

            const tokenWallet = new provider.Contract(TokenWalletAbi, result.value0.toString());
            setTokenWalletContract(tokenWallet);
            let _balance: { value0: any } = await tokenWallet.methods
              .balance({ answerId: 0 } as never)
              .call();
            let balance_ = formatNumber(Number(_balance.value0), Number(selectedTokenValue.decimals));
            console.log(balance_);
            setBalance(balance_);
          } catch (e) {
            setTokenWalletContract(null);
            console.log('error ', e);
            setBalance(0);
          }
        }
      
    }

    getTokenInfo();
  }, [selectedToken]);

  const runSend = async () => {
    setIsLoadig(true);
    
      if (selectedTokenValue.symbol === 'VENOM') {
        run();
      } else {
        try {
          const divisor = Math.pow(10, selectedTokenValue.decimals);
          const tx = await tokenWalletContract.methods
            .transfer({
              amount: amount * divisor,
              remainingGasTo: new Address(connectedAccount),
              recipient: new Address(address),
              deployWalletValue: 10e7,
              payload: 'te6ccgEBAQEAAgAAAA',
              notify: true
            })
            .send({ from: account?.address, amount: String(3e8), bounce: true });

            if (tx) {
              console.log(tx)
              setSent(true);
              setSentTx(tx.id.hash)
              toast.closeAll();
              toast({
                status: 'success',
                title: 'Transfer Successful',
                description: `${amount}  ${selectedTokenValue.symbol} transferred to ${address}`,
                duration: 5000,
                isClosable: true,
              });
              setIsLoadig(false);
            } else {
              toast.closeAll();
              toast({
                status: 'error',
                title: 'Transfer Failed',
                description: 'Please Try Again',
                duration: null,
                isClosable: true,
              });
              setIsLoadig(false);
            }
          } catch {
            setIsLoadig(false);
          }
      }
  };

  return (
    <Box id="ns">
      <Container
        as="main"
        maxW="container.lg"
        display="grid"
        placeContent="center"
        placeItems="center"
        minH="90vh"
        pb={10}>
        <Box
          display={'flex'}
          flexDir={'column'}
          gap={4}
          width={'100%'}
          alignItems={'center'}
          px={2}
          justifyContent={'center'}>
          <Heading py={10} fontWeight="bold" fontSize={['3xl', '4xl', '5xl', '5xl', '6xl']}>
            {t('ns')}
          </Heading>

          <SimpleGrid columns={[1, 1, 2]} gap={10}>
            <Flex
              flexDir={'column'}
              align={'center'}
              justify={'center'}
              gap={6}
              width={['xs', 'sm', 'xs', 'md']}>
              <Text py={2} fontSize={['xl', 'xl', 'xl', '2xl']} fontWeight="normal">
                {t('nsDescription')}
              </Text>
              <Text fontSize={'lg'}>{t('apiDescription')}</Text>
              <Link href={DOCS_URL} width={'100%'} target='_blank'>
                <Button
                  height={'76px'}
                  flexDirection={'column'}
                  size="lg"
                  bgColor={colorMode === 'light' ? 'white' : 'default'}
                  width="100%">
                  <Flex gap={4} width={'100%'}>
                    <RiCodeSSlashLine size="46px" />
                    <Stack gap={1}>
                      <Text>{t('apiLinkButton')}</Text>
                      <Text
                        display={'flex'}
                        fontSize={'sm'}
                        gap={1}
                        color={colorMode === 'dark' ? 'gray.300' : 'gray.600'}>
                        naming service on venom <RiExternalLinkLine size="18px" />
                      </Text>
                    </Stack>
                  </Flex>
                </Button>
              </Link>
            </Flex>
            <Flex
              p={4}
              py={8}
              flexDir={'column'}
              align={'center'}
              justify={'center'}
              gap={2}
              bg={useColorModeValue('white', 'blackAlpha.500')}
              width={['100%', '100%', 'md', 'md']}
              borderRadius={15}
              border={'1px dashed gray'}>
              <Text fontSize={['3xl']} position={'relative'} top={0} py={4}>
                Transfer Tokens or NFTs
              </Text>

              <Text w={'100%'} pt={4} textAlign={'left'}>
                To/Receiver
              </Text>
              {searchedName.length > 1 ? (
                <Tag
                  py={2}
                  px={4}
                  w={'100%'}
                  rounded={'lg'}
                  textAlign={'left'}
                  fontSize={'xl'}
                  fontWeight={'bold'}>
                  <Stack w={'90%'}>
                    <Text
                      w={'100%'}
                      bgGradient={
                        colorMode === 'light'
                          ? 'linear(to-r, var(--venom2), var(--bluevenom2))'
                          : 'linear(to-r, var(--venom0), var(--bluevenom0))'
                      }
                      bgClip="text">
                      {searchedName}
                    </Text>
                    <Text w={'100%'}>{truncAddress(address, 15)}</Text>
                  </Stack>
                  <TagCloseButton onClick={again} />
                </Tag>
              ) : (
                <InputGroup>
                  <Input
                    height={'58px'}
                    placeholder="sam.venom or 0:0f3...4255"
                    value={address}
                    size={'lg'}
                    _focus={{
                      borderColor: 'white',
                    }}
                    fontSize={['xl']}
                    border={'1px solid gray'}
                    onChange={(e) => setAddress(e.currentTarget.value.toLowerCase())}
                    bg={colorMode === 'dark' ? 'blackAlpha.300' : 'white'}
                    isDisabled={isLoading}
                  />
                  <InputRightElement m={2}>
                    <Tooltip
                      borderRadius={4}
                      label={<Text p={2}>Paste</Text>}
                      hasArrow
                      color="white"
                      bgColor={'black'}>
                      <IconButton
                        size={'lg'}
                        aria-label="paste-url"
                        onClick={() =>
                          navigator.clipboard.readText().then((text) => setAddress(text))
                        }>
                        <LinkIcon type="RiFileCopy2Line" />
                      </IconButton>
                    </Tooltip>
                  </InputRightElement>
                </InputGroup>
              )}

              <Box>
                {searchedNames?.map((_name) => (
                  <Button
                    key={_name + '-tag'}
                    p={2}
                    m={1}
                    rounded={'full'}
                    onClick={() => {
                      setSearchedName(String(_name));
                      setLoaded(true);
                    }}
                    textAlign={'center'}
                    fontSize={'xl'}
                    fontWeight={'bold'}>
                    <Text
                      bgGradient={
                        colorMode === 'light'
                          ? 'linear(to-r, var(--venom2), var(--bluevenom2))'
                          : 'linear(to-r, var(--venom0), var(--bluevenom0))'
                      }
                      bgClip="text">
                      {_name}
                    </Text>
                  </Button>
                ))}
              </Box>

                <Text textAlign={'left'} w={'100%'}>Token</Text>
                  <AutoComplete
                openOnFocus
                onChange={(e, i: any) => {
                  setSelectedToken(e);
                  if (i.originalValue) {
                    setSelectedTokenValue(i.originalValue);
                  }
                  console.log(i);
                }}
                value={selectedToken}>
                <Flex gap={2} align={'center'}>
                  {selectedTokenValue && selectedTokenValue.logoURI && (
                    <Avatar src={selectedTokenValue.logoURI} />
                  )}
                  <AutoCompleteInput variant="filled" size={'lg'} />
                  {selectedTokenValue && <CloseButton size={'lg'} onClick={()=> { setSelectedToken(''); setSelectedTokenValue(undefined); }} />}
                </Flex>
                <AutoCompleteList>
                  {tokens.tokens.map((token, cid) => (
                    <AutoCompleteItem
                      key={`option-${cid}`}
                      value={token}
                      textTransform="capitalize">
                      <Center gap={4}>
                        <Avatar src={token.logoURI} /> {token.name}{' '}
                      </Center>
                    </AutoCompleteItem>
                  ))}
                </AutoCompleteList>
              </AutoComplete>
                  

              <Stack w={'100%'}>
              <Text w={'100%'} textAlign={'right'} pt={4}>
                {' '}
                Balance: {balance}
              </Text>

              <InputGroup>
                <Input
                  height={'58px'}
                  placeholder="10"
                  size={'lg'}
                  value={amount}
                  _focus={{
                    borderColor: 'white',
                  }}
                  fontSize={['xl']}
                  border={'1px solid gray'}
                  onChange={(e) => setAmount((e.target.value))}
                  bg={colorMode === 'dark' ? 'blackAlpha.300' : 'white'}
                  isDisabled={isLoading}
                />
                <InputRightElement px={4} m={2} w={'44px'}>
                  <Button w={'44px'} size={'lg'} onClick={() => setAmount(balance - (selectedTokenValue.address === ZERO_ADDRESS ? 0.01 : 0))}>
                    Max
                  </Button>
                </InputRightElement>
              </InputGroup>
              </Stack>
              <Button
                my={4}
                maxW={'100%'}
                w={'100%'}
                isLoading={isLoading}
                isDisabled={isLoading || !isValidVenomAddress(address)}
                gap={2}
                size={'lg'}
                colorScheme="green"
                bgGradient={useColorModeValue(
                  'linear(to-r, var(--venom2), var(--bluevenom2))',
                  'linear(to-r, var(--venom0), var(--bluevenom0))'
                )}
                onClick={runSend}>
                <Text>Send</Text>
                {searchedName.length > 1 && (
                  <>
                    <Text fontSize={'xl'} fontWeight={'extrabold'}>
                      To {searchedName}
                    </Text>
                    <RiSendPlane2Line size={28} />
                  </>
                )}
              </Button>
              {sent && (
                <Center
                  flexDirection={'column'}
                  minH={'650px'}
                  gap={12}
                  width={['xs', 'sm', 'xs', 'md']}
                  position={'absolute'}
                  p={8}
                  borderRadius={15}
                  backdropFilter="auto"
                  backdropBlur={'6px'}
                  backgroundColor={colorMode === 'light' ? 'whiteAlpha.700' : 'blackAlpha.700'}
                  borderBottomColor={colorMode === 'light' ? 'blackAlpha.100' : 'whiteAlpha.100'}>
                  <Text fontSize={['xl', 'xl', '2xl']} lineHeight={'40px'}>
                    {`You have transferred ${amount + ' ' + selectedTokenValue.symbol + ' '}`}{' '} to{' '}
                    <strong>{searchedName ? searchedName : address}</strong> 
                    {/* <strong>{new Date().toLocaleString()}</strong> */}
                  </Text>
                  <Button
                    as={Link}
                    href={VENOMSCAN_TX + sentTx}
                    maxW={'100%'}
                    w={'100%'}
                    target='_blank'
                    gap={2}
                    size={'lg'}
                    colorScheme="green">
                    View On Explorer
                  </Button>
                  <Button
                    maxW={'100%'}
                    w={'100%'}
                    onClick={again}
                    gap={2}
                    size={'lg'}
                    colorScheme="green">
                    Close
                  </Button>
                </Center>
              )}
            </Flex>
          </SimpleGrid>
        </Box>
      </Container>
    </Box>
  );
}
