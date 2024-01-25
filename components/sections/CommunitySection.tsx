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
import { SITE_URL } from 'core/utils/constants';
import WaitlistMail from 'components/mail/Waitlist';
import ImageBox from 'components/claiming/ImageBox';
import EarlyAdopters from 'components/early/EarlyAdopters';
import ContributionSection from 'components/contribution/ContributionSection';

export default function CommunitySection() {
  const { colorMode } = useColorMode();
  const [role, setRole] = useState('Graphic Designer');
  const toast = useToast();
  const [notMobile] = useMediaQuery('(min-width: 768px)');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const connectedAccount = useAtomValue(connectedAccountAtom);
  const primary = useAtomValue(primaryNameAtom);
  const { t } = useTranslate();

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
              <EarlyAdopters />
              <ContributionSection />
              <Button
                w={'100%'}
                h={['220px', '220px', '160px']}
                size={'lg'}
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
                    <Text>Say Hello To Venom ID Fam! </Text>
                    <Text>Suggest new Features and Ideas</Text>
                  </Flex>
                  <Text fontWeight={'normal'}> We care about every comment!</Text>
                </Flex>
              </Button>

              <Button
                w={'100%'}
                h={['220px', '220px', '160px']}
                size={'lg'}
                gap={6}
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
                    Zealy Community
                  </Text>
                  <Flex
                    fontWeight={'normal'}
                    flexDirection={['column', 'column', 'row']}
                    gap={2}
                    align={['center', 'center', 'start']}>
                    <Text>Explore our simple Quests!</Text>
                    <Text>Earn XPs as you go!</Text>
                  </Flex>
                  <Text fontWeight={'normal'}>Claim Your Rewards Later!</Text>
                </Flex>
              </Button>
            </Flex>
          </Box>
        </Container>
      </Box>
    </>
  );
}
