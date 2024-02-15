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
} from '@chakra-ui/react';
import { useTranslate } from 'core/lib/hooks/use-translate';
import { MINT_OPEN, ZERO_ADDRESS } from 'core/utils/constants';
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
import DomainAbi from 'abi/Domain.abi.json';
import getVid from 'core/utils/getVid';
import resolveAddress from 'core/utils/resolveAddress';

export default function NSSection() {
  const { t } = useTranslate();
  const [notMobile] = useMediaQuery('(min-width: 769px)');
  const { colorMode } = useColorMode();
  const [address, setAddress] = useState('');
  const [searchedName, setSearchedName] = useState('');
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

    if(status.isSuccess){
      setSent(true);
    }
  }, [status]);

  const again = ()=> {
    setLoaded(false);
    setSent(false);
    setSearchedName('');
    setAddress('');
  }

  // const getName = async () => {
  //   setIsLoadig(true);
  //   //if(MINT_OPEN){
  //     if (!provider || !provider.isInitialized) return;
  //     const _venomContract = new provider.Contract(VenomAbi, new Address(venomContractAddress));
  //     // @ts-ignore: Unreachable code error
  //     const { value0 }: any = await _venomContract?.methods.getPrimaryName({ _owner: new Address(String(address)) })
  //       .call();

  //     if (value0?.name !== '') {
  //       setLoaded(true);
  //       setSearchedName(value0.name + '.vid');
  //     } else {
  //     await getVid(String(address)).then((res)=> {
  //       if(res.status === 200){
  //         setLoaded(true);
  //         setSearchedName(res.data+ '.vid');
  //       } else {
  //         setSearchedName('');
  //         setLoaded(false);
  //       }
  //     }).catch((e)=> {
  //       setSearchedName('');
  //       setLoaded(false);
  //     })
  //   }
  //   setIsLoadig(false);
  // };

  const getAddress = async () => {
    setIsLoadig(true);
    
      if (!provider) return;
      const certificateAddr = await rootContract.methods.resolve({ path: String(address), answerId: 0 })
          .call({ responsible: true });
      
      const domainContract = new provider.Contract(DomainAbi, certificateAddr.certificate);
      console.log(certificateAddr);
    try {
      // @ts-ignore: Unreachable code error
      const { target } = await domainContract.methods.resolve({ answerId:0 }).call({responsible:true});
        console.log(target)
      if (target) {
        setLoaded(true);
        setSearchedName(address);
        setAddress(String(target));
        console.log(String(address))
      } else {
          setSearchedName('');
          setLoaded(false);
      };
    } catch(e) {
          setSearchedName('');
          setLoaded(false);
       }
      setIsLoadig(false);
  }
    

  useEffect(() => {
    if (!loaded) {
      if (address.includes('.vid')) {
        getAddress();
      } 
      // else if (isValidVenomAddress(address)) {
      //   getName();
      // } 
      else {
        setSearchedName('');
      }
    } else {
      if (!String(address).includes('.vid') && !isValidVenomAddress(address)) {
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
          
          <SimpleGrid columns={[1,1,2]} gap={10}>
          <Flex flexDir={'column'} align={'center'} justify={'center'} gap={6} width={['xs','sm','xs','md']}>
          <Text py={2} fontSize={['xl', 'xl', 'xl', '2xl']} fontWeight="normal">
              {t('nsDescription')}
            </Text>
          <Text fontSize={'lg'}>{t('apiDescription')}</Text>
          <Link href={'/docs'} width={'100%'}>
                <Button
                  height={'76px'}
                  flexDirection={'column'}
                  size="lg"
                  bgColor={colorMode === 'light' ? 'white' : 'default'}
                  width="100%">
                  <Flex gap={4} width={'100%'}>
                    <RiCodeSSlashLine size="46px"  />
                    <Stack gap={1}>
                      <Text>{t('apiLinkButton')}</Text>
                      <Text display={'flex'} fontSize={'sm'} gap={1} color={colorMode === 'dark' ? 'gray.300' : 'gray.600'}>
                        naming service on venom <RiExternalLinkLine size='18px'/>
                      </Text>
                    </Stack>
                  </Flex>
                </Button>
              </Link>
          </Flex>
          <Flex p={4} py={8} flexDir={'column'} align={'center'} justify={'center'} gap={4} bg={useColorModeValue('white','blackAlpha.500')} width={['xs','sm','xs','md']} borderRadius={15} border={'1px dashed gray'}>
            <Text fontSize={['3xl']} position={'relative'} top={0}>use case</Text>
            <Text fontSize={['md', 'lg', 'xl', 'xl']} color={'gray'}>Enter your domain name e.g. faucet.vid</Text>
            <InputGroup>
              <Input
                height={'58px'}
                placeholder="e.g. faucet.vid"
                value={address}
                _focus={{
                  borderColor: 'white',
                }}
                fontSize={['xl']}
                border={'1px solid gray'}
                onChange={(e) => setAddress(e.currentTarget.value.toLowerCase())}
                bg={colorMode === 'dark' ? 'blackAlpha.300' : 'white'}
                isDisabled={isLoading}
              />
              {searchedName.length > 1 && (
                <InputRightAddon
                  bg={colorMode === 'light' ? 'var(--venom)': 'whiteAlpha.300'}
                  w={searchedName.length * 15}
                  py={7}
                  justifyContent={'center'}>
                  <Text
                    bgGradient={
                      colorMode === 'light'
                        ? 'linear(to-r, var(--venom2), var(--bluevenom2))'
                        : 'linear(to-r, var(--venom0), var(--bluevenom0))'
                    }
                    bgClip="text"
                    textAlign={'center'}
                    fontSize={'xl'}
                    fontWeight={'bold'}>
                    {searchedName}
                  </Text>
                </InputRightAddon>
              )}
            </InputGroup>
            <Button
              maxW={'100%'}
              w={'100%'}
              isLoading={isLoading}
              isDisabled={isLoading || !isValidVenomAddress(address)}
              gap={2}
              size={'lg'}
              colorScheme="green"
              bgGradient={useColorModeValue('linear(to-r, var(--venom2), var(--bluevenom2))','linear(to-r, var(--venom0), var(--bluevenom0))')}
              onClick={() => {
                setIsLoadig(true);
                run();
              }}>
              <Text>
              Send 0.01</Text>
              {searchedName.length > 1 && (
                <>
                <Text fontSize={'xl'} fontWeight={'extrabold'}>To {searchedName}</Text>
                  <RiSendPlane2Line size={28} />
                </>
              )}
            </Button>
            {sent && 
            <Center flexDirection={'column'} minH={'345px'} gap={12} width={['xs','sm','xs','md']} position={'absolute'} p={8} borderRadius={15} backdropFilter="auto" backdropBlur={'6px'}
            backgroundColor={colorMode === 'light' ? 'whiteAlpha.700' : 'blackAlpha.700'}
            borderBottomColor={colorMode === 'light' ? 'blackAlpha.100' : 'whiteAlpha.100'}>
              <Text fontSize={['xl','xl','2xl']} lineHeight={'40px'}>
                🔥 Awesome. You have transferred 0.01 TEST VENOM to <strong>{searchedName}</strong> at <strong>{new Date().toLocaleString()}</strong>
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
            </Center>}
          </Flex>
          </SimpleGrid>
        </Box>
      </Container>
    </Box>
  );
}
