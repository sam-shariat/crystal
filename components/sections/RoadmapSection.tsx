import {
  Button,
  useColorMode,
  Container,
  Heading,
  Text,
  useMediaQuery,
  Box,
  Center,
  Checkbox,
  Img,
  Stack,
  Flex,
  Progress,
} from '@chakra-ui/react';
import { useTranslate } from 'core/lib/hooks/use-translate';
import Image from 'next/image';

export default function RoadmapSection() {
  const { t } = useTranslate();
  const { colorMode } = useColorMode();
  const [notMobile] = useMediaQuery('(min-width: 769px)');
  return (
    <Box backgroundColor={colorMode === 'dark' ? 'whiteAlpha.50' : 'blackAlpha.50'} id="roadmap">
      <Container
        as="main"
        maxW="container.md"
        width={'100%'}
        px={0}
        display="grid"
        placeContent="center"
        placeItems="center"
        minH="75vh"
        py={10}>
        <>
          <Box gap={4} my={10} width={notMobile ? 'md' : 'xs'}>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems={'center'}>
              <Heading fontWeight="bold" fontSize="5xl" textAlign={'center'}>
                {t('roadmap')}
              </Heading>
              <Text
                fontWeight="bold"
                fontSize={notMobile ? '3xl' : '2xl'}
                my={6}
                textAlign={'center'}>
                {t('roadmapDescription')}
              </Text>
              <Flex
                maxWidth={'container.xs'}
                flexDirection={notMobile ? 'row' : 'column'}
                justifyContent={'center'}
                alignItems={'center'}
                gap={10}>
                <Flex
                  flexDirection={'column'}
                  width={['xs', 'sm', 'xs', 'md']}
                  bg={colorMode === 'dark' ? 'blackAlpha.500' : 'var(--light)'}
                  borderRadius={12}
                  p={8}
                  gap={4}
                  pt={4}>
                  <Text
                    fontWeight="bold"
                    fontSize={notMobile ? '3xl' : '2xl'}
                    mb={4}
                    textAlign={'center'}>
                    {t('roadmapPhase1')}
                  </Text>
                  <Progress
                    boxShadow={'base'}
                    height={'2px'}
                    value={65}
                    sx={{
                      '& > div:first-of-type': {
                        transitionProperty: 'width',
                        background: 'linear-gradient(to right, #2bb673 10%, #10a9b6 90%)',
                      },
                    }}
                    mx={-8}
                    mb={8}
                  />
                  <Checkbox
                    fontWeight="bold"
                    size="lg"
                    defaultChecked
                    color={'var(--venom1)'}
                    colorScheme={'green'} isReadOnly>
                    {t('roadmapPhase11')}
                  </Checkbox>
                  <Checkbox fontWeight="bold" mt={1} size="lg" defaultChecked isReadOnly>
                    {t('roadmapPhase12')}
                  </Checkbox>
                  <Checkbox fontWeight="bold" mt={1} size="lg" defaultChecked isReadOnly>
                    {t('roadmapPhase13')}
                  </Checkbox>
                  <Checkbox fontWeight="bold" mt={1} size="lg" defaultChecked isReadOnly>
                    {t('roadmapPhase14')}
                  </Checkbox>
                  <Checkbox fontWeight="bold" mt={1} size="lg" isReadOnly>
                    {t('roadmapPhase15')}
                  </Checkbox>
                  <Checkbox fontWeight="bold" mt={1} size="lg" isReadOnly>
                    {t('roadmapPhase16')}
                  </Checkbox>
                </Flex>
                <Flex
                  flexDirection={'column'}
                  width={['xs', 'sm', 'xs', 'md']}
                  bg={colorMode === 'dark' ? 'blackAlpha.500' : 'var(--light)'}
                  borderRadius={12}
                  gap={2}
                  p={8}
                  pt={4}>
                  <Text
                    fontWeight="bold"
                    fontSize={notMobile ? '3xl' : '2xl'}
                    mb={4}
                    textAlign={'center'}>
                    {t('roadmapPhase2')}
                  </Text>
                  <Progress
                    boxShadow={'base'}
                    height={'2px'}
                    value={0}
                    colorScheme={'green'}
                    mx={-8}
                    mb={8}
                  />
                  <Checkbox fontWeight="bold" mt={1} size="lg" isReadOnly>
                    {t('roadmapPhase21')}
                  </Checkbox>
                  <Checkbox fontWeight="bold" mt={1} size="lg" isReadOnly>
                    {t('roadmapPhase22')}
                  </Checkbox>
                  <Checkbox fontWeight="bold" mt={1} size="lg" isReadOnly>
                    {t('roadmapPhase23')}
                  </Checkbox>
                  <Checkbox fontWeight="bold" mt={1} size="lg" isReadOnly>
                    {t('roadmapPhase24')}
                  </Checkbox>
                  <Checkbox fontWeight="bold" mt={1} size="lg" isReadOnly>
                    {t('roadmapPhase25')}
                  </Checkbox>
                  <Checkbox fontWeight="bold" mt={1} size="lg" isReadOnly>
                    {t('roadmapPhase26')}
                  </Checkbox>
                </Flex>
              </Flex>
            </Box>
          </Box>
        </>
      </Container>
    </Box>
  );
}
