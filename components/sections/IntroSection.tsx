import {
  useMediaQuery,
  Button,
  Container,
  Heading,
  Text,
  Stack,
  Box,
  Center,
  SimpleGrid,
  HStack,
  Grid,
  GridItem,
  useColorMode,
  Highlight,
  useColorModeValue,
  Progress,
  IconButton,
  Flex,
} from '@chakra-ui/react';
import { useTranslate } from 'core/lib/hooks/use-translate';
import { Avatar, Links, Socials } from 'components/Profile';
import Wallets from 'components/Profile/Wallets';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  bgColorAtom,
  buttonBgColorAtom,
  fontAtom,
  lightModeAtom,
  openModalAtom,
  roundAtom,
  variantAtom,
} from 'core/atoms';
import { useAtom, useSetAtom } from 'jotai';
import {
  LINK_VARIATIONS,
  SOCIALS_VARIATIONS,
  VARIATIONS,
  WALLETS_VARIATIONS,
} from 'core/utils/constants';
import { getIconColor, getRandomNumber, sleep } from 'core/utils';
import { RiArrowRightCircleFill, RiLinksLine } from 'react-icons/ri';
import { FaCircle } from 'react-icons/fa';
import { GiCubeforce } from 'react-icons/gi';
import { CgIfDesign } from 'react-icons/cg';
import TextIcon from 'components/Layout/TextIcon';
import { motion } from 'framer-motion';

export default function IntroSection() {
  let changeTimer: any;
  let progressTimer: any;
  const { t } = useTranslate();
  const [notMobile] = useMediaQuery('(min-width: 769px)');
  const { colorMode } = useColorMode();
  const [buttonBg, setButtonBg] = useAtom(buttonBgColorAtom);
  const [variant, setVariant] = useAtom(variantAtom);
  const [round, setRound] = useAtom(roundAtom);
  const [bgColor, setBgColor] = useAtom(bgColorAtom);
  const [font, setFont] = useAtom(fontAtom);
  const [lightMode, setLightMode] = useAtom(lightModeAtom);
  const [current, setCurrent] = useState(0);
  const [opacity, setOpacity] = useState(1);
  const [timer, setTimer] = useState(0);
  const [top, setTop] = useState(0);
  const [avatar, setAvatar] = useState(VARIATIONS[0].avatar);
  const [avatarIsNft, setAvatarIsNft] = useState(VARIATIONS[0].nftAvatar);
  const [title, setTitle] = useState(VARIATIONS[0].title);
  const [subtitle, setSubtitle] = useState(VARIATIONS[0].subtitle);
  const [vid, setVid] = useState(VARIATIONS[0].vid);
  const [links, setLinks] = useState(LINK_VARIATIONS[0]);
  const [socials, setSocials] = useState(SOCIALS_VARIATIONS[0]);
  const [wallets, setWallets] = useState(WALLETS_VARIATIONS[0]);
  const [_open, _setOpen] = useAtom(openModalAtom);

  const win = useRef(null);

  const change = async () => {
    let cur;
    setOpacity(0);
    if (current < VARIATIONS.length - 1) {
      cur = current + 1;
    } else {
      cur = 0;
    }
    await sleep(300);
    setBgColor(VARIATIONS[cur].bg);
    setLightMode(VARIATIONS[cur].lightMode);
    setButtonBg(VARIATIONS[cur].buttonBg);
    setVariant(VARIATIONS[cur].variant);
    setRound(VARIATIONS[cur].round);
    setFont(VARIATIONS[cur].font);
    setAvatar(VARIATIONS[cur].avatar);
    setTitle(VARIATIONS[cur].title);
    setSubtitle(VARIATIONS[cur].subtitle);
    setVid(VARIATIONS[cur].vid);
    setAvatarIsNft(VARIATIONS[cur].nftAvatar);
    setLinks(LINK_VARIATIONS[cur]);
    setSocials(SOCIALS_VARIATIONS[cur]);
    setWallets(WALLETS_VARIATIONS[cur]);
    setOpacity(1);
    setCurrent(cur);
  };

  const changeProgress = () => {
    if (timer === 8000) {
      change();
      setTimer(0);
      clearInterval(progressTimer); // clear the interval when timer is 8000
    } else {
      if (window.scrollY > 700 && window.scrollY < 2000 && !_open) {
        setTimer(timer + 80);
      }
      window.addEventListener('scroll', () => setTop(top + 1));
    }
  };

  useEffect(() => {
    progressTimer = setInterval(changeProgress, 80); // use setInterval instead of setTimeout
    return () => {
      clearInterval(progressTimer); // clear the interval when the component unmounts
    };
  }, [timer, top, _open]);

  return (
    <Box backgroundColor={colorMode === 'dark' ? 'whiteAlpha.100' : 'blackAlpha.100'} id="w&w">
      <Container
        ref={win}
        maxW="container.lg"
        display="grid"
        placeContent="center"
        placeItems="center"
        minH="80vh"
        py={16}>
        <Grid
          templateColumns={[`repeat(1, 1fr)`, `repeat(1, 1fr)`, `repeat(1, 1fr)`, `repeat(6, 1fr)`]}
          gap={[10, 10, 10, 4]}
          my={10}
          alignItems={'center'}>
          <GridItem colSpan={[3, 3, 2, 3]}>
            <Stack px={[4, 4, 6, 10]} gap={6}>
              <Heading
                as={'h3'}
                fontWeight="bold"
                fontSize={['4xl', '4xl', '5xl', '5xl', '6xl']}
                textAlign={['center', 'center', 'center', 'left']}>
                {t('wat')}
              </Heading>
              <Text
                fontWeight="normal"
                fontSize={['xl', '2xl', '3xl', '3xl']}
                textAlign={['center', 'center', 'center', 'left']}>
                {t('watis')}
              </Text>
            </Stack>
          </GridItem>
          <GridItem colSpan={3} display={'flex'} justifyContent={'center'}>
            <Flex maxW={['container.sm', 'container.md']} flexDir={'column'}>
              <Center
                rounded={'2xl'}
                borderBottomRadius={0}
                px={4}
                py={2}
                transition={'"all 1s ease"'}
                justifyContent={'space-between'}
                bgColor={useColorModeValue('light.600', 'dark.600')}>
                <RiLinksLine />

                <Text
                  transition={'all 1s ease'}
                  borderRadius={12}
                  border={'1px solid gray'}
                  p={2}
                  px={4}>
                  venomid.link/{vid.slice(0, -4)}
                </Text>
                <HStack gap={2}>
                  <IconButton
                    aria-label="next-vid-slider"
                    variant={'ghost'}
                    onClick={() => {
                      change();
                      setTimer(0);
                    }}>
                    <RiArrowRightCircleFill />
                  </IconButton>
                  <FaCircle />
                </HStack>
              </Center>
              <Progress
                sx={{
                  '& > div:first-child': {
                    transitionProperty: 'width',
                  },
                }}
                size={'xs'}
                min={0}
                max={8000}
                width={'100%'}
                colorScheme="green"
                value={timer}
                isAnimated
              />
              <Center
                display="flex"
                gap={2}
                flexDirection="column"
                bg={bgColor}
                width={'100%'}
                rounded={'2xl'}
                borderTopRadius={0}
                height={'610px'}
                bgSize={'cover'}
                bgRepeat={'no-repeat'}
                bgPosition={'center'}
                transition={'all .5s ease'}
                p={4}>
                <motion.div
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                  key={`venomid-templates-${current}`}
                  transition={{ duration: 0.5, ease: 'linear' }}
                  initial={{ y: 20, scale: 0.9, opacity: 0.5, filter: 'blur(20px)' }}
                  animate={{ y: 0, scale: 1, opacity: 1, filter: 'blur(0px)' }}
                  exit={{
                    y: -20,
                    scale: 0.9,
                    opacity: 0.5,
                    filter: 'blur(20px)',
                    transition: { ease: 'backOut', duration: 0.2 },
                  }}>
                  <HStack gap={4}>
                    <Box maxW={notMobile ? '160px' : '100px'}>
                      <Avatar
                        url={avatar}
                        alt={'venom id avatar image'}
                        isNft={avatarIsNft}
                        shadow="none"
                      />
                    </Box>

                    <Stack gap={0}>
                      <Text
                        fontFamily={font}
                        fontWeight="bold"
                        fontSize="2xl"
                        color={getIconColor(buttonBg, lightMode)}>
                        {title}
                      </Text>
                      <Text
                        fontWeight="normal"
                        fontSize="lg"
                        fontFamily={font}
                        color={getIconColor(buttonBg, lightMode)}>
                        {subtitle}
                      </Text>
                      <Text
                        fontFamily={font}
                        fontWeight="bold"
                        fontSize="xl"
                        color={getIconColor(buttonBg, lightMode)}>
                        {vid}
                      </Text>
                    </Stack>
                  </HStack>
                  <Socials
                    key={`socials-${current}-${colorMode}`}
                    onlyIcons
                    json={{
                      lightMode: lightMode,
                      socials: socials,
                      lineIcons: lightMode,
                    }}
                  />
                  <Wallets
                    key={`wallets-${current}-${colorMode}`}
                    json={{
                      wallets: wallets,
                    }}
                  />
                  <Links
                    key={`links-${current}-${colorMode}`}
                    json={{
                      links: links,
                    }}
                  />
                </motion.div>
              </Center>
            </Flex>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
}
