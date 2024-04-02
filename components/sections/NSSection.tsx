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
} from '@chakra-ui/react';
import { useTranslate } from 'core/lib/hooks/use-translate';
import { DOCS_URL, MINT_OPEN, ZERO_ADDRESS } from 'core/utils/constants';
import {
  RiCodeSSlashLine,
  RiExternalLinkLine,
  RiRestartLine,
  RiSendPlane2Line,
} from 'react-icons/ri';
import { useEffect, useState } from 'react';
import { isValidVenomAddress } from 'core/utils';
import { useAtomValue } from 'jotai';
import { useSendMessage, useVenomProvider, useConnect } from 'venom-react-hooks';
import { rootContractAtom, venomContractAddressAtom } from 'core/atoms';
import { Address } from 'everscale-inpage-provider';
//import {  } from 'vid-sdk';
import { lookupNames } from 'core/utils/reverse';
import { lookupAddress } from 'core/utils/lookUp';

export default function NSSection() {
  const { t } = useTranslate();
  const [notMobile] = useMediaQuery('(min-width: 769px)');
  const { colorMode } = useColorMode();
  const [address, setAddress] = useState('');
  const [searchedName, setSearchedName] = useState('');
  const [searchedNames, setSearchedNames] = useState<(string | null | undefined)[]>();
  const [isLoading, setIsLoadig] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [sent, setSent] = useState(false);
  const { provider } = useVenomProvider();
  const { account } = useConnect();
  const venomContractAddress = useAtomValue(venomContractAddressAtom);
  const rootContract = useAtomValue(rootContractAtom);

  const { run, status } = useSendMessage({
    from: new Address(String(account?.address)),
    to: String(address),
    amount: String(Number(0.01) * 1e9),
  });

  useEffect(() => {
    if (status.isSent) {
      setIsLoadig(false);
    } else if (status.isError) {
      setIsLoadig(false);
    }

    if (status.isSuccess) {
      setSent(true);
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
              gap={4}
              bg={useColorModeValue('white', 'blackAlpha.500')}
              width={['xs', 'sm', 'xs', 'md']}
              borderRadius={15}
              border={'1px dashed gray'}>
              <Text fontSize={['3xl']} position={'relative'} top={0}>
                use case
              </Text>
              <Text fontSize={['md', 'lg', 'xl', 'xl']} color={'gray'}>
                Enter a domain name e.g. faucet.venom or venom wallet address e.g. 0:32...4323
              </Text>
              <InputGroup>
                <Input
                  height={'58px'}
                  placeholder="e.g. faucet.venom"
                  value={address}
                  _focus={{
                    borderColor: 'white',
                  }}
                  fontSize={['xl']}
                  border={'1px solid gray'}
                  onChange={(e) => setAddress(e.currentTarget.value.toLowerCase())}
                  bg={colorMode === 'dark' ? 'blackAlpha.300' : 'white'}
                  isDisabled={isLoading}
                  pr={searchedName.length * 15 + (searchedName.length > 10 ? 16 : 30)}
                />
                {searchedName.length > 1 && (
                  <InputRightElement
                    //bg={colorMode === 'light' ? 'var(--venom)': 'whiteAlpha.300'}
                    w={searchedName.length * 15 + (searchedName.length > 10 ? 0 : 20)}
                    py={7}
                    mr={2}
                    justifyContent={'center'}>
                    <Tag
                      py={2}
                      rounded={'full'}
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
                        {searchedName}
                      </Text>
                      <TagCloseButton onClick={again} />
                    </Tag>
                  </InputRightElement>
                )}
              </InputGroup>
              <Box>
                {searchedNames?.map((_name) => (
                  <Button
                    key={_name + '-tag'}
                    p={2}
                    m={1}
                    rounded={'full'}
                    onClick={()=> {
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
              <Button
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
                onClick={() => {
                  setIsLoadig(true);
                  run();
                }}>
                <Text>Send 0.01</Text>
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
                  minH={'345px'}
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
                    🔥 Awesome. You have transferred 0.01 TEST VENOM to{' '}
                    <strong>{searchedName}</strong> at{' '}
                    <strong>{new Date().toLocaleString()}</strong>
                  </Text>
                  <Button
                    maxW={'100%'}
                    w={'100%'}
                    onClick={again}
                    gap={2}
                    leftIcon={<RiRestartLine size={26} />}
                    size={'lg'}
                    colorScheme="green">
                    Again
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
