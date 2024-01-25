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
  InputGroup,
  InputLeftElement,
  Input,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Tab,
} from '@chakra-ui/react';
import React, { ReactElement, useEffect, useState } from 'react';
import data from '@emoji-mart/data/sets/14/native.json';
import Picker from '@emoji-mart/react';
import EmojiIcon from 'components/Profile/Emoji';
import { useAtom, useAtomValue } from 'jotai';
import { useLineIconsAtom } from 'core/atoms';
import * as Icons from 'react-icons/ri';
import { LinkIcon } from 'components/logos';
import SettingsButton from './SettingButton';
import ManageUpload from './ManageUpload';
import { IPFS_IMAGE_URI } from 'core/utils/constants';

interface Props {
  value: string | undefined;
  setValue: Function;
}

export default function IconPicker({ value, setValue }: Props) {
  const { colorMode } = useColorMode();
  const [useLineIcons, setUseLineIcons] = useAtom(useLineIconsAtom);
  const [notMobile] = useMediaQuery('(min-width: 800px)');
  const [searchText, setSearchText] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const SelectedIcon = Icons[value as keyof typeof Icons];
  const [searchedIcons, setSearchedIcons] = useState<string[]>([]);
  const [availableIcons, setAvailableIcons] = useState<string[]>([]);
  // const [fillIcons, setFillIcons] = useState<string[]>([]);
  // const [lineIcons, setLineIcons] = useState<string[]>([]);

  useEffect(() => {
    let _fillicons: string[] = [
      ...Object.keys(Icons)
        .filter((item) => item.toLowerCase().includes('fill'))
        .sort(),
    ];
    //setFillIcons(_fillicons);
    let _lineicons: string[] = [
      ...Object.keys(Icons)
        .filter((item) => item.toLowerCase().includes('line'))
        .sort(),
    ];
    //setLineIcons(_lineicons);
    if (useLineIcons) {
      setAvailableIcons(_lineicons);
    } else {
      setAvailableIcons(_fillicons);
    }
  }, [useLineIcons]);

  useEffect(() => {
    searchText.length > 0
      ? setSearchedIcons(
          availableIcons.filter((item) =>
            item.toLowerCase().includes(searchText.toLowerCase().replaceAll(' ', ''))
          )
        )
      : setSearchedIcons([]);
  }, [searchText, availableIcons]);

  return (
    <>
      <Button variant={'outline'} gap={2} borderRadius={12} onClick={onOpen} size={'lg'} height={'56px'}>
        {value && <LinkIcon type={value} size={value.includes(IPFS_IMAGE_URI) ? 'md' : '24'} />}
        Select Icon
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered size={'lg'} scrollBehavior="inside">
        <ModalOverlay bg="blackAlpha.700" backdropFilter="auto" backdropBlur={'6px'} />
        <ModalContent bg={colorMode === 'dark' ? 'var(--dark1)' : 'var(--white)'} h={'660px'}>
          <ModalHeader display="flex" gap={4} flexDir={'column'}>
            Select Icon
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Tabs
              variant="soft-rounded"
              colorScheme={colorMode === 'light' ? 'blackAlpha' : 'whiteAlpha'}>
              <TabList gap={2} justifyContent={'center'}>
                <Tab gap={2}>
                  <LinkIcon type="RiLinksLine" size="24" />
                  Icon
                </Tab>
                <Tab gap={2}>
                  <EmojiIcon size={24} native={'💥'} /> Emoji
                </Tab>
                <Tab gap={2}>
                  <LinkIcon type="image" size="24" /> Image
                </Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Flex
                    gap={4}
                    display={'flex'}
                    flexDirection={'column'}
                    p={4}
                    boxShadow={'md'}
                    bgColor={colorMode === 'light' ? 'white' : 'blackAlpha.600'}
                    rounded={'lg'}>
                    <Flex justify={'center'}>
                      <InputGroup size={'lg'} rounded={'full'} colorScheme="gray">
                        <InputLeftElement p={2}>
                          <LinkIcon type="RiSearchLine" size={'24'} />
                        </InputLeftElement>
                        <Input
                          rounded={'full'}
                          value={searchText}
                          onChange={(e) => setSearchText(e.currentTarget.value)}
                          placeholder="Search Icon"
                        />
                      </InputGroup>
                    </Flex>
                    <SettingsButton
                      title="Use Line Icons"
                      value={useLineIcons}
                      setValue={setUseLineIcons}
                      top
                      bottom
                    />
                    <Stack gap={2} h={'320px'} overflow={'auto'}>
                      <SimpleGrid
                        columns={4}
                        gap={[2, 3, 4]}
                        key={`icon-picker-${useLineIcons}-icons`}>
                        {(searchText.length > 0 ? searchedIcons : availableIcons).map((val) => {
                          const Icon = Icons[val as keyof typeof Icons];
                          return (
                            <IconButton
                              variant={value === val ? 'solid' : 'outline'}
                              key={`icon-picker-${val}-icon`}
                              aria-label={val}
                              onClick={() => {
                                setValue(val);
                                onClose();
                              }}
                              p={[4, 6, 7]}
                              py={8}>
                              <Icon size={notMobile ? 56 : 32} />
                            </IconButton>
                          );
                        })}
                      </SimpleGrid>
                    </Stack>
                  </Flex>
                </TabPanel>
                <TabPanel>
                  <Picker
                    data={data}
                    onEmojiSelect={(val: any) => {
                      setValue(val.native);
                      onClose();
                    }}
                    dynamicWidth={true}
                    theme={colorMode}
                  />
                </TabPanel>
                <TabPanel gap={4} display={'flex'} flexDir={'column'} justifyContent={'space-between'} height={'500px'}>
                  <ManageUpload type="image" setImage={setValue} galleryItems={6} image={value}/>
                  {value && value.includes(IPFS_IMAGE_URI) && <Button size={'lg'} height={'64px'} onClick={onClose} gap={2} w={'100%'} display={'flex'}><LinkIcon type={value} size='md'/> Select Icon</Button>}
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
