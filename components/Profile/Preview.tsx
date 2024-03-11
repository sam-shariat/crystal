import React, { useEffect, useState } from 'react';
import {
  Container,
  Heading,
  Stack,
  Text,
  Flex,
  useMediaQuery,
  useColorMode,
  Box,
  LightMode,
  DarkMode,
  Center,
  useColorModeValue,
  IconButton,
  Link,
  Button,
} from '@chakra-ui/react';
import { useTranslate } from 'core/lib/hooks/use-translate';
import { Avatar, Socials, ProfileSkeleton } from 'components/Profile';
import Links from 'components/Profile/Links';

import {
  avatarAtom,
  avatarShapeAtom,
  bgColorAtom,
  bioAtom,
  colorModeAtom,
  fontAtom,
  horizontalSocialAtom,
  isStyledAtom,
  lightModeAtom,
  mobileViewAtom,
  nameAtom,
  socialButtonsAtom,
  socialsArrayAtom,
  subtitleAtom,
  titleAtom,
  useLineIconsAtom,
  walletButtonsAtom,
} from 'core/atoms';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import Wallets from './Wallets';
import { DeviceFrameset } from 'react-device-frameset';
import 'react-device-frameset/styles/marvel-devices.min.css';
import { RiExternalLinkLine, RiLinksLine } from 'react-icons/ri';
import { FaCircle } from 'react-icons/fa';
import { useRouter } from 'next/router';

interface Attribute {
  trait_type: string;
  value: string;
}

interface Props {
  json: any;
  onSave: Function;
}

const Preview = ({ json, onSave }: Props) => {
  const { t } = useTranslate();
  const [notMobile] = useMediaQuery('(min-width: 800px)');
  const { colorMode, toggleColorMode } = useColorMode();
  const [useLineIcons, setUseLineIcons] = useAtom(useLineIconsAtom);
  const [horizontalSocial, setHorizontalSocial] = useAtom(horizontalSocialAtom);
  //const [horizontalWallet, setHorizontalWallet] = useAtom(horizontalWalletsAtom);
  const [socialButtons, setSocialButtons] = useAtom(socialButtonsAtom);
  const [walletButtons, setWalletButtons] = useAtom(walletButtonsAtom);
  const bgColor = useAtomValue(bgColorAtom);
  const setIsStyled = useSetAtom(isStyledAtom);
  const avatarShape = useAtomValue(avatarShapeAtom);
  const socials = useAtomValue(socialsArrayAtom);
  const font = useAtomValue(fontAtom);
  const avatar = useAtomValue(avatarAtom);
  const title = useAtomValue(titleAtom);
  const name = useAtomValue(nameAtom);
  const bio = useAtomValue(bioAtom);
  const subtitle = useAtomValue(subtitleAtom);
  const lightMode = useAtomValue(lightModeAtom);
  const [colorM, setColorM] = useAtom(colorModeAtom);
  const mobileView = useAtomValue(mobileViewAtom);
  const { pathname } = useRouter();
  console.log(json)

  // useEffect(() => {
  //   // console.log(json)

  //   if (lightMode === true && colorMode === 'dark') {
  //     toggleColorMode();
  //     // console.log('toggledColor');
  //   }

  //   if (lightMode === false && colorMode === 'light') {
  //     toggleColorMode();
  //     // console.log('toggledColor');
  //   }

  //   setIsStyled(true);
  // }, [lightMode]);

  return (
    <>
      <DeviceFrameset
        // @ts-ignore: Unreachable code error
        device={String(mobileView ? 'iPhone X' : 'iPad Mini')}
        color={colorMode === 'light' ? 'black' : 'silver'}
        // @ts-ignore: Unreachable code error
        height={mobileView ? '90vh' : '76vh'}>
        <Center
          rounded={'2xl'}
          w={'100%'}
          borderRadius={0}
          px={4}
          py={2}
          gap={3}
          h={mobileView ? '92px' : '60px'}
          transition={'"all 1s ease"'}
          alignItems={'center'}
          pt={mobileView ? 9 : 2}
          bgColor={useColorModeValue('light.600', 'dark.600')}>
          

          <Button as={Link} href={`https://venomid.link/${pathname.includes('old') ? `o/` : ''}${name}`} target='_blank' variant={'outline'} gap={2} display={'flex'}>
          <RiExternalLinkLine /> venomid.link/{pathname.includes('old') ? `o/` : ''}{name}
          </Button>
        </Center>

        <Flex
          bg={bgColor}
          key={`preview-venomid-desktop-${lightMode}`}
          bgSize={'cover'}
          bgRepeat={'no-repeat'}
          bgPosition={'center'}
          justify={'center'}
          minH={'100%'}
          color={lightMode ? 'var(--dark1)' : 'white'}
        >
          <Flex my={10}>
            <>
              <Container
                width={mobileView ? '380px' : 'lg'}
                key={`venomid-preview-main-${lightMode}`}
                display="flex"
                flexDir={'column'}
                gap={4}
                fontFamily={font}>
                {json && (
                  <Flex direction="column" justify={'center'} align={'center'} gap={4} width="100%">
                    <Box
                      as={lightMode ? LightMode : DarkMode}
                      key={`preview-venomid-desktop-mode-${lightMode}`}>
                      <Flex
                        gap={notMobile && !mobileView ? 8 : 0}
                        my={4}
                        alignItems={'center'}
                        justifyContent={'center'}
                        w={'100%'}
                        flexDir={notMobile && !mobileView ? 'row' : 'column'}>
                        <Box
                          maxW={notMobile && !mobileView ? '200px' : '180px'}
                          key={'avatar-box-' + avatar}>
                          <Avatar
                            my={6}
                            key={'avatar-' + avatar}
                            maxH={notMobile && !mobileView ? '200' : '180'}
                            url={avatar}
                            alt={name + 'avatar image'}
                            shape={avatarShape}
                            shadow="none"
                          />
                        </Box>

                        <Stack textAlign={notMobile && !mobileView ? 'left' : 'center'}>
                          <Heading fontWeight="bold" fontSize="3xl" fontFamily={font}>
                            {title}
                          </Heading>
                          <Heading fontWeight="normal" fontSize="xl" fontFamily={font}>
                            {subtitle}
                          </Heading>
                          <Heading fontWeight="bold" fontSize="xl" fontFamily={font}>
                            {name}
                          </Heading>
                          {/* <Button
                            my={1}
                            borderRadius={'25'}
                            variant={'outline'}
                            leftIcon={<RiMessage3Line />}>
                            Message
                          </Button> */}
                        </Stack>
                      </Flex>

                      {horizontalSocial && <Socials json={json} onlyIcons  key={`social-icons-${socials.length}`}/>}

                      {walletButtons && (
                        <Wallets
                          json={json}
                          color={
                            !lightMode
                              ? 'var(--chakra-colors-gray-100)'
                              : 'var(--chakra-colors-gray-800)'
                          }
                        />
                      )}

                      <Stack width={'100%'} gap={2} pb={4}>
                        {bio && bio.length > 0 && (
                          <Text
                            fontWeight="normal"
                            fontSize={notMobile ? 'xl' : 'lg'}
                            my={4}
                            textAlign={'center'}>
                            {bio}
                          </Text>
                        )}

                        <Links
                          json={json}
                          color={
                            !lightMode
                              ? 'var(--chakra-colors-gray-100)'
                              : 'var(--chakra-colors-gray-800)'
                          }
                        />

                        {socialButtons && <Socials json={json} key={`social-buttons-${socials.length}`}/>}
                      </Stack>
                    </Box>
                  </Flex>
                )}
              </Container>
            </>
          </Flex>
        </Flex>
      </DeviceFrameset>
    </>
  );
};

export default Preview;
