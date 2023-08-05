import {
  useMediaQuery,
  useColorMode,
  Button,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Box,
  Flex,
  Center,
  Link,
  Stack,
} from '@chakra-ui/react';
import { useTranslate } from 'core/lib/hooks/use-translate';
import Venom from 'components/Venom';
import { SITE_MANAGE_URL } from 'core/utils/constants';
import { RiSettings3Line, RiExternalLinkLine, RiCodeSSlashLine } from 'react-icons/ri';

export default function ManageSection() {
  const { colorMode } = useColorMode();
  const { t } = useTranslate();
  const [notMobile] = useMediaQuery('(min-width: 800px)');
  return (
    <Box backgroundColor={colorMode === 'dark' ? 'whiteAlpha.50' : 'blackAlpha.50'} id="manage">
      <Container
        as="main"
        maxW="container.md"
        display="grid"
        placeContent="center"
        placeItems="center"
        minH="75vh"
        py={10}>
        <Box gap={4} width={notMobile ? '100%' : 'xs'}>
          <SimpleGrid columns={[1, 2]} spacing="32px" my={10}>
            <Center display="flex" flexDirection="column" gap={3}>
              <Heading fontWeight="bold" fontSize="5xl">
                {t('easyManagement')}
              </Heading>
              <Text fontWeight="bold" fontSize={notMobile ? '3xl' : '2xl'} my={10}>
                {t('manageDescription')}
              </Text>
              <Link href={SITE_MANAGE_URL} width={'100%'} target="_blank">
                <Button
                  height={'76px'}
                  flexDirection={'column'}
                  borderColor={'gray'}
                  colorScheme='purple'
                  size="lg"
                  minWidth="100%">
                  <Flex gap={4} width={'100%'}>
                    <RiSettings3Line size="46px"  />
                    <Stack gap={1}>
                      <Text>{t('manageWebsiteButton')}</Text>
                      <Text display={'flex'} fontSize={'sm'} gap={1} color={colorMode === 'dark' ? 'gray.600' : 'gray.300'}>
                        venomid.tools <RiExternalLinkLine size='18px'/>
                      </Text>
                    </Stack>
                  </Flex>
                </Button>
              </Link>
              <Link href={SITE_MANAGE_URL+'docs'} width={'100%'} target="_blank">
                <Button
                  height={'76px'}
                  flexDirection={'column'}
                  borderColor={'gray'}
                  size="lg"
                  minWidth="100%">
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
            </Center>
            <Center display="flex" flexDirection="column">
              <Venom srcUrl="/screens/manageScreen.jpg" />
            </Center>
          </SimpleGrid>
          <Text fontWeight="light" fontSize={'xl'} mb={4} pb={notMobile ? 10 : 4}>
            {t('dappDescription')}
          </Text>
        </Box>
      </Container>
    </Box>
  );
}
