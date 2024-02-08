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
import {  MIN_FEE, VENOMSCAN_NFT, VID_IMAGE_API } from 'core/utils/constants';
import { LinkIcon, VenomScanIcon } from 'components/logos';
import { Address, Transaction } from 'everscale-inpage-provider';

import {
  RiCheckDoubleFill,
  RiFileCopyLine,
  RiSettings3Line,
  RiShieldCheckFill,
} from 'react-icons/ri';
import { useTranslate } from 'core/lib/hooks/use-translate';
import { Avatar } from 'components/Profile';
import VIDImage from './VIDImage';
import { renderToStaticMarkup } from 'react-dom/server';
import ImageBox from './ImageBox';
import TargetAddress from 'components/manage/TargetAddress';
import DomainAbi from 'abi/Domain.abi.json';
import { useAtom, useAtomValue } from 'jotai';
import {
  avatarAtom,
  bioAtom,
  linksArrayAtom,
  socialsArrayAtom,
  subtitleAtom,
  targetAtom,
  titleAtom,
  walletsArrayAtom,
} from 'core/atoms';
import {
  BioTextInput,
  EditAvatar,
  ManageLinks,
  ManageSocials,
  ManageWallets,
  TitleInput,
} from 'components/manage';
import CropAvatar from 'components/manage/CropAvatar';
import { useConnect, useVenomProvider } from 'venom-react-hooks';
import { useStorageUpload } from '@thirdweb-dev/react';

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
  const [isSaving,setIsSaving] = useState(false);
  const [isConfirming,setIsConfirming] = useState(false);
  const [jsonUploading,setJsonUploading] = useState(false);
  const [jsonHash,setJsonHash] = useState('');
  const [avatar,setAvatar] = useAtom(avatarAtom);
  const [title,setTitle] = useAtom(titleAtom);
  const [subtitle,setSubtitle] = useAtom(subtitleAtom);
  const nftAddress = message.link;
  const { provider } = useVenomProvider();
  const toast = useToast();
  const { mutateAsync: upload } = useStorageUpload();
  const { account } = useConnect();


  const handleSave = async () => {
    if(jsonHash === ''){
      uploadJson();
    } ;
  };

  // const vidimage = renderToStaticMarkup(<VIDImage name={claimedName} key={claimedName}/>);
  // const vidbase64 = "data:image/svg+xml;base64," + btoa(vidimage);

  const getJson = () => {
    

    const data = {
      name: name,
      title: title,
      subtitle: subtitle,
      avatar: avatar,
      avatarShape: 'round',
      venomAddress: target,
      // btcAddress: btc,
      // ethAddress: eth,
    };

    return data;
  };

  const uploadJson = async () => {
    const data = JSON.stringify(getJson());

    // console.log(data);

    try {
      setJsonUploading(true);
      toast({
        status: 'loading',
        title: 'Preparing',
        description: 'Wrapping Profile to save to the blockchain',
        isClosable: true,
      });
      const uris = await upload({ data: [data] });
      setJsonUploading(false);
      saveVid(uris[0].slice(7));
      //Take a look at your Pinata Pinned section, you will see a new file added to you list.
    } catch (error) {
      setJsonUploading(false);
      toast.closeAll();
      toast({
        status: 'warning',
        title: 'Error in uploading to IPFS',
        description:
          'check your network and Try Again, If the problem presists, please send a message to venomidapp@gmail.com',
        isClosable: true,
      });

      // console.log(error);
      return;
    }
  };

  async function saveVid(_jsonHash: string) {

    if (!provider) {
      toast({
        status: 'info',
        title: 'Provider Not Ready',
        description:
          'Please wait a few seconds and try again, Your Wallet Provider is not ready, yet',
      });
      return;
    }

    if (provider.isInitialized && account) {
      setIsSaving(true);
      toast({
        status: 'loading',
        title: 'saving venom id profile to the blockchain',
        description: 'Please confirm the transaction in your wallet',
        duration: null,
        isClosable: true,
      });
      const tvmCell = await provider.packIntoCell({
        data : {ipfsdata : String(_jsonHash)},
        structure : [{ name: 'ipfsdata', type: 'string' }] as const
      });
      console.log(tvmCell);

      const nftContract = new provider.Contract(DomainAbi, new Address(nftAddress));

      // @ts-ignore: Unreachable code error
      const saveTx = await nftContract.methods.setRecord({ key: 33, value: tvmCell.boc }).send({
          amount: String(MIN_FEE),
          bounce: true,
          from: account?.address,
        })
        .catch((e: any) => {
          if (e.code === 3) {
            // rejected by a user
            setIsSaving(false);
            toast.closeAll();
            return Promise.resolve(null);
          } else {
            setIsSaving(false);
            toast.closeAll();
            // console.log(e);
            return Promise.reject(e);
          }
        });

      if (saveTx) {
        setIsConfirming(true);
        toast.closeAll();
        toast({
          status: 'loading',
          title: 'confirming changes on the blockchain',
          description: 'Please wait a few moments while your changes are saved',
          duration: null,
          isClosable: true,
        });
        let receiptTx: Transaction | undefined;
        const subscriber = provider && new provider.Subscriber();
        if (subscriber)
          await subscriber
            .trace(saveTx)
            .tap((tx_in_tree: any) => {
              console.log(tx_in_tree);
              if (tx_in_tree.account.equals(nftAddress)) {
                toast.closeAll();
                toast({
                  status: 'success',
                  title: 'Save Successful',
                  description:
                    name +
                    ' Profile Saved Successfuly',
                  duration: 10000,
                  isClosable: true,
                });
                setJsonHash(_jsonHash);
              }
            })
            .finished();

        setIsSaving(false);
        setIsConfirming(false);
      }
    }
  }


  useEffect(() => {
    if (message.msg.length > 0 && message.type == 'success' && !isOpen) {
      onOpen();
      setAvatar('');
      setTitle('');
      setSubtitle('');
    }
  }, [message]);

  useEffect(() => {
    console.log('target is', target);
  }, [target]);

  return (
    <>
      {message.type === 'success' && (
        <Modal isOpen={isOpen} onClose={onClose} isCentered size={'full'} scrollBehavior="outside">
          <ModalOverlay bg="blackAlpha.700" backdropFilter="auto" backdropBlur={'6px'} />
          <ModalContent bg={lightMode ? 'var(--white)' : 'var(--dark1)'}>
            <ModalHeader textAlign={'center'}>🎉 {message.title}</ModalHeader>
            <ModalBody
              display={'flex'}
              justifyContent={'center'}
              alignContent={'center'}
              w={'100%'}>
              <Flex
                direction={'column'}
                maxW={'container.md'}
                justify={'center'}
                align={'center'}
                gap={8}>
                {/* <Text fontSize={'lg'}>{message.msg}</Text> */}
                {avatar !== '' ? 
                <ImageBox srcUrl={avatar} key={claimedName} size={'250px'} rounded='lg' shadow='none'/>
                                      :
                <LinkIcon type={'RiCheckboxCircleFill'} color={'var(--venom1)'} size={120} />}
                <Flex align={'center'} width={'100%'} minW={['xs','sm','md','lg']} gap={4}>
                  <Flex gap={1} flexDirection={'column'} w={'100%'}>
                    <Text fontSize={['xl']} fontWeight={'bold'}>
                      {claimedName}.vid
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
                
                    {target === '' && <TargetAddress nftAddress={nftAddress} />}
                    {target !== '' && <EditAvatar />}
                    <CropAvatar />
                    {target !== '' && <TitleInput />}
                 
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
              <Flex justifyContent={'space-between'} w={['100%', '100%', 'md', 'lg']}>
                <Button onClick={onClose}>Close</Button>
                {jsonHash === '' ? <Button
                  isDisabled={title === '' || avatar === ''}
                  bgGradient={
                    lightMode
                      ? 'linear(to-r, var(--venom1), var(--bluevenom1))'
                      : 'linear(to-r, var(--venom2), var(--bluevenom2))'
                  }
                  onClick={handleSave}
                  _hover={{
                    bgGradient: lightMode
                      ? 'linear(to-r, var(--venom0), var(--bluevenom0))'
                      : 'linear(to-r, var(--venom0), var(--bluevenom0))',
                  }}>
                  Save Profile
                </Button> : <Link
                  href={'manage/' + message.link}
                  target="_blank"
                  id={`venom-id-manage-nft-link`}>
                    <Button
                  isDisabled={title === ''}
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
                  Continue Customizing
                </Button></Link>}
              </Flex>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  );
}
