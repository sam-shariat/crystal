import {
  Button,
  Container,
  Heading,
  Text,
  InputGroup,
  Input,
  InputLeftAddon,
  Stack,
  SimpleGrid,
  Box,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Center,
  useMediaQuery,
  useColorMode,
  Flex,
  Link,
} from '@chakra-ui/react';
import { useState } from 'react';
import { nameAtom, venomContractAtom, venomContractAddressAtom, primaryNameAtom } from 'core/atoms';
import { useAtom, useAtomValue } from 'jotai';
import { addAsset, useConnect, useVenomProvider } from 'venom-react-hooks';
import { useTranslate } from 'core/lib/hooks/use-translate';
import Venom from 'components/Venom';
import TextCard from 'components/Layout/TextCard';
import {
  VENOMSCAN_NFT,
  SITE_PROFILE_URL,
  SITE_MANAGE_URL,
  NFT_IMAGE_URL,
  ZEALY_URL,
  CONTRACT_ADDRESS,
} from 'core/utils/constants';
import { Transaction } from 'everscale-inpage-provider';
import {
  RiFingerprint2Line,
  RiSettings3Line,
  RiProfileLine
} from 'react-icons/ri';
import { isValidUsername } from 'core/utils';
import { VenomFoundation, VenomScanIcon, ZealyLogo } from 'components/logos';

interface Message {
  type: any;
  title: string;
  msg: string;
  link?: string;
}

interface Fee {
  value0: number;
}

const ClaimSection = () => {
  const { t } = useTranslate();
  const { isConnected, account } = useConnect();
  const { provider } = useVenomProvider();
  const { colorMode } = useColorMode();
  const venomContract = useAtomValue(venomContractAtom);
  const [feeIsLoading, setFeeIsLoading] = useState(false);
  const [isMinting, setIsMinting] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [fee, setFee] = useState<number | null>();
  const [message, setMessage] = useState<Message>({ type: '', title: '', msg: '', link: '' });
  const [nameExists, setNameExists] = useState(false);
  const [claimedName, setClaimedName] = useState('');
  const { add } = addAsset(String(account?.address), CONTRACT_ADDRESS);
  const VenomContractAddress = useAtomValue(venomContractAddressAtom);
  //const [venomContract, setVenomContract] = useState<any>(undefined);
  const minFee = 660000000;
  const [name, setName] = useAtom(nameAtom);
  const [primaryName, setPrimaryName] = useAtom(primaryNameAtom);

  const json = {
    type: 'Basic NFT',
    name: name + '.VID',
    description: name + '.VID, a Venom ID',
    preview: {
      source: NFT_IMAGE_URL,
      mimetype: 'image/svg',
    },
    files: [
      {
        source: NFT_IMAGE_URL,
        mimetype: 'image/svg',
      },
    ],
    external_url: SITE_PROFILE_URL + name,
  };

  async function inputChange(e: string) {
    const _name = e.toLowerCase();
    setName(_name);
    if (!isConnected) {
      setMessage({
        type: 'info',
        title: t('connectWallet'),
        msg: t('venomWalletConnect'),
      });
      return;
    } else if (message.type !== 'error') {
      setMessage({
        type: '',
        title: '',
        msg: '',
      });
    }

    if (_name.length < 3) return;
    if (_name.length > 2 && !isValidUsername(_name) && _name.length < 30) {
      setMessage({
        type: 'warning',
        title: t('invalidName'),
        msg: t('invalidNameMsg'),
      });
      return;
    }

    if (venomContract && venomContract.methods !== undefined && message.msg === '') {
      try {
        setFeeIsLoading(true);
        // @ts-ignore: Unreachable code error
        const { value0: _fee } = await venomContract.methods
          .calculateMintingFee({ name: String(_name).toLowerCase() })
          .call();

        // @ts-ignore: Unreachable code error
        const { value0: _nameExists } = await venomContract?.methods
          .nameExists({ name: String(_name).toLowerCase() })
          .call();
        setNameExists(_nameExists);
        setFee(_fee);
        setFeeIsLoading(false);
      } catch (er) {
        console.log(er);
        return;
      }
    } else if (venomContract.methods === undefined) {
      setMessage({
        type: 'warning',
        title: t('contractConnection'),
        msg: t('contractConnectionMsg'),
      });
      return;
    }
  }

  async function claimVid(e: string) {
    if (!isConnected) {
      setMessage({
        type: 'info',
        title: t('connectWallet'),
        msg: t('venomWalletConnect'),
      });
      return;
    }
    if (name.length < 3 || name.length > 29) {
      setMessage({
        type: 'info',
        title: t('invalidName'),
        msg: t('nameLengthMsg'),
      });
      return;
    }
    setMessage({ type: '', title: '', msg: '' });

    if (name.length >= 3 && !nameExists && venomContract?.methods) {
      setIsMinting(true);
      // @ts-ignore: Unreachable code error
      const mintTx = await venomContract?.methods
        .mintNft({ json: JSON.stringify(json), name: name.toLowerCase() })
        .send({
          amount: String(minFee + Number(fee)),
          bounce: true,
          from: account?.address,
        })
        .catch((e: any) => {
          if (e.code === 3) {
            // rejected by a user
            setIsMinting(false);
            return Promise.resolve(null);
          } else {
            setIsMinting(false);
            console.log(e);
            return Promise.reject(e);
          }
        });

      if (mintTx) {
        setClaimedName(name);
        //console.log('mint tx : ', mintTx);
        setIsConfirming(true);
        let receiptTx: Transaction | undefined;
        const subscriber = provider && new provider.Subscriber();
        if (subscriber)
          await subscriber
            .trace(mintTx)
            .tap((tx_in_tree: any) => {
              //console.log('tx_in_tree : ', tx_in_tree);
              if (tx_in_tree.account.equals(VenomContractAddress)) {
                receiptTx = tx_in_tree;
              }
            })
            .finished();

        // Decode events by using abi
        // we are looking for event Game(address player, uint8 bet, uint8 result, uint128 prize);

        let events = await venomContract.decodeTransactionEvents({
          transaction: receiptTx as Transaction,
        });

        if (events.length !== 1 || events[0].event !== 'NftCreated') {
          setMessage({
            type: 'error',
            title: t('error'),
            msg: t('commonErrorMsg'),
          });
        } else {
          // @ts-ignore: Unreachable code error
          const nftAddress = String(events[0].data?.nft && events[0].data?.nft?._address);
          setMessage({
            type: 'success',
            title: t('mintSuccess'),
            msg: t('mintSuccessMsg'),
            link: nftAddress,
          });
          if (primaryName?.name === '') {
            setPrimaryName({ name: claimedName });
          }
        }
        setIsMinting(false);
        setIsConfirming(false);
        setName('');
      }
    }
  }

  const [notMobile] = useMediaQuery('(min-width: 768px)');

  return (
    <Box backgroundColor={colorMode === 'dark' ? 'blackAlpha.200' : 'auto'} id="claim">
      <Container
        as="main"
        maxW="container.md"
        display="grid"
        placeContent="center"
        placeItems="center"
        minH="75vh"
        py={6}>
        <Box gap={4} width={notMobile ? '100%' : 'xs'}>
          <SimpleGrid
            columns={[1, 1, 2]}
            spacing="32px"
            py={notMobile ? 10 : 4}
            minWidth={notMobile ? 'md' : '100%'}>
            <Center display="flex" flexDirection="column" pt={4}>
              <Venom srcUrl="/logos/venomid.png" />
            </Center>
            <Box display="flex" flexDirection="column" justifyContent="center">
              <Heading fontWeight="bold" fontSize="6xl">
                {t('title')}
              </Heading>
              <Text fontWeight="bold" fontSize={notMobile ? '4xl' : '2xl'} my={notMobile ? 10 : 4}>
                {t('description')}
              </Text>
            </Box>
          </SimpleGrid>
          {message.msg.length > 0 && (
            <Alert
              flexDirection={notMobile ? 'row' : 'column'}
              alignItems={notMobile ? 'left' : 'center'}
              justifyContent={notMobile ? 'left' : 'center'}
              textAlign={notMobile ? 'left' : 'center'}
              status={message.type}
              gap={2}
              borderRadius={10}>
              <AlertIcon />
              <Box width={'100%'} flexGrow={1}>
                <AlertTitle>{message.title.toUpperCase()}</AlertTitle>
                <AlertDescription>{message.msg}</AlertDescription>
              </Box>
              {message.link && (
                <Stack justifyContent={'right'}>
                  <Link
                    href={VENOMSCAN_NFT + message.link}
                    target="_blank"
                    id={`venom-id-nft-link`}>
                    <Button
                      variant={'outline'}
                      minWidth={250}
                      height={'54px'}
                      colorScheme="green">
                      <Flex gap={2} width={'100%'} alignItems={'center'} justifyContent={'space-between'}>
                        <Stack gap={1} p={1}>
                          <Text textAlign={'left'}>{`${t('view')} ${claimedName}.VID`}</Text>
                          <Text
                            display={'flex'}
                            fontSize={'sm'}
                            gap={1}
                            color={colorMode === 'dark' ? 'gray.300' : 'gray.600'}>
                            venomscan.com 
                          </Text>
                        </Stack>
                        <VenomScanIcon size='30px' />
                      </Flex>
                    </Button>
                  </Link>
                  
                  <Link
                    href={SITE_MANAGE_URL + 'manage/' + message.link}
                    target="_blank"
                    id={`venom-id-manage-nft-link`}>
                    <Button minWidth={250} height={'54px'} colorScheme="purple" variant={'outline'}>
                      <Flex gap={2} width={'100%'}  alignItems={'center'} justifyContent={'space-between'}>
                        <Stack gap={1} p={1}>
                          <Text textAlign={'left'}>{`${t('manage')} ${claimedName}.VID`}</Text>
                          <Text
                            display={'flex'}
                            fontSize={'sm'}
                            gap={1}
                            color={colorMode === 'dark' ? 'gray.300' : 'gray.600'}>
                            venomid.tools 
                          </Text>
                        </Stack>
                        <RiSettings3Line size={'30px'} />
                      </Flex>
                    </Button>
                  </Link>
                </Stack>
              )}
            </Alert>
          )}
          <Stack direction={['column', 'column', 'row']} pb={6} pt={notMobile ? 10 : 6}>
            <InputGroup size="lg" border={1} borderColor={'grey'}>
              <InputLeftAddon>venomid.link/</InputLeftAddon>
              <Input
                placeholder="samy"
                value={name}
                onChange={(e) => inputChange(e.target.value)}
                bg={colorMode === 'dark' ? 'blackAlpha.300' : 'white'}
                disabled={isMinting || isConfirming}
              />
            </InputGroup>
            <Button
              backgroundColor="var(--venom2)"
              color="white"
              size="lg"
              minWidth={notMobile ? 'auto' : '100%'}
              disabled={name.length < 3 || nameExists || isMinting || isConfirming}
              isLoading={feeIsLoading || isMinting}
              loadingText={
                isMinting && !isConfirming
                  ? 'Claiming ...'
                  : isMinting && isConfirming
                  ? 'Confirming ...'
                  : ''
              }
              onClick={(e) => claimVid(e.currentTarget.value)}>
              {t('claimButton')}
            </Button>
          </Stack>
          {name.length > 2 && fee !== -1 && venomContract?.methods && message.msg === '' && (
            <Flex
              minWidth={notMobile ? 'md' : 'xs'}
              borderColor={'whiteAlpha.100'}
              borderWidth={1}
              borderRadius={10}
              justifyContent={'space-between'}
              alignItems={'center'}
              mb={4}
              p={5}
              bgColor={'blackAlpha.200'}>
              <Box>
                <Text fontWeight={'bold'} fontSize={'sm'}>
                  {t('mintingFee')} :{' '}
                  {fee && !feeIsLoading ? Math.round(fee / 1e3) / 1e6 : t('calculating')}
                </Text>
                <Text fontWeight={'light'} fontSize={'sm'}>
                  {t('reserveFee')} : {`${Math.round(minFee / 1e3) / 1e6}`}
                </Text>
              </Box>

              {!feeIsLoading ? (
                <Text
                  fontSize={'lg'}
                  textAlign={'right'}
                  fontWeight={colorMode === 'light' ? 'bold' : 'light'}
                  color={nameExists ? 'var(--red1)' : 'var(--venom2)'}>
                  {nameExists ? name + '.VID ' + t('taken') : name + '.VID ' + t('available')}
                </Text>
              ) : (
                <Text
                  fontSize={'lg'}
                  textAlign={'right'}
                  fontWeight={colorMode === 'light' ? 'bold' : 'light'}>
                  {' '}
                  {t('availability')}
                </Text>
              )}
            </Flex>
          )}
          <Text fontWeight="light" fontSize={'xl'} py={6}>
            {t('claimDescription')}
          </Text>
          {/* <Flex gap={2} alignItems={'center'} flexDirection={notMobile ? 'row':'column'}>
            <Button height={100} colorScheme='twitter' variant={'outline'}>
              <RiTwitterFill size={'60px'} />
            </Button> */}
          <Button
            as={Link}
            flexGrow={1}
            href={ZEALY_URL}
            target="_blank"
            _hover={{ textDecoration: 'none', color: colorMode === 'light' ? 'white' : 'black' }}
            color={colorMode === 'light' ? 'white' : 'black'}
            height={100}
            display="flex"
            gap={4}
            bg={colorMode === 'dark' ? 'var(--lightGradient)' : 'var(--darkGradient)'}>
            <ZealyLogo />{' '}
            <Stack spacing={0}>
              <Text textDecoration="none" fontSize={notMobile ? '2xl' : 'xl'} mb={1}>
                {t('zealyCommunity')}
              </Text>
              <Text fontSize={'sm'} mt={0}>
                {t('airdropParticipate')}
              </Text>
            </Stack>
          </Button>
          {/* </Flex> */}
          <Box my={6} mt={10} minWidth={notMobile ? 'md' : 'xs'}>
            <Text fontSize="xl" fontWeight="bold" textAlign="center">
              {t('ourDomains')}
            </Text>
            <SimpleGrid columns={[1, 1, 3]} gap={4} my={6} width={'100%'}>
              <TextCard
                icon={<RiFingerprint2Line size="46px" />}
                header="venomid"
                domain=".network"
                text={t('venomidnetwork')}
                url="#claim"
              />
              <TextCard
                icon={<RiSettings3Line size="46px" />}
                header="venomid"
                domain=".tools"
                text={t('venomidtools')}
                url="#manage"
              />
              <TextCard
                icon={<RiProfileLine size="46px" />}
                header="venomid"
                domain=".link"
                text={t('venomidlink')}
                url="#profile"
              />
            </SimpleGrid>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default ClaimSection;
