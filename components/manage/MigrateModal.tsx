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
  Stepper,
  useSteps,
  Step,
  StepIndicator,
  StepStatus,
  StepIcon,
  StepNumber,
  StepTitle,
  StepDescription,
  StepSeparator,
  Progress,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { capFirstLetter, truncAddress } from 'core/utils';
import { MIN_FEE, VENOMSCAN_NFT, VID_IMAGE_API } from 'core/utils/constants';
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
import { renderToStaticMarkup } from 'react-dom/server';
import TargetAddress from 'components/manage/TargetAddress';
import DomainAbi from 'abi/Domain.abi.json';
import { useAtom, useAtomValue } from 'jotai';
import {
  avatarAtom,
  bioAtom,
  linksArrayAtom,
  rootContractAtom,
  socialsArrayAtom,
  subtitleAtom,
  targetAtom,
  titleAtom,
  walletsArrayAtom,
} from 'core/atoms';
import CropAvatar from 'components/manage/CropAvatar';
import { useConnect, useVenomProvider } from 'venom-react-hooks';
import { useStorageUpload } from '@thirdweb-dev/react';
import { BaseNftJson } from 'core/utils/nft';
import ImageBox from 'components/claiming/ImageBox';
import { isValidName } from 'ethers/lib/utils';

type nftWithName = {
  name: string;
  address: string;
};

interface Props {
  nft: BaseNftJson;
  avatar?: string;
  nfts: BaseNftJson[] | undefined;
  names: string[] | undefined;
}

const steps = [
  { title: 'Intro', description: 'What is this ?' },
  { title: 'First', description: 'Register Domain' },
  { title: 'Second', description: 'Migrate Profile' },
  { title: 'Third', description: 'Burn Old NFT' },
];

export default function MigrateModal({ nft, names, nfts, avatar }: Props) {
  const target = useAtomValue(targetAtom);
  const name = String(nft.name);
  const nftAddress = String(nft.address) ;
  const _nft = nfts?.find((n) => n.name === name);
  const [notMobile] = useMediaQuery('(min-width: 800px)');
  const rootContract = useAtomValue(rootContractAtom);
  const [nameExists, setNameExists] = useState(false);
  const lightMode = useColorMode().colorMode === 'light';
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { t } = useTranslate();
  //const [step, setStep] = useState(0);
  const [mintedAddress, setMintedAddress] = useState('');
  const [mintedNft, setMintedNft] = useState<BaseNftJson>();
  const [isSaving, setIsSaving] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [jsonHash, setJsonHash] = useState('');
  const { provider } = useVenomProvider();
  const [feeIsLoading, setFeeIsLoading] = useState(false);
  const [isMinting, setIsMinting] = useState(false);
  const toast = useToast();
  const { mutateAsync: upload } = useStorageUpload();
  const { account } = useConnect();
  const { activeStep, goToNext, goToPrevious, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  });

  useEffect(() => {
    async function checkName() {
      if (provider && provider.isInitialized) {
        setFeeIsLoading(true);
        const certificateAddr = await rootContract.methods
          .resolve({ path: name, answerId: 0 })
          .call({ responsible: true });
        console.log(certificateAddr);

        const domainContract = new provider.Contract(DomainAbi, certificateAddr.certificate);
        console.log(domainContract);
        try {
          // @ts-ignore: Unreachable code error
          let result: { status: string | number } = await domainContract.methods.getStatus({ answerId: 0 })
            .call();
          setNameExists(result ? true : false);
        } catch (e) {
          setNameExists(false);
        }
        setFeeIsLoading(false);
      }
    }

    if (isOpen) {
      console.log(names);
      console.log(name);
      if (names?.includes(name)) {
        setMintedAddress(String(_nft?.address));
        setActiveStep(1);
      } else {
        checkName();
      }
    }
  }, [isOpen]);


  useEffect(()=>{
    async function getName() {
      if (provider && provider.isInitialized) {
        setFeeIsLoading(true);
        const certificateAddr = await rootContract.methods
          .resolve({ path: name, answerId: 0 })
          .call({ responsible: true });
        console.log(certificateAddr);

        const domainContract = new provider.Contract(DomainAbi, certificateAddr.certificate);
        console.log(domainContract);
        try {
          // @ts-ignore: Unreachable code error
          let {json} = await domainContract.methods.getJson({ answerId: 0 })
            .call();
            console.log(nft);
            console.log(JSON.parse(json));
            setMintedNft(JSON.parse(json));
        } catch (e) {
          
        }
        setFeeIsLoading(false);
      }
    }
    
    if(activeStep === 2){
      getName();
    }

  },[activeStep])

  async function claimVid(e: string) {
    
      setIsMinting(true);
      toast.closeAll();
      toast({
        status: 'loading',
        colorScheme: !lightMode ? 'light' : 'dark',
        title: t('minting'),
        description: t('confirmInWallet'),
        duration: null,
      });

      // @ts-ignore: Unreachable code error
      const mintTx = await rootContract.methods
        .betaReg({
          path: name,
          domainOwner: account?.address,
        })
        .send({
          from: account?.address!,
          amount: String(55e7),
          bounce: true,
        })
        .catch((e: any) => {
          if (e.code === 3) {
            // rejected by a user
            setIsMinting(false);
            toast.closeAll();
            return Promise.resolve(null);
          } else {
            setIsMinting(false);
            // console.log(e);
            toast.closeAll();
            return Promise.reject(e);
          }
        });

      if (mintTx) {
        toast.closeAll();
        toast({
          status: 'loading',
          title: t('confirming'),
          colorScheme: !lightMode ? 'light' : 'dark',
          description: t('confirmingTx'),
          duration: null,
        });
        //// console.log('mint tx : ', mintTx);
        setIsConfirming(true);
        let receiptTx: Transaction | undefined;
        const subscriber = provider && new provider.Subscriber();
        if (subscriber)
          await subscriber
            .trace(mintTx)
            .tap((tx_in_tree: any) => {
              //console.log('tx_in_tree : ', tx_in_tree);
              if (tx_in_tree.account.equals(rootContract.address)) {
                receiptTx = tx_in_tree;
              }
            })
            .finished();

        
        let events = await rootContract.decodeTransactionEvents({
          transaction: receiptTx as Transaction,
        });

        console.log(events);

        if (events.length !== 1 || events[0].event !== 'NftCreated') {
          toast.closeAll();
          toast({
            status: 'error',
            title: t('error'),
            description: t('commonErrorMsg'),
            isClosable: true,
          });
        } else {
          // @ts-ignore: Unreachable code error
          const nftAddress = String(events[0].data?.nft && events[0].data?.nft?._address);
          setMintedAddress(nftAddress);
          setActiveStep(2);
          toast.closeAll();
        }
        setIsMinting(false);
        setIsConfirming(false);
      } else {
        toast.closeAll();
        toast({
          status: 'error',
          title: t('error'),
          description: t('commonErrorMsg'),
          isClosable: true,
        });
        setIsMinting(false);
        setIsConfirming(false);
      }
    
  }

  const handleSave = async () => {};

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
        data: { ipfsdata: String(_jsonHash) },
        structure: [{ name: 'ipfsdata', type: 'string' }] as const,
      });
      console.log(tvmCell);

      const nftContract = new provider.Contract(DomainAbi, new Address(nftAddress));

      // @ts-ignore: Unreachable code error
      const saveTx = await nftContract.methods.setRecord({ key: 33, value: tvmCell.boc })
        .send({
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
                  description: name + ' Profile Saved Successfuly',
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

  return (
    <>
      <Button
        aria-label="customize-venom-id"
        gap={2}
        onClick={onOpen}
        rounded={'full'}
        variant={'solid'}
        colorScheme="red">
        Migrate
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered size={'4xl'} scrollBehavior="outside">
        <ModalOverlay bg="blackAlpha.700" backdropFilter="auto" backdropBlur={'6px'} />
        <ModalContent bg={lightMode ? 'var(--white)' : 'var(--dark1)'}>
          <ModalHeader textAlign={'center'}>
            migrating from old contract
            <ModalCloseButton />
          </ModalHeader>
          <ModalBody display={'flex'} justifyContent={'center'} w={'100%'} flexDirection={'column'} gap={10} fontSize={'large'}>
            <Flex direction={'column'} gap={2}>
            <Stepper index={activeStep} colorScheme='green'>
              {steps.map((step, index) => (
                <Step key={index}>
                  <StepIndicator>
                    <StepStatus
                      complete={<StepIcon />}
                      incomplete={<StepNumber />}
                      active={<StepNumber />}
                    />
                  </StepIndicator>

                  {notMobile && (
                    <Box flexShrink="0">
                      <StepTitle>{step.title}</StepTitle>
                      <StepDescription>{step.description}</StepDescription>
                    </Box>
                  )}

                  <StepSeparator />
                </Step>
              ))}
            </Stepper>
            {!notMobile && (
              <Text>
                {steps[activeStep].title}: <b>{steps[activeStep].description}</b>
              </Text>
            )}
            </Flex>
            {activeStep === 0 && <Flex py={10} gap={8} direction={'column'}>
              Migration will start at 18:00 UTC on 16 Feb
              </Flex>}

            {activeStep === 1 && <Flex py={10} gap={8} direction={'column'}>
                
                <Text>Register {name} on the new contract</Text><Flex  gap={4} align={'center'} justify={'space-between'}><Button display={'flex'} gap={3} alignItems={'center'} height={'100px'} rounded={'full'}>
                  <Box w={'80px'}> <Avatar url={String(avatar)} maxH={'80px'} noanimate nodrag shape='circle'/></Box>
                  <Stack gap={2}>
                  <Text>{name}</Text>
                  <Text>{truncAddress(nftAddress)}</Text>
                  </Stack>
                </Button> <Button display={'flex'} flexDirection={'column'} gap={2} size={'lg'} height={'68px'} rounded={'full'} bgGradient={
                        lightMode
                          ? 'linear(to-r, var(--venom1), var(--bluevenom1))'
                          : 'linear(to-r, var(--venom2), var(--bluevenom2))'
                      }
                      _hover={{
                        bgGradient:
                        lightMode
                            ? 'linear(to-r, var(--venom0), var(--bluevenom0))'
                            : 'linear(to-r, var(--venom0), var(--bluevenom0))',
                      }} isDisabled={!isValidName(name) || nameExists || isMinting || isConfirming}
                      isLoading={feeIsLoading || isMinting}
                      loadingText={
                        isMinting && !isConfirming
                          ? 'Registering'
                          : isMinting && isConfirming
                          ? t('confirming')
                          : ''
                      }
                      onClick={(e) => claimVid(e.currentTarget.value)}><Text>Register</Text></Button></Flex></Flex>}
            {activeStep === 2 && (
              <Flex gap={8} direction={'column'}>
                
                Migrating Venom ID Profile
                <Flex gap={4} justify={'space-between'} align={'center'}>
                <Button display={'flex'} gap={3} alignItems={'center'} height={'100px'} rounded={'full'}>
                  <Box w={'80px'}> <Avatar url={String(avatar)} maxH={'80px'} noanimate nodrag shape='circle'/></Box>
                  <Stack gap={2}>
                  <Text>{name}</Text>
                  <Text>{truncAddress(nftAddress)}</Text>
                  </Stack>
                </Button>
                <Progress
                isIndeterminate 
                sx={{
                  '& > div:first-of-type': {
                    transitionProperty: 'width',
                    background: 'linear-gradient(to right, #2bb673 10%, #10a9b6 90%)',
                  },
                }}
                size={'xs'}
                width={'100px'}
                isAnimated
              />
                <Button display={'flex'} gap={3} alignItems={'center'} height={'100px'} rounded={'full'}>
                  <Box w={'80px'}> <Avatar url={VID_IMAGE_API + name} maxH={'80px'} noanimate nodrag shape='circle'/></Box>
                  <Stack gap={2}>
                  <Text>{name}</Text>
                  <Text>{truncAddress(mintedAddress)}</Text>
                  </Stack>
                </Button>
                </Flex>
              </Flex>
            )}
            {activeStep === 3 && <Flex gap={4}>Migrating from {name}</Flex>}

            {/* <TargetAddress nftAddress={nftAddress} /> */}
          </ModalBody>
          <ModalFooter p={6} justifyContent={'center'} w={'100%'}></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
