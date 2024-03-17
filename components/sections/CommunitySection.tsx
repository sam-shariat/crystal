import {
  Button,
  useColorMode,
  Text,
  useDisclosure,
  Flex,
  Link,
  Select,
  useColorModeValue,
  Stack,
  Input,
  useToast,
  Container,
  Box,
  Collapse,
  Heading,
  useMediaQuery,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import {
  RiCheckboxCircleFill,
  RiQuestionFill,
  RiShakeHandsLine,
  RiUploadCloudLine,
} from 'react-icons/ri';
import { useTranslate } from 'core/lib/hooks/use-translate';
import { useAtomValue } from 'jotai';
import { connectedAccountAtom, primaryNameAtom } from 'core/atoms';
import { useStorageUpload } from '@thirdweb-dev/react';
import { LinkIcon } from 'components/logos';
import { isValidEmail, truncAddress } from 'core/utils';
import { render } from '@react-email/render';
import ContributionsMail from 'components/mail/Contribution';
import sendEmail from 'core/utils/sendEmail';
import ShareButtons from 'components/Profile/ShareButtons';
import { DISCORD_URL, SITE_URL, YLIDE_URL, ZEALY_URL } from 'core/utils/constants';
import WaitlistMail from 'components/mail/Waitlist';
import ImageBox from 'components/claiming/ImageBox';
import EarlyAdopters from 'components/early/EarlyAdopters';
import ContributionSection from 'components/contribution/ContributionSection';
import MintNft from 'components/early/MintNft';

export default function CommunitySection() {
  const { colorMode } = useColorMode();
  const [role, setRole] = useState('Graphic Designer');
  const toast = useToast();
  const [notMobile] = useMediaQuery('(min-width: 768px)');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const connectedAccount = useAtomValue(connectedAccountAtom);
  const primary = useAtomValue(primaryNameAtom);
  const { t } = useTranslate();

  const openWindow = (url: string, e: any) => {
    window.open(url, 'newwindow', 'width=420,height=800');
    e !== null && e.preventDefault();
  };

  return (
    <>
      <Box>
        <Container
          as="main"
          maxW="container.lg"
          display="grid"
          flexDir={'column'}
          justifyContent={'center'}
          alignContent={'center'}
          minH={'84vh'}
          flexGrow={1}>
          <Box py={6} gap={20} width={'100%'}>
            <Flex
              align={'center'}
              justify={'center'}
              gap={8}
              my={20}
              flexDir={['column', 'column', 'column', 'row']}>
              <Stack>
                <Heading
                  fontSize={['4xl', '5xl', '6xl']}
                  fontWeight={'bold'}
                  textAlign={['center', 'center', 'center', 'left']}>
                  {t('community')}
                </Heading>
                <Text
                  fontSize={['xl', '2xl', '3xl']}
                  textAlign={['center', 'center', 'center', 'left']}>
                  Collaborate, Innovate, and Share
                </Text>
              </Stack>
              <ImageBox srcUrl="/screens/contribute.png" animation />
            </Flex>

            <Flex flexDirection={'column'} w={'100%'} gap={6} my={12}>
              <MintNft />
              <EarlyAdopters />
              <ContributionSection />
              <Button
                w={'100%'}
                h={['220px', '220px', '160px']}
                size={'lg'}
                as={Link}
                style={{ textDecoration: 'none' }}
                href={DISCORD_URL}
                target="_blank"
                gap={6}
                flexDir={['column', 'column', 'row']}
                justifyContent={['center', 'center', 'start']}>
                <Flex align={'center'} gap={4}>
                  <LinkIcon type="discord" size={notMobile ? '70' : '40'} />
                  <Text display={['block', 'block', 'none']} fontSize={'xl'}>
                    Discord Community
                  </Text>
                </Flex>
                <Flex flexDirection={'column'} align={['center', 'center', 'start']} gap={2}>
                  <Text display={['none', 'none', 'block']} fontSize={'xl'}>
                    Discord Community
                  </Text>
                  <Flex
                    fontWeight={'normal'}
                    flexDirection={['column', 'column', 'row']}
                    gap={2}
                    align={['center', 'center', 'start']}>
                    <Text>Say gm To Venom ID Family! </Text>
                    <Text>Get Support, Ask Questions</Text>
                  </Flex>
                  <Text fontWeight={'normal'}> Get early access to perks!</Text>
                </Flex>
              </Button>
              <Button
                w={'100%'}
                h={['220px', '220px', '160px']}
                size={'lg'}
                as={Link}
                style={{ textDecoration: 'none' }}
                href={YLIDE_URL}
                target="_blank"
                gap={6}
                flexDir={['column', 'column', 'row']}
                justifyContent={['center', 'center', 'start']}>
                <Flex align={'center'} gap={4}>
                  <LinkIcon type="ylide" size={notMobile ? '70' : '40'} />
                  <Text display={['block', 'block', 'none']} fontSize={'xl'}>
                    Ylide Community
                  </Text>
                </Flex>
                <Flex flexDirection={'column'} align={['center', 'center', 'start']} gap={2}>
                  <Text display={['none', 'none', 'block']} fontSize={'xl'}>
                    Ylide Community
                  </Text>
                  <Flex
                    fontWeight={'normal'}
                    flexDirection={['column', 'column', 'row']}
                    gap={2}
                    align={['center', 'center', 'start']}>
                    <Text>Say Hello To Ylide Community! </Text>
                    <Text>Suggest new Features and Ideas</Text>
                  </Flex>
                  <Text fontWeight={'normal'}> We care about every message!</Text>
                </Flex>
              </Button>

              <Button
                w={'100%'}
                h={['220px', '220px', '160px']}
                size={'lg'}
                gap={6}
                as={Link}
                isDisabled={true}
                href={ZEALY_URL}
                style={{ textDecoration: 'none' }}
                target="_blank"
                flexDir={['column', 'column', 'row']}
                justifyContent={['center', 'center', 'start']}>
                <Flex align={'center'} gap={4}>
                  <LinkIcon type="zealy" size={notMobile ? '70' : '40'} />
                  <Text display={['block', 'block', 'none']} fontSize={'xl'}>
                    Zealy Community
                  </Text>
                </Flex>
                <Flex flexDirection={'column'} align={['center', 'center', 'start']} gap={2}>
                  <Text display={['none', 'none', 'block']} fontSize={'xl'}>
                    Zealy Community ( Soon )
                  </Text>
                  <Flex
                    fontWeight={'normal'}
                    flexDirection={['column', 'column', 'row']}
                    gap={2}
                    align={['center', 'center', 'start']}>
                    <Text>Explore our simple Quests!</Text>
                    <Text>We are temporarily closed!</Text>
                  </Flex>
                  <Text fontWeight={'normal'}>We'll be back soon!</Text>
                </Flex>
              </Button>
            </Flex>
          </Box>
        </Container>
      </Box>
    </>
  );
}
