import { Button, Container, Heading, Text, useMediaQuery, Box, Center, useColorMode } from '@chakra-ui/react';
import { useTranslate } from 'core/lib/hooks/use-translate';
import Venom from 'components/Venom';
import { SITE_PROFILE_URL } from 'core/utils/constants';
import Link from 'next/link';

export default function ProfileSection() {
  const { t } = useTranslate();
  const [notMobile] = useMediaQuery('(min-width: 800px)');
  const { colorMode } = useColorMode();

  return (
    <Box id="profile">
      <Container
        as="main"
        maxW="container.md"
        display="grid"
        placeContent="center"
        placeItems="center"
        minH="75vh">
        <>
          <Box spacing="32px" my={10}>
            <Box display="flex" flexDirection="column" justifyContent="center">
              <Heading fontWeight="bold" fontSize="5xl" textAlign={notMobile ? 'center' : 'left'}>
                {t('profile')}
              </Heading>
              <Text fontWeight="bold" fontSize={notMobile ? '3xl' : '2xl'} my={6} textAlign={notMobile ? 'center' : 'left'}>
                {t('profileDescription')}
              </Text>
              <Center display="flex" flexDirection="column">
                <Venom srcUrl="/screens/profileScreen.png" size={notMobile ? 'lg' : 'xs'} />
              </Center>
              <Link href={SITE_PROFILE_URL} target="_blank" passHref><Button background="var(--blue1)" size="lg" minWidth="300px">
                {t('linkWebsiteButton')}
              </Button></Link>
              <Link href={'/link'} target="_blank" passHref><Button size="lg" minWidth="300px" mt={2}>
                {t('linkDemoWebsiteButton')}
              </Button></Link>
            </Box>
          </Box>
          <Text fontWeight="light" fontSize={notMobile ? '2xl' : 'xl'} pb={notMobile ? 10 : 6}>
            {t('linkDescription')}
          </Text>
        </>
      </Container>
    </Box>
  );
}
