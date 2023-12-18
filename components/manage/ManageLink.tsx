import {
  Box,
  IconButton,
  Accordion,
  AccordionItem,
  Tooltip,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Button,
  Flex,
  Input,
  Textarea,
  InputRightElement,
  InputGroup,
  useMediaQuery,
  useColorMode,
  Text,
  Stack,
  Badge,
  ButtonGroup,
  useToast,
} from '@chakra-ui/react';
import { SortableHandle } from 'react-sortable-hoc';
import { MdOutlineDragIndicator } from 'react-icons/md';
import { RiCheckLine, RiFileCopy2Line, RiUploadCloudLine } from 'react-icons/ri';
import React, { useState } from 'react';
import { capFirstLetter } from 'core/utils';
import { ImageLink, Link } from 'components/Profile';
import { useStorageUpload } from '@thirdweb-dev/react';
import { AVAILABLE_LINKS, EXAMPLE_LINK_URLS, OPENSEA_URL, VENTORY_NFT } from 'core/utils/constants';
import { LinkIcon } from 'components/logos';
import { Styles } from 'types';
import NftLink from 'components/Profile/NftLink';
import { useAtom, useAtomValue } from 'jotai';
import SelectSizeButton from './SelectSizeButton';
import WalletInput from './WalletInput';
import Donate from 'components/Profile/Donate';
import Pay from 'components/Profile/Pay';
import { useLineIconsAtom } from 'core/atoms';
import IconPicker from './IconPicker';

const DragHandle = SortableHandle(() => (
  <span>
    <MdOutlineDragIndicator size="22" />
  </span>
));

interface Props {
  type: string;
  title: string;
  url: string;
  ind: number;
  icon: JSX.Element;
  image?: string;
  content?: string;
  styles?: Styles;
  setUrl?: any;
  removeUrl?: any;
}

export default function ManageLink({
  type,
  icon,
  title,
  url,
  image,
  content,
  styles,
  setUrl,
  ind,
  removeUrl,
}: Props) {
  const { colorMode } = useColorMode();
  const [notMobile] = useMediaQuery('(min-width: 800px)');
  const [_title, setTitle] = useState(title);
  const [imageUploading, setImageUploading] = useState(false);
  const [_url, setURL] = useState(url);
  const [_content, setContent] = useState(content);
  const [_image, setImage] = useState(image);
  const [_styles, setStyles] = useState(styles);
  const lineIcons = useAtomValue(useLineIconsAtom);
  const { mutateAsync: upload } = useStorageUpload();
  const reg = AVAILABLE_LINKS.find((e) => e.type === type)?.reg ?? '';

  const toast = useToast();

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
        setImageUploading(true);
        const uris = await upload({ data: formData });
        //const ImgHash = resFile.data.IpfsHash;
        //// console.log(ImgHash);
        mimetypes.includes('pdf')
          ? setURL('https://ipfs.io/ipfs/' + uris[0].slice(7))
          : setImage('https://ipfs.io/ipfs/' + uris[0].slice(7));
        setImageUploading(false);
      } catch (error) {
        alert('Error sending File to IPFS, Please check your network and Try Again');
        setImageUploading(false);
        //// console.log(error);
      }
    }
  };

  return (
    <>
      <Accordion
        allowToggle
        allowMultiple={false}
        borderRadius={10}
        minWidth={notMobile ? 'md' : 'xs'}
        size="lg"
        backgroundColor={colorMode === 'dark' ? 'whiteAlpha.100' : 'blackAlpha.100'}
        display={'flex'}
        flexGrow={1}>
        <AccordionItem border={0} borderRadius={10} width={'100%'}>
          {({ isExpanded }) => (
            <>
              <AccordionButton
                minWidth={notMobile ? 'md' : 'xs'}
                as={Button}
                height={'52px'}
                _expanded={{ bgColor: 'blackAlpha.50' }}>
                <Flex
                  gap={2}
                  alignItems={'center'}
                  textAlign="left"
                  width={notMobile ? '100%' : '100%'}>
                  <DragHandle />
                  {icon}
                  <Stack display={'flex'} flex={1} gap={0}>
                    <Text fontWeight={'bold'} m={0}>
                      {_title.length > 20 ? _title.slice(0, 20) + ' ...' : _title}
                    </Text>
                    <Text fontSize="xs" mt={'0px !important'}>
                      {capFirstLetter(type)}
                    </Text>
                  </Stack>
                  <AccordionIcon />
                </Flex>
              </AccordionButton>

              <AccordionPanel pb={4} minWidth="100%">
                <Stack gap={4}>
                  <Input
                    size="lg"
                    value={_title}
                    variant="filled"
                    mt={2}
                    placeholder={`Enter ${capFirstLetter(type)} Title/Heading`}
                    fontWeight="bold"
                    onChange={(e) => setTitle(e.currentTarget.value)}
                    //onChange={(e) => setUrl(title.toLowerCase(),e.currentTarget.value)}
                  />

                  {isExpanded &&
                    (type.includes('link') ||
                      type.includes('video') ||
                      type.includes('tweet') ||
                      type.includes('soundcloud')) && (
                      <>
                        <InputGroup mt={2}>
                          <Input
                            size="lg"
                            value={_url}
                            placeholder={`Enter ${capFirstLetter(type)} URL`}
                            onChange={(e) => setURL(e.currentTarget.value)}
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
                                aria-label="paste-url"
                                mr={2}
                                onClick={() =>
                                  navigator.clipboard.readText().then((text) => setURL(text))
                                }>
                                <RiFileCopy2Line />
                              </IconButton>
                            </Tooltip>
                          </InputRightElement>
                        </InputGroup>
                        {EXAMPLE_LINK_URLS[type.toLowerCase().replace(' ', '')] && (
                          <Box pt={2}>
                            <Text>Example {capFirstLetter(type)}</Text>
                            <Text color={'gray'}>
                              {EXAMPLE_LINK_URLS[type.toLowerCase().replace(' ', '')]}
                            </Text>
                          </Box>
                        )}
                        {(type.includes('soundcloud') || type.includes('youtube')) && RegExp(reg, 'i').test(_url) && (
                          <SelectSizeButton
                            options={['sm', 'md', 'lg']}
                            value={String(_styles?.size)}
                            setValue={(e: any) => setStyles({ ..._styles, size: e })}
                            title="Size"
                          />
                        )}
                      </>
                    )}

                  {isExpanded &&
                    (type.includes('youtube') ||
                      type.includes('tweet') ||
                      type.includes('soundcloud')) &&
                    RegExp(reg).test(_url) && (
                      <Link
                        type={type}
                        title={_title}
                        url={_url}
                        styles={_styles}
                        content={_content}
                        image={_image}
                      />
                    )}

                  {isExpanded && type.indexOf('image') >= 0 && (
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

                  {isExpanded && type.indexOf('pdf') >= 0 && (
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

                  {isExpanded && type.indexOf('simple link') >= 0 && (
                    <>
                      <IconPicker
                        value={_styles?.icon}
                        setValue={(e: any) => setStyles({ ..._styles, icon: e })}
                      />
                    </>
                  )}

                  {(type.includes('simple link') ||
                    type.includes('image') ||
                    type.includes('pdf')) && (
                    <>
                      {/* <SelectSizeButton
                        options={[true, false]}
                        value={String(_styles?.popup) ?? false}
                        setValue={(e: any) => setStyles({ ..._styles, popup: e })}
                        title="Open In Pop Up"
                      /> */}
                      {(_image || _url) && (
                        <Link
                          type={type}
                          key={type === 'simple link' ? _title + '-' +String(_styles?.icon) : _title + '-' +type}
                          title={_title ? _title : capFirstLetter(type)}
                          icon={<LinkIcon key={type === 'simple link' ? _title + '-' +String(_styles?.icon) : _title + '-' +type} type={type === 'simple link' ? String(_styles?.icon) : type} line={lineIcons} size={_styles?.size === 'sm' ? '24px' : _styles?.size === 'lg' ? '36px' : '28px'}/>}
                          url={String(_url)}
                          image={String(_image)}
                          styles={_styles}
                        />
                      )}
                    </>
                  )}

                  {isExpanded && type.indexOf('nft') >= 0 && (
                    <>
                      {_content && (
                        <>
                          <SelectSizeButton
                            options={['sm', 'md', 'lg']}
                            value={String(_styles?.size)}
                            setValue={(e: any) => setStyles({ ..._styles, size: e })}
                            title="Size"
                          />
                          <SelectSizeButton
                            options={[true, false]}
                            value={String(_styles?.scanLink)}
                            setValue={(e: any) => setStyles({ ..._styles, scanLink: e })}
                            title="Explorer Link"
                          />
                          <Flex gap={2} width={'100%'}>
                            {String(_styles?.network).includes('venom') ? (
                              <Button
                                flexGrow={1}
                                variant={_url.includes(VENTORY_NFT) ? 'outline' : 'solid'}
                                onClick={() =>
                                  setURL(_url.length > 0 ? '' : VENTORY_NFT + String(_content))
                                }>
                                {_url.length > 0 ? 'Remove Link' : 'Link To Ventory'}
                              </Button>
                            ) : (
                              <Button
                                flexGrow={1}
                                variant={_url.includes(OPENSEA_URL) ? 'outline' : 'solid'}
                                onClick={() =>
                                  setURL(
                                    _url.length > 0
                                      ? ''
                                      : OPENSEA_URL +
                                          _styles?.network +
                                          JSON.parse(String(_content)).address
                                  )
                                }>
                                {_url.length > 0 ? 'Remove Link' : 'Link To Opensea'}
                              </Button>
                            )}
                          </Flex>
                          <NftLink
                            url={String(_image)}
                            link={_url}
                            title={_title}
                            styles={_styles}
                            address={String(_content)}
                            alt={_title}
                            color={colorMode === 'light' ? 'dark' : 'white'}
                          />
                        </>
                      )}
                    </>
                  )}

                  {isExpanded && type.indexOf('text') >= 0 && (
                    <Textarea
                      minWidth="xs"
                      my={4}
                      rows={5}
                      maxLength={500}
                      placeholder={'Simple Text ...'}
                      size="lg"
                      bg={colorMode === 'dark' ? 'whiteAlpha.100' : 'blackAlpha.100'}
                      variant="outline"
                      border="none"
                      resize={'none'}
                      value={_content}
                      onChange={(e) => setContent(e.currentTarget.value)}
                    />
                  )}

                  {isExpanded && (type.includes('donate') || type.includes('pay')) && (
                    <>
                      <WalletInput
                        title="Venom"
                        value={String(_styles?.venom)}
                        setValue={(e: any) => setStyles({ ..._styles, venom: e })}
                      />
                      <WalletInput
                        title="Ethereum"
                        value={String(_styles?.eth)}
                        setValue={(e: any) => setStyles({ ..._styles, eth: e })}
                      />
                      <WalletInput
                        title="Bitcoin"
                        value={String(_styles?.btc)}
                        setValue={(e: any) => setStyles({ ..._styles, btc: e })}
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
                        value={_content}
                        onChange={(e) => setContent(e.currentTarget.value)}
                      />
                    </>
                  )}

                  <Flex gap={2} width={'100%'}>
                    <Button
                      color="white"
                      bgColor="var(--venom1)"
                      isDisabled={
                        _url === url &&
                        _title === title &&
                        _image === image &&
                        _content === content &&
                        _styles === styles
                      }
                      onClick={() => {
                        if (new RegExp(reg, 'i').test(url)) {
                          setUrl(ind, _title, _url, _image, _content, _styles);
                        } else {
                          toast({
                            status: 'warning',
                            title: 'Invalid URL',
                            description: 'Please enter the url in the required format',
                            duration: 3000,
                          });
                        }
                      }}>
                      Save
                    </Button>
                    <Button onClick={() => removeUrl(ind)}>Remove</Button>
                  </Flex>
                </Stack>
              </AccordionPanel>
            </>
          )}
        </AccordionItem>
      </Accordion>
    </>
  );
}
