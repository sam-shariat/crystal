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
import {  MIN_FEE, TLD, VENOMSCAN_NFT, VID_IMAGE_API } from 'core/utils/constants';
import { LinkIcon, VenomScanIcon } from 'components/logos';
import { Address, Transaction } from 'everscale-inpage-provider';

import {
  RiCheckDoubleFill,
  RiFileCopyLine,
} from 'react-icons/ri';
import { useTranslate } from 'core/lib/hooks/use-translate';
import TargetAddress from 'components/manage/TargetAddress';
import { useAtom, useAtomValue } from 'jotai';
import {
  targetAtom,
} from 'core/atoms';
import { useVenomProvider } from 'venom-react-hooks';
import { getNft } from 'core/utils/nft';
import { BaseNftJson } from 'core/utils/reverse';

interface Props {
  message: any;
  claimedName: string;
}

export default function ClaimModal({ message, claimedName }: Props) {
  const target = useAtomValue(targetAtom);
  const lightMode = useColorMode().colorMode === 'light';
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { t } = useTranslate();
  const { onCopy, hasCopied } = useClipboard(String(message.link));
  //const [step, setStep] = useState(0);
  const nftAddress = message.link;
  const [nftData,setNftData] = useState<BaseNftJson | null>(null);
  const { provider } = useVenomProvider();


  useEffect(() => {
    async function getNftData() {
      if(!provider || !isOpen) return;
      const _nftData = await getNft(provider, message.link);
      setNftData(_nftData);
      console.log(_nftData)
    }


    if (message.msg.length > 0 && message.type == 'success' && !isOpen) {
      onOpen();
    }

    
    getNftData();
    

  }, [message,provider]);


  return (
    <>
      {message.type === 'success' && (
        <Modal isOpen={isOpen} onClose={onClose} isCentered size={['full','full','2xl']} scrollBehavior="outside">
          <ModalOverlay bg="blackAlpha.700" backdropFilter="auto" backdropBlur={'6px'} />
          <ModalContent bg={lightMode ? 'var(--white)' : 'var(--dark1)'}>
            <ModalHeader textAlign={'center'} display={'flex'} gap={2} justifyContent={'center'}><LinkIcon type={'RiCheckboxCircleFill'} color={'var(--venom1)'} size={'32px'} /> {message.title}</ModalHeader>
            <ModalBody
              display={'flex'}
              justifyContent={'center'}
              alignContent={'center'}
              w={'100%'}>
              <Flex
                direction={'column'}
                maxW={'100%'}
                justify={'center'}
                align={'center'}
                gap={8}>
                {/* <Text fontSize={'lg'}>{message.msg}</Text> */}
                
                <Flex align={'center'} width={'100%'} minW={['xs','md','lg','xl']} gap={4}>
                  <Flex gap={1} flexDirection={'column'} w={'100%'}>
                    <Text fontSize={['xl']} fontWeight={'bold'}>
                      {claimedName}.{TLD}
                    </Text>
                    <Text fontSize={'lg'} fontWeight={'normal'}>
                      {' '}
                      {truncAddress(message.link)}
                    </Text>
                  </Flex>
                  <Flex>
                    <Tooltip
                      borderRadius={4}
                      label={<Text p={2}>copy NFT address</Text>}
                      color="white"
                      bgColor={'black'}
                      hasArrow>
                      <IconButton
                        onClick={onCopy}
                        variant={'ghost'}
                        aria-label={`copy-nft-address-icon`}>
                        {hasCopied ? <RiCheckDoubleFill size={22} /> : <RiFileCopyLine size={22} />}
                      </IconButton>
                    </Tooltip>

                    <Tooltip
                      borderRadius={4}
                      label={<Text p={2}>{t('view')}</Text>}
                      color="white"
                      bgColor={'black'}
                      hasArrow>
                      <IconButton
                        as={Link}
                        href={VENOMSCAN_NFT + nftAddress}
                        target="_blank"
                        onClick={onCopy}
                        variant={'ghost'}
                        aria-label={`view-on-explorer-icon`}>
                        <LinkIcon type="venomscan" size={22} />
                      </IconButton>
                    </Tooltip>
                  </Flex>
                </Flex>
                {nftData && <Stack gap={4} w={'100%'}>
                  <Text fontSize={'lg'} textAlign={'left'}>Expires On {new Date(Number(nftData.expire_time) * 1000).toLocaleString()}</Text>
                </Stack>}
                
                    <TargetAddress nftAddress={nftAddress} />
                    {/* {target !== '' && <EditAvatar />}
                    <CropAvatar />
                    {target !== '' && <TitleInput />} */}
                 
                {/* {step === 1 && <BioTextInput />}
                {step === 2 && (
                  <ManageWallets json={{ wallets: { venom: target } }} nftAddress={nftAddress} />
                )}
                {step === 3 && <ManageSocials json={{ socials: {} }} nftAddress={nftAddress} />}
                {step === 4 && <ManageLinks json={{ links: [] }} nftAddress={nftAddress} />} */}
                {/* {step === 5 && <Text> </Text>} */}
                {/* <Link
                  href={'manage/' + message.link}
                  target="_blank"
                  id={`venom-id-manage-nft-link`}>
                  <Button width={'100%'} height={'54px'} colorScheme="green" variant={'solid'}>
                    <Flex
                      gap={2}
                      width={'100%'}
                      alignItems={'center'}
                      justifyContent={'space-between'}>
                      <Stack gap={1} p={1}>
                        <Text textAlign={'left'}>{t('manage')} link</Text>
                        <Text
                          display={'flex'}
                          fontSize={'sm'}
                          gap={1}
                          color={colorMode === 'dark' ? 'gray.800' : 'gray.200'}>
                          continue adding your links
                        </Text>
                      </Stack>
                      <RiSettings3Line size={'30px'} />
                    </Flex>
                  </Button>
                </Link> */}
              </Flex>
            </ModalBody>
            <ModalFooter p={6} justifyContent={'center'} w={'100%'}>
              <Flex justifyContent={'space-between'} w={['100%', '100%', 'lg', 'xl']}>
                <Button onClick={onClose}>Close</Button>
                <Link
                  href={'manage/' + message.link}
                  target="_self"
                  id={`venom-id-manage-nft-link`}>
                    <Button
                  
                  bgGradient={
                    lightMode
                      ? 'linear(to-r, var(--venom1), var(--bluevenom1))'
                      : 'linear(to-r, var(--venom2), var(--bluevenom2))'
                  }
                  _hover={{
                    bgGradient: lightMode
                      ? 'linear(to-r, var(--venom0), var(--bluevenom0))'
                      : 'linear(to-r, var(--venom0), var(--bluevenom0))',
                  }}>
                  {target.length < 60 && 'Skip & '}Continue Customizing
                </Button></Link>
              </Flex>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  );
}
