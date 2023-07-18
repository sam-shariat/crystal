import {
  useMediaQuery,
  Button,
  Container,
  Heading,
  Text,
  Stack,
  Box,
  Center,
} from '@chakra-ui/react';
import { useTranslate } from 'core/lib/hooks/use-translate';
import { SITE_PROFILE_URL } from 'core/utils/constants';
import SocialIcons from 'components/Layout/SocialIcons';
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
        minH="75vh"
        py={10}>
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
            <Center display="flex" flexDirection="column" p={notMobile ? 10 : 4} borderRadius={10} borderWidth={1} borderColor='gray'>
              <Text fontSize="2xl">
              {t('onlyLinks')}
              </Text>
              <SocialIcons />
            </Center>
          </Center>
        </>
      </Container>
    </Box>
  );
}
