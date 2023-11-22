import {
  Box,
  Button,
  Container,
  Center,
  Flex,
  HStack,
  Stack,
  Drawer,
  IconButton,
  useColorMode,
  useColorModeValue,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useMediaQuery,
  Text,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  useDisclosure,
  Link,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { localeAtom, colorModeAtom } from 'core/atoms';
import { ConnectButton } from 'components/venomConnect';
import { useAtom } from 'jotai';
import Logo from './Logo';
import { RiMoonFill, RiSunFill, RiMenu2Fill, RiCloseFill } from 'react-icons/ri';
import { Locale } from 'translations';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useTranslate } from 'core/lib/hooks/use-translate';

export default function Header() {
  const [colorM, setColorM] = useAtom(colorModeAtom);
  const { colorMode, toggleColorMode } = useColorMode();
  const [locale, setLocale] = useAtom(localeAtom);
  const [notMobile] = useMediaQuery('(min-width: 900px)');
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
  const { pathname } = useRouter();
  const { t } = useTranslate();
  const home = pathname === '/' ? true : false;

  useEffect(() => {
    if (colorMode !== colorM) {
      toggleColorMode();
    }
  }, [colorMode]);

  return (
    <>
      <Center px={4} py={2} bgColor="var(--venom3)" color={'white'}>
        {t('testnetNotice')}
      </Center>

      <Box
        as="nav"
        borderBottom="1px"
        position={'sticky'} top={0}
        zIndex={500}
        backdropFilter="auto" backdropBlur={'6px'}
        backgroundColor={useColorModeValue('whiteAlpha.700', 'blackAlpha.700')}
        borderBottomColor={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}>
        <Container maxW="container.lg" py={2}>
          <Flex justifyContent="space-between" >
            <HStack>
              {!notMobile && (
                <IconButton aria-label="venomid-mobile-menu" variant="ghost" onClick={onOpen}>
                  <RiMenu2Fill />
                </IconButton>
              )}
              <NextLink href="/" passHref>
                <Button id="venomidlogo" fontWeight="bold" variant="ghost" px={2}>
                  <Logo />
                  <Text pl={1} color={useColorModeValue("var(--venom3)","var(--venom0)")}>
                    Venom ID
                  </Text>
                </Button>
              </NextLink>
              {notMobile && (
                <NextLink href={home ? "#w&w" : '/#w&w'} passHref>
                  <Button variant="ghost" color="default">
                    {t('w&w')}
                  </Button>
                </NextLink>
              )}
              
              {notMobile && (
                <NextLink href={home ? "#ns" : '/#ns'} passHref>
                  <Button variant="ghost">{t('naming')}</Button>
                </NextLink>
              )}
              {notMobile  && (
                <NextLink href={'/litepaper'} passHref>
                  <Button variant="ghost">{t('litepaper')}</Button>
                </NextLink>
              )}
              {notMobile && (
                <NextLink href="/manage" passHref>
                  <Button variant="ghost" color="default">
                    {t('manage')}
                  </Button>
                </NextLink>
              )}
              {notMobile && (
                <NextLink href="/contribute" passHref>
                  <Button variant="ghost">{t('contribute')}</Button>
                </NextLink>
              )}
            </HStack>
            <HStack dir="ltr">
              <ConnectButton />
              {notMobile && (
                <Menu>
                  <MenuButton as={Button}>{locale.toUpperCase()}</MenuButton>
                  <MenuList
                    py={0}
                    width={100}
                    border={1}
                    borderColor={'grey'}
                    bg={colorMode === 'light' ? 'var(--lightGrey)' : 'var(--darkGradient)'}>
                    <MenuItem onClick={() => setLocale(Locale.En)}>EN</MenuItem>
                    <MenuItem onClick={() => setLocale(Locale.Fa)}>فا</MenuItem>
                  </MenuList>
                </Menu>
              )}
              {notMobile && (
                <IconButton
                  aria-label="theme"
                  onClick={() => {
                    setColorM(colorMode === 'light' ? 'dark' : 'light');
                    toggleColorMode();
                  }}
                  icon={colorMode === 'light' ? <RiMoonFill /> : <RiSunFill />}
                />
              )}
            </HStack>
          </Flex>
        </Container>
        <Drawer
          placement={'left'}
          onClose={onClose}
          isOpen={isOpen}
          key={'nav-menu-drawer'}
          autoFocus={false}
          returnFocusOnClose={false}>
          <DrawerOverlay />
          <DrawerContent backgroundColor={colorMode === 'light' ? 'var(--white)' : 'var(--dark)'}>
            <DrawerHeader
              display="flex"
              borderBottomWidth="1px"
              gap={4}
              justifyContent="space-between">
              <NextLink href="/" passHref>
                <Button color="var(--venom1)" fontWeight="bold" variant="ghost">
                  <Logo />
                  <Text pl={1}>VenomID</Text>
                </Button>
              </NextLink>
              <HStack>
                <IconButton
                  variant="ghost"
                  aria-label="theme"
                  onClick={() => {
                    setColorM(colorMode === 'light' ? 'dark' : 'light');
                    toggleColorMode();
                  }}
                  icon={colorMode === 'light' ? <RiMoonFill /> : <RiSunFill />}
                />
                <IconButton aria-label="closemenu" variant="ghost" onClick={onClose}>
                  <RiCloseFill />
                </IconButton>
              </HStack>
            </DrawerHeader>
            <DrawerBody>
              
                <Stack py={4}>
                  
                  <Link href={home ? "#w&w" : '/#w&w'}>
                    <Button variant="ghost" width="100%" justifyContent="left" onClick={onToggle}>
                      {t('w&w')}
                    </Button>
                  </Link>
                  <Link href={home ? "#ns" : '/#ns'}>
                    <Button variant="ghost" width="100%" justifyContent="left" onClick={onToggle}>
                      {t('naming')}
                    </Button>
                  </Link>
                  <Link href={home ? "#roadmap" : '/#roadmap'}>
                    <Button variant="ghost" width="100%" justifyContent="left" onClick={onToggle}>
                      {t('roadmap')}
                    </Button>
                  </Link>
                  <Link href="/manage">
                    <Button variant="ghost" width="100%" justifyContent="left" onClick={onToggle}>
                      {t('manage')}
                    </Button>
                  </Link>
                  <Link href="/contribute">
                    <Button variant="ghost" width="100%" justifyContent="left" onClick={onClose}>
                      {t('contribute')}
                    </Button>
                  </Link>
                </Stack>
              
              
                <Stack borderTopWidth="1px" width="100%" py={4}>
                  <Button
                    onClick={() => setLocale(Locale.En)}
                    fontWeight="bold"
                    variant="ghost"
                    width="100%"
                    justifyContent="left">
                    English
                  </Button>
                  <Button
                    onClick={() => setLocale(Locale.Fa)}
                    fontWeight="bold"
                    variant="ghost"
                    width="100%"
                    justifyContent="left">
                    فارسی
                  </Button>
                </Stack>
              
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Box>
    </>
  );
}
