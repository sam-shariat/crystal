import {
  Button,
  Flex,
  useMediaQuery,
  useColorMode,
  Stack,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Box,
} from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import { avatarAtom, avatarNftAtom, editedAvatarAtom, editingAvatarAtom, nameAtom } from 'core/atoms';
import AvatarEditor from 'react-avatar-editor';
import { RiAddLine, RiZoomInLine } from 'react-icons/ri';
import { useStorageUpload } from '@thirdweb-dev/react';

export default function CropAvatar() {
  const { colorMode } = useColorMode();
  const name = useAtomValue(nameAtom);
  const [avatar, setAvatar] = useAtom(avatarAtom);
  const [editingAvatar, setEditingAvatar] = useAtom(editingAvatarAtom);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [zoomValue, setZoomValue] = useState(10);
  const [isSaving, setIsSaving] = useState(false);
  const cropRef = useRef(null);
  const { mutateAsync: upload } = useStorageUpload();

  useEffect(() => {
    if (editingAvatar) {
      onOpen();
    } ;
  }, [editingAvatar]);

  const handleSave = async () => {
    if (cropRef?.current) {
       // @ts-ignore: Unreachable code error
      const image = cropRef?.current.getImage().toDataURL();
      const result = await fetch(image);
      const blob = await result.blob();
      await sendproFileToIPFS(new File([blob],name))
      onClose();
    }
  };

  const sendproFileToIPFS = async (e: any) => {
    if (e) {
      try {
        const formData = [e];
        setIsSaving(true);
        const uris = await upload({ data: formData });
        setAvatar('https://ipfs.io/ipfs/' + uris[0].slice(7));
        setIsSaving(false);
      } catch (error) {
        alert('Error sending File to IPFS: ');
        setIsSaving(false);
        //// console.log(error);
      }
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered size={'lg'}>
        <ModalOverlay bg="blackAlpha.700" backdropFilter="auto" backdropBlur={'6px'} />
        <ModalContent bg={colorMode === 'dark' ? 'var(--dark1)' : 'var(--white)'}>
          <ModalHeader>Edit Avatar</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack gap={8} align={'center'}>
              <AvatarEditor
                ref={cropRef}
                crossOrigin='anonymous'
                image={editingAvatar}
                style={{ width: '100%', height: '100%' }}
                border={24}
                borderRadius={150}
                color={[0, 0, 0, 0.72]}
                scale={zoomValue / 10}
                rotate={0}
              />
              <Slider
                aria-label="avatar-zoom"
                min={10}
                max={50}
                size="lg"
                defaultValue={zoomValue}
                w={'90%'}
                colorScheme='green'
                value={zoomValue}
                onChange={(e) => setZoomValue(e)}>
                <SliderTrack >
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb boxSize={6}>
                  <Box color="var(--venom)" as={RiAddLine} />
                </SliderThumb>
              </Slider>
            </Stack>
          </ModalBody>
          <ModalFooter gap={4}>
            <Button
              color="white"
              bgColor="var(--venom1)"
              isDisabled={isSaving}
              isLoading={isSaving}
              onClick={handleSave}>
              Save
            </Button>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
