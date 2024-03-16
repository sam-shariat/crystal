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
import { capFirstLetter, openWindow, truncAddress } from 'core/utils';
import {
  EARLY_ADOPTERS_CONTRACT_ADDRESS,
  EARLY_ADOPTER_IMAGES,
  ETHERSCAN_URLS,
  MIN_FEE,
  ROOT_CONTRACT_ADDRESS,
  SITE_URL,
  VENOMSCAN_NFT,
  VID_IMAGE_API,
} from 'core/utils/constants';
import { LinkIcon, VenomScanIcon } from 'components/logos';
import { Address, Transaction } from 'everscale-inpage-provider';

import {
  RiCheckDoubleFill,
  RiCheckboxCircleFill,
  RiExternalLinkLine,
  RiFileCopyLine,
  RiSettings3Line,
  RiShieldCheckFill,
} from 'react-icons/ri';
import { useTranslate } from 'core/lib/hooks/use-translate';
import { Avatar } from 'components/Profile';
import { renderToStaticMarkup } from 'react-dom/server';
import TargetAddress from 'components/manage/TargetAddress';
import DomainAbi from 'abi/Domain.abi.json';
import NftAbi from 'abi/Nft.abi.json';
import { useAtom, useAtomValue } from 'jotai';
import {
  avatarAtom,
  bioAtom,
  earlyAdopterContractAtom,
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
import { getAddressesFromIndex, getNftByIndex, saltCode } from 'core/utils/nft';
import ImageBox from 'components/claiming/ImageBox';
import { isValidName } from 'ethers/lib/utils';
import { BaseNftJson } from 'core/utils/reverse';

type nftWithName = {
  name: string;
  address: string;
};

interface Props {
  nft: BaseNftJson;
}

const steps = [
  { title: 'Intro', description: 'What is this ?' },
  { title: 'Registration', description: 'Register Domain' },
  { title: 'Migration', description: 'Moving Profile' },
  { title: 'Done', description: 'Migration Complete' },
];

export default function MigrateModal({ nft }: Props) {
  const target = useAtomValue(targetAtom);
  const [name, setName] = useState(String(nft.name).toLowerCase());
  const nftAddress = String(nft.address);
  const avatar = String(nft.avatar);
  const [notMobile] = useMediaQuery('(min-width: 800px)');
  const rootContract = useAtomValue(rootContractAtom);
  const [nameExists, setNameExists] = useState(false);
  const lightMode = useColorMode().colorMode === 'light';
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { t } = useTranslate();
  //const [step, setStep] = useState(0);
  const [mintedAddress, setMintedAddress] = useState('');
  const [mintedStrings, setMintedStrings] = useState<string[]>();
  const [mintedNft, setMintedNft] = useState<BaseNftJson>();
  const [minteds, setMinteds] = useState<BaseNftJson[] | undefined>(undefined);
  const [isSaving, setIsSaving] = useState(false);
  const [migrationStatus, setMigrationStatus] = useState(0);
  const [isConfirming, setIsConfirming] = useState(false);
  const [jsonHash, setJsonHash] = useState('');
  const [oldHash, setOldHash] = useState('');
  const { provider } = useVenomProvider();
  const [burned, setBurned] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMinting, setIsMinting] = useState(false);
  const [isBurning, setIsBurning] = useState(false);
  const earlyAdopterContract = useAtomValue(earlyAdopterContractAtom);
  const toast = useToast();
  const { account } = useConnect();
  const { activeStep, goToNext, goToPrevious, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  });

  const getJson = (name: string, image: string, imageType: string = 'image/svg') => {
    const _json = {
      type: 'OAT',
      name: name,
      description:
        name +
        ' OAT (On-Chain Achievement Token) is a badge to record your on-chain and off-chain activities from the Venom ID Early Adopter Program Collection',
      preview: {
        source: image,
        mimetype: imageType,
      },
      files: [
        {
          source: image,
          mimetype: imageType,
        },
      ],
      external_url: SITE_URL,
    };

    console.log(_json);
    return _json;
  };

  const loadMinteds = async () => {
    if (!provider || !provider.isInitialized) return;
    setIsLoading(true);
    setMinteds([]);
    setMintedStrings([]);
    const saltedCode = await saltCode(
      provider,
      String(account?.address),
      EARLY_ADOPTERS_CONTRACT_ADDRESS
    );
    // Hash it
    const codeHash = await provider.getBocHash(String(saltedCode));
    // Fetch all Indexes by hash
    const indexesAddresses = await getAddressesFromIndex(codeHash, provider);
    if (!indexesAddresses || !indexesAddresses.length) {
      setIsLoading(false);
      return;
    }
    // Fetch all nfts
    indexesAddresses.map(async (indexAddress) => {
      try {
        const _nftJson = await getNftByIndex(provider, indexAddress);
        setMintedStrings((ss) => [...(ss ? ss : []), String(_nftJson.name)]);
        setMinteds((nfts) => [...(nfts ? nfts : []), _nftJson]);
      } catch (e: any) {
        console.log('error getting venomid nft ', indexAddress);
      }
    });
    console.log(minteds)
    setIsLoading(false);
  };

  const mintBadge = async (name: string, image: string, imageType: string = 'image/svg') => {
    if (!provider || !provider.isInitialized) {
      toast({
        status: 'info',
        title: t('connectWallet'),
        description: t('venomWalletConnect'),
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsMinting(true);
    toast.closeAll();
    toast({
      status: 'loading',
      title: t('minting'),
      description: t('confirmInWallet'),
      duration: null,
    });

    // @ts-ignore: Unreachable code error
    try {
      const mintTx = await earlyAdopterContract?.methods
        .mintBadge({
          _json: JSON.stringify(getJson(name, image, imageType)),
          _owner: account?.address!,
        })
        .send({
          amount: String(990000000),
          bounce: true,
          from: account?.address.toString(),
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
              //// console.log('tx_in_tree : ', tx_in_tree);
              if (tx_in_tree.account.equals(EARLY_ADOPTERS_CONTRACT_ADDRESS)) {
                receiptTx = tx_in_tree;
              }
            })
            .finished();

        // Decode events by using abi
        // we are looking for event Game(address player, uint8 bet, uint8 result, uint128 prize);

        let events = await earlyAdopterContract.decodeTransactionEvents({
          transaction: receiptTx as Transaction,
        });

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
          const __json = getJson(name, image, imageType) as BaseNftJson;
          __json.address = nftAddress;
          setMintedStrings((s) => [...(s ? s : []), name]);
          setMinteds((nfts) => [...(nfts ? nfts : []), __json]);
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
    } catch (e: any) {
      toast.closeAll();
      toast({
        status: 'error',
        title: t('failed'),
        description: t('commonFailedMsg'),
        isClosable: true,
      });
      console.log(e);
    }
  };

  useEffect(() => {
    async function getName() {
      if (provider && provider.isInitialized) {
        setIsLoading(true);
        const certificateAddr = await rootContract.methods
          .resolve({ path: name, answerId: 0 })
          .call({ responsible: true });

        const domainContract = new provider.Contract(DomainAbi, certificateAddr.certificate);
        //console.log(domainContract);
        try {
          // @ts-ignore: Unreachable code error
          let { json } = await domainContract.methods.getJson({ answerId: 0 }).call();

          // @ts-ignore: Unreachable code error
          let { owner } = await domainContract.methods.getInfo({ answerId: 0 }).call();
          if (account?.address.equals(owner)) {
            setActiveStep(2);
          } else {
            setName(name.slice(0, -4) + '-x.vid');
          }
          setMintedNft(JSON.parse(json));
          setMintedAddress(String(certificateAddr.certificate));
        } catch (e) {
          //console.log(e)
        }
        setIsLoading(false);
      }
    }

    async function checkName() {
      if (provider && provider.isInitialized) {
        setIsLoading(true);
        const certificateAddr = await rootContract.methods
          .resolve({ path: name, answerId: 0 })
          .call({ responsible: true });

        const domainContract = new provider.Contract(DomainAbi, certificateAddr.certificate);

        try {
          // @ts-ignore: Unreachable code error
          let result: { status: string | number } = await domainContract.methods.getStatus({ answerId: 0 })
            .call();
          setNameExists(result ? true : false);
        } catch (e) {
          setNameExists(false);
        }
        setIsLoading(false);
      }
    }

    if (isOpen) {
      if (activeStep === 0){
        setName(String(nft.name).toLowerCase());
      }
      if (activeStep === 1) checkName();
      if (activeStep === 1 || activeStep === 2) getName();
    }
  }, [isOpen, name, activeStep]);

  useEffect(() => {
    console.log(mintedNft)
    if (mintedNft) {
      const ipfsData = nft.attributes?.find((att) => att.trait_type === 'DATA')?.value;
      const ipfsDataNew = mintedNft?.hash;
      setOldHash(String(ipfsData));
      console.log(ipfsData);
      console.log(ipfsDataNew);
      if (ipfsData === ipfsDataNew || ipfsData === '' || ipfsData === jsonHash) {
        setMigrationStatus(1);
      } else {
        if (ipfsDataNew?.includes('not set')) {
          setMigrationStatus(0);
        } else {
          setMigrationStatus(2);
        }
      }

      loadMinteds();
    }
  }, [mintedNft, jsonHash,activeStep, mintedAddress]);

  async function burnVid(){

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
      setIsBurning(true);

      const nftContract = new provider.Contract(NftAbi, new Address(nftAddress));

      // @ts-ignore: Unreachable code error
      const burnTx = await nftContract.methods.burn({ dest: new Address(nftAddress) }).send({
          amount: String(MIN_FEE),
          bounce: true,
          from: account?.address,
        })
        .catch((e: any) => {
          if (e.code === 3) {
            // rejected by a user
            toast.closeAll();
            return Promise.resolve(null);
          } else {
            toast.closeAll();
             console.log(e);
            return Promise.reject(e);
          }
        });

      if (burnTx) {
        toast.closeAll();
        toast({
          status: 'loading',
          title: 'confirming burn on the blockchain',
          description: 'Please wait a few moments while your changes are saved',
          duration: null,
          isClosable: true,
        });
        let receiptTx: Transaction | undefined;
        const subscriber = provider && new provider.Subscriber();
        if (subscriber)
          await subscriber
            .trace(burnTx)
            .tap((tx_in_tree: any) => {
              //console.log('tx_in_tree : ', tx_in_tree);
              if (tx_in_tree.account.equals(nftAddress)) {
                receiptTx = tx_in_tree;
              }
            })
            .finished();

        let events = await rootContract.decodeTransactionEvents({
          transaction: receiptTx as Transaction,
        });

        //console.log(events);

        if (events.length !== 1 || events[0].event !== 'NftBurned') {
          toast.closeAll();
          toast({
            status: 'error',
            title: t('error'),
            description: t('commonErrorMsg'),
            isClosable: true,
          });
        } else {
          // @ts-ignore: Unreachable code error
          toast.closeAll();
                toast({
                  status: 'success',
                  title: 'Burn Successful',
                  description: name + ' Profile Successfuly Burned',
                  duration: 10000,
                  isClosable: true,
                });
                setBurned(true);
        }
        setIsBurning(false);
      } else {
        toast.closeAll();
        toast({
          status: 'error',
          title: t('error'),
          description: t('commonErrorMsg'),
          isClosable: true,
        });
        setIsBurning(false);
      }
    }
  }

  async function claimVid() {

    if (!provider) {
      toast({
        status: 'info',
        title: 'Provider Not Ready',
        description:
          'Please wait a few seconds and try again, Your Wallet Provider is not ready, yet',
      });
      return;
    }

    setIsMinting(true);
    toast.closeAll();
    toast({
      status: 'loading',
      colorScheme: !lightMode ? 'light' : 'dark',
      title: t('minting'),
      description: t('confirmInWallet'),
      duration: null,
    });
    console.log(name,' minting')
    // @ts-ignore: Unreachable code error
    const mintTx = await rootContract.methods
      .betaReg({
        path: name,
        domainOwner: account?.address,
      })
      .send({
        from: account?.address!,
        amount: String(3e9),
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
          //console.log(e);
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

      //console.log(events);

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

  async function saveVid(_jsonHash: string) {
    console.log(_jsonHash);
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
        title: 'saving venom id profile to the new domain on the blockchain',
        description: 'Please confirm the transaction in your wallet',
        duration: null,
        isClosable: true,
      });
      const tvmCell = await provider.packIntoCell({
        data: { ipfsdata: String(_jsonHash) },
        structure: [{ name: 'ipfsdata', type: 'string' }] as const,
      });

      const nftContract = new provider.Contract(DomainAbi, new Address(mintedAddress));

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
              if (tx_in_tree.account.equals(mintedAddress)) {
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
      } else {
        toast.closeAll();
        toast({
          status: 'error',
          title: t('error'),
          description: t('commonErrorMsg'),
          isClosable: true,
        });
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
          <ModalBody
            display={'flex'}
            justifyContent={'center'}
            w={'100%'}
            flexDirection={'column'}
            gap={10}
            fontSize={'xl'}>
            <Flex direction={'column'} gap={2}>
              <Stepper index={activeStep} colorScheme="green">
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
            {activeStep === 0 && (
              <Flex py={4} gap={8} direction={'column'}>
                <Flex direction={'column'} gap={4} >
                  <Text fontWeight={'bold'}>Why are we doing this ?</Text>
                  <Text>
                    On Feb 03, 2024, we updated our Smart Contracts on the Venom testnet blockchain.
                  </Text>
                  <Button
                    as={Link}
                    href={ETHERSCAN_URLS['venom'] + ROOT_CONTRACT_ADDRESS}
                    target="_blank"
                    variant={'outline'}
                    colorScheme={lightMode ? 'dark' : 'light'}
                    leftIcon={<RiExternalLinkLine />}>
                    Contract Address : {truncAddress(ROOT_CONTRACT_ADDRESS)}
                  </Button>
                  <Text>
                    This major update requires all previous domains (minted before 2024) to be
                    registered on the new contract to be able to continue using their domain on the
                    venom testnet.
                  </Text>
                  <Text>
                    As we prepare for the mainnet migration, we appreciate your support and
                    participation in this testing phase.
                  </Text>
                  <Box
                    p={4}
                    bgColor={lightMode ? 'blackAlpha.200' : 'whiteAlpha.200'}
                    rounded={'md'}>
                    <Text fontWeight={'bold'}>Important Note :</Text>
                    <Text>
                      This in not a crucial step. As an early adopter, you will be given the
                      opportunity to register your domain on mainnet a few hours before it becomes
                      available to the general public. all the domains you've registered on the
                      testnet will be reserved for you on the mainnet for a limited time.
                    </Text>
                  </Box>
                </Flex>
                <Flex gap={4} justify={'space-between'}>
                  <Button size={'lg'} variant={'outline'} colorScheme="red" onClick={onClose}>
                    Close
                  </Button>

                  <Button
                    size={'lg'}
                    onClick={() => setActiveStep(1)}
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
                    Proceed
                  </Button>
                </Flex>
              </Flex>
            )}

            {activeStep === 1 && (
              <Flex py={4} gap={8} direction={'column'}>
                <Text>Register {name} on the new contract</Text>
                <Flex gap={4} align={'center'} justify={'space-between'}>
                  <Button
                    display={'flex'}
                    gap={3}
                    as={Link}
                    href={ETHERSCAN_URLS['venom'] + nftAddress}
                    target="_blank"
                    alignItems={'center'}
                    height={'100px'}
                    rounded={'full'}>
                    <Box w={'80px'}>
                      {' '}
                      <Avatar url={String(avatar)} maxH={'80px'} noanimate nodrag shape="circle" />
                    </Box>
                    <Stack gap={2}>
                      <Text>{name}</Text>
                      <Text>{truncAddress(nftAddress)}</Text>
                    </Stack>
                  </Button>{' '}
                  <Button
                    display={'flex'}
                    flexDirection={'column'}
                    gap={2}
                    size={'lg'}
                    height={'68px'}
                    rounded={'full'}
                    bgGradient={
                      lightMode
                        ? 'linear(to-r, var(--venom1), var(--bluevenom1))'
                        : 'linear(to-r, var(--venom2), var(--bluevenom2))'
                    }
                    _hover={{
                      bgGradient: lightMode
                        ? 'linear(to-r, var(--venom0), var(--bluevenom0))'
                        : 'linear(to-r, var(--venom0), var(--bluevenom0))',
                    }}
                    isDisabled={!isValidName(name) || nameExists || isMinting || isConfirming}
                    isLoading={isLoading || isMinting}
                    loadingText={
                      isMinting && !isConfirming
                        ? 'Registering'
                        : isMinting && isConfirming
                        ? t('confirming')
                        : ''
                    }
                    onClick={() => claimVid()}>
                    <Text>Register</Text>
                  </Button>
                </Flex>
                <Flex gap={4} justify={'space-between'}>
                  <Button size={'lg'} variant={'outline'} onClick={() => setActiveStep(0)}>
                    Back
                  </Button>
                </Flex>
              </Flex>
            )}
            {activeStep === 2 && (
              <Flex py={4} gap={8} direction={'column'}>
                <Text>Moving Venom ID Profile Data</Text>
                {migrationStatus === 2 && (
                  <Text fontStyle={'italic'}>
                    There is already a venom id profile attached to The New Domain {name}
                  </Text>
                )}
                {migrationStatus === 1 && (
                  <Text fontStyle={'italic'}>Congratulations! Your Domain is successfully migrated</Text>
                )}
                <Flex gap={4} justify={'space-between'} align={'center'}>
                  <Button
                    display={'flex'}
                    gap={3}
                    alignItems={'center'}
                    as={Link}
                    href={ETHERSCAN_URLS['venom'] + nftAddress}
                    target="_blank"
                    height={'100px'}
                    rounded={['md', 'md', 'full']}>
                    <Box w={'80px'}>
                      {' '}
                      <Avatar url={String(avatar)} maxH={'80px'} noanimate nodrag shape="circle" />
                    </Box>
                    <Stack gap={2}>
                      <Text>{nft.name?.toLowerCase()}</Text>
                      <Text>{truncAddress(nftAddress)}</Text>
                    </Stack>
                  </Button>
                  {migrationStatus !== 1 ? (
                    <Progress
                      isIndeterminate={isSaving || isConfirming}
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
                  ) : (
                    <RiCheckboxCircleFill size={60} color="green" />
                  )}
                  <Button
                    display={'flex'}
                    gap={3}
                    alignItems={'center'}
                    as={Link}
                    href={ETHERSCAN_URLS['venom'] + mintedAddress}
                    target="_blank"
                    height={'100px'}
                    rounded={['md', 'md', 'full']}>
                    <Box w={'80px'}>
                      {' '}
                      <Avatar
                        url={VID_IMAGE_API + name}
                        maxH={'80px'}
                        noanimate
                        nodrag
                        shape="circle"
                      />
                    </Box>
                    <Stack gap={2}>
                      <Text>{name}</Text>
                      <Text>{truncAddress(mintedAddress)}</Text>
                    </Stack>
                  </Button>
                </Flex>
                <Flex gap={4} justify={'space-between'}>
                  <Button
                    size={'lg'}
                    variant={'outline'}
                    isDisabled={isSaving || isConfirming}
                    onClick={() => setActiveStep(1)}>
                    Back
                  </Button>
                  <Flex gap={3}>
                    <Button
                      size={'lg'}
                      onClick={() => setActiveStep(3)}
                      isDisabled={isSaving || isConfirming}
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
                      {migrationStatus === 1 ? 'Next' : 'Skip'}
                    </Button>
                    {migrationStatus !== 1 && (
                      <Button
                        size={'lg'}
                        onClick={() => saveVid(oldHash)}
                        isDisabled={isSaving || isConfirming}
                        isLoading={isSaving || isConfirming}
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
                        Move Data
                      </Button>
                    )}
                  </Flex>
                </Flex>
              </Flex>
            )}

            {activeStep === 3 && (
              <Flex py={4} gap={8} direction={'column'}>
                <Text>🎉 Congragtulation, You have migrated your domain Succesfully</Text>
                <Text>You have the privilege to mint an Earlier Adopter NFT and be the pioneer in registering your domain on the mainnet! 🚀</Text>
                  <Flex gap={4}>
                    <ImageBox srcUrl={EARLY_ADOPTER_IMAGES['earlier'].src} size={100} />
                    <Flex direction={'column'} gap={2} justify={'center'} align={'center'}>
                      <Text>Venom ID Earlier Adopter OAT</Text>
                      <Button
                        w={'100%'}
                        isDisabled={isMinting || isConfirming || isLoading}
                        isLoading={isMinting || isConfirming}
                        loadingText={
                          isMinting
                            ? 'Minting ...'
                            : isConfirming
                            ? 'Confirming ...'
                            : 'Loading ...'
                        }
                        onClick={() =>
                          mintedStrings?.includes('Venom ID Earlier Adopter')
                            ? openWindow(
                                ETHERSCAN_URLS['venom'] +
                                  minteds?.filter((m) => m.name === 'Venom ID Earlier Adopter')[0]
                                    .address,
                                null
                              )
                            : mintBadge(
                                'Venom ID Earlier Adopter',
                                EARLY_ADOPTER_IMAGES['earlier'].src,
                                EARLY_ADOPTER_IMAGES['earlier'].type
                              )
                        }
                        rounded={'full'}
                        bgGradient={
                          lightMode
                            ? 'linear(to-r, var(--venom1), var(--bluevenom1))'
                            : 'linear(to-r, var(--venom2), var(--bluevenom2))'
                        }>
                        {mintedStrings?.includes('Venom ID Earlier Adopter')
                          ? 'Already Minted. View on explorer'
                          : 'Mint'}
                      </Button>
                    </Flex>
                  </Flex>
                
                <Flex gap={4} justify={'space-between'}>
                  
                  <Button size={'lg'} variant={'outline'} onClick={() => setActiveStep(2)}>
                    Back
                  </Button>
                  <Button size={'lg'} variant={'outline'} onClick={onClose} bgGradient={
                          lightMode
                            ? 'linear(to-r, var(--venom1), var(--bluevenom1))'
                            : 'linear(to-r, var(--venom2), var(--bluevenom2))'
                        }
                        _hover={{
                          bgGradient: lightMode
                            ? 'linear(to-r, var(--venom0), var(--bluevenom0))'
                            : 'linear(to-r, var(--venom0), var(--bluevenom0))',
                        }}>
                    Finish
                  </Button>
                </Flex>
              </Flex>
            )}

            {/* <TargetAddress nftAddress={nftAddress} /> */}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
