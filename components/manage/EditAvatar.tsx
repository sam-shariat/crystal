import {
  Button,
  Stack,
  Flex,
  Box,
  useMediaQuery,
  Menu,
  MenuList,
  MenuButton,
  ButtonGroup,
  Heading,
  useColorMode,
  Text,
  Badge,
} from '@chakra-ui/react';
import { Avatar } from 'components/Profile';
import { avatarAtom, avatarNftAtom, avatarShapeAtom, editingAvatarAtom, editingAvatarFileAtom, jsonAtom, nameAtom, nftJsonAtom } from 'core/atoms';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { useState } from 'react';
import AddNFTAvatar from './AddNFTAvatar';

export default function EditAvatar() {
  const [avatarUploading, setAvatarUploading] = useState(false);
  const { colorMode } = useColorMode();
  const name = useAtomValue(nameAtom);
  const avatarShape = useAtomValue(avatarShapeAtom);
  const [avatar, setAvatar] = useAtom(avatarAtom);
  const setEditingAvatar = useSetAtom(editingAvatarAtom);
  const setEditingAvatarFile = useSetAtom(editingAvatarFileAtom);
  const [notMobile] = useMediaQuery('(min-width: 992px)');
  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  }
    
  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  }

  function buildFileSelector() {
    if (process.browser) {
      const fileSelector = document.createElement('input');
      fileSelector.type = 'file';
      fileSelector.multiple = false;
      fileSelector.onchange = async (e: any) => {
        setEditingAvatar(URL.createObjectURL(e.target.files[0]))
        setEditingAvatarFile(e.target.files[0])
        //sendproFileToIPFS(e.target.files[0]);
      };
      fileSelector.accept = 'image/x-png,image/gif,image/jpeg';
      return fileSelector;
    }
  }

  const imageFileSelect = buildFileSelector();

  return (
    <Flex gap={[6]} px={[6]} alignItems={['center']} className='avatar' backgroundColor={colorMode === 'dark' ? 'whiteAlpha.200' : 'gray.100'} rounded={'lg'} justify={'center'} w={'100%'}>
      <Box w={'104px'} key={avatar}>
        <Avatar maxH={'104'} url={avatar} shape={avatarShape} nodrag noanimate />
      </Box>
      <Stack gap={3}>
            <AddNFTAvatar defaultType="avatar" />
            <Button
              isLoading={avatarUploading}
              variant={'outline'}
              colorScheme={colorMode === 'light' ? 'dark' : 'light'}
              onClick={() => imageFileSelect !== undefined && imageFileSelect.click()}>
              Upload Avatar
            </Button>
      </Stack>
      <Button isDisabled display={['none','flex']} variant={'outline'} flexDirection={'column'} gap={2} height={'88px'}><Text>Generate</Text><Text>AI Avatar</Text><Badge p={1} px={2} position={'absolute'} top={'-12px'}  colorScheme='green'>Soon</Badge></Button>
    </Flex>
  );
}
