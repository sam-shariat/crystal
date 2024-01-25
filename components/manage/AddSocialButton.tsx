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
  InputLeftElement,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { RiAddFill, RiArrowLeftLine, RiFileCopy2Line, RiSearchLine } from 'react-icons/ri';
import { useAtom, useAtomValue } from 'jotai';
import { openAddAtom, openAddSocialAtom, socialsArrayAtom, useLineIconsAtom } from 'core/atoms';
import { capFirstLetter } from 'core/utils';
import { LinkIcon } from 'components/logos';
import { EXAMPLE_SOCIAL_URLS, SOCIALS } from 'core/utils/constants';

export default function AddSocialButton() {
  const { colorMode } = useColorMode();
  const useLineIcons = useAtomValue(useLineIconsAtom);
  const [_open, _setOpen] = useAtom(openAddSocialAtom);
  const [_back, _setBack] = useAtom(openAddAtom);
  const [notMobile] = useMediaQuery('(min-width: 800px)');
  const [availableSocials, setAvailableSocials] = useState<string[]>([]);
  const [searchedSocials, setSearchedSocials] = useState<string[]>([]);
  const [selectedSocial, setSelectedSocial] = useState('');
  const [searchText, setSearchText] = useState('');
  const [selectedSocialUrl, setSelectedSocialUrl] = useState('');
  const [socialsArray, setSocialsArray] = useAtom(socialsArrayAtom);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (_open) {
      setSelectedSocialUrl('');
      setSelectedSocial('');
      setSearchText('');
      onOpen();
    }
  }, [_open]);

  const addToSocial = () => {
    let _newSocialsArray = [
      { key: selectedSocial.toLowerCase(), value: selectedSocialUrl },
      ...socialsArray
    ];
    setSocialsArray(_newSocialsArray);
    setSelectedSocialUrl('');
    setSelectedSocial('');
    _setOpen(false);
    onClose();
  };

  useEffect(() => {
    _setOpen(isOpen);
  }, [isOpen]);

  useEffect(() => {
    let _socials: string[] = [...SOCIALS.sort()]

    socialsArray.map((item) => {
      _socials.splice(_socials.indexOf(capFirstLetter(item.key)), 1);
    });

    setAvailableSocials(_socials);
  }, [socialsArray]);

  useEffect(() => {
    searchText.length > 0 ? setSearchedSocials(SOCIALS.filter((item) =>
      item.toLowerCase().includes(searchText.toLowerCase())
    )) : setSearchedSocials([]);
  },[searchText]);

  return (
    <>
      <Button
        onClick={() => {
          setSelectedSocial('');
          onOpen();
        }}
        gap={2}>
        <RiAddFill size="28" />
        <Text fontWeight="bold">Add New</Text>
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside" isCentered size={['full','full','lg']}>
        <ModalOverlay bg="blackAlpha.700" backdropFilter="auto" backdropBlur={'6px'} />
        <ModalContent bg={colorMode === 'dark' ? 'var(--dark1)' : 'var(--white)'}>
          <ModalHeader display="flex" gap={2} flexDir={'column'}>
            <Flex align={'center'} gap={2}>
              <IconButton
                variant={'ghost'}
                aria-label="back-to-add-modal"
                onClick={() => {
                  if(!selectedSocial){
                    _setBack(true);
                    onClose();
                  } else {
                    setSelectedSocial('');
                  }
                }}>
                <RiArrowLeftLine size={'28'} />
              </IconButton>{' '}
              Add {selectedSocial ? `${capFirstLetter(selectedSocial)} Link` : 'New'}
            </Flex>
            {!selectedSocial && (
              <Flex justify={'center'}>
                <InputGroup size={'lg'} >
                  <InputLeftElement p={2}>
                    <RiSearchLine size={24} />
                  </InputLeftElement>
                  <Input
                    rounded={'lg'}
                    value={searchText}
                    onChange={(e) => setSearchText(e.currentTarget.value)}
                    placeholder="Search"
                  />
                </InputGroup>
              </Flex>
            )}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedSocial ? (
              <Stack gap={2}>
                
                {selectedSocial && (
                  <>
                  <InputGroup size="lg" minWidth="xs" borderColor="gray">
                    <InputLeftAddon>
                      <LinkIcon type={selectedSocial.toLowerCase()} />
                    </InputLeftAddon>
                    <Input
                      isDisabled={selectedSocial === ''}
                      value={selectedSocialUrl}
                      placeholder={`Enter your ${selectedSocial} URL`}
                      onChange={(e) => setSelectedSocialUrl(e.currentTarget.value)}
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
                            navigator.clipboard
                              .readText()
                              .then((text) => setSelectedSocialUrl(text))
                          }>
                          <RiFileCopy2Line />
                        </IconButton>
                      </Tooltip>
                    </InputRightElement>
                  </InputGroup>
                  <Box pt={2}>
                  <Text>Example {capFirstLetter(selectedSocial)} Link</Text>
                  <Text color={'gray'}>{EXAMPLE_SOCIAL_URLS[selectedSocial.toLowerCase().replace(' ','')]}</Text>
                  </Box>
                  </>
                )}
              </Stack>
            ) : (
              <SimpleGrid columns={[1]} gap={2} pb={4}>
                {(searchText.length > 0 ? searchedSocials : availableSocials).map((item) => (
                  <Button
                    gap={4}
                    fontWeight={'bold'}
                    size={'lg'}
                    fontSize={'xl'}
                    justifyContent={'left'}
                    height={'64px'}
                    key={item}
                    onClick={() => item && setSelectedSocial(item)}>
                    <LinkIcon type={item.toLowerCase()} line={useLineIcons} />
                    {capFirstLetter(item)}
                  </Button>
                ))}
              </SimpleGrid>
            )}
          </ModalBody>
          {selectedSocial && (
            <ModalFooter gap={2} justifyContent={'left'}>
              <Button
                color="white"
                bgColor="var(--venom1)"
                isDisabled={selectedSocialUrl === ''}
                onClick={addToSocial}>
                Add
              </Button>
              <Button onClick={onClose}>Close</Button>
            </ModalFooter>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
