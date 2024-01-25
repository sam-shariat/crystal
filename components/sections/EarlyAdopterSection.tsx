import {
  useMediaQuery,
  Button,
  Container,
  Heading,
  Text,
  Box,
  Center,
  useColorMode,
  Link,
  useColorModeValue,
} from '@chakra-ui/react';
import { useTranslate } from 'core/lib/hooks/use-translate';
import { TELEGRAM_URL, YLIDE_URL, ZEALY_URL } from 'core/utils/constants';
import { RiFileList3Line, RiShakeHandsLine, RiTelegramFill } from 'react-icons/ri';
import { LinkIcon } from 'components/logos';

export default function EarlyAdopterSection() {
  const { t } = useTranslate();
  const {colorMode} = useColorMode();
  return (
    <Box id="about" backgroundColor={colorMode === 'dark' ? 'whiteAlpha.200' : 'whiteAlpha.800'} >
      <Container
        as="main"
        maxW="container.lg"
        display="grid"
        placeContent="center"
        placeItems="center"
        py={10}>
        <>
          <Center display="flex" flexDirection={["column","column","column",'row']} gap={4}>
            <Text fontSize={'2xl'} textAlign={['center','center','center','left']}>
                Be an early adopter of Venom ID! Join our community, earn badges
            </Text>
            <Button
              as={Link}
              href="\community"
              style={{ textDecoration: 'none' }}
              width={'100%'}
              color={'white'}
              justifyContent={'center'}
              bgGradient={useColorModeValue(
                'linear(to-r, var(--venom1), var(--bluevenom1))',
                'linear(to-r, var(--venom2), var(--bluevenom2))'
              )}
              _expanded={{
                bgGradient: useColorModeValue(
                  'linear(to-r, var(--venom1), var(--bluevenom1))',
                  'linear(to-r, var(--venom2), var(--bluevenom2))'
                ),
                borderBottomRadius: 0,
              }}
              _hover={{
                bgGradient: useColorModeValue(
                  'linear(to-r, var(--venom0), var(--bluevenom0))',
                  'linear(to-r, var(--venom0), var(--bluevenom0))'
                ),
              }}
              h={'120px'}
              gap={2}
              size={'lg'}
              variant={'outline'}>
              <LinkIcon type="RiVerifiedBadgeLine" size={'36'} />
              <Text fontWeight={'bold'} display={'flex'} flex={1} fontSize={['xl', '2xl']}>
                Early Adopters Program
              </Text>
            </Button>
          </Center>
        </>
      </Container>
    </Box>
  );
}
