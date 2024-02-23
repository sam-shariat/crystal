import {
  useMediaQuery,
  Button,
  Container,
  Heading,
  Text,
  Stack,
  Box,
  useColorMode,
  SimpleGrid,
  Link,
  Center,
  useBreakpointValue,
} from '@chakra-ui/react';
import { useTranslate } from 'core/lib/hooks/use-translate';
import { SITE_PROFILE_URL, ZEALY_URL } from 'core/utils/constants';
import {
  RiArrowUpDoubleLine,
  RiExchangeLine,
  RiFingerprint2Line,
  RiProfileLine,
  RiSettings3Line,
  RiUserVoiceLine,
} from 'react-icons/ri';
import { Zealy } from 'components/logos';
import { GiCubeforce } from 'react-icons/gi';
import { CgIfDesign } from 'react-icons/cg';
import { MdOutlineSecurity, MdOutlineVisibility } from 'react-icons/md';
import TextIcon from 'components/features/TextIcon';
import { motion, Variants } from 'framer-motion';

export default function FeaturesSection() {
  const { t } = useTranslate();
  const [notMobile] = useMediaQuery('(min-width: 769px)');
  const { colorMode } = useColorMode();

  return (
    <Box id="features" backgroundColor={colorMode === 'dark' ? 'blackAlpha.300' : 'whiteAlpha.800'}>
      <Container
        as="main"
        maxW="container.lg"
        display="grid"
        placeContent="center"
        placeItems="center"
        minH="80vh"
        py={10}>
        <Box gap={4} width={'100%'}>
          <Box my={10} minWidth={['xs', 'sm', 'md', 'md', 'lg']}>
            <Center display="flex" flexDirection="column" my={10}>
              <Heading fontWeight="bold" fontSize={['3xl', '4xl', '5xl', '5xl', '6xl']}>
                {t('features')}
              </Heading>
            </Center>
            <svg width="0" height="0">
              <linearGradient id="venom-gradient" x1="100%" y1="100%" x2="0%" y2="0%">
                <stop stopColor="#2bb673" offset="0%" />
                <stop stopColor="#10a9b6" offset="100%" />
              </linearGradient>
            </svg>
            
            <SimpleGrid
              columns={[1, 1, 2, 2, 3]}
              gap={6}
              my={6}
              width={['xs', 'md', 'container.sm', 'container.md', 'container.lg']}>
                
              <TextIcon
                text={t('feature1')}
                hoverText={t('feature1d')}
                icon={<GiCubeforce size={'48px'} style={{ stroke: "url(#venom-gradient)" }}/>}
                
              />
              <TextIcon
                text={t('feature2')}
                hoverText={t('feature2d')}
                icon={<CgIfDesign size={'48px'} style={{ stroke: "url(#venom-gradient)" }}/>}
                i={0.3}
              />
              <TextIcon
                text={t('feature3')}
                hoverText={t('feature3d')}
                i={0.6}
                icon={<RiProfileLine size={'48px'} style={{ stroke: "url(#venom-gradient)" }}/>}
              />
              <TextIcon
                text={t('feature4')}
                hoverText={t('feature4d')}
                i={0.9}
                icon={<RiArrowUpDoubleLine size={'48px'} style={{ stroke: "url(#venom-gradient)" }}/>}
              />
              <TextIcon
                text={t('feature5')}
                hoverText={t('feature5d')}
                i={1.2}
                icon={<RiFingerprint2Line size={'48px'} style={{ stroke: "url(#venom-gradient)" }}/>}
              />
              <TextIcon
                text={t('feature6')}
                i={1.5}
                hoverText={t('feature6d')}
                icon={<RiExchangeLine size={'48px'} style={{ stroke: "url(#venom-gradient)" }}/>}
              />
              {useBreakpointValue({
                xs: true,
                sm: true,
                md: false,
                lg: false,
                xl: true,
                base: true,
              }) && (
                <TextIcon
                  text={t('feature7')}
                i={1.8}
                hoverText={t('feature7d')}
                  icon={<MdOutlineVisibility size={'48px'} style={{ stroke: "url(#venom-gradient)" }}/>}
                />
              )}
              <TextIcon
                text={t('feature8')}
                hoverText={t('feature8d')}
                i={2.1}
                icon={<MdOutlineSecurity size={'48px'} style={{ stroke: "url(#venom-gradient)" }}/>}
              />
              <TextIcon
                text={t('feature9')}
                hoverText={t('feature9d')}
                i={2.4}
                icon={<RiUserVoiceLine size={'48px'} style={{ stroke: "url(#venom-gradient)" }}/>}
              />
              
            </SimpleGrid>
            
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
