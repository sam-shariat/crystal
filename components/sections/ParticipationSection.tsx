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
} from '@chakra-ui/react';
import { useTranslate } from 'core/lib/hooks/use-translate';
import { SITE_PROFILE_URL, ZEALY_URL } from 'core/utils/constants';
import SocialIcons from 'components/Layout/SocialIcons';
import TextCard from 'components/Layout/TextCard';
import { RiFingerprint2Line, RiProfileLine, RiSettings3Line } from 'react-icons/ri';
import { Zealy } from 'components/logos';

export default function ParticipationSection() {
  const { t } = useTranslate();
  const [notMobile] = useMediaQuery('(min-width: 769px)');
  const { colorMode } = useColorMode();

  return (
    <Box id="participate">
      <Container
        as="main"
        maxW="container.md"
        display="grid"
        placeContent="center"
        placeItems="center"
        minH="75vh"
        py={10}>
        <Box gap={4} width={notMobile ? '100%' : 'xs'}>
          <Button
            as={Link}
            flexGrow={1}
            href={ZEALY_URL}
            style={{textDecoration:'none'}}
            target="_blank"
            height={100}
            display="flex"
            gap={4}>
            <Zealy />{' '}
            <Stack spacing={0}>
              <Text textDecoration="none" fontSize={notMobile ? '2xl' : 'xl'} mb={1}>
                {t('zealyCommunity')}
              </Text>
              <Text fontSize={'sm'} mt={0}>
                {t('airdropParticipate')}
              </Text>
            </Stack>
          </Button>
          {/* </Flex> */}
          <Box my={6} mt={10} minWidth={notMobile ? 'md' : '100%'}>
            <Text fontSize="xl" fontWeight="bold" textAlign="center">
              {t('ourDomains')}
            </Text>
            <SimpleGrid columns={[1, 1, 3]} gap={4} my={6} width={'100%'}>
              <TextCard
                icon={<RiFingerprint2Line size="46px" />}
                header="venomid"
                domain=".network"
                text={t('venomidnetwork')}
                url="#claim"
              />
              <TextCard
                icon={<RiSettings3Line size="46px" />}
                header="venomid"
                domain=".tools"
                text={t('venomidtools')}
                url="#manage"
              />
              <TextCard
                icon={<RiProfileLine size="46px" />}
                header="venomid"
                domain=".link"
                text={t('venomidlink')}
                url="#profile"
              />
            </SimpleGrid>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
