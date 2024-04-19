import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  Text,
  Tooltip,
  useColorMode,
  useMediaQuery,
} from '@chakra-ui/react';
import { LinkIcon } from 'components/logos';
import BgPicker from 'components/manage/BgPicker';
import NftBgPicker from 'components/manage/NftBgPicker';
import AvatarShapePicker from 'components/manage/AvatarShapePicker';
import FontPicker from 'components/manage/FontPicker';
import SettingsButton from 'components/manage/SettingButton';
import ButtonColorPicker from './ButtonColorPicker';
import ButtonRoundPicker from './ButtonRoundPicker';
import ButtonVarianticker from './ButtonVariantPicker';
import {
  colorModeAtom,
  horizontalSocialAtom,
  isStyledAtom,
  lightModeAtom,
  mobileViewAtom,
  nameAtom,
  socialButtonsAtom,
  useLineIconsAtom,
  walletButtonsAtom,
} from 'core/atoms';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import ShareButton from './Share';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

interface Props {
  onSave: Function;
}

export default function ManageSidebar({ onSave }: Props) {
  const [colorM, setColorM] = useAtom(colorModeAtom);
  const { colorMode, toggleColorMode } = useColorMode();
  const [mobileView, setMobileView] = useAtom(mobileViewAtom);
  const [notMobile] = useMediaQuery('(min-width: 990px)');
  const [notMobileH] = useMediaQuery('(min-height: 896px)');
  const [desktop] = useMediaQuery('(min-width: 1280px)');
  const [useLineIcons, setUseLineIcons] = useAtom(useLineIconsAtom);
  const [horizontalSocial, setHorizontalSocial] = useAtom(horizontalSocialAtom);
  const [socialButtons, setSocialButtons] = useAtom(socialButtonsAtom);
  const [walletButtons, setWalletButtons] = useAtom(walletButtonsAtom);
  const [lightMode, setLightMode] = useAtom(lightModeAtom);
  const name = useAtomValue(nameAtom);
  const setIsStyled = useSetAtom(isStyledAtom);
  const { pathname } = useRouter();

  if (notMobile) {
    setIsStyled(true);
  }

  useEffect(() => {
    if (notMobile) {
      if (!pathname.includes('nftAddress')) {
        if (colorMode !== colorM) {
          toggleColorMode();
        }
      }
    }
  }, [colorM, colorMode]);

  return (
    <>
      <Flex
        gap={4}
        flexDir={'column'}
        borderRadius={12}
        p={3}
        my={4}
        className={desktop ? 'design' : 'designMob'}
        w={['100%', 'md', 'xs', 'sm', 'xs', 'md']}
        backgroundColor={colorMode === 'light' ? 'white' : 'blackAlpha.600'}>
        <Flex
          flexDir="column"
          h={
            notMobileH
              ? ['93vh', '93vh', 'auto', 'auto', '93vh']
              : ['92vh', '92vh', 'auto', 'auto', '92vh']
          }
          overflow={['auto', 'auto', 'hidden', 'hidden', 'auto']}
          gap={4}
          rounded={'lg'}>
          <Flex justify={'space-between'} align={'center'}>
            <Text fontSize={'xl'} fontWeight={'bold'} p={1}>
              Styles
            </Text>
            <Flex gap={2}>
              {notMobile && (
                <Button
                  size={'lg'}
                  gap={2}
                  onClick={() => {
                    setMobileView(!mobileView);
                  }}>
                  {mobileView ? (
                    <LinkIcon type="RiComputerLine" />
                  ) : (
                    <LinkIcon type="RiSmartphoneLine" />
                  )}
                  {mobileView ? 'Bigger' : 'Mobile'}
                </Button>
              )}
              <IconButton
                aria-label="theme-mode"
                size={'lg'}
                onClick={() => {
                  setColorM(colorMode === 'light' ? 'dark' : 'light');
                  toggleColorMode();
                }}
                icon={
                  colorMode === 'light' ? (
                    <LinkIcon type="RiMoonFill" size="20px" />
                  ) : (
                    <LinkIcon type="RiSunFill" size="20px" />
                  )
                }
              />
            </Flex>
          </Flex>
          <Box>
            <BgPicker />
            <NftBgPicker />
            <ButtonColorPicker />
            <ButtonRoundPicker />
            <ButtonVarianticker />
            <AvatarShapePicker />
            <FontPicker />
          </Box>
          <Text fontSize={'xl'} fontWeight={'bold'} p={1}>
            Layout
          </Text>
          <Box gap={2}>
            <SettingsButton
              title="Light Mode"
              value={lightMode}
              setValue={setLightMode}
              top
            />

            <SettingsButton
              title="Use Line Icons"
              value={useLineIcons}
              setValue={setUseLineIcons}
            />

            <SettingsButton
              title="Social Icons"
              value={horizontalSocial}
              setValue={setHorizontalSocial}
            />
            <SettingsButton
              title="Wallet Buttons"
              value={walletButtons}
              setValue={setWalletButtons}
            />
            <SettingsButton
              title="Social Buttons"
              value={socialButtons}
              setValue={setSocialButtons}
              bottom
            />
          </Box>
        </Flex>
      </Flex>
    </>
  );
}
