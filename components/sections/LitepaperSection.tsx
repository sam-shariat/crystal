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
  Flex,
} from '@chakra-ui/react';
import { useTranslate } from 'core/lib/hooks/use-translate';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
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
import { RiArrowUpFill, RiFileList3Line, RiShakeHandsLine, RiTelegramFill } from 'react-icons/ri';
import BackToUp from '@uiw/react-back-to-top';
import { useEffect, useState } from 'react';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function LitepaperSection() {
  const { t } = useTranslate();
  const [ready, setReady] = useState(false);
  const [notMobile] = useMediaQuery('(min-width: 769px)');
  const data = {
    labels: ['Airdrop', 'Contributors', 'DAO'],
    datasets: [
      {
        label: '% Of Tokens',
        data: [35, 25, 40],
        backgroundColor: [
          'rgba(54, 162, 235, 0.3)',
          'rgba(75, 192, 192, 0.3)',
          'rgba(153, 102, 255, 0.3)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(153, 102, 255, 0.7)',
        ],
        borderWidth: 1,
      },
    ],
  };

  useEffect(() => {}, []);

  return (
    <Box id="about" bgColor={useColorModeValue('whiteAlpha.100', 'var(--dark)')}>
      <Container as="main" maxW="container.lg" display="grid" minH="85vh" py={10}>
        <>
          <Flex flexDirection="column" gap={20} maxW={'container.lg'}>
            <Heading fontWeight="bold" fontSize="4xl" my={12}>
              {t('Litepaper')}
            </Heading>
            <Stack>
              <Text fontWeight={'bold'} fontSize={'3xl'} my={4}>
                {t('tableOfContent')}
              </Text>
              <Text fontWeight={'bold'} fontSize={'xl'} as={Link} href="#Summary">
                {t('Summary')}
              </Text>
              <Text fontSize={'lg'} as={Link} href="#Introduction">
                {t('Introduction')}
              </Text>
              <Text fontWeight={'bold'} fontSize={'xl'} as={Link} href="#overview">
                {t('overview')}
              </Text>
              <Text fontSize={'lg'} as={Link} href="#objectives">
                {t('objectives')}
              </Text>
              <Text fontSize={'lg'} as={Link} href="#target">
                {t('target')}
              </Text>
              <Text fontSize={'lg'} as={Link} href="#vision">
                {t('vision')}
              </Text>
              <Text fontWeight={'bold'} fontSize={'xl'} as={Link} href="#mainFeatures">
                {t('mainFeatures')}
              </Text>
              <Text fontWeight={'bold'} fontSize={'xl'} as={Link} href="#Tokenomics">
                {t('Tokenomics')}
              </Text>
              <Text fontWeight={'bold'} fontSize={'xl'} as={Link} href="#Governance">
                {t('Governance')}
              </Text>
              <Text fontWeight={'bold'} fontSize={'xl'} as={Link} href="#RoadMap">
                {t('RoadMap')}
              </Text>
              <Text fontSize={'lg'} as={Link} href="#RoadMap01">
                {t('RoadMap01')}
              </Text>
              <Text fontSize={'lg'} as={Link} href="#RoadMap02">
                {t('RoadMap02')}
              </Text>
              <Text fontSize={'lg'} as={Link} href="#RoadMap03">
                {t('RoadMap03')}
              </Text>
              <Text fontSize={'lg'} as={Link} href="#RoadMap04">
                {t('RoadMap04')}
              </Text>
              <Text fontSize={'lg'} as={Link} href="#RoadMap05">
                {t('RoadMap05')}
              </Text>
            </Stack>
            <Stack id={'Summary'}>
              <Text fontWeight={'bold'} fontSize={'3xl'} mt={4} id="Introduction">
                {t('Summary')}
              </Text>
              <Text fontWeight={'bold'} fontSize={'2xl'} mt={4}>
                {t('Introduction')}
              </Text>
              <Text fontWeight="normal" fontSize={'lg'} id="overview">
                {t('litepaperIntroduction')}
              </Text>
            </Stack>
            <Stack>
              <Text fontWeight={'bold'} fontSize={'2xl'} mt={4}>
                {t('overview')}
              </Text>
              <Text fontWeight="normal" fontSize={'lg'} id="objectives">
                {t('projectOverview')}
              </Text>
              <Text fontWeight={'bold'} fontSize={'2xl'} mt={4}>
                {t('objectives')}
              </Text>
              <Text fontWeight="normal" fontSize={'lg'} id="target">
                {t('objectivesAndFeatures')}
              </Text>
              <Text fontWeight={'bold'} fontSize={'2xl'} mt={4}>
                {t('target')}
              </Text>
              <Text fontWeight="normal" fontSize={'lg'} id="vision">
                {t('targetAudience')}
              </Text>

              <Text fontWeight={'bold'} fontSize={'2xl'} mt={4}>
                {t('vision')}
              </Text>
              <Text fontWeight="normal" fontSize={'lg'} id="mainFeatures">
                {t('projectVision')}
              </Text>
            </Stack>
            <Stack>
              <Text fontWeight={'bold'} fontSize={'3xl'} my={4}>
                {t('mainFeatures')}
              </Text>
              <Text fontWeight={'bold'} fontSize={'2xl'} mt={4}>
                {t('Decentralized')}
              </Text>
              <Text fontWeight="normal" fontSize={'lg'}>
                {t('DecentralizedFeature')}
              </Text>

              <Text fontWeight={'bold'} fontSize={'2xl'} mt={4}>
                {t('Customizable')}
              </Text>
              <Text fontWeight="normal" fontSize={'lg'}>
                {t('customizableFeature')}
              </Text>

              <Text fontWeight={'bold'} fontSize={'2xl'} mt={4}>
                {t('UnifiedLinks')}
              </Text>
              <Text fontWeight="normal" fontSize={'lg'}>
                {t('UnifiedLinksFeature')}
              </Text>

              <Text fontWeight={'bold'} fontSize={'2xl'} mt={4}>
                {t('NamingService')}
              </Text>
              <Text fontWeight="normal" fontSize={'lg'}>
                {t('NamingServiceFeature')}
              </Text>

              <Text fontWeight={'bold'} fontSize={'2xl'} mt={4}>
                {t('BlockchainIdentity')}
              </Text>
              <Text fontWeight="normal" fontSize={'lg'}>
                {t('BlockchainIdentityFeature')}
              </Text>

              <Text fontWeight={'bold'} fontSize={'2xl'} mt={4}>
                {t('TradeableAsset')}
              </Text>
              <Text fontWeight="normal" fontSize={'lg'}>
                {t('TradeableAssetFeature')}
              </Text>

              <Text fontWeight={'bold'} fontSize={'2xl'} mt={4}>
                {t('DAO')}
              </Text>
              <Text fontWeight="normal" fontSize={'lg'}>
                {t('DAOFeature')}
              </Text>

              <Text fontWeight={'bold'} fontSize={'2xl'} mt={4}>
                {t('Analytics')}
              </Text>
              <Text fontWeight="normal" fontSize={'lg'} id="Tokenomics">
                {t('AnalyticsFeature')}
              </Text>
            </Stack>
            <Stack>
              <Text fontWeight={'bold'} fontSize={'3xl'} my={4}>
                {t('Tokenomics')}
              </Text>
              <Flex
                flexDir={['column', 'column', 'column', 'column', 'row']}
                gap={8}
                justify={'center'}
                align={'center'}>
                <Stack>
                  <Text fontWeight="normal" fontSize={'lg'}>
                    {t('TokenomicsDetails')}
                  </Text>
                  <Text fontWeight="normal" fontSize={'lg'}>
                    {t('TokenomicsDetails1')}
                  </Text>
                  <Text fontWeight="normal" fontSize={'lg'}>
                    {t('TokenomicsDetails2')}
                  </Text>
                  <Text fontWeight="normal" fontSize={'lg'}>
                    {t('TokenomicsDetails3')}
                  </Text>
                </Stack>
                <Box
                  w={[
                    'container.xs',
                    'container.xs',
                    'container.sm',
                    'container.md',
                    'container.lg',
                  ]}>
                  <Pie data={data} />
                </Box>
              </Flex>
              <Text fontWeight="normal" fontSize={'lg'} id="Governance" mt={8}>
                {t('TokenomicsDetails4')}
              </Text>
            </Stack>
            <Stack>
              <Text fontWeight={'bold'} fontSize={'3xl'} my={4}>
                {t('Governance')}
              </Text>
              <Text fontWeight="normal" fontSize={'lg'}>
                {t('GovernanceModel')}
              </Text>
              <Text fontWeight="normal" fontSize={'lg'} id="RoadMap">
                {t('GovernanceModel2')}
              </Text>
            </Stack>
            <Stack id="RoadMap01">
              <Text fontWeight={'bold'} fontSize={'3xl'} my={4}>
                {t('RoadMap')}
              </Text>
              <Text fontWeight={'bold'} fontSize={'2xl'} mt={4}>
                {t('RoadMap01')}
              </Text>
              <Text fontWeight="normal" fontSize={'lg'}>
                {t('RoadMap11')}
              </Text>
              <Text fontWeight="normal" fontSize={'lg'} id="RoadMap02">
                {t('RoadMap12')}
              </Text>
              <Text fontWeight="normal" fontSize={'lg'}>
                {t('RoadMap13')}
              </Text>

              <Text fontWeight={'bold'} fontSize={'2xl'} mt={4}>
                {t('RoadMap02')}
              </Text>
              <Text fontWeight="normal" fontSize={'lg'}>
                {t('RoadMap21')}
              </Text>
              <Text fontWeight="normal" fontSize={'lg'} id="RoadMap03">
                {t('RoadMap22')}
              </Text>
              <Text fontWeight="normal" fontSize={'lg'}>
                {t('RoadMap23')}
              </Text>

              <Text fontWeight={'bold'} fontSize={'2xl'} mt={4}>
                {t('RoadMap03')}
              </Text>
              <Text fontWeight="normal" fontSize={'lg'}>
                {t('RoadMap31')}
              </Text>
              <Text fontWeight="normal" fontSize={'lg'} id="RoadMap04">
                {t('RoadMap32')}
              </Text>
              <Text fontWeight="normal" fontSize={'lg'}>
                {t('RoadMap33')}
              </Text>

              <Text fontWeight={'bold'} fontSize={'2xl'} mt={4}>
                {t('RoadMap04')}
              </Text>
              <Text fontWeight="normal" fontSize={'lg'}>
                {t('RoadMap41')}
              </Text>
              <Text fontWeight="normal" fontSize={'lg'} id="RoadMap05">
                {t('RoadMap42')}
              </Text>
              <Text fontWeight="normal" fontSize={'lg'}>
                {t('RoadMap43')}
              </Text>

              <Text fontWeight={'bold'} fontSize={'2xl'} mt={4}>
                {t('RoadMap05')}
              </Text>
              <Text fontWeight="normal" fontSize={'lg'}>
                {t('RoadMap51')}
              </Text>
              <Text fontWeight="normal" fontSize={'lg'}>
                {t('RoadMap52')}
              </Text>
              <Text fontWeight="normal" fontSize={'lg'}>
                {t('RoadMap53')}
              </Text>
            </Stack>
            <Stack my={6}>
              <Text fontWeight={'bold'} fontSize={'2xl'}>
                {t('litepaperNote')}
              </Text>
              <Text fontWeight="light" fontSize={'md'}>
                {t('litepaperNote1')}
              </Text>
              <Text fontWeight="light" fontSize={'md'}>
                {t('litepaperNote2')}
              </Text>
              <Text fontWeight="light" fontSize={'md'}>
                {t('litepaperNote3')}
              </Text>
              <Text fontWeight="light" fontSize={'md'}>
                {t('litepaperNote4')}
              </Text>
            </Stack>
          </Flex>
        </>
        {/* {ready && (
          <BackToUp>
            <RiArrowUpFill />
          </BackToUp>
        )} */}
      </Container>
    </Box>
  );
}
