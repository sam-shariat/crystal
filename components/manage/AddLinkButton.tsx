import {
  InputRightElement,
  useDisclosure,
  IconButton,
  Button,
  Tooltip,
  Textarea,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Badge,
  useMediaQuery,
  useColorMode,
  Input,
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
  Switch,
  Flex,
  useToast,
  ButtonGroup,
  InputLeftAddon,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import {
  RiAddFill,
  RiArrowLeftLine,
  RiCheckLine,
  RiFileCopy2Line,
  RiUploadCloudLine,
} from 'react-icons/ri';
import { useAtom, useAtomValue } from 'jotai';
import {
  addLinkContentAtom,
  addLinkImageAtom,
  addLinkStylesAtom,
  addLinkTitleAtom,
  addLinkTypeAtom,
  addLinkUrlAtom,
  addressAtom,
  btcAtom,
  ethAtom,
  linksArrayAtom,
  openAddAtom,
  openAddLinkAtom,
  useLineIconsAtom,
} from 'core/atoms';
import { capFirstLetter } from 'core/utils';
import { useStorageUpload } from '@thirdweb-dev/react';
import { LinkIcon } from 'components/logos';
import { ImageLink, Link } from 'components/Profile';
import AddNFTAvatar from './AddNFTAvatar';
import {
  AVAILABLE_LINKS,
  EXAMPLE_LINK_URLS,
  OPENSEA_URL,
  VENOMART_NFT,
  VENTORY_NFT,
} from 'core/utils/constants';
import { LinkType, Styles } from 'types';
import NftLink from 'components/Profile/NftLink';
import SelectSizeButton from './SelectSizeButton';
import Donate from 'components/Profile/Donate';
import EthAddressInput from './EthAddressInput';
import BtcAddressInput from './‌‌BtcAddressInput';
import Pay from 'components/Profile/Pay';
import WalletInput from './WalletInput';
import IconPicker from './IconPicker';

export default function AddLinkButton() {
  const useLineIcons = useAtomValue(useLineIconsAtom);
  const [_open, _setOpen] = useAtom(openAddLinkAtom);
  const [_type, _setType] = useAtom(addLinkTypeAtom);
  const _title = useAtomValue(addLinkTitleAtom);
  const _image = useAtomValue(addLinkImageAtom);
  const _url = useAtomValue(addLinkUrlAtom);
  const _content = useAtomValue(addLinkContentAtom);
  const _styles = useAtomValue(addLinkStylesAtom);
  const venomAddress = useAtomValue(addressAtom);
  const ethAddress = useAtomValue(ethAtom);
  const btcAddress = useAtomValue(btcAtom);
  const { colorMode } = useColorMode();
  const [linksArray, setLinksArray] = useAtom(linksArrayAtom);
  const { mutateAsync: upload } = useStorageUpload();
  const [notMobile] = useMediaQuery('(min-width: 800px)');
  const [type, setType] = useState('');
  const [_back, _setBack] = useAtom(openAddAtom);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [image, setImage] = useState('');
  const [imageUploading, setImageUploading] = useState(false);
  const [content, setContent] = useState('');
  const [styles, setStyles] = useState<Styles>({});
  const reg = AVAILABLE_LINKS.find((e) => e.type === type)?.reg ?? '';
  const toast = useToast();

  useEffect(() => {
    if (_open) {
      setType(_type);
      setTitle(_title);
      setImage(_image);
      setUrl(_url);
      setContent(_content);
      setStyles(_styles);
      onOpen();
    } else {
      _setType('');
    }
  }, [_open]);

  const addToLinks = () => {
    let _newLinksArray = [
      ...linksArray,
      {
        type,
        title,
        url,
        image,
        content,
        styles,
      },
    ];

    setLinksArray(_newLinksArray);
    //// console.log(_newLinksArray);
    setType('');
    setTitle('');
    setImage('');
    setUrl('');
    setContent('');
    setStyles({});
    _setOpen(false);
    onClose();
  };

  useEffect(() => {
    _setOpen(isOpen);
  }, [isOpen]);

  function buildFileSelector(mimetypes: string) {
    if (process.browser) {
      const fileSelector = document.createElement('input');
      fileSelector.type = 'file';
      fileSelector.multiple = false;
      fileSelector.onchange = async (e: any) => {
        sendproFileToIPFS(e.target.files[0], mimetypes);
      };
      fileSelector.accept = mimetypes;
      return fileSelector;
    }
  }

  const imageFileSelect = buildFileSelector('image/x-png,image/png,image/gif,image/jpeg');
  const pdfFileSelect = buildFileSelector('application/pdf');

  const sendproFileToIPFS = async (e: any, mimetypes: string) => {
    if (e) {
      try {
        const formData = [e];
        //// console.log('uploading file to ipfs');
        toast({
          status: 'loading',
          title: 'Uploading to IPFS',
          description: 'Uploading file to IPFS',
          isClosable: true,
        });
        setImageUploading(true);
        const uris = await upload({ data: formData });
        //const ImgHash = resFile.data.IpfsHash;
        //// console.log(ImgHash);
        mimetypes.includes('pdf')
          ? setUrl('https://ipfs.io/ipfs/' + uris[0].slice(7))
          : setImage('https://ipfs.io/ipfs/' + uris[0].slice(7));
        setImageUploading(false);
        toast.closeAll();
        toast({
          status: 'success',
          title: 'Uploaded to IPFS',
          description: 'Upload Successful',
          isClosable: true,
        });
      } catch (error) {
        toast.closeAll();
        toast({
          status: 'warning',
          title: 'Error in uploading to IPFS',
          description:
            'Please check your network and Try Again, If the problem presists, please send a message to venomidapp@gmail.com',
          isClosable: true,
        });
        alert('Error sending File to IPFS, Please check your network and Try Again');
        setImageUploading(false);
        //// console.log(error);
      }
    }
  };

  const addLink = (item: LinkType) => {
    if (item?.av) {
      setTitle('');
      setUrl('');
      setImage('');

      switch (item.type) {
        case 'donate':
        case 'pay':
          setStyles({
            size: 'md',
            venom: venomAddress,
            eth: ethAddress,
            btc: btcAddress,
          });
          break;

        case 'simple link':
          setStyles({
            size: 'md',
            icon: 'RiLinksLine'
          });
          break;

        default:
          setStyles({ size: 'md' });
          break;
      }

      setContent('');
      _setOpen(false);
      setType(item.type);
    }
  };

  return (
    <>
      <Button
        onClick={() => {
          setType('');
          onOpen();
        }}
        gap={2}>
        <RiAddFill size="28" />
        <Text fontWeight="bold">Add New</Text>
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered scrollBehavior="inside" size={['full','full','lg']}>
        <ModalOverlay bg="blackAlpha.700" backdropFilter="auto" backdropBlur={'6px'} />
        <ModalContent bg={colorMode === 'dark' ? 'var(--dark1)' : 'var(--white)'}>
          <ModalHeader display="flex" gap={2} alignItems={'center'}>
            <IconButton
              variant={'ghost'}
              aria-label="back-to-add-modal"
              onClick={() => {
                if(!type){
                  _setBack(true);
                  onClose();
                } else {
                  setType('');
                }
              }}>
              <RiArrowLeftLine size={'28'} />
            </IconButton>{' '}
            Add New {type ? capFirstLetter(type) : ''}
            <ModalCloseButton />
          </ModalHeader>

          <ModalBody>
            {type ? (
              <Stack gap={4}>
                {type && (
                  <>
                    <InputGroup size="lg" minWidth="xs" borderColor="gray">
                      <Input
                        isDisabled={type === ''}
                        value={title}
                        variant="filled"
                        placeholder={`Enter ${capFirstLetter(type)} Title`}
                        fontWeight="bold"
                        onChange={(e) => setTitle(e.currentTarget.value)}
                      />
                    </InputGroup>
                  </>
                )}

                {(type.includes('link') ||
                  type.includes('video') ||
                  type.includes('tweet') ||
                  type.includes('soundcloud')) && (
                  <>
                    <InputGroup mt={2}>
                      <Input
                        size="lg"
                        value={url}
                        placeholder={`Enter ${capFirstLetter(type)} Address`}
                        onChange={(e) => setUrl(e.currentTarget.value)}
                        //onChange={(e) => setUrl(title.toLowerCase(),e.currentTarget.value)}
                      />
                      <InputRightElement>
                        <Tooltip
                          borderRadius={4}
                          label={<Text p={2}>Paste</Text>}
                          hasArrow
                          color="white"
                          bgColor={'black'}>
                          <IconButton
                            mt={2}
                            mr={2}
                            aria-label="paste-url"
                            onClick={() =>
                              navigator.clipboard.readText().then((text) => setUrl(text))
                            }>
                            <RiFileCopy2Line />
                          </IconButton>
                        </Tooltip>
                      </InputRightElement>
                    </InputGroup>
                    {EXAMPLE_LINK_URLS[type.toLowerCase().replace(' ', '')] &&
                      !RegExp(reg, 'i').test(url) && (
                        <Box pt={2}>
                          <Text>Example {capFirstLetter(type)}</Text>
                          <Text color={'gray'}>
                            {EXAMPLE_LINK_URLS[type.toLowerCase().replace(' ', '')]}
                          </Text>
                        </Box>
                      )}
                    {(type.includes('soundcloud') || type.includes('simple link')) && RegExp(reg, 'i').test(url) && (
                      <SelectSizeButton
                        options={['sm', 'md', 'lg']}
                        value={String(styles?.size)}
                        setValue={(e: any) => setStyles({ ...styles, size: e })}
                        title="Size"
                      />
                    )}
                  </>
                )}

                {type === 'simple link' && (
                  <IconPicker
                    value={styles?.icon}
                    setValue={(e: any) => setStyles({ ...styles, icon: e })}
                  />
                )}

                {(type.includes('youtube') ||
                  type.includes('tweet') ||
                  type.includes('soundcloud')) &&
                  RegExp(reg, 'i').test(url) && (
                    <Link
                      type={type}
                      title={title}
                      url={url}
                      styles={styles}
                      content={content}
                      image={image}
                    />
                  )}

                {type.indexOf('image') >= 0 && (
                  <>
                    <Button
                      size="lg"
                      isDisabled={imageUploading}
                      gap={2}
                      onClick={() => imageFileSelect !== undefined && imageFileSelect.click()}>
                      <RiUploadCloudLine size="24" /> Upload Image
                    </Button>
                  </>
                )}

                {type.indexOf('pdf') >= 0 && (
                  <>
                    <Button
                      size="lg"
                      isDisabled={imageUploading}
                      gap={2}
                      onClick={() => pdfFileSelect !== undefined && pdfFileSelect.click()}>
                      <RiUploadCloudLine size="24" /> Upload PDF
                    </Button>
                  </>
                )}

                {(type.includes('simple link') ||
                  type.includes('image') ||
                  type.includes('pdf')) && (
                  <>
                    {/* <SelectSizeButton
                      options={[true, false]}
                      value={String(styles?.popup) ?? false}
                      setValue={(e: any) => setStyles({ ...styles, popup: e })}
                      title="Open In Pop Up"
                    /> */}
                    {(image || url) && (
                      <Link
                        type={type}
                        title={title ? title : capFirstLetter(type)}
                        icon={<LinkIcon type={type === 'simple link' ? String(styles.icon) : type} line={useLineIcons} />}
                        url={url}
                        image={image}
                        styles={styles}
                      />
                    )}
                  </>
                )}

                {type.indexOf('nft') >= 0 && (
                  <>
                    <AddNFTAvatar defaultType="nft" key="add-nft-modal" />
                    {content && (
                      <>
                        <SelectSizeButton
                          options={['sm', 'md', 'lg']}
                          value={String(styles?.size)}
                          setValue={(e: any) => setStyles({ ...styles, size: e })}
                          title="Size"
                        />
                        <SelectSizeButton
                          options={[true, false]}
                          value={String(styles?.scanLink)}
                          setValue={(e: any) => setStyles({ ...styles, scanLink: e })}
                          title="Explorer Link"
                        />
                        <Flex gap={2} width={'100%'}>
                          {String(styles.network).includes('venom') ? (
                            <Button
                              flexGrow={1}
                              variant={url.includes(VENTORY_NFT) ? 'outline' : 'solid'}
                              onClick={() =>
                                setUrl(url.length > 0 ? '' : VENTORY_NFT + String(content))
                              }>
                              {url.length > 0 ? 'Remove Link To Ventory' : 'Link To Ventory'}
                            </Button>
                          ) : (
                            <Button
                              flexGrow={1}
                              variant={url.includes(OPENSEA_URL) ? 'outline' : 'solid'}
                              onClick={() =>
                                setUrl(
                                  url.length > 0
                                    ? ''
                                    : OPENSEA_URL +
                                        styles.network +
                                        JSON.parse(String(content)).address
                                )
                              }>
                              {url.length > 0 ? 'Remove Link To Opensea' : 'Link To Opensea'}
                            </Button>
                          )}
                        </Flex>
                        <NftLink
                          url={String(image)}
                          link={url}
                          title={title}
                          styles={styles}
                          address={String(content)}
                          alt={title}
                          color={colorMode === 'light' ? 'dark' : 'white'}
                        />
                      </>
                    )}
                  </>
                )}

                {type.indexOf('text') >= 0 && (
                  <Textarea
                    minWidth="xs"
                    my={2}
                    rows={5}
                    maxLength={500}
                    placeholder={'Simple Text ...'}
                    size="lg"
                    bg={colorMode === 'dark' ? 'whiteAlpha.100' : 'blackAlpha.100'}
                    variant="outline"
                    border="none"
                    resize={'none'}
                    value={content}
                    onChange={(e) => setContent(e.currentTarget.value)}
                  />
                )}

                {(type.includes('donate') || type.includes('pay')) && (
                  <>
                    <WalletInput
                      title="Venom"
                      value={String(styles.venom)}
                      setValue={(e: any) => setStyles({ ...styles, venom: e })}
                    />
                    <WalletInput
                      title="Ethereum"
                      value={String(styles.eth)}
                      setValue={(e: any) => setStyles({ ...styles, eth: e })}
                    />
                    <WalletInput
                      title="Bitcoin"
                      value={String(styles.btc)}
                      setValue={(e: any) => setStyles({ ...styles, btc: e })}
                    />
                    <Text>Thank you note</Text>
                    <Textarea
                      minWidth="xs"
                      title="Thank you note"
                      my={2}
                      rows={2}
                      maxLength={500}
                      placeholder={`${capFirstLetter(
                        type.slice(0, type.indexOf(' '))
                      )} Successful. Thank you`}
                      size="lg"
                      bg={colorMode === 'dark' ? 'whiteAlpha.100' : 'blackAlpha.100'}
                      variant="outline"
                      border="none"
                      resize={'none'}
                      value={content}
                      onChange={(e) => setContent(e.currentTarget.value)}
                    />

                    {(styles.btc || styles.eth || styles.venom) && type.includes('donate') && (
                      <Donate title={title ? title : 'Donate'} content={content} style={styles} />
                    )}

                    {(styles.btc || styles.eth || styles.venom) && type.includes('pay') && (
                      <Pay title={title ? title : 'Pay'} content={content} style={styles} />
                    )}
                  </>
                )}
              </Stack>
            ) : (
              <SimpleGrid columns={[1]} gap={2} pb={2}>
                {AVAILABLE_LINKS.map(
                  (item) =>
                    item !== undefined && (
                      <Button
                        gap={4}
                        fontWeight={'bold'}
                        fontSize={'xl'}
                        key={item?.type}
                        justifyContent={'left'}
                        size={'lg'}
                        height={'64px'}
                        onClick={() => addLink(item)}>
                        {item.av && <LinkIcon type={item.type} line={useLineIcons} />}
                        {!item?.av && (
                          <Badge variant="solid" colorScheme="gray" p={1.5}>
                            Soon
                          </Badge>
                        )}
                        {capFirstLetter(item.type)}
                        
                      </Button>
                    )
                )}
              </SimpleGrid>
            )}
          </ModalBody>
          {type && (
            <ModalFooter gap={2} justifyContent={'left'}>
              <Button
                color="white"
                bgColor="var(--venom1)"
                isDisabled={type === undefined || title === ''}
                onClick={() => {
                  if (new RegExp(reg, 'i').test(url)) {
                    addToLinks();
                  } else {
                    toast({
                      status: 'warning',
                      title: 'Invalid URL',
                      description: 'Please enter the url in the required format',
                      duration: 3000,
                    });
                  }
                }}>
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
