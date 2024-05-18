import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Button,
  Flex,
  Stack,
  Textarea,
  Text,
  useColorMode,
  useMediaQuery,
  useDisclosure,
  useColorModeValue,
  HStack,
  Box,
  useToast,
  Badge,
  SimpleGrid,
  Link,
  Center,
  Spinner,
} from '@chakra-ui/react';
import ImageBox from 'components/claiming/ImageBox';
import DomainName from 'components/features/DomainName';
import DomainTag from 'components/features/DomainTag';
import { LinkIcon } from 'components/logos';
import { AVATAR_API_URL, SITE_PROFILE_URL, WINNERS } from 'core/utils/constants';
import NextLink from 'next/link';

export default function ChallengesSection() {
  const { colorMode } = useColorMode();
  const lightMode = colorMode === 'light';
  const [notMobile] = useMediaQuery('(min-width: 768px)');
  const [small] = useMediaQuery('(min-width: 375px)');

  return (
    <>
      <Accordion
        allowToggle
        allowMultiple={false}
        defaultIndex={[0]}
        className="challenges"
        borderRadius={10}
        minWidth={'100%'}
        size="lg"
        backgroundColor={colorMode === 'dark' ? 'whiteAlpha.100' : 'blackAlpha.100'}
        display={'flex'}>
        <AccordionItem border={0} borderRadius={10} width={'100%'}>
          <AccordionButton
            width={'100%'}
            as={Button}
            justifyContent={'center'}
            bgGradient={useColorModeValue(
              'linear(to-r, var(--venom1), var(--bluevenom1))',
              'linear(to-r, var(--venom2), var(--bluevenom2))'
            )}
            _expanded={{
              bgGradient: useColorModeValue(
                'linear(to-r, var(--venom1), var(--bluevenom1))',
                'linear(to-r, var(--venom2), var(--bluevenom2))'
              ),
              borderBottomRadius: 0,
            }}
            _hover={{
              bgGradient: useColorModeValue(
                'linear(to-r, var(--venom0), var(--bluevenom0))',
                'linear(to-r, var(--venom0), var(--bluevenom0))'
              ),
            }}
            color={'white'}
            h={'120px'}>
            <Flex gap={[3, 4]} alignItems={'center'} justify={'center'}>
              <LinkIcon type="RiTrophyLine" size={small ? '46' : '36'} />
              <Stack gap={1} justify={'left'}>
                <Text fontWeight={'bold'} display={'flex'} flex={1} fontSize={['xl', '2xl']}>
                  Challenges
                </Text>
              </Stack>
            </Flex>
          </AccordionButton>
          <AccordionPanel py={4} minWidth="100%">
            <SimpleGrid columns={[1]} gap={4} fontSize={['md', 'lg']}>
              {Object.entries(WINNERS).map(([key, value]) => (
                <>
                {value && <Stack
                  gap={4}
                  rounded={'2xl'}
                  key={key + '-box'}
                  p={[4]}
                  bgColor={colorMode === 'light' ? 'whiteAlpha.500' : 'blackAlpha.500'}>
                  <DomainTag name={value.domain} />
                  <ImageBox srcUrl={`screens/${value.screenImage}`} rounded="2xl" size={'100%'}/>
                  <Stack textAlign={['left']} p={4}>
                    <Text
                      bgGradient={
                        colorMode === 'light'
                          ? 'linear(to-r, var(--venom2), var(--bluevenom2))'
                          : 'linear(to-r, var(--venom0), var(--bluevenom0))'
                      }
                      bgClip="text"
                      fontSize={['lg', 'xl', '2xl']}
                      fontWeight={'bold'}>
                      {value.title}
                    </Text>
                    <Flex gap={2} justify={'space-between'} align={'center'}>
                      <Text> {value.link}</Text>
                    </Flex>
                  </Stack>
                  <Button
                    w={'100%'}
                    key={key + '-button'}
                    size={'lg'}
                    as={NextLink}
                    style={{ textDecoration: 'none' }}
                    href={`winners/${value.slug}`}
                    gap={6}
                    //color={lightMode ? 'white' : 'black'}
                    display={'flex'}
                    variant={'solid'}
                    colorScheme={
                      value.status === 'Winners Announced'
                        ? lightMode
                          ? 'blackAlpha'
                          : 'light'
                        : 'venom'
                    }
                    flexDir={['column']}
                    justifyContent={['center']}>
                    <Text>{value.status}</Text>
                  </Button>
                </Stack>}
                </>
              ))}
            </SimpleGrid>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  );
}
