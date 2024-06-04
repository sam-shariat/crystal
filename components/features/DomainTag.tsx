import { Avatar, Link, Tag, Text, Tooltip, useColorMode, useMediaQuery } from '@chakra-ui/react';
import { LinkIcon } from 'components/logos';
import { AVATAR_API_URL, SITE_PROFILE_URL, VENOMSCAN_NFT } from 'core/utils/constants';

interface Props {
  name: string;
}

export default function DomainTag({ name }: Props) {
  const { colorMode } = useColorMode();
  const lightMode = colorMode === 'light';
  const [notMobile] = useMediaQuery('(min-width: 768px)');
  const [small] = useMediaQuery('(min-width: 375px)');

  return (
    <Link
      px={3}
      pl={name.includes('.venom') ? 1 : 3}
      py={1}
      display={'flex'}
      alignItems={'center'}
      maxW={'max-content'}
      gap={2}
      rounded={'full'}
      _hover={{border: '1px solid #77777799'}}
      border={'1px solid #ffffff00'}
      textAlign={'center'}
      fontSize={!small ? 'md' : ['lg', 'xl']}
      as={Link}
      style={{ textDecoration: 'none' }}
      href={SITE_PROFILE_URL + name}
      target="_blank"
      fontWeight={'bold'}>
      <Avatar
        icon={<LinkIcon type="RiUserLine" size={22} color="#ffffff" />}
        bgColor={lightMode ? 'blackAlpha.500' : 'whiteAlpha.200'}
        rounded={'full'}
        src={AVATAR_API_URL + name + '&v=' + Math.random()}
        size={['md']}
      />
      <Text
        bgGradient={
          lightMode
            ? 'linear(to-r, var(--venom2), var(--bluevenom2))'
            : 'linear(to-r, var(--venom0), var(--bluevenom0))'
        }
        bgClip="text">
        {notMobile ? name : name.length > 13 ? name.slice(0, 10) + '...' : name}
      </Text>
    </Link>
  );
}
