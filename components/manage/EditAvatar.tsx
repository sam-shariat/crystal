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
} from '@chakra-ui/react';
import { Avatar } from 'components/Profile';
import { avatarAtom, avatarNftAtom, avatarShapeAtom, editingAvatarAtom, jsonAtom, nameAtom, nftJsonAtom } from 'core/atoms';
import { useAtom, useAtomValue } from 'jotai';
import { useState } from 'react';
import AddNFTAvatar from './AddNFTAvatar';

export default function EditAvatar() {
  const [avatarUploading, setAvatarUploading] = useState(false);
  const { colorMode } = useColorMode();
  const name = useAtomValue(nameAtom);
  const avatarShape = useAtomValue(avatarShapeAtom);
  const [avatar, setAvatar] = useAtom(avatarAtom);
  const [editingAvatar, setEditingAvatar] = useAtom(editingAvatarAtom);
  const [notMobile] = useMediaQuery('(min-width: 770px)');

  function buildFileSelector() {
    if (process.browser) {
      const fileSelector = document.createElement('input');
      fileSelector.type = 'file';
      fileSelector.multiple = false;
      fileSelector.onchange = async (e: any) => {
        setEditingAvatar(URL.createObjectURL(e.target.files[0]))
        //sendproFileToIPFS(e.target.files[0]);
      };
      fileSelector.accept = 'image/x-png,image/gif,image/jpeg';
      return fileSelector;
    }
  }

  const imageFileSelect = buildFileSelector();

  return (
    <Flex my={4} gap={[6,6,8]} alignItems={'center'} justify={'center'} className='avatar'>
      <Box w={notMobile ? '200px' : '100px'} key={avatar}>
        <Avatar maxH={notMobile ? '200px' : '100px'} url={avatar} shape={avatarShape} />
      </Box>
      <Stack>
        <Heading fontWeight="bold" fontSize="2xl" textShadow="0 0 20px #00000070">
          {name}
        </Heading>
        <Flex>
        <Menu>
          <MenuButton as={Button} variant={'outline'} colorScheme={colorMode === 'light' ? 'dark' : 'light'}>
            Select Avatar
          </MenuButton>
          <MenuList p={0} display={'flex'} flexDir={'column'} bg={`${colorMode}.400`}>
            <AddNFTAvatar defaultType="avatar" />
            <Button
              isLoading={avatarUploading}
              variant={'outline'}
              onClick={() => imageFileSelect !== undefined && imageFileSelect.click()}>
              Upload To IPFS
            </Button>
          </MenuList>
        </Menu>
        </Flex>
      </Stack>
    </Flex>
  );
}
