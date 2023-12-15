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
  IconButton,
  SimpleGrid,
  Icon,
} from '@chakra-ui/react';
import React, { ReactElement, useEffect, useState } from 'react';
import { RiAddLine } from 'react-icons/ri';
import { useAtom, useAtomValue } from 'jotai';
import { useLineIconsAtom } from 'core/atoms';
import * as Icons from 'react-icons/ri';
interface Props {
  value: string | undefined;
  setValue: Function;
}

export default function IconPicker({ value, setValue }: Props) {
  const { colorMode } = useColorMode();
  const useLineIcons = useAtomValue(useLineIconsAtom);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const SelectedIcon = Icons[value as keyof typeof Icons];

  return (
    <>
      <Button
        variant={'outline'}
        gap={2}
        borderRadius={12}
        onClick={onOpen}
        size={'lg'}
        leftIcon={value ? <SelectedIcon size={28} /> : undefined}>
        Select Icon
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered size={'lg'} scrollBehavior="inside">
        <ModalOverlay bg="blackAlpha.700" backdropFilter="auto" backdropBlur={'6px'} />
        <ModalContent bg={colorMode === 'dark' ? 'var(--dark1)' : 'var(--white)'}>
          <ModalHeader>Select Icon</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack gap={2}>
              <SimpleGrid columns={4} gap={4}>
                {Object.keys(Icons).map((val) => {
                  const Icon = Icons[val as keyof typeof Icons];
                  return (
                    <IconButton variant={value === val ? 'solid' : 'outline'} key={val} aria-label={val} onClick={() => {setValue(val); onClose()}} p={8}>
                      <Icon size={56} />
                    </IconButton>
                  );
                })}
              </SimpleGrid>
            </Stack>
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>
    </>
  );
}
