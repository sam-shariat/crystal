import { useMediaQuery, Button, Container, Heading, Text, SimpleGrid, Box, Center } from '@chakra-ui/react';
import { useTranslate } from 'core/lib/hooks/use-translate';
import NextLink from 'next/link';
import { SITE_PROFILE_URL } from 'core/utils/constants';
import Venom from 'components/Venom';

export default function AboutSection() {
  const { t } = useTranslate();
  const [notMobile] = useMediaQuery('(min-width: 800px)');
  return (
    <Box id="about">
      <Container
        as="main"
        maxW="container.md"
        display="grid"
        placeContent="center"
        placeItems="center"
        minH="75vh">
        <>
          <Center display="flex" flexDirection="column" my={8}>
              <Heading fontWeight="bold" fontSize="5xl">
                {t('about')}
              </Heading>
              <Center display="flex" flexDirection="column" my={4}>
                <Venom srcUrl="/logos/vid.svg" size={notMobile ? 'xs' : 'xs'} />
              </Center>
              <Text fontWeight="light" fontSize={notMobile ? '2xl' : 'xl'} mb={8}>
                {t('aboutDescription')}
              </Text>
              <NextLink href={SITE_PROFILE_URL} passHref><Button backgroundColor="var(--venom1)" size="lg" minWidth="100%">
                {t('aboutButton')}
              </Button></NextLink>
            </Center>
        </>
      </Container>
    </Box>
  );
}
