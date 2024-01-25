import {
  InputRightElement,
  Accordion,
  AccordionItem,
  AccordionButton,
  IconButton,
  AccordionPanel,
  Button,
  Flex,
  Tooltip,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useMediaQuery,
  useColorMode,
  Input,
  InputLeftAddon,
  InputGroup,
  Stack,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Box,
  SimpleGrid,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { RiAddFill, RiArrowLeftLine, RiFileCopy2Line } from 'react-icons/ri';
import { useAtom, useAtomValue } from 'jotai';
import { openAddAtom, openAddWalletAtom, useLineIconsAtom, walletsArrayAtom } from 'core/atoms';
import { EXAMPLE_WALLETS, WALLETS } from 'core/utils/constants';
import { capFirstLetter } from 'core/utils';
import { LinkIcon } from 'components/logos';

export default function AddWalletButton() {
  const { colorMode } = useColorMode();
  const useLineIcons = useAtomValue(useLineIconsAtom);
  const [_open, _setOpen] = useAtom(openAddWalletAtom);
  const [_back, _setBack] = useAtom(openAddAtom);
  const [notMobile] = useMediaQuery('(min-width: 800px)');
  const [availableWallets, setAvailableWallets] = useState<string[]>([]);
  const [selectedWallet, setSelectedWallet] = useState('');
  const [selectedWalletUrl, setSelectedWalletUrl] = useState('');
  const [walletsArray, setWalletsArray] = useAtom(walletsArrayAtom);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (_open) {
      setSelectedWalletUrl('');
      setSelectedWallet('');
      onOpen();
    }
  }, [_open]);

  const addWallet = () => {
    let _newWalletsArray = [
      { key: selectedWallet.toLowerCase(), value: selectedWalletUrl },
      ...walletsArray
    ];
    setWalletsArray(_newWalletsArray);
    setSelectedWalletUrl('');
    setSelectedWallet('');
    _setOpen(false);
    onClose();
  };

  useEffect(() => {
    _setOpen(isOpen);
  }, [isOpen]);

  useEffect(() => {
    let _wallets = [...WALLETS.sort()];
    walletsArray.map((item) => {
      _wallets.splice(_wallets.indexOf(capFirstLetter(item.key)), 1);
    });
    setAvailableWallets(_wallets);
  }, [walletsArray]);

  return (
    <>
      <Button
        onClick={() => {
          setSelectedWallet('');
          onOpen();
        }}
        gap={2}>
        <RiAddFill size="28" />
        <Text fontWeight="bold">Add New</Text>
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered size={['full','full','lg']} scrollBehavior='inside'>
        <ModalOverlay bg="blackAlpha.700" backdropFilter="auto" backdropBlur={'6px'} />
        <ModalContent bg={colorMode === 'dark' ? 'var(--dark1)' : 'var(--white)'}>
          <ModalHeader display="flex" gap={2} alignItems={'center'}>
            <IconButton
              variant={'ghost'}
              aria-label="back-to-add-modal"
              onClick={() => {
                if(!selectedWallet){
                  _setBack(true);
                  onClose();
                } else {
                  setSelectedWallet('');
                }
              }}>
              <RiArrowLeftLine size={'28'} />
            </IconButton>{' '}
            Add {selectedWallet ? capFirstLetter(selectedWallet) : ''} Address
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedWallet ? (
              <Stack>
                <InputGroup size="lg" minWidth="xs" borderColor="gray">
                  <InputLeftAddon>
                    <LinkIcon type={selectedWallet.toLowerCase()} />
                  </InputLeftAddon>
                  <Input
                    isDisabled={selectedWallet === ''}
                    value={selectedWalletUrl}
                    placeholder={`Enter your ${selectedWallet} Address`}
                    onChange={(e) => setSelectedWalletUrl(e.currentTarget.value)}
                  />
                  <InputRightElement>
                    <Tooltip
                      borderRadius={4}
                      label={<Text p={2}>Paste</Text>}
                      hasArrow
                      color="white"
                      bgColor={'black'}>
                      <IconButton
                        aria-label="paste-url"
                        onClick={() =>
                          navigator.clipboard.readText().then((text) => setSelectedWalletUrl(text))
                        }>
                        <RiFileCopy2Line />
                      </IconButton>
                    </Tooltip>
                  </InputRightElement>
                </InputGroup>
                <Box pt={2}>
                  <Text>Example {capFirstLetter(selectedWallet)} Address</Text>
                  <Text color={'gray'}>
                    {EXAMPLE_WALLETS[selectedWallet.toLowerCase().replace(' ', '')]}
                  </Text>
                </Box>
              </Stack>
            ) : (
              <SimpleGrid columns={1} gap={2} py={2}>
                {availableWallets.map(
                  (item) =>
                    item !== undefined && (
                      <Button
                        gap={4}
                        fontWeight={'bold'}
                        size={'lg'}
                        justifyContent={'left'}
                        fontSize={'xl'}
                        height={'64px'}
                        key={item}
                        onClick={() => item && setSelectedWallet(item)}>
                        <LinkIcon type={item.toLowerCase()} line={useLineIcons} />
                        {capFirstLetter(item)}
                      </Button>
                    )
                )}
              </SimpleGrid>
            )}
          </ModalBody>
          {selectedWallet && <ModalFooter gap={2} justifyContent={'left'}>
            <Button
              color="white"
              bgColor="var(--venom1)"
              isDisabled={selectedWalletUrl === ''}
              onClick={addWallet}>
              Add
            </Button>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>}
        </ModalContent>
      </Modal>
    </>
  );
}
