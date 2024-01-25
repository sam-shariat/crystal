import {
  Box,
  Button,
  Flex,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Progress,
  SimpleGrid,
  Text,
  Tooltip,
  useColorMode,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { AVAILABLE_LINKS, EXAMPLE_LINK_URLS, IPFS_IO_URL } from 'core/utils/constants';
import SelectSizeButton from './SelectSizeButton';
import { Styles } from 'types';
import { capFirstLetter } from 'core/utils';
import { useEffect, useState } from 'react';
import { LinkIcon } from 'components/logos';
import { useStorageUpload } from '@thirdweb-dev/react';
import { useAtom } from 'jotai';
import { uploadedImages } from 'core/atoms';

interface Props {
  type: string;
  setUrl?: any;
  setImage?: any;
  galleryItems?: number;
  image?: string;
}

export default function ManageUpload({ type, setImage, setUrl, galleryItems = 3, image }: Props) {
  const toast = useToast();
  const [progress, setProgress] = useState({ progress: 0, total: 0 });
  const [localImages, setLocalImages] = useAtom(uploadedImages);
  const [images, setImages] = useState<string[]>();
  const [images0, setImages0] = useState<string[]>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode } = useColorMode();

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

  const imageFileSelect = buildFileSelector(
    'image/x-png,image/png,image/gif,image/jpeg,image/svg+xml'
  );
  const pdfFileSelect = buildFileSelector('application/pdf');
  const {
    mutateAsync: upload,
    isLoading,
    isSuccess,
  } = useStorageUpload({
    onProgress(event) {
      setProgress(event);
    },
  });

  const sendproFileToIPFS = async (e: any, mimetypes: string) => {
    if (e) {
      try {
        const formData = [e];
        //// console.log('uploading file to ipfs');
        const uris = await upload({ data: formData });
        //const ImgHash = resFile.data.IpfsHash;
        //// console.log(ImgHash);
        mimetypes.includes('pdf')
          ? setUrl(IPFS_IO_URL + uris[0].slice(7))
          : setImage(IPFS_IO_URL + uris[0].slice(7));

        setImages((imgs) =>
          imgs && imgs.length > 0 ? [uris[0].slice(7), ...imgs] : [uris[0].slice(7)]
        );
      } catch (error) {
        toast({
          status: 'warning',
          title: 'Error in uploading to IPFS',
          description:
            'Please check your network and Try Again, If the problem presists, please send a message to venomidapp@gmail.com',
          isClosable: true,
        });
        //// console.log(error);
      }
    }
  };

  useEffect(() => {
    if (localImages.length > 0) {
      const _images = JSON.parse(Buffer.from(localImages, 'base64').toString());
      if (_images && _images.length > 0) {
        setImages0(_images);
        setImages(_images);
      }
    }
  }, [localImages]);

  useEffect(() => {
    if (images && images.length > 0 && images.length !== images0?.length) {
      const _localImagesB64 = Buffer.from(JSON.stringify(images)).toString('base64');
      console.log('saving nwq');
      if (_localImagesB64 !== localImages) {
        setLocalImages(_localImagesB64);
      }
    }
  }, [images]);

  return (
    <Flex flexDirection="column" gap={4}>
      {images &&
        type.includes('image') &&
        (images.length > galleryItems ? (
          <Button onClick={onOpen} w={'100%'} size={'lg'} height={'60px'}>
            Select Image From Uploads
          </Button>
        ) : (
          <Flex gap={4} flexDir={'column'}>
            <Text fontWeight={'bold'} fontSize={'lg'}>
            Select Image From Uploads
            </Text>
            <SimpleGrid gap={4} columns={3}>
              {images.map(
                (img) =>
                  img.length > 1 && (
                    <Button
                      onClick={() => setImage(IPFS_IO_URL + img)}
                      key={'image-' + img}
                      borderRadius={12}
                      width={'100%'}
                      border={IPFS_IO_URL + img === image ? 'solid 1px' : 'none'}
                      p={4}
                      h={'auto'}
                      minH={'100px'}>
                      <Image
                        borderRadius={12}
                        position={'relative'}
                        width={'100%'}
                        height={'auto'}
                        transition={'ease'}
                        transitionDuration={'1000'}
                        alt={'image gallery item'}
                        src={IPFS_IO_URL + img}
                      />
                    </Button>
                  )
              )}
            </SimpleGrid>
          </Flex>
        ))}
      {type.includes('image') ? (
        <Button
          size="lg"
          isDisabled={isLoading}
          isLoading={isLoading}
          height={'56px'}
          loadingText={'Uploading Image ...'}
          gap={2}
          onClick={() => imageFileSelect !== undefined && imageFileSelect.click()}>
          <LinkIcon type="RiUploadCloudLine" size="24" />
          {isSuccess ? 'Uploaded Image' : 'Upload Image'}
        </Button>
      ) : (
        <Button
          size="lg"
          height={'56px'}
          isDisabled={isLoading}
          isLoading={isLoading}
          loadingText={'Uploading Document ...'}
          gap={2}
          onClick={() => pdfFileSelect !== undefined && pdfFileSelect.click()}>
          <LinkIcon type="RiUploadCloudLine" size="24" />{' '}
          {isSuccess ? 'Uploaded Document' : 'Upload Document'}
        </Button>
      )}
      {progress.total > 0 && (
        <Progress
          sx={{
            '& > div:first-of-type': {
              transitionProperty: 'width',
              background: 'linear-gradient(to right, #2bb673 10%, #10a9b6 90%)',
            },
          }}
          size={'xs'}
          min={0}
          max={progress.total}
          rounded={'full'}
          mt={-5}
          width={'100%'}
          value={progress.progress}
          isAnimated
        />
      )}

      <Modal isOpen={isOpen} onClose={onClose} isCentered size={'lg'} scrollBehavior="inside">
        <ModalOverlay bg="blackAlpha.700" backdropFilter="auto" backdropBlur={'6px'} />
        <ModalContent bg={colorMode === 'dark' ? 'var(--dark1)' : 'var(--white)'} h={'660px'}>
          <ModalHeader display="flex" gap={4} flexDir={'column'}>
            Select Image From Uploads
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SimpleGrid gap={4} columns={3}>
              {images && images.map(
                (img) =>
                  img.length > 1 && (
                    <Button
                      onClick={() => {setImage(IPFS_IO_URL + img); onClose()}}
                      key={'image-' + img}
                      borderRadius={12}
                      width={'100%'}
                      p={4}
                      h={'auto'}
                      minH={'100px'}>
                      <Image
                        borderRadius={12}
                        position={'relative'}
                        width={'100%'}
                        height={'auto'}
                        transition={'ease'}
                        transitionDuration={'1000'}
                        alt={'image gallery item'}
                        src={IPFS_IO_URL + img}
                      />
                    </Button>
                  )
              )}
            </SimpleGrid>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
