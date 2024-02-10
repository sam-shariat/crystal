import {
  Button,
  Flex,
  useMediaQuery,
  useColorMode,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  useDisclosure,
  DrawerHeader,
  LightMode,
} from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import { RiAddFill, RiAddLine, RiFileCopy2Line } from 'react-icons/ri';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { isStyledAtom, useLineIconsAtom } from 'core/atoms';
import { capFirstLetter } from 'core/utils';
import { LinkIcon } from 'components/logos';
import ManageSidebar from './ManageSidebar';
import { MdOutlineVisibility } from 'react-icons/md';

interface Props {
  onSave: Function;
}

export default function StyleDrawer({ onSave }: Props) {
  const { colorMode } = useColorMode();
  const useLineIcons = useAtomValue(useLineIconsAtom);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef(null);
  const [notMobile] = useMediaQuery('(min-width: 992px)');
  const [desktop] = useMediaQuery('(min-width: 1280px)');
  const setIsStyled = useSetAtom(isStyledAtom);

  useEffect(() => {
    if (!notMobile) {
      onClose();
    }

    if (desktop) {
      onClose();
    }

    if (isOpen) {
      setIsStyled(true);
    }
  }, [notMobile, desktop, isOpen]);

  return (
    <>
      <LightMode>
        <Button
          gap={2}
          borderRadius={12}
          onClick={onOpen}
          className={desktop && notMobile ? 'designDesk' : 'design'}
          colorScheme={'purple'}
          bgGradient={
            colorMode === 'light'
              ? 'linear(to-r, var(--purple0), var(--purplevenom2))'
              : 'linear(to-r, var(--purple0), var(--purplevenom2))'
          }
          color={'white'}
          flexDirection={'column'}
          w={'100%'}
          height="72px">
          <LinkIcon type="RiPaletteLine" size="28px" />
          Styles
        </Button>
      </LightMode>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose} finalFocusRef={btnRef} size={'md'}>
        <DrawerContent
          bg={colorMode === 'light' ? 'white' : 'black'}
          placeItems={'center'}
          placeContent={'center'}>
          <DrawerHeader>
            <DrawerCloseButton />
          </DrawerHeader>
          <DrawerBody>
            <ManageSidebar onSave={onSave} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
