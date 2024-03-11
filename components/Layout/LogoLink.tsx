import { Button, Flex, Text, useColorMode, useMediaQuery } from '@chakra-ui/react';
import { Logo } from 'components/logos';
import NextLink from 'next/link';


export default function LogoLink() {
  const lightMode = useColorMode().colorMode === 'light';
  const [small] = useMediaQuery('(min-width: 480px)');
  return (
    <Flex flexGrow={1} width={'100%'}>
    <NextLink href="/" passHref>
      <Button
        id="venomidlogo"
        fontWeight="bold"
        variant="ghost"
        p={[1,4]}
        gap={2}
        fontSize={'xl'}
        size={'lg'}
        rounded={'full'}>
        <Logo />
        {small && (
          <Text
            bgGradient={
              lightMode
                ? 'linear(to-r, var(--venom2), var(--bluevenom2))'
                : 'linear(to-r, var(--venom0), var(--bluevenom0))'
            }
            bgClip="text">
            Venom ID
          </Text>
        )}
      </Button>
    </NextLink>
    </Flex>
  );
}
