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

interface Props {
  onSave: Function;
}

export default function ManageSidebar({ onSave }: Props) {
  const [mobileView, setMobileView] = useAtom(mobileViewAtom);
  const [notMobile] = useMediaQuery('(min-width: 990px)');
  const [desktop] = useMediaQuery('(min-width: 1280px)');
  const { colorMode } = useColorMode();
  const [useLineIcons, setUseLineIcons] = useAtom(useLineIconsAtom);
  const [horizontalSocial, setHorizontalSocial] = useAtom(horizontalSocialAtom);
  const [socialButtons, setSocialButtons] = useAtom(socialButtonsAtom);
  const [walletButtons, setWalletButtons] = useAtom(walletButtonsAtom);
  const lightMode = useAtomValue(lightModeAtom);
  const name = useAtomValue(nameAtom);
  const setIsStyled = useSetAtom(isStyledAtom);

  if(notMobile){
    setIsStyled(true);
  }

  return (
    <>
      <Flex
        gap={4}
        flexDir={'column'}
        borderRadius={12}
        p={3}
        my={4}
        className={desktop ? "design" : "designMob"}
        w={['100%', 'md', 'xs', 'sm', 'xs', 'md']}
        backgroundColor={colorMode === 'light' ? 'white' : 'blackAlpha.600'}>
        <Flex flexDir="column" h={['94vh','94vh','auto','auto','94vh']} overflow={['auto','auto','hidden','hidden','auto']} gap={4} rounded={'lg'}>
          <Flex justify={'space-between'}>
            <Text fontSize={'xl'} fontWeight={'bold'} p={1}>
              Styles
            </Text>
            {notMobile && (
              <Button
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
              title="Use Line Icons"
              value={useLineIcons}
              setValue={setUseLineIcons}
              top
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
