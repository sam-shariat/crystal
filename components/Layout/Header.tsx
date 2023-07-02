import {
  Box,
  Button,
  Container,
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
  useDisclosure
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { localeAtom, colorModeAtom } from 'core/atoms';
import { ConnectButton } from 'components/venomConnect';
import { useAtom } from 'jotai';
import Logo from './Logo';
import { RiMoonFill, RiSunFill, RiMenu2Fill, RiCloseFill } from 'react-icons/ri';
import { Locale } from 'translations';
import { useRouter } from 'next/router'
import { useEffect } from 'react';
import { useTranslate } from 'core/lib/hooks/use-translate';

export default function Header() {
  const [colorM,setColorM] = useAtom(colorModeAtom);
  const { colorMode, toggleColorMode } = useColorMode();
  const [locale, setLocale] = useAtom(localeAtom);
  const [notMobile] = useMediaQuery('(min-width: 800px)');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { pathname } = useRouter()
  const { t } = useTranslate();
  const home = pathname === '/' ? true : false;

  useEffect(()=> {
    console.log(colorMode + " is " + colorM)
    if(colorMode !== colorM){
      
      toggleColorMode();
    }
  },[colorMode])

  return (
    <Box
      as="nav"
      borderBottom="1px"
      backgroundColor={useColorModeValue('blackAlpha.100', 'blackAlpha.500')}
      borderBottomColor={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      py={2}>
      <Container maxW="container.lg">
        <Flex justifyContent="space-between">
          <HStack>
            {!notMobile && (
              <IconButton aria-label='venomid-mobile-menu' variant="ghost" onClick={onOpen}>
                <RiMenu2Fill />
              </IconButton>
            )}
            <NextLink href="/" passHref>
              <Button id="venomidlogo" color="var(--venom1)" fontWeight="bold" variant="ghost" px={2}>
                <Logo />
                <Text pl={1}>VenomID</Text>
              </Button>
            </NextLink>
            {notMobile && home &&(
              <NextLink href="#manage" passHref>
                <Button variant="ghost">
                  {t('manage')}
                </Button>
              </NextLink>
            )}
            {notMobile && home && (
              <NextLink href="#profile" passHref>
                <Button variant="ghost">
                  {t('profile')}
                </Button>
              </NextLink>
            )}
            {notMobile && home && (
              <NextLink href="#roadmap" passHref>
                <Button variant="ghost">
                  {t('roadmap')}
                </Button>
              </NextLink>
            )}
            {notMobile && home && (
              <NextLink href="#about" passHref>
                <Button variant="ghost">
                  {t('about')}
                </Button>
              </NextLink>
            )}
          </HStack>
          <HStack dir="ltr">
            <ConnectButton />
            {notMobile && home &&(
              <Menu>
                <MenuButton as={Button}>{locale.toUpperCase()}</MenuButton>
                <MenuList py={0} width={100} border={1} borderColor={'grey'} bg={colorMode === 'light' ? 'var(--lightGrey)': 'var(--darkGradient)'}>
                  <MenuItem onClick={() => setLocale(Locale.En)}>EN</MenuItem>
                  <MenuItem onClick={() => setLocale(Locale.Fa)}>فا</MenuItem>
                </MenuList>
              </Menu>
            )}
            {notMobile && (
              <IconButton
                aria-label="theme"
                onClick={()=> {setColorM(colorMode === 'light' ? 'dark' : 'light'); toggleColorMode()} }
                
                icon={colorMode === 'light' ? <RiMoonFill /> : <RiSunFill />}
              />
            )}
          </HStack>
        </Flex>
      </Container>
      <Drawer placement={'left'} onClose={onClose} isOpen={isOpen}>
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
                onClick={()=> {setColorM(colorMode === 'light' ? 'dark' : 'light'); toggleColorMode()} }
                
                icon={colorMode === 'light' ? <RiMoonFill /> : <RiSunFill />}
              />
              <IconButton aria-label='closemenu' variant="ghost" onClick={onClose}>
                <RiCloseFill />
              </IconButton>
            </HStack>
          </DrawerHeader>
          <DrawerBody>
            {home && <Stack py={4}>
              <NextLink href="#manage" passHref>
                <Button variant="ghost" width="100%" justifyContent="left">
                  {t('manage')}
                </Button>
              </NextLink>
              <NextLink href="#profile" passHref>
                <Button variant="ghost" width="100%" justifyContent="left">
                {t('profile')}
                </Button>
              </NextLink>
              <NextLink href="#roadmap" passHref>
                <Button variant="ghost" width="100%" justifyContent="left">
                {t('roadmap')}
                </Button>
              </NextLink>
              <NextLink href="#about" passHref>
                <Button variant="ghost" width="100%" justifyContent="left">
                {t('about')}
                </Button>
              </NextLink>
            </Stack>}
            {home && <Stack borderTopWidth="1px" width="100%" py={4}>
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
            </Stack>}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}
