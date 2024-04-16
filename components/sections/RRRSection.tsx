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
  LightMode,
  DarkMode,
  Link,
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
  walletButtonsAtom,
} from 'core/atoms';
import { useAtom, useSetAtom } from 'jotai';
import {
  BG_COLORS,
  DISCORD_URL,
  LINK_VARIATIONS,
  MEDIUM_URL,
  SOCIALS_VARIATIONS,
  SOCIAL_TWITTER,
  TELEGRAM_URL,
  TWITTER_URL,
  VARIATIONS,
  VARIATIONS_VIDS,
  WALLETS_VARIATIONS,
  YLIDE_URL,
  YOUTUBE_URL,
} from 'core/utils/constants';
import { getIconColor, getRandomNumber, sleep } from 'core/utils';
import { RiArrowRightCircleFill, RiLinksLine } from 'react-icons/ri';
import { FaCircle } from 'react-icons/fa';
import {
  motion,
  motionValue,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'framer-motion';
import TextCard from 'components/claiming/TextCard';
import { LinkIcon, Logo } from 'components/logos';
import DomainName from 'components/features/DomainName';
import AccountAddress from 'components/features/AccountAddress';
import { wrap } from '@motionone/utils';
import Prize from 'components/features/Prize';
import RRRItem from 'components/features/RRRItem';
import ImageBox from 'components/claiming/ImageBox';

export default function RRRSection() {
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
  const [walletButtons, setWalletButtons] = useState(true);
  const [socialButtons, setSocialButtons] = useState(true);
  const [current, setCurrent] = useState(0);
  const [opacity, setOpacity] = useState(1);
  const [timer, setTimer] = useState(0);
  const [top, setTop] = useState(0);
  const [avatar, setAvatar] = useState(VARIATIONS[0].avatar);
  const [avatarShape, setAvatarShape] = useState(VARIATIONS[0].avatarShape);
  const [title, setTitle] = useState(VARIATIONS[0].title);
  const [subtitle, setSubtitle] = useState(VARIATIONS[0].subtitle);
  const [vid, setVid] = useState(VARIATIONS[0].vid);
  const [links, setLinks] = useState(LINK_VARIATIONS[0]);
  const [socials, setSocials] = useState(SOCIALS_VARIATIONS[0]);
  const [wallets, setWallets] = useState(WALLETS_VARIATIONS[0]);
  const [_open, _setOpen] = useAtom(openModalAtom);

  const win = useRef(null);

  const { scrollYProgress } = useScroll();
  const bg = useMotionValue('#dbdbdb00');
  const bgcolor = useTransform(
    scrollYProgress,
    [0, 1],
    [
      colorMode === 'light' ? '#13131300' : '#2bb67300',
      colorMode === 'light' ? '#239960ff' : '#2bb673ff',
    ]
  );
  useAnimationFrame((_t, delta) => {
    bg.set(bgcolor.get());
  });

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
    setWalletButtons(VARIATIONS[cur].WalletButtons);
    setSocialButtons(VARIATIONS[cur].socialButtons ?? true);
    setButtonBg(VARIATIONS[cur].buttonBg);
    setVariant(VARIATIONS[cur].variant);
    setRound(VARIATIONS[cur].round);
    setFont(VARIATIONS[cur].font);
    setAvatar(VARIATIONS[cur].avatar);
    setTitle(VARIATIONS[cur].title);
    setSubtitle(VARIATIONS[cur].subtitle);
    setVid(VARIATIONS[cur].vid);
    setAvatarShape(VARIATIONS[cur].avatarShape);
    setLinks(LINK_VARIATIONS[cur]);
    setSocials(SOCIALS_VARIATIONS[cur]);
    setWallets(WALLETS_VARIATIONS[cur]);
    setOpacity(1);
    setCurrent(cur);
  };

  // const changeProgress = () => {
  //   if (timer === 8000) {
  //     change();
  //     setTimer(0);
  //     clearInterval(progressTimer); // clear the interval when timer is 8000
  //   } else {
  //     if (window.scrollY > 700 && window.scrollY < 2000 && !_open) {
  //       setTimer(timer + 80);
  //     }
  //     window.addEventListener('scroll', () => setTop(top + 1));
  //   }
  // };

  useEffect(() => {
    // progressTimer = setInterval(changeProgress, 80); // use setInterval instead of setTimeout
    // return () => {
    //   clearInterval(progressTimer); // clear the interval when the component unmounts
    // };
  }, [timer, top, _open]);

  interface ParallaxProps {
    children: JSX.Element;
    baseVelocity: number;
  }

  function Parallax({ children, baseVelocity = 100 }: ParallaxProps) {
    const baseX = useMotionValue(0);
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
      damping: 50,
      stiffness: 400,
    });
    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 7], {
      clamp: false,
    });
    const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

    const directionFactor = useRef<number>(1);
    useAnimationFrame((_t, delta) => {
      let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
      if (velocityFactor.get() < 0) {
        directionFactor.current = -1;
      } else if (velocityFactor.get() > 0) {
        directionFactor.current = 1;
      }

      moveBy += directionFactor.current * moveBy * velocityFactor.get();

      baseX.set(baseX.get() + moveBy);
    });
    return (
      <div className="parallax">
        <motion.div className="scroller" style={{ x }}>
          <span>{children} </span>
          <span>{children} </span>
          <span>{children} </span>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div style={{ backgroundColor: bg }} key={'whatnwhy'}>
      <Container
        ref={win}
        maxW="container.xl"
        display="grid"
        placeContent="center"
        placeItems="center"
        minH="90vh"
        py={16}>
        <SimpleGrid columns={[1]} gap={10}>
          <GridItem>
            <Stack px={[4, 4, 6, 10]} gap={12} align={'center'}>
              <Heading
                as={'h3'}
                fontWeight="bold"
                fontSize={['4xl', '4xl', '5xl', '5xl', '6xl']}
                textAlign={['center']}>
                the Radiant Riddle Raffle
              </Heading>
              <ImageBox srcUrl='/logos/rrraffle-logo.svg' />
              <Button
              as={Link}
              href='https://tokenforge.gg/'
              target='_blank'
                 py={4}
                 px={6}
                  width={'max-content'}
                  justifyContent={'center'}
                  gap={2}
                  color={'white'}
                  bgGradient={'linear(to-r, var(--venom1), var(--bluevenom1))'}
                  _hover={{
                    bgGradient:
                      colorMode === 'light'
                        ? 'linear(to-r, var(--venom0), var(--bluevenom0))'
                        : 'linear(to-r, var(--venom0), var(--bluevenom0))',
                  }}
                  rounded={'full'}
                  variant={'ghost'}
                  display={'block'}
                  height={['48px', '56px']}
                  fontSize={['sm','xl']}>
                  Presented for the TokenForge Hackathon
                </Button>
              <Text
                fontWeight="bold"
                fontSize={['xl', 'xl', '2xl', '2xl']}
                textAlign={['center']}>
                A Lottery NFT Collection featuring{' '}
                <Text fontWeight={'bold'} color={'var(--venom0)'}>
                  {' '}
                  2,222 unique items{' '}
                </Text>
              </Text>
              <Flex
                minW={'100%'}
                width={'100%'}
                flexDirection={'column'}
                gap={[8, 12, 16]}
                opacity={0.7}>
                <Parallax baseVelocity={-0.5}>
                  <Flex gap={[4, 6, 8]} pr={[2,3,4]} >
                    {BG_COLORS.map(
                      (bg, i) =>
                        i > 5 && (
                          <RRRItem
                            color={bg.color}
                            light={bg.lightMode}
                            key={`VenomID-RRR-${i}-item`}
                          />
                        )
                    )}
                  </Flex>
                </Parallax>
              </Flex>
              <Text
                fontWeight="bold"
                fontSize={['xl', 'xl', '2xl', '2xl']}
                textAlign={['center']}>
                Items from this collection can be used as wallpaper images on the Venom ID platform
              </Text>
            </Stack>
          </GridItem>
          <GridItem
            display={'flex'}
            justifyContent={'center'}
            bg={colorMode === 'light' ? 'whiteAlpha.800' : 'blackAlpha.600'}
            rounded={'2xl'}
            border={'1px solid #77777750'}>
            <Stack px={[4, 4, 6, 10]} py={12} textAlign={'center'} gap={6}>
            <Text
                fontWeight="bold"
                fontSize={['2xl']}
                textAlign={['center']}>
                Each NFT Offers an exciting opportunity
              </Text>
              <Text
                fontWeight="bold"
                fontSize={['4xl','5xl']}
                color={colorMode === 'light' ? 'black' : 'white'}>
                🎁 To Win 🎁 
              </Text>
              <Text
                fontWeight="bold"
                fontSize={['2xl','3xl']}
                textAlign={['center']}>
                1 Prize from The Pool
              </Text>

              <Text
                fontWeight="bold"
                fontSize={['5xl','6xl']}
                bgGradient={'linear(to-r, var(--venom1), var(--bluevenom1))'}
                bgClip={'text'}
                textAlign={['center']}>
                EVERYDAY
              </Text>
              <Text
                fontWeight="bold"
                fontSize={['4xl','5xl']}
                textAlign={['center']}>
                FOR 30 DAYS
              </Text>
              <SimpleGrid columns={[1, 1, 1, 2]} gap={6} py={6}>
                <Prize
                  name={'3-letter .venom domains'} value='~$2400'
                  icon={<Logo w={notMobile ? '76px' : '38px'} h={notMobile ? '60px' : '30px'} />}
                  number={30}
                />
                <Prize
                  name={'4-letter .venom domains'} value='~$2400'
                  icon={<Logo w={notMobile ? '76px' : '38px'} h={notMobile ? '60px' : '30px'} />}
                  number={60}
                />
                <Prize
                  name={'5-letter .venom domains'} value='~$400'
                  icon={<Logo w={notMobile ? '76px' : '38px'} h={notMobile ? '60px' : '30px'} />}
                  number={90}
                />
                <Prize
                  name={'40 $VENOM Tokens'} value='~$600'
                  icon={<LinkIcon type="venom" size={notMobile ? 76 : 38} />}
                  number={30}
                />
              </SimpleGrid>
              <Text
                fontWeight="bold"
                fontSize={['xl','3xl']}
                textAlign={['center']}>
                🪙 Total Prize Pool Value: ~$6,000 🪙
              </Text>
            </Stack>
          </GridItem>
        </SimpleGrid>
      </Container>

      <Container
        ref={win}
        maxW="container.xl"
        display="grid"
        placeContent="center"
        placeItems="center"
        minH="100vh"
        py={16}>
        <Grid
          templateColumns={[`repeat(1, 1fr)`]}
          gap={16}
          my={10}
          alignItems={'center'}>
          <GridItem colSpan={[3, 3]}>
            <Stack
              px={[4, 4, 6, 10]}
              gap={8}
              color={colorMode === 'light' ? 'white' : 'var(--dark)'}>
              <Heading
                as={'h3'}
                fontWeight="bold"
                fontSize={['4xl', '4xl', '5xl', '5xl', '6xl']}
                textAlign={['center', 'center', 'center', 'left']}>
                Utility
              </Heading>
              <Text
                fontWeight="bold"
                fontSize={['xl', 'xl', '2xl', '2xl']}
                textAlign={['center', 'center', 'center', 'left']}>
                Daily raffles with mentioned prizes for 30 days to random NFT holders
              </Text>
              <Text
                fontWeight="bold"
                fontSize={['xl', 'xl', '2xl', '2xl']}
                textAlign={['center', 'center', 'center', 'left']}>
                Usage of NFTs as wallpaper images on the Venom ID platform
              </Text>
              <Text
                fontWeight="bold"
                fontSize={['xl', 'xl', '2xl', '2xl']}
                textAlign={['center', 'center', 'center', 'left']}>
                Get Whitelisted for our 1:1 Art NFT collection revealing soon
              </Text>
              <Text
                fontWeight="bold"
                fontSize={['xl', 'xl', '2xl', '2xl']}
                textAlign={['center', 'center', 'center', 'left']}>
                Be A Part of Venom ID Early Adopters And Enjoy future perks and Rewards!
              </Text>
            </Stack>
          </GridItem>
          <GridItem colSpan={[3, 3]}>
            <Stack
              px={[4, 4, 6, 10]}
              gap={12}
              color={colorMode === 'light' ? 'white' : 'var(--dark)'}>
              <Heading
                as={'h3'}
                fontWeight="bold"
                fontSize={['4xl', '4xl', '5xl', '5xl', '6xl']}
                textAlign={['center', 'center', 'center', 'left']}>
                FAQ
              </Heading>
              <Text
                fontWeight="bold"
                fontSize={['xl', 'xl', '2xl', '2xl']}
                textAlign={['center', 'center', 'center', 'left']}>
                Free For Venom ID Owners!
              </Text>
              <Text
                fontWeight="bold"
                fontSize={['xl', 'xl', '2xl', '2xl']}
                textAlign={['center', 'center', 'center', 'left']}>
                1 VENOM For Public Minting, 1 Per Wallet
              </Text>
              <Text
                fontWeight="bold"
                fontSize={['xl', 'xl', '2xl', '2xl']}
                textAlign={['center', 'center', 'center', 'left']}>
                Mint Starts on 17th April ~ 07:00 UTC 
              </Text>
              <Text
                fontWeight="bold"
                fontSize={['xl', 'xl', '2xl', '2xl']}
                textAlign={['center', 'center', 'center', 'left']}>
                Stay tuned for more details as we provide updates!
              </Text>
              </Stack>
          </GridItem>
        </Grid>
        
      </Container>
      
    </motion.div>
  );
}
