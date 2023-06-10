import { useMediaQuery,useColorMode, Button, Container, Heading, Text, SimpleGrid, Box, Center } from '@chakra-ui/react';
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
        minH="75vh">
        <>
          <SimpleGrid columns={[1, 2]} spacing="32px" my={10}>
            <Center display="flex" flexDirection="column">
              <Heading fontWeight="bold" fontSize="5xl">
                {t('manage')}
              </Heading>
              <Text fontWeight="bold" fontSize={notMobile ? '3xl' : '2xl'} my={10}>
                {t('manageDescription')}
              </Text>
              <NextLink id="venomid-app-manage-link" href={SITE_MANAGE_URL} passHref><Button backgroundColor="var(--purple1)" size="lg" minWidth="100%">
                {t('manageWebsiteButton')}
              </Button></NextLink>
              <NextLink id="venomid-app-manage-demo-link" href={'/manage'} passHref><Button size="lg" minWidth="100%" mt={2}>
                {t('manageDemoWebsiteButton')}
              </Button></NextLink>
            </Center>
            <Center display="flex" flexDirection="column">
              <Venom srcUrl="/screens/manageScreen.jpg" />
            </Center>
          </SimpleGrid>
          <Text fontWeight="light" fontSize={notMobile ? '2xl' : 'xl'}  pb={notMobile ? 10 : 4}>
            {t('dappDescription')}
          </Text>
        </>
      </Container>
    </Box>
  );
}
