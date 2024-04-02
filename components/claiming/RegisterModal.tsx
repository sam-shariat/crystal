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
  useColorModeValue,
  Link,
  useToast,
  Center,
  Spinner,
} from '@chakra-ui/react';
import DomainAbi from 'abi/Domain.abi.json';
import { LinkIcon } from 'components/logos';
import { Address, Transaction } from 'everscale-inpage-provider';
import {
  claimingNameAtom,
  connectedAccountAtom,
  isConnectedAtom,
  openRegisterAtom,
  pathAtom,
  primaryNameAtom,
  rootContractAtom,
  signDateAtom,
  signHashAtom,
  signMessageAtom,
  venomProviderAtom,
} from 'core/atoms';
import { DOMAIN_REGISTER_FEE, SIGN_MESSAGE, TLD } from 'core/utils/constants';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import React, { useEffect, useState } from 'react';
import { Message } from 'types';
import ClaimModal from './ClaimModal';
import { useTranslate } from 'core/lib/hooks/use-translate';
import { getCurrentDateUnix, isValidSignHash, sumUint128 } from 'core/utils';

export default function RegisterModal() {
  const { colorMode } = useColorMode();
  const [_open, _setOpen] = useAtom(openRegisterAtom);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [name, setName] = useAtom(claimingNameAtom);
  const connected = useAtomValue(isConnectedAtom);
  const connectedAccount = useAtomValue(connectedAccountAtom);
  const setSignMessage = useSetAtom(signMessageAtom);
  const provider = useAtomValue(venomProviderAtom);
  const lightMode = useColorMode().colorMode === 'light';
  const signHash = useAtomValue(signHashAtom);
  const signDate = useAtomValue(signDateAtom);
  const [year, setYear] = useState<number>(1);
  const [fee, setFee] = useState<number | null>(null);
  const [totalFee, setTotalFee] = useState<number | null>(null);
  const [notMobile] = useMediaQuery('(min-width: 768px)');
  const rootContract = useAtomValue(rootContractAtom);
  const [isMinting, setIsMinting] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [primaryName, setPrimaryName] = useAtom(primaryNameAtom);
  const [nameExists, setNameExists] = useState(false);
  const [message, setMessage] = useState<Message>({ type: '', title: '', msg: '', link: '' });
  const [claimedName, setClaimedName] = useState('');
  const setPath = useSetAtom(pathAtom);
  const toast = useToast();
  const { t } = useTranslate();
  const minFee: number = 2000000000;

  useEffect(() => {
    if (_open) {
      onOpen();
      setYear(1);
    } else {
      onClose();
    }
  }, [_open]);

  useEffect(() => {
    setFee(null);
    async function getFee() {
      //@ts-ignore: Unreachable code error
      const { amount: _fee } = await rootContract.methods
        .expectedRegisterAmount({
          name: `${name}`,
          duration: 365 * 24 * 60 * 60 * year,
          answerId: 22,
        })
        .call({ responsible: true });

      setTotalFee(sumUint128(_fee, DOMAIN_REGISTER_FEE * 1e9));
      setFee(_fee);
      console.log(_fee);
    }

    if (
      provider &&
      provider?.isInitialized &&
      connected &&
      rootContract &&
      rootContract.methods &&
      isOpen
    ) {
      getFee();
    }
  }, [year, rootContract, connected, isOpen]);

  async function claimVid() {
    setIsMinting(true);
    if (!isValidSignHash(signHash, signDate)) {
      setSignMessage(
        primaryName && primaryName?.name !== ''
          ? `Hey there ${primaryName.name}, ${SIGN_MESSAGE} ${getCurrentDateUnix()}`
          : `${SIGN_MESSAGE} ${getCurrentDateUnix()}`
      );
      // console.log('need to sign');
      setIsMinting(false);
      return;
    }

    setMessage({ type: '', title: '', msg: '' });

    const certificateAddr = await rootContract.methods
      .resolve({ path: `${name}.${TLD}`, answerId: 0 })
      .call({ responsible: true });
    console.log(certificateAddr);

    const domainContract = new provider.Contract(DomainAbi, certificateAddr.certificate);
    console.log(domainContract);
    try {
      // @ts-ignore: Unreachable code error
      let result: { status: string | number } = await domainContract.methods
        .getStatus({ answerId: 0 })
        .call();
      setNameExists(result ? true : false);
      toast.closeAll();
      toast({
        status: 'error',
        title: 'Already Registered',
        colorScheme: colorMode === 'dark' ? 'light' : 'dark',
        description: `Unfortunately ${name}.${TLD} is already registered! Please try another name`,
        duration: null,
        isClosable: true
      });
      setIsMinting(false);
      _setOpen(false);
      return;
    } catch (e) {
      setNameExists(false);
    }

    if (
      provider &&
      provider?.isInitialized &&
      rootContract &&
      rootContract.methods !== undefined &&
      !nameExists &&
      connectedAccount.length > 60
    ) {
      toast.closeAll();
      // toast({
      //   status: 'loading',
      //   colorScheme: colorMode === 'dark' ? 'light' : 'dark',
      //   title: t('minting'),
      //   description: t('confirmInWallet'),
      //   duration: null,
      // });

      // const activate = await rootContract.methods.activate()
      //   .send({
      //     from: new Address(connectedAccount),
      //     amount: String((2e9)),
      //     bounce: true,
      //   })

      //   console.log(activate);
      //   return;

      // if(!fee) return;

      const { payload } = await rootContract.methods
        .buildRegisterPayload({
          name: `${name}`,
          answerId: 22,
        })
        .call({ responsible: true });

      console.log(payload);

      // @ts-ignore: Unreachable code error
      const mintTx = await rootContract.methods
        .register({
          payload: payload,
        })
        .send({
          from: new Address(connectedAccount),
          amount: String(totalFee),
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
          colorScheme: colorMode === 'dark' ? 'light' : 'dark',
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
          setClaimedName(name);
          toast.closeAll();
          setMessage({
            type: 'success',
            title: t('mintSuccess'),
            msg: t('mintSuccessMsg'),
            link: nftAddress,
          });
          setPath('');
          if (primaryName?.name === '') {
            setPrimaryName({ name: `${name}.${TLD}`, nftAddress: nftAddress });
          }
        }
        setIsMinting(false);
        setIsConfirming(false);
        _setOpen(false);
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
    } else {
      toast.closeAll();
      setIsMinting(false);
    }
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={() => _setOpen(false)}
        size={['full', 'full', '2xl']}
        isCentered>
        <ModalOverlay bg="blackAlpha.700" backdropFilter="auto" backdropBlur={'6px'} />
        <ModalContent
          bg={
            isMinting || isConfirming
              ? (lightMode ? 'var(--venom0)' : 'var(--venom2)')
              : colorMode === 'dark'
              ? 'var(--dark1)'
              : 'var(--white)'
          }
          transition={'all ease 1s'}>
          <ModalHeader
            display={'flex'}
            fontSize={['xl', '2xl']}
            justifyContent={'center'}
            gap={1}
            fontWeight={'normal'}
            cursor={'default'}>
            Registering Domain
          </ModalHeader>
          {notMobile && <ModalCloseButton />}
          <ModalBody as={Flex} direction={'column'} justify={'center'}>
            <Flex gap={10} direction={'column'} justify={'center'}>
              <Flex fontWeight={'light'} fontSize={['xl', '2xl', '3xl']} gap={1} justify={'center'}>
                <Text>
                  {name}.{TLD}
                </Text>
              </Flex>
              {!isMinting && !isConfirming && <Flex gap={2} align={'center'}>
                <Button
                  height={'68px'}
                  rounded={'full'}
                  fontSize={'4xl'}
                  isDisabled={year === 1}
                  colorScheme="venom"
                  size={'lg'}
                  onClick={() => setYear((y) => (y > 1 ? y - 1 : 1))}>
                  -
                </Button>
                <Text fontSize={['xl', '2xl', '3xl']} flexGrow={1} textAlign={'center'}>
                  {year} {year > 1 ? 'years' : 'year'}
                </Text>
                <Button
                  height={'68px'}
                  colorScheme="venom"
                  fontSize={'4xl'}
                  rounded={'full'}
                  isDisabled={year === 10}
                  size={'lg'}
                  onClick={() => setYear((y) => y + 1)}>
                  +
                </Button>
              </Flex>}
              {!isMinting && !isConfirming && <Flex
                align={'center'}
                bg={colorMode === 'light' ? 'blackAlpha.100' : 'whiteAlpha.100'}
                p={4}
                direction={'column'}
                gap={2}
                rounded={'lg'}
                fontSize={['lg', 'xl']}>
                <Flex justify={'space-between'} w={'100%'}>
                  <Text>
                    {year} {year > 1 ? 'years' : 'year'} registration
                  </Text>
                  <Text>{fee ? `${fee / 1e9} VENOM` : 'Calculating...'}</Text>
                </Flex>
                <Flex justify={'space-between'} w={'100%'}>
                  <Text>network fee</Text>
                  <Text>{DOMAIN_REGISTER_FEE} VENOM</Text>
                </Flex>
                <Flex justify={'space-between'} w={'100%'}>
                  <Text>total</Text>
                  <Text>{totalFee ? `${totalFee / 1e9} VENOM` : 'Calculating...'}</Text>
                </Flex>
              </Flex>}

              {(isMinting || isConfirming ) && 
              <Center minH={246} flexDirection={'column'} gap={6}>

                {isMinting && <Text fontSize={'xl'} fontWeight={'bold'} textAlign={'center'}>{t('confirmInWallet')}</Text>}
                <Spinner size={'xl'} />
                </Center>}
            </Flex>
          </ModalBody>
          <ModalFooter py={8}>
            <Flex justify={'space-between'} w={'100%'}>
              <Button
                rounded={'full'}
                height={['58px']}
                isDisabled={isMinting || isConfirming}
                size="lg"
                onClick={() => _setOpen(false)}>
                Close
              </Button>
              <Button
                colorScheme="green"
                rounded={'full'}
                size="lg"
                gap={2}
                fontSize={'xl'}
                bgGradient={
                  colorMode === 'light'
                    ? 'linear(to-r, var(--venom1), var(--bluevenom1))'
                    : 'linear(to-r, var(--venom2), var(--bluevenom2))'
                }
                _hover={{
                  bgGradient:
                    colorMode === 'light'
                      ? 'linear(to-r, var(--venom0), var(--bluevenom0))'
                      : 'linear(to-r, var(--venom0), var(--bluevenom0))',
                }}
                height={['58px']}
                isDisabled={!fee || isMinting || isConfirming}
                // isLoading={feeIsLoading || isMinting}
                // loadingText={
                //   isMinting && !isConfirming
                //     ? 'Claiming ...'
                //     : isMinting && isConfirming
                //     ? t('confirming')
                //     : ''
                // }
                onClick={() => claimVid()}>
                {!isValidSignHash(signHash, signDate) ? 'Sign Wallet' : 'Register'}
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <ClaimModal claimedName={claimedName} message={message} />
    </>
  );
}
