import {
  Button,
  Tooltip,
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
  Alert,
  AlertIcon,
  Box,
  AlertTitle,
  AlertDescription,
  Flex,
  Link,
  useMediaQuery,
  useClipboard,
  IconButton,
  Image,
  useToast,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { capFirstLetter, truncAddress } from 'core/utils';
import { MIN_FEE, OASIS_NFT, TLD, VENOMART_NFT, VENOMSCAN_NFT, VID_IMAGE_API } from 'core/utils/constants';
import { LinkIcon, VenomScanIcon } from 'components/logos';
import { Address, Transaction } from 'everscale-inpage-provider';

import { RiCheckDoubleFill, RiFileCopyLine } from 'react-icons/ri';
import { useTranslate } from 'core/lib/hooks/use-translate';
import TargetAddress from 'components/manage/TargetAddress';
import { useAtom, useAtomValue } from 'jotai';
import { targetAtom } from 'core/atoms';
import { useVenomProvider } from 'venom-react-hooks';
import { getNft } from 'core/utils/nft';
import { BaseNftJson } from 'core/utils/reverse';
import ImageBox from './ImageBox';

interface Props {
  name: string;
  image: string;
  address: string;
  open: boolean;
  _onClose: Function;
}

export default function MintSuccessModal({ name, image, address, open, _onClose }: Props) {
  const target = useAtomValue(targetAtom);
  const lightMode = useColorMode().colorMode === 'light';
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { t } = useTranslate();
  const { onCopy, hasCopied } = useClipboard(String(address));
  //const [step, setStep] = useState(0);
  const nftAddress = address;

  const close = () => {
    onClose();
    _onClose();
  };

  useEffect(() => {
    if (open) {
      onOpen();
    } else {
      onClose();
    }
  }, [open]);

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={close}
        isCentered
        size={['full', 'full', '2xl']}
        scrollBehavior="outside">
        <ModalOverlay bg="blackAlpha.700" backdropFilter="auto" backdropBlur={'6px'} />
        <ModalContent bg={lightMode ? 'var(--white)' : 'var(--dark1)'}>
          <ModalHeader textAlign={'center'} display={'flex'} gap={2} justifyContent={'center'}>
            <LinkIcon type={'RiCheckboxCircleFill'} color={'var(--venom1)'} size={'32px'} /> Mint
            Successful{' '}
          </ModalHeader>
          <ModalBody display={'flex'} justifyContent={'center'} alignContent={'center'} w={'100%'}>
            <Flex direction={'column'} maxW={'100%'} justify={'center'} align={'center'} gap={8}>
              {/* <Text fontSize={'lg'}>{message.msg}</Text> */}
              <ImageBox srcUrl={image} rounded="lg" size={['xs', 'md', 'lg', 'xl']} />
              <Flex align={'center'} width={'100%'} minW={['xs', 'md', 'lg', 'xl']} gap={4}>
                <Flex gap={1} flexDirection={'column'} w={'100%'} textAlign={'center'}>
                  <Text fontSize={['xl']} fontWeight={'bold'}>
                    {name}
                  </Text>
                  <Text fontSize={'lg'} fontWeight={'normal'}>
                    {' '}
                    {truncAddress(nftAddress)}
                  </Text>
                </Flex>
              </Flex>
              
                <Button
                  as={Link}
                  href={OASIS_NFT + nftAddress}
                  target="_blank"
                  onClick={onCopy}
                  style={{ textDecoration: 'none' }}
                  minW={'xs'}
                  bgGradient={'linear(to-r, var(--venom1), var(--venom2))'}
                    color={'white'}
                  variant={'ghost'}
                  gap={2}
                  aria-label={`view-on-explorer-icon`}>
                  <LinkIcon type={'https://ipfs.io/ipfs/QmNXPY57PSu72UZwoDyXsmHJT7UQ4M9EfPcyZwpi3xqMQV/oasisgallery.svg.svg'} size={'sm'}/> View on Oasis Gallery
                </Button>
                <Button
                  as={Link}
                  href={VENOMART_NFT + nftAddress}
                  target="_blank"
                  onClick={onCopy}
                  style={{ textDecoration: 'none' }}
                  minW={'xs'}
                  bgGradient={'linear(to-r, var(--venom1), var(--venom2))'}
                    color={'white'}
                  variant={'ghost'}
                  gap={2}
                  aria-label={`view-on-explorer-icon`}>
                  <LinkIcon type={!lightMode ? 'https://ipfs.io/ipfs/QmXd1mZJerqR8SbgwLpBkFeMPwRx2DWP67EGX4TYXHg1Dx/S5ZuI6i9_400x400.jpg' : 'https://ipfs.io/ipfs/QmVBqPuqcH8VKwFVwoSGFHXUdG6ePqjmhEoNaQMsfd2xau/venomart.jpg'} size={'sm'}/> View on VenomArt
                </Button>
                <Button
                  as={Link}
                  href={VENOMSCAN_NFT + nftAddress}
                  target="_blank"
                  onClick={onCopy}
                  style={{ textDecoration: 'none' }}
                  minW={'xs'}
                  bgGradient={'linear(to-r, var(--venom1), var(--venom2))'}
                    color={'white'}
                  variant={'ghost'}
                  gap={2}
                  aria-label={`view-on-explorer-icon`}>
                  <LinkIcon type="venomscan" size={22} /> View on VenomScan
                </Button>
                  
                <Button minW={'xs'} onClick={close}>Done</Button>
              
            </Flex>
          </ModalBody>
          <ModalFooter p={6} justifyContent={'center'} w={'100%'}>
            <Flex justifyContent={'center'} w={['100%', '100%', 'lg', 'xl']}>
              
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
