import {
  useMediaQuery,
  useColorMode,
  Button,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Box,
  Center,
  Link,
} from '@chakra-ui/react';
import { useTranslate } from 'core/lib/hooks/use-translate';
import Venom from 'components/Venom';
import NextLink from 'next/link';
import { SITE_MANAGE_URL } from 'core/utils/constants';

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
        <>
          <SimpleGrid columns={[1, 2]} spacing="32px" my={10}>
            <Center display="flex" flexDirection="column">
              <Heading fontWeight="bold" fontSize="5xl">
                {t('easyManagement')}
              </Heading>
              <Text fontWeight="bold" fontSize={notMobile ? '3xl' : '2xl'} my={10}>
                {t('manageDescription')}
              </Text>
              <Link href={SITE_MANAGE_URL} minWidth="300px !important" target="_blank">
                <Button color="white" backgroundColor="var(--purple1)" size="lg" minWidth="100%">
                  {t('manageWebsiteButton')}
                </Button>
              </Link>
              <Link href={'/manage'} minWidth="300px !important" target="_blank">
                <Button size="lg" minWidth="100%" mt={2}>
                  {t('manageDemoWebsiteButton')}
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
        </>
      </Container>
    </Box>
  );
}
