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
  Popover,
  PopoverTrigger,
  Portal,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
  PopoverCloseButton,
  PopoverBody,
  PopoverFooter,
  SimpleGrid,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { localeAtom, colorModeAtom, isConnectedAtom } from 'core/atoms';
import { ConnectButton } from 'components/venomConnect';
import { useAtom, useAtomValue } from 'jotai';
import { RiMoonFill, RiSunFill, RiMenu2Fill, RiCloseFill } from 'react-icons/ri';
import { Locale } from 'translations';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useTranslate } from 'core/lib/hooks/use-translate';
import { LinkIcon, Logo, VenomFoundation } from 'components/logos';
import Footer from './Footer';
import LogoLink from './LogoLink';
import { DOCS_URL, GRINDING_URL, GUIDES_URL, ROADMAP_URL, VARIATIONS_VIDS } from 'core/utils/constants';
import { motion } from 'framer-motion';
import ImageBox from 'components/claiming/ImageBox';
export default function Header() {
  const [colorM, setColorM] = useAtom(colorModeAtom);
  const { colorMode, toggleColorMode } = useColorMode();
  const lightMode = useColorMode().colorMode === 'light';
  const [notMobile] = useMediaQuery('(min-width: 992px)');
  const [small] = useMediaQuery('(min-width: 420px)');
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
  const { pathname } = useRouter();
  const home = pathname === '/' ? true : false;
  const { t } = useTranslate();
  const isConnected = useAtomValue(isConnectedAtom);
  const dashboard = pathname === '/manage' ? true : false;

  useEffect(() => {
    if (!pathname.includes('nftAddress')) {
      if (colorMode !== colorM) {
        toggleColorMode();
      }
    }
  }, [colorM, colorMode]);

  return (
    <>
      {!notMobile && (
        <Center px={[4, 4, 0]} fontSize={'lg'} py={2} bgGradient={'linear(to-r, var(--venom), var(--bluevenom1))'} color={'white'}>
          <NextLink href="/community" passHref>
                  <Button
                    variant="ghost"
                    rounded={'full'}
                    gap={2}
                    isActive={pathname === '/community'}
                    size={'lg'}>
                    <ImageBox srcUrl={VARIATIONS_VIDS[9].avatar} size={'46px'} shadow='none'/>
                    Community
                  </Button></NextLink>
                
        </Center>
      )}
      <Box
        as="nav"
        position={'relative'}
        top={['0px']}
        zIndex={1000}
        px={0}
        m={0}
        width={'100%'}
        placeItems={'center'}

        // backgroundColor={colorMode === 'dark' ? 'blackAlpha.200' : 'auto'}
        // backdropFilter="auto"
        // backdropBlur={'8px'}
        // backgroundColor={useColorModeValue('whiteAlpha.700', 'blackAlpha.700')}
        // borderBottomColor={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      >
        <Container maxW="100%" p={[3, 4, 4, 4, 8]}>
          <Flex justifyContent="space-between">
            <LogoLink />
            {/*<HStack gap={1}>
              
              {notMobile && (
                <NextLink href={home ? '#w&w' : '/#w&w'} passHref>
                  <Button variant="ghost" color="default">
                    {t('w&w')}
                  </Button>
                </NextLink>
              )}

              {notMobile && (
                <NextLink href={home ? '#ns' : '/#ns'} passHref>
                  <Button variant="ghost">{t('naming')}</Button>
                </NextLink>
              )}
              {notMobile && (
                <NextLink href={'/litepaper'} passHref>
                  <Button variant="ghost">{t('litepaper')}</Button>
                </NextLink>
              )}

              {notMobile && (
                <NextLink href="/community" passHref>
                  <Button variant="ghost">{t('community')}</Button>
                </NextLink>
              )} 
            </HStack>*/}
            <HStack dir="ltr">
              {notMobile && (
                
                  <NextLink href="/community" passHref>
                    <Button
                      variant="ghost"
                      rounded={'full'}
                      gap={2}
                      w={'200px'}
                      color={pathname === '/community' ? 'var(--venom1)' : 'inherit'}
                      isActive={pathname === '/community'}
                      size={'lg'}>
                        <ImageBox srcUrl={VARIATIONS_VIDS[9].avatar} size={'46px'} shadow='none'/>
                        Community
                    </Button></NextLink>
                
              )}

              {isConnected && (
                <NextLink href="/manage" passHref>
                  <Button variant="ghost" rounded={'full'} gap={2} isActive={dashboard} size={['md','md','lg']}>
                    <LinkIcon
                      type="RiApps2Line"
                      size={24}
                      color={dashboard ? 'var(--venom1)' : 'inherit'}
                    />
                    {notMobile && (
                      <Text color={dashboard ? 'var(--venom1)' : 'default'}>{t('My Names')}</Text>
                    )}
                  </Button>
                </NextLink>
              )}

              <Popover onClose={onClose} isOpen={isOpen} onOpen={onOpen}>
                <PopoverTrigger>
                  <IconButton
                    aria-label="venomid-mobile-menu"
                    variant="ghost"
                    mx={0}
                    rounded={'full'}
                    size={['md', 'lg']}>
                    <LinkIcon type="RiMenuLine" size={22} />
                  </IconButton>
                </PopoverTrigger>
                <Portal>
                  <PopoverContent
                    rounded={'2xl'}
                    zIndex={10000}
                    mt={2}
                    bg={lightMode ? 'var(--white)' : 'var(--dark)'}>
                    <PopoverHeader
                      justifyContent={'space-between'}
                      display={'flex'}
                      alignItems={'center'}
                      p={4}
                      px={6}>
                      <Flex gap={3}>
                        <VenomFoundation />
                        <Text fontWeight={'bold'} cursor={'default'}>
                          Venom Mainnet
                        </Text>
                      </Flex>
                      <IconButton
                        variant="ghost"
                        aria-label="theme"
                        onClick={() => {
                          setColorM(lightMode ? 'dark' : 'light');
                          toggleColorMode();
                        }}
                        icon={lightMode ? <RiMoonFill /> : <RiSunFill />}
                      />
                    </PopoverHeader>
                    <PopoverBody>
                      <SimpleGrid columns={2} py={2} gap={2}>
                        <NextLink href={'/what'} passHref>
                          <Button
                            variant="ghost"
                            colorScheme={pathname === '/what' ? 'green' : 'gray'}
                            onClick={onClose}
                            width="100%"
                            justifyContent="left">
                            {t('What & Why')}
                          </Button>
                        </NextLink>
                        <NextLink href={'/usecase'} passHref>
                          <Button
                            onClick={onClose}
                            variant="ghost"
                            colorScheme={pathname === '/usecase' ? 'green' : 'gray'}
                            width="100%"
                            justifyContent="left">
                            {t('Use Case')}
                          </Button>
                        </NextLink>
                        <NextLink href={'/community'} passHref>
                          <Button
                            onClick={onClose}
                            variant="ghost"
                            colorScheme={pathname === '/community' ? 'green' : 'gray'}
                            width="100%"
                            justifyContent="left">
                            {t('Community')}
                          </Button>
                        </NextLink>
                        <NextLink href={'/litepaper'} passHref>
                          <Button
                            onClick={onClose}
                            variant="ghost"
                            colorScheme={pathname === '/litepaper' ? 'green' : 'gray'}
                            width="100%"
                            justifyContent="left">
                            {t('Litepaper')}
                          </Button>
                        </NextLink>

                        <NextLink href={'/ecosystem'} passHref>
                        
                          <Button variant="ghost" width="100%" onClick={onClose} colorScheme={pathname === '/ecosystem' ? 'green' : 'gray'} justifyContent="left">
                            {t('Ecosystem')}
                          </Button>
                        </NextLink>

                        <Link href={ROADMAP_URL} target="_blank">
                          <Button variant="ghost" width="100%" justifyContent="left">
                            {t('RoadMap')}
                          </Button>
                        </Link>
                        <Link href={DOCS_URL} target="_blank">
                          <Button variant="ghost" width="100%" justifyContent="left">
                            {t('Developers')}
                          </Button>
                        </Link>
                        <Link href={GUIDES_URL} target="_blank">
                          <Button variant="ghost" width="100%" justifyContent="left">
                            {t('Guides')}
                          </Button>
                        </Link>
                        

                        <NextLink href={'/terms'} passHref>
                          <Button
                            onClick={onClose}
                            variant="ghost"
                            colorScheme={pathname === '/terms' ? 'green' : 'gray'}
                            width="100%"
                            justifyContent="left">
                            {t('Terms of Use')}
                          </Button>
                        </NextLink>
                        <NextLink href={'/privacy'} passHref>
                          <Button
                            onClick={onClose}
                            variant="ghost"
                            colorScheme={pathname === '/privacy' ? 'green' : 'gray'}
                            width="100%"
                            justifyContent="left">
                            {t('Privacy Policy')}
                          </Button>
                        </NextLink>
                      </SimpleGrid>
                    </PopoverBody>
                    <PopoverFooter>
                      <Footer />
                    </PopoverFooter>
                  </PopoverContent>
                </Portal>
              </Popover>

              <ConnectButton />
              {/* {notMobile && (
                <Menu>
                  <MenuButton as={Button}>{locale.toUpperCase()}</MenuButton>
                  <MenuList
                    py={0}
                    width={100}
                    border={1}
                    borderColor={'grey'}
                    bg={lightMode ? 'var(--lightGrey)' : 'var(--darkGradient)'}>
                    <MenuItem onClick={() => setLocale(Locale.En)}>EN</MenuItem>
                    <MenuItem onClick={() => setLocale(Locale.Fa)}>فا</MenuItem>
                  </MenuList>
                </Menu>
              )} */}
              {/* {notMobile && (
                <IconButton
                  rounded={'full'}
                  aria-label="theme"
                  onClick={() => {
                    setColorM(lightMode ? 'dark' : 'light');
                    toggleColorMode();
                  }}
                  icon={lightMode ? <RiMoonFill /> : <RiSunFill />}
                />
              )} */}
            </HStack>
          </Flex>
        </Container>
      </Box>
    </>
  );
}
