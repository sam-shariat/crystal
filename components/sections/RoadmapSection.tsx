import { Button,useColorMode, Container, Heading, Text, useMediaQuery, Box, Center, Checkbox } from '@chakra-ui/react';
import { useTranslate } from 'core/lib/hooks/use-translate';
import Venom from 'components/Venom';

export default function RoadmapSection() {
  const { t } = useTranslate();
  const { colorMode } = useColorMode();
  const [notMobile] = useMediaQuery('(min-width: 800px)');
  return (
    <Box backgroundColor={colorMode === 'dark' ? 'whiteAlpha.50' : 'blackAlpha.50'} id="roadmap">
      <Container
        as="main"
        maxW="container.md"
        display="grid"
        placeContent="center"
        placeItems="center"
        minH="75vh">
        <>
          <Box gap={4} my={10}>
            <Box display="flex" flexDirection="column" justifyContent="center">
              <Heading fontWeight="bold" fontSize="5xl" textAlign={notMobile ? 'center' : 'left'}>
                {t('roadmap')}
              </Heading>
              <Text
                fontWeight="bold"
                fontSize={notMobile ? '3xl' : '2xl'}
                my={6}
                textAlign={notMobile ? 'center' : 'left'}>
                {t('roadmapDescription')}
              </Text>
              <Center display="flex" flexDirection="column">
                <Venom srcUrl="/screens/roadmapScreen.png" size={notMobile ? 'lg' : 'xs'} />
              </Center>
              <Text
                fontWeight="bold"
                fontSize={notMobile ? '3xl' : '2xl'}
                my={6}
                textAlign={notMobile ? 'center' : 'left'}>
                {t('roadmapPhase1')}
              </Text>
              <Checkbox fontWeight="bold" size="lg" defaultChecked color={'var(--venom1)'} colorScheme={'green'}>
              {t('roadmapPhase11')}
              </Checkbox>
              <Checkbox mt={1} size="lg">
              {t('roadmapPhase12')}
              </Checkbox>
              <Checkbox mt={1} size="lg">
              {t('roadmapPhase13')}
              </Checkbox>
              <Checkbox mt={1} size="lg">
              {t('roadmapPhase14')}
              </Checkbox>
              <Checkbox mt={1} size="lg">
              {t('roadmapPhase15')}
              </Checkbox>
              <Checkbox mt={1} size="lg">
              {t('roadmapPhase16')}
              </Checkbox>
              <Text
                fontWeight="bold"
                fontSize={notMobile ? '3xl' : '2xl'}
                my={6}
                textAlign={notMobile ? 'center' : 'left'}>
                {t('roadmapPhase2')}
              </Text>
              <Checkbox mt={1} size="lg">
              {t('roadmapPhase21')}
              </Checkbox>
              <Checkbox mt={1} size="lg">
              {t('roadmapPhase22')}
              </Checkbox>
              <Checkbox mt={1} size="lg">
              {t('roadmapPhase23')}
              </Checkbox>
              <Checkbox mt={1} size="lg">
              {t('roadmapPhase24')}
              </Checkbox>
            </Box>
          </Box>
        </>
      </Container>
    </Box>
  );
}
