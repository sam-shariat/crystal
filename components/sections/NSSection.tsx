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
} from '@chakra-ui/react';
import { useTranslate } from 'core/lib/hooks/use-translate';
import { MINT_OPEN, SITE_MANAGE_URL, SITE_PROFILE_URL, ZEALY_URL, ZERO_ADDRESS } from 'core/utils/constants';
import SocialIcons from 'components/Layout/SocialIcons';
import TextCard from 'components/Layout/TextCard';
import {
  RiArrowDownLine,
  RiArrowRightLine,
  RiCodeSSlashLine,
  RiExternalLinkLine,
  RiFingerprint2Line,
  RiProfileLine,
  RiSendPlane2Line,
  RiSettings3Line,
} from 'react-icons/ri';
import { Zealy } from 'components/logos';
import { useEffect, useState } from 'react';
import { isValidVenomAddress } from 'core/utils';
import { useAtomValue } from 'jotai';
import { useSendMessage, useVenomProvider, useConnect } from 'venom-react-hooks';
import { venomContractAddressAtom } from 'core/atoms';
import { Address } from 'everscale-inpage-provider';
import VenomAbi from 'abi/Collection.abi.json';
import getVid from 'core/utils/getVid';
import resolveAddress from 'core/utils/resolveAddress';

export default function NSSection() {
  const { t } = useTranslate();
  const [notMobile] = useMediaQuery('(min-width: 769px)');
  const { colorMode } = useColorMode();
  const [address, setAddress] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoadig] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const { provider } = useVenomProvider();
  const { account } = useConnect();
  const venomContractAddress = useAtomValue(venomContractAddressAtom);

  const { run, status } = useSendMessage({
    from: new Address(String(account?.address)),
    to: String(address),
    amount: String(Number(0.1) * 1e9),
  });

  useEffect(() => {
    if (status.isSent) {
      setIsLoadig(false);
      setLoaded(false);
      setName('');
      setAddress('');
    } else if (status.isError) {
      setIsLoadig(false);
    }
  }, [status]);

  const getName = async () => {
    setIsLoadig(true);
    if(MINT_OPEN){
      if (!provider) return;
      const _venomContract = new provider.Contract(VenomAbi, new Address(venomContractAddress));
      // @ts-ignore: Unreachable code error
      const { value0 }: any = await _venomContract?.methods.getPrimaryName({ _owner: new Address(String(address)) })
        .call();

      if (value0?.name !== '') {
        setLoaded(true);
        setName(value0.name + '.vid');
      } else {
        setName('');
        setLoaded(false);
      }
    } else {
      await getVid(String(address)).then((res)=> {
        if(res.status === 200){
          setLoaded(true);
          setName(res.data+ '.vid');
        } else {
          setName('');
          setLoaded(false);
        }
      }).catch((e)=> {
        setName('');
        setLoaded(false);
      })
    }
    setIsLoadig(false);
  };

  const getAddress = async () => {
    setIsLoadig(true);
    if(MINT_OPEN){
      if (!provider) return;
      const _venomContract = new provider.Contract(VenomAbi, new Address(venomContractAddress));
      // @ts-ignore: Unreachable code error
      const { value0 }: any = await _venomContract?.methods.getInfoByName({ name: String(address.slice(0, -4)) })
        .call();
      if (value0?.name !== 'notfound') {
        setLoaded(true);
        setName(address);
        setAddress(String(value0.owner));
      } else {
        setName('');
        setLoaded(false);
      }
    } else {
      await resolveAddress(String(address.slice(0, -4))).then((res)=> {
        if(res.data !== ZERO_ADDRESS){
          setLoaded(true);
          setName(address);
          setAddress(res.data);
        } else {
          setName('');
          setLoaded(false);
        }
      }).catch((e)=> {
        setName('');
        setLoaded(false);
      })
    }
    setIsLoadig(false);
  };

  useEffect(() => {
    if (!loaded) {
      if (address.includes('.vid')) {
        getAddress();
      } else if (isValidVenomAddress(address)) {
        getName();
      } else {
        setName('');
      }
    }
    if (!address.includes('.vid') && !isValidVenomAddress(address)) {
      setName('');
      setLoaded(false);
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
        minH="80vh"
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
          
          <SimpleGrid columns={[1,1,2]} gap={8}>
          <Flex py={2}flexDir={'column'} align={'center'} justify={'center'} gap={4} width={['xs','sm','xs','md']}>
          <Text py={2} fontSize={['xl', 'xl', 'xl', '2xl']} fontWeight="normal">
              {t('nsDescription')}
            </Text>
          <Text>{t('apiDescription')}</Text>
          <Link href={'/docs'} width={'100%'}>
                <Button
                  height={'76px'}
                  flexDirection={'column'}
                  borderColor={'gray'}
                  size="lg"
                  width="100%">
                  <Flex gap={4} width={'100%'}>
                    <RiCodeSSlashLine size="46px"  />
                    <Stack gap={1}>
                      <Text>{t('apiLinkButton')}</Text>
                      <Text display={'flex'} fontSize={'sm'} gap={1} color={colorMode === 'dark' ? 'gray.300' : 'gray.600'}>
                        venomid.tools <RiExternalLinkLine size='18px'/>
                      </Text>
                    </Stack>
                  </Flex>
                </Button>
              </Link>
          </Flex>
          <Flex p={4} py={8} borderRadius={15} flexDir={'column'} align={'center'} justify={'center'} gap={4} bg={useColorModeValue('white','blackAlpha.500')} width={['xs','sm','xs','md']} border={'1px dashed gray'}>
            <Text fontSize={['3xl']} position={'relative'} top={0}>use case</Text>
            <Text fontSize={['md', 'lg', 'xl', 'xl']}>Enter your .vid name or a venom address than owns a venom id e.g. sam.vid</Text>
            <InputGroup>
              <Input
                height={'58px'}
                placeholder="sam.vid"
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
              {name.length > 3 && (
                <InputRightAddon
                  bg={useColorModeValue('var(--venom)', 'whiteAlpha.300')}
                  w={name.length * 15}
                  py={7}
                  justifyContent={'center'}>
                  <Text
                    color={useColorModeValue('white', 'var(--venom0)')}
                    textAlign={'center'}
                    fontSize={'xl'}
                    fontWeight={'bold'}>
                    {name}
                  </Text>
                </InputRightAddon>
              )}
            </InputGroup>
            <Button
              maxW={'100%'}
              w={'100%'}
              isLoading={isLoading}
              isDisabled={name.length < 3}
              gap={2}
              size={'lg'}
              colorScheme="green"
              onClick={() => {
                setIsLoadig(true);
                run();
              }}>
              Send 0.1 TEST VENOM
              {name.length > 3 && (
                <>
                  <RiSendPlane2Line size={28} />
                </>
              )}
            </Button>
          </Flex>
          </SimpleGrid>
        </Box>
      </Container>
    </Box>
  );
}
