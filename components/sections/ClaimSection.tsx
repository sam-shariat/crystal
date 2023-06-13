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
  Flex,
  Link,
} from '@chakra-ui/react';
import { useState } from 'react';
import {
  nameAtom,
  venomContractAtom,
  venomSProviderAtom,
  addressAtom,
  venomContractAddressAtom,
  isConnectedAtom,
} from 'core/atoms';
import { useAtom, useAtomValue } from 'jotai';
import { useTranslate } from 'core/lib/hooks/use-translate';
import Venom from 'components/Venom';
import { useMediaQuery, useColorMode } from '@chakra-ui/react';
import { VENOMSCAN_NFT, SITE_PROFILE_URL, SITE_MANAGE_URL } from 'core/utils/constants';

interface Message {
  type: any;
  title: string;
  msg: string;
  link?: string;
}

export default function ClaimSection() {
  const { t } = useTranslate();
  const { colorMode } = useColorMode();
  const provider = useAtomValue(venomSProviderAtom);
  const isConnected = useAtomValue(isConnectedAtom);
  const userAddress = useAtomValue(addressAtom);
  const [feeIsLoading, setFeeIsLoading] = useState(false);
  const [isMinting, setIsMinting] = useState(false);
  const [fee, setFee] = useState(-1);
  const [message, setMessage] = useState<Message>({ type: '', title: '', msg: '', link: '' });
  const [nameExists, setNameExists] = useState(false);
  const [claimedName, setClaimedName] = useState('');
  const venomContract = useAtomValue(venomContractAtom);
  const VenomContractAddress = useAtomValue(venomContractAddressAtom);
  const minFee = 100000000;
  const [name, setName] = useAtom(nameAtom);

  const image = 'https://ipfs.io/ipfs/QmUvfedgHDXdiMsq5nfLPGLQrR4QAYXHzR5SETBZQ6RGyd';
  const json = {
    type: 'Basic NFT',
    name: name + '.VID',
    description: name + '.VID, a Venom ID',
    preview: {
      source: image,
      mimetype: 'image/svg',
    },
    files: [
      {
        source: image,
        mimetype: 'image/svg',
      },
    ],
    external_url: SITE_PROFILE_URL + name,
  };

  async function inputChange(e: string) {
    const _name = e;
    setName(_name);
    if (!isConnected) {
      setMessage({
        type: 'info',
        title: 'connect wallet',
        msg: 'please connect your venom wallet',
      });
      return;
    } else if(message.type !== "error"){
      setMessage({
        type: '',
        title: '',
        msg: '',
      });
    }
    if (_name.length > 2 && venomContract?.methods !== undefined) {
      setFeeIsLoading(true);
      const { value0: _fee } = await venomContract.methods
        .calculateMintingFee({ name: _name })
        .call();
      const { value0: _nameExists } = await venomContract.methods
        .nameExists({ name: _name })
        .call();
      setNameExists(_nameExists);
      setFee(_fee);
      setFeeIsLoading(false);
    }
  }

  async function claimVid(e:string) {
    if (!isConnected) {
      setMessage({
        type: 'info',
        title: 'connect wallet',
        msg: 'please connect your venom wallet',
      });
      return;
    }
    setMessage({ type: '', title: '', msg: '' });
    console.log('before minting');

    if (name.length >= 3 && !nameExists) {
      console.log('minting');
      setIsMinting(true);
      const mintTx = await venomContract.methods
        .mintNft({
          json: JSON.stringify(json),
          name: name,
        })
        .send({
          amount: minFee + fee,
          bounce: true,
          from: userAddress,
        })
        .catch((e: any) => {
          if (e.code === 3) {
            // rejected by a user
            setIsMinting(false);
            return Promise.resolve(null);
          } else {
            setIsMinting(false);
            return Promise.reject(e);
          }
        });

      if (mintTx) {
        setClaimedName(name);
        console.log('mint tx : ', mintTx);

        let receiptTx;
        const subscriber = new (provider as any).Subscriber();
        await subscriber
          .trace(mintTx)
          .tap((tx_in_tree: any) => {
            console.log('tx_in_tree : ', tx_in_tree);
            if (tx_in_tree.account.equals(VenomContractAddress)) {
              receiptTx = tx_in_tree;
            }
          })
          .finished();

        // Decode events by using abi
        // we are looking for event Game(address player, uint8 bet, uint8 result, uint128 prize);

        let events = await venomContract.decodeTransactionEvents({ transaction: receiptTx });
        console.log(events);

        if (events.length !== 1 || events[0].event !== 'NftCreated') {
          setMessage({
            type: 'error',
            title: 'Error',
            msg: 'Something went wrong, Please try again',
          });
        } else {
          const nftAddress = events[0].data.nft._address;
          setMessage({
            type: 'success',
            title: 'Mint Successful',
            msg: 'Venom ID Claimed Successfuly, You can now manage and share your venom profile',
            link: VENOMSCAN_NFT + nftAddress,
          });
        }
        setIsMinting(false);
        console.log(events);
      }
      console.log('mint finished');
    }
  }

  const [notMobile] = useMediaQuery('(min-width: 800px)');
  return (
    <Box backgroundColor={colorMode === 'dark' ? 'blackAlpha.200' : 'auto'}>
      <Container
        as="main"
        maxW="container.md"
        display="grid"
        placeContent="center"
        placeItems="center"
        minH="75vh">
        <>
          <SimpleGrid columns={[1, 2]} spacing="32px" py={notMobile ? 10 : 4}>
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
              <Box>
                <AlertTitle>{message.title.toUpperCase()}</AlertTitle>
                <AlertDescription>{message.msg}</AlertDescription>
              </Box>
              {message.link && (
                <Box>
                  <Link href={message.link} target="_blank" id={`venom-id-nft-link`}>
                    <Button m={1} minWidth={120}>
                      View NFT
                    </Button>
                  </Link>
                  <Link
                    href={SITE_MANAGE_URL + claimedName}
                    target="_blank"
                    id={`venom-id-manage-nft-link`}>
                    <Button m={1} minWidth={120}>
                      Manage VID
                    </Button>
                  </Link>
                </Box>
              )}
            </Alert>
          )}
          <Stack direction={['column', 'row']} pb={6} pt={notMobile ? 10 : 6} width="100%">
            <InputGroup size="lg">
              <InputLeftAddon>venomid.link/</InputLeftAddon>
              <Input
                placeholder="samy"
                value={name}
                onChange={(e) => inputChange(e.target.value)}
              />
            </InputGroup>
            <Button
              backgroundColor="var(--venom2)"
              size="lg"
              minWidth="300px"
              disabled={name.length < 3 || nameExists}
              isLoading={feeIsLoading || isMinting}
              onClick={(e) => claimVid(e.target.disabled)}>
              {t('claimButton')}
            </Button>
          </Stack>
          {name.length > 2 && fee !== -1 && venomContract?.methods && (
            <Flex
              width={'100%'}
              borderColor={'whiteAlpha.100'}
              borderWidth={1}
              borderRadius={10}
              justifyContent={'space-between'}
              mb={4}
              p={5}
              bgColor={'blackAlpha.200'}>
              <Text fontWeight={'bold'}>
                Minting Fee : {fee && !feeIsLoading ? `0.00000000${fee}` : 'Calculating'}
              </Text>
              {!feeIsLoading ? (
                <Text fontWeight={'bold'} color={nameExists ? 'var(--red1)' : 'var(--venom1)'}>
                  {nameExists ? name + '.VID is Taken' : name + '.VID is Available'}
                </Text>
              ) : (
                <Text fontWeight={'bold'}>Checking Availibility</Text>
              )}
            </Flex>
          )}
          <Text fontWeight="light" fontSize={notMobile ? '2xl' : 'xl'} mb={notMobile ? 10 : 6}>
            {t('claimDescription')}
          </Text>
        </>
      </Container>
    </Box>
  );
}
