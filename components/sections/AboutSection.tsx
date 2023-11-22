import {
  useMediaQuery,
  Button,
  Container,
  Heading,
  Text,
  Stack,
  Box,
  Center,
  useColorModeValue,
  useColorMode,
  Link,
} from '@chakra-ui/react';
import { useTranslate } from 'core/lib/hooks/use-translate';
import {
  GITHUB_URL,
  MEDIUM_URL,
  SITE_PROFILE_URL,
  SOCIAL_TWITTER,
  TELEGRAM_URL,
  TWITTER_URL,
  YLIDE_URL,
  YOUTUBE_URL,
  ZEALY_URL,
} from 'core/utils/constants';
import ImageBox from 'components/Layout/ImageBox';
import { RiFileList3Line, RiShakeHandsLine, RiTelegramFill } from 'react-icons/ri';
import { Socials } from 'components/Profile';
import { getIconColor } from 'core/utils';
import { LinkIcon } from 'components/logos';

export default function AboutSection() {
  const { t } = useTranslate();
  const { colorMode } = useColorMode();
  const [notMobile] = useMediaQuery('(min-width: 769px)');
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
          <Center display="flex" flexDirection="column" gap={4} maxW={'md'}>
            <Heading fontWeight="bold" fontSize="5xl">
              {t('about')}
            </Heading>
            <Text fontWeight="light" fontSize={'xl'} textAlign={'center'}>
              {t('aboutDescription')}
            </Text>
            <Button
              as={Link}
              href="\litepaper"
              style={{ textDecoration: 'none'}}
              width={'100%'}
              gap={2}
              size={'lg'}
              variant={'outline'}>
              <RiFileList3Line size={28} />
              <Text>{t('litepaper')}</Text>
            </Button>
            <Button
              as={Link}
              href={YLIDE_URL}
              target="_blank"
              style={{ textDecoration: 'none' }}
              width={'100%'}
              gap={2}
              size={'lg'}
              variant={'outline'}>
              <LinkIcon type="ylide" />
              <Text>{t('ylide')}</Text>
            </Button>
            <Button
              as={Link}
              href={ZEALY_URL}
              target="_blank"
              style={{ textDecoration: 'none'}}
              width={'100%'}
              gap={2}
              size={'lg'}
              variant={'outline'}>
              <LinkIcon type="zealy" />

              <Text>{t('zealyCommunity')}</Text>
            </Button>
            <Button
              as={Link}
              href={TELEGRAM_URL}
              target="_blank"
              style={{ textDecoration: 'none' }}
              width={'100%'}
              gap={2}
              size={'lg'}
              variant={'outline'}>
              <LinkIcon type="telegram" />

              <Text>{t('talk')}</Text>
            </Button>
            <Center
              display="flex"
              flexDirection="column"
              borderRadius={15}
              borderColor="gray"
              gap={4}
              w={['xs', 'sm', 'md']}>
              {/* <Text fontSize="2xl" fontWeight={'bold'}>
                {t('onlyLinks')}
              </Text> */}
              {/* <Socials
                key={`socials-footer-vid-${colorMode}`}
                title={`foot`}
                onlyIcons
                color={getIconColor('', colorMode === 'light')}
                json={{
                  lightMode: useColorModeValue(true, false),
                  socials: {
                    twitter: TWITTER_URL + SOCIAL_TWITTER,
                    medium: MEDIUM_URL,
                    youtube: YOUTUBE_URL,
                    github: GITHUB_URL,
                  },
                }}
              /> */}
            </Center>
          </Center>
        </>
      </Container>
    </Box>
  );
}
