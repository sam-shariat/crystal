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
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { RiAddFill, RiAddLine, RiFileCopy2Line } from 'react-icons/ri';
import { useAtom, useAtomValue } from 'jotai';
import {
  addLinkTypeAtom,
  openAddAtom,
  openAddLinkAtom,
  openAddNftAtom,
  openAddSocialAtom,
  openAddWalletAtom,
  socialsArrayAtom,
  useLineIconsAtom,
} from 'core/atoms';
import { capFirstLetter } from 'core/utils';
import { LinkIcon } from 'components/logos';

export default function AddModal({ type = 'square' }: { type: 'square' | 'full' }) {
  const { colorMode } = useColorMode();
  const useLineIcons = useAtomValue(useLineIconsAtom);
  const [_openAddSocial, _setOpenAddSocial] = useAtom(openAddSocialAtom);
  const [_openAddLink, _setOpenAddLink] = useAtom(openAddLinkAtom);
  const [_openAddNft, _setOpenAddNft] = useAtom(openAddNftAtom);
  const [_openAddWallet, _setOpenAddWallet] = useAtom(openAddWalletAtom);
  const [_type, _setType] = useAtom(addLinkTypeAtom);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [_open, _setOpen] = useAtom(openAddAtom);

  useEffect(() => {
    if (_open) {
      onOpen();
    }
  }, [_open]);

  useEffect(() => {
    _setOpen(isOpen);
  }, [isOpen]);

  return (
    <>
      {type === 'square' ? (
        <Button
          colorScheme={colorMode === 'light' ? "blackAlpha" : 'gray'}
          bgGradient={
            colorMode === 'light'
              ? 'linear(to-r, var(--darkAlpha), var(--dark2))'
              : 'linear(to-r, var(--whiteAlpha), var(--dark2))'
          }
          gap={2}
          w={'100%'}
          borderRadius={12}
          onClick={onOpen}
          className="add"
          flexDirection={'column'}
          height="72px">
          <RiAddLine size={'28px'} />
          Add
        </Button>
      ) : (
        <Button gap={2} onClick={onOpen} className="add" w={'100%'} size={'lg'}>
          <RiAddLine size={'28px'} />
          Add
        </Button>
      )}
      <Modal isOpen={isOpen} onClose={onClose} isCentered size={'lg'}>
        <ModalOverlay bg="blackAlpha.700" backdropFilter="auto" backdropBlur={'6px'} />
        <ModalContent bg={colorMode === 'dark' ? 'var(--dark1)' : 'var(--white)'}>
          <ModalHeader>Add New</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack gap={2}>
              <Button
                onClick={() => {
                  _setOpenAddWallet(true);
                  onClose();
                }}
                flexDir={'column'}
                gap={4}
                height={100}>
                Wallet Address
                <Flex gap={2} alignItems={'center'}>
                  <LinkIcon type="venom" line={useLineIcons} />
                  <LinkIcon type="ethereum" line={useLineIcons} />
                  <LinkIcon type="bitcoin" line={useLineIcons} />
                  <LinkIcon type="solana" line={useLineIcons} />
                  <Text fontSize={'xl'}>+6</Text>
                </Flex>
              </Button>
              <Button
                onClick={() => {
                  _setType('');
                  _setOpenAddLink(true);
                  onClose();
                }}
                flexDir={'column'}
                gap={4}
                height={100}>
                NFT, Link, Image, Video or Document
                <Flex gap={2}>
                  <LinkIcon type="text" line={useLineIcons} />
                  <LinkIcon type="simple link" line={useLineIcons} />
                  <LinkIcon type="nft link" line={useLineIcons} />
                  <LinkIcon type="youtube video" line={useLineIcons} />
                  <Text fontSize={'xl'}>+8</Text>
                </Flex>
              </Button>
              <Button
                onClick={() => {
                  _setType('');
                  _setOpenAddSocial(true);
                  onClose();
                }}
                flexDir={'column'}
                gap={4}
                height={100}>
                Social Media Links
                <Flex gap={2} alignItems={'center'}>
                  <LinkIcon type="twitter" line={useLineIcons} />
                  <LinkIcon type="email" line={useLineIcons} />
                  <LinkIcon type="github" line={useLineIcons} />
                  <LinkIcon type="whatsapp" line={useLineIcons} />
                  <Text fontSize={'xl'}>+28</Text>
                </Flex>
              </Button>
            </Stack>
          </ModalBody>
          <ModalFooter justifyContent={'center'} fontSize={'xs'}>
            Updating Regularly
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
