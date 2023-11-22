import { Text, Box, useColorMode, Center, Link, Button } from '@chakra-ui/react';
import { RiTwitterFill, RiMediumFill, RiGithubFill, RiTelegramFill } from 'react-icons/ri';
import LogoIcon from 'components/Layout/LogoIcon';
import {
    TWITTER_URL,
    SOCIAL_TWITTER,
    SITE_PROFILE_URL,
    MEDIUM_URL,
    GITHUB_URL,
    TELEGRAM_URL
  } from 'core/utils/constants';

export default function SocialIcons() {
  const { colorMode } = useColorMode();
  return (
    <Center mt={6}>
      
      <Button variant="ghost" height={'60px'} py={2} as={Link} href={TWITTER_URL+SOCIAL_TWITTER} target="_blank">
        <RiTwitterFill size="lg" />
      </Button>
      <Button variant="ghost" height={'60px'} py={2} as={Link} href={MEDIUM_URL} target="_blank">
        <RiMediumFill size="lg" />
      </Button>
      <Button variant="ghost" height={'60px'} py={2} as={Link} href={GITHUB_URL} target="_blank">
        <RiGithubFill size="lg" />
      </Button>
      <Button variant="ghost" height={'60px'} py={2} as={Link} href={TELEGRAM_URL} target="_blank">
        <RiTelegramFill size="lg" />
      </Button>
      <Button variant="ghost" height={'60px'} py={2} as={Link} href={SITE_PROFILE_URL+'venomid'} target="_blank">
        <LogoIcon size="44px" />
      </Button>
    </Center>
  );
}
