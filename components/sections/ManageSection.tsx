import React, { useEffect, useState } from 'react';
import { BaseNftJson, getAddressesFromIndex, getNftByIndex, saltCode } from 'core/utils/nft';
import NextLink from 'next/link';
import { Avatar } from 'components/Profile';
import {
  Button,
  Container,
  Text,
  Stack,
  SimpleGrid,
  Box,
  Tooltip,
  Center,
  Flex,
  Link,
  useMediaQuery,
  useColorMode,
  Spinner,
  HStack,
  IconButton,
  Switch,
  useToast,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { useTranslate } from 'core/lib/hooks/use-translate';
import Logo from 'components/logos/Logo';
import { sleep } from 'core/utils';
import { ConnectButton } from 'components/venomConnect';
import { useConnect, useVenomProvider } from 'venom-react-hooks';
import {
  primaryNameAtom,
  venomContractAtom,
  venomContractAddressAtom,
  manageListViewAtom,
  ipfsGatewayAtom,
} from 'core/atoms';
import { useAtom, useAtomValue } from 'jotai';
import { Address, Transaction } from 'everscale-inpage-provider';
import { AVATAR_API_URL, CONTRACT_ADDRESS, SITE_MANAGE_URL, ZERO_ADDRESS } from 'core/utils/constants';
import {
  RiExternalLinkLine,
  RiLayoutGridLine,
  RiListCheck2,
  RiMoreFill,
  RiRestartLine,
  RiSettings4Line,
} from 'react-icons/ri';
import { MdOutlinePreview, MdOutlineVisibility } from 'react-icons/md';
import axios from 'axios';

function ManageSection() {
  const { provider } = useVenomProvider();
  const { isConnected, account } = useConnect();
  const [listIsEmpty, setListIsEmpty] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const [listView, setListView] = useAtom(manageListViewAtom);
  const [nftjsons, setNftJsons] = useState<BaseNftJson[] | undefined>(undefined);
  const venomContract = useAtomValue(venomContractAtom);
  const venomContractAddress = useAtomValue(venomContractAddressAtom);
  const { t } = useTranslate();
  const ipfsGateway = useAtomValue(ipfsGatewayAtom);
  const [primaryName, setPrimaryName] = useAtom(primaryNameAtom);
  const [notMobile] = useMediaQuery('(min-width: 800px)');
  const [isSaving, setIsSaving] = useState(false);
  const toast = useToast();
  const [isConfirming, setIsConfirming] = useState(false);
  const minFee = 660000000;
  const { colorMode } = useColorMode();
  if (nftjsons) {
    console.log(nftjsons);
  }

  const loadNFTs = async () => {
    try {
      // Take a salted code
      console.log('loading all nfts', account?.address);
      if (!provider?.isInitialized) return;
      setNftJsons([]);
      setIsLoading(true);
      setListIsEmpty(false);
      const saltedCode = await saltCode(provider, String(account?.address), CONTRACT_ADDRESS);
      // Hash it
      const codeHash = await provider.getBocHash(String(saltedCode));
      if (!codeHash) {
        setIsLoading(false);
        return;
      }
      // Fetch all Indexes by hash
      const indexesAddresses = await getAddressesFromIndex(codeHash, provider);
      if (!indexesAddresses || !indexesAddresses.length) {
        if (indexesAddresses && !indexesAddresses.length) setListIsEmpty(true);
        setIsLoading(false);
        return;
      }
      // Fetch all nfts
      indexesAddresses.map(async (indexAddress) => {
        try {
          let _nftJson = await getNftByIndex(provider, indexAddress);
          const ipfsData = _nftJson.attributes?.find(
            (att: any) => att.trait_type === 'DATA'
          )?.value;
          if (ipfsData !== '') {
            const res = axios.get(ipfsGateway + ipfsData);
            res.then((data) => (_nftJson.avatar = data.data.avatar ?? ''))
              .catch(() => (_nftJson.avatar = ''));
          } else {
            _nftJson.avatar = '';
          }
          setNftJsons((nfts) => [...(nfts ? nfts : []), _nftJson]);
        } catch (e: any) {
          console.log('error getting venomid nft ', indexAddress);
        }
      });

      setLoaded(true);
      setIsLoading(false);
    } catch (e) {
      console.error(e);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    async function getNfts() {
      if (account && isConnected && provider) {
        if (!provider?.isInitialized) {
          console.log('provider not ready');
          await sleep(1000);
          getNfts();
          return;
        }
      }
      if (!loaded) {
        loadNFTs();
      }
      if (!account) setListIsEmpty(false);
    }
    getNfts();
  }, [isConnected, provider]);

  async function setAsPrimary(_nftAddress: string, _name: string) {
    if (!isConnected) {
      toast({
        status: 'info',
        title: 'connect wallet',
        description: 'please connect your venom wallet',
        isClosable: true,
      });
      return;
    }
    if (!provider) {
      toast({
        status: 'info',
        title: 'Provider Not Ready',
        description:
          'Please wait a few seconds and try again, Your Wallet Provider is not ready, yet',
      });
      return;
    }
    console.log('before saving', _nftAddress, _name.slice(0, -4));
    if (provider.isInitialized) {
      console.log('saving ', provider);
      setIsSaving(true);
      toast({
        status: 'loading',
        title: 'setting ' + _name + ' as primary name',
        description: 'Please wait a few moments while your changes are saved',
        duration: null,
        isClosable: true,
      });
      const setPrimaryTx = await venomContract?.methods
        .setPrimaryName({ _nftAddress: new Address(_nftAddress), _name: _name.slice(0, -4) })
        .send({
          amount: String(minFee),
          bounce: true,
          from: account?.address,
        })
        .catch((e: any) => {
          if (e.code === 3) {
            // rejected by a user
            toast.closeAll();
            setIsSaving(false);
            return Promise.resolve(null);
          } else {
            setIsSaving(false);
            console.log(e);
            toast.closeAll();
            return Promise.reject(e);
          }
        });

      if (setPrimaryTx) {
        console.log('setPrimary tx : ', setPrimaryTx);
        setIsConfirming(true);
        let receiptTx: Transaction | undefined;
        const subscriber = provider && new provider.Subscriber();
        if (subscriber)
          await subscriber
            .trace(setPrimaryTx)
            .tap((tx_in_tree: any) => {
              console.log('tx_in_tree : ', tx_in_tree);
              if (tx_in_tree.account.equals(venomContractAddress)) {
                toast.closeAll();
                toast({
                  status: 'success',
                  title: 'Update Successful',
                  description: _name + ' was succesfully set as your primary name',
                  duration: null,
                  isClosable: true,
                });
              }
            })
            .finished();

        setIsSaving(false);
        setIsConfirming(false);
        setPrimaryName({ nftAddress: new Address(_nftAddress), name: _name.slice(0, -4) });
        loadNFTs();
      }
      console.log('save primary finished');
    }
  }
  return (
    <Box>
      <Container
        as="main"
        maxW="container.lg"
        display="grid"
        flexDir={'column'}
        minH={'84vh'}
        flexGrow={1}>
        <Box py={6} gap={2} width={'100%'}>
          {isConnected && (
            <Stack gap={10} width={'100%'}>
              <HStack minWidth={['350px', '420px', '580px', '800px']}>
                <Text
                  flexGrow={1}
                  fontWeight="bold"
                  fontSize={notMobile ? '4xl' : '2xl'}
                  my={notMobile ? 10 : 4}>
                  {t('yourVids')}
                </Text>
                <Button aria-label="change-view" onClick={() => setListView(!listView)} gap={2}>
                  {notMobile ? (listView ? 'Grid' : 'List') : ''}{' '}
                  {!listView ? <RiListCheck2 size={'24'} /> : <RiLayoutGridLine size={'24'} />}
                </Button>
                <Button aria-label="reload-nfts" onClick={loadNFTs} gap={2}>
                  {notMobile ? 'Reload' : ''} <RiRestartLine size={'24'} />
                </Button>
              </HStack>
              {isLoading && (
                <Center width={'100%'} height={250}>
                  <Spinner size="lg" />
                </Center>
              )}
            </Stack>
          )}
          {listView ? (
            <Stack gap={2} width={'100%'}>
              {nftjsons?.map((nft) => (
                <Flex
                  key={nft.name}
                  flexDirection={'row'}
                  gap={2}
                  minWidth={['100%', '420px', '580px', '800px']}
                  alignItems={'center'}
                  background={colorMode === 'dark' ? 'blackAlpha.300' : 'white'}
                  borderColor={
                    nft?.name !== undefined && primaryName.name === nft?.name.slice(0, -4)
                      ? 'grey'
                      : 'blackAlpha.200'
                  }
                  borderWidth={1}
                  p={2}
                  borderRadius={10}>
                  <Flex key={nft.name + ' name'} flexDirection={'row'}>
                    <Box width={'28px'}>
                      <Avatar my={'0px'} noanimate nodrag shadow="none" url={String(nft.avatar)} />
                    </Box>
                  </Flex>
                  <Text flexGrow={1} fontWeight={'bold'} fontSize={['xl', 'xl', '2xl']}>
                    {String(nft.name).slice(0, -4).toLowerCase()}
                  </Text>

                  {notMobile ? (
                    <>
                      <Button
                        colorScheme="green"
                        isLoading={isSaving || isConfirming}
                        onClick={() =>
                          nft?.name !== undefined &&
                          primaryName.name !== nft?.name.slice(0, -4) &&
                          setAsPrimary(String(nft?.address), String(nft?.name))
                        }
                        isDisabled={
                          isSaving ||
                          isConfirming ||
                          (nft?.name !== undefined && primaryName.name === nft?.name.slice(0, -4))
                        }
                        variant={
                          nft?.name !== undefined && primaryName.name === nft?.name.slice(0, -4)
                            ? 'outline'
                            : 'solid'
                        }>
                        {nft?.name !== undefined && primaryName.name === nft?.name.slice(0, -4)
                          ? 'Primary VID'
                          : 'Set Primary'}
                      </Button>
                      <Link href={SITE_MANAGE_URL + 'manage/' + nft.address}>
                        <Tooltip
                          borderRadius={4}
                          label={<Text p={2}>Customize</Text>}
                          hasArrow
                          color="white"
                          bgColor={'black'}>
                          <IconButton
                            aria-label="customize-venom-id"
                            variant={'outline'}
                            colorScheme="purple">
                            <RiSettings4Line />
                          </IconButton>
                        </Tooltip>
                      </Link>
                      <Link href={nft.external_url} target="_blank">
                        <Tooltip
                          borderRadius={4}
                          label={<Text p={2}>View VID</Text>}
                          hasArrow
                          color="white"
                          bgColor={'black'}>
                          <IconButton
                            aria-label="view-venom-id"
                            variant={'outline'}
                            colorScheme="gray">
                            <MdOutlineVisibility />
                          </IconButton>
                        </Tooltip>
                      </Link>
                    </>
                  ) : (
                    <Menu>
                      <IconButton
                        as={MenuButton}
                        aria-label="more-settings"
                        variant={'ghost'}
                        p={2}>
                        <RiMoreFill size={24} />
                      </IconButton>
                      <MenuList p={0}>
                        <Button
                          as={MenuItem}
                          colorScheme="green"
                          isLoading={isSaving || isConfirming}
                          onClick={() =>
                            nft?.name !== undefined &&
                            primaryName.name !== nft?.name.slice(0, -4) &&
                            setAsPrimary(String(nft?.address), String(nft?.name))
                          }
                          isDisabled={
                            isSaving ||
                            isConfirming ||
                            (nft?.name !== undefined && primaryName.name === nft?.name.slice(0, -4))
                          }
                          variant={
                            nft?.name !== undefined && primaryName.name === nft?.name.slice(0, -4)
                              ? 'outline'
                              : 'solid'
                          }>
                          {nft?.name !== undefined && primaryName.name === nft?.name.slice(0, -4)
                            ? 'Primary VID'
                            : 'Set Primary'}
                        </Button>
                        <MenuItem
                          as={Link}
                          href={SITE_MANAGE_URL + 'manage/' + nft.address}
                          sx={{ textDecoration: 'none', _hover: { textDecoration: 'none' } }}
                          icon={<RiSettings4Line />}>
                          Customize
                        </MenuItem>
                        <MenuItem
                          as={Link}
                          sx={{ textDecoration: 'none', _hover: { textDecoration: 'none' } }}
                          href={nft.external_url}
                          target="_blank"
                          icon={<MdOutlineVisibility />}>
                          View Venom ID
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  )}
                </Flex>
              ))}
            </Stack>
          ) : (
            <SimpleGrid
              columns={[
                1,
                nftjsons && nftjsons?.length > 1 ? 2 : 1,
                nftjsons && nftjsons?.length > 1 ? 3 : 1,
                nftjsons && nftjsons?.length > 1 ? 3 : 1,
              ]}
              gap={2}
              width={'100%'}>
              {nftjsons?.map((nft) => (
                <Center
                  width={'100%'}
                  key={nft.name}
                  flexDirection={'column'}
                  gap={2}
                  background={colorMode === 'dark' ? 'blackAlpha.300' : 'white'}
                  borderColor={
                    nft?.name !== undefined && primaryName.name === nft?.name.slice(0, -4)
                      ? 'grey'
                      : 'blackAlpha.200'
                  }
                  borderWidth={1}
                  p={'16px !important'}
                  borderRadius={12}>
                  <Flex
                    width={'100%'}
                    key={nft.name + ' name'}
                    gap={2}
                    flexDirection={'column'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    my={2}>
                    <Box width={100}>
                      <Avatar noanimate nodrag my={2} url={String(nft.avatar)} />
                    </Box>
                    <Text fontWeight={'bold'} fontSize={'3xl'}>
                      {String(nft.name).slice(0, -4).toLowerCase()}
                    </Text>
                  </Flex>
                  <Button
                    colorScheme="green"
                    isLoading={isSaving || isConfirming}
                    onClick={() =>
                      nft?.name !== undefined &&
                      primaryName.name !== nft?.name.slice(0, -4) &&
                      setAsPrimary(String(nft?.address), String(nft?.name))
                    }
                    isDisabled={
                      isSaving ||
                      isConfirming ||
                      (nft?.name !== undefined && primaryName.name === nft?.name.slice(0, -4))
                    }
                    variant={
                      nft?.name !== undefined && primaryName.name === nft?.name.slice(0, -4)
                        ? 'outline'
                        : 'solid'
                    }
                    width={'100%'}>
                    {nft?.name !== undefined && primaryName.name === nft?.name.slice(0, -4)
                      ? 'Primary Name'
                      : 'Set As Primary'}
                  </Button>
                  <NextLink href={SITE_MANAGE_URL + 'manage/' + nft.address} passHref>
                    <Button variant={'outline'} colorScheme="purple" width={'100%'}>
                      Customize
                    </Button>
                  </NextLink>
                  <Link href={nft.external_url} target="_blank" width={'100%'}>
                    <Button width={'100%'}>View VID</Button>
                  </Link>
                </Center>
              ))}
            </SimpleGrid>
          )}
          {listIsEmpty && !isLoading && (
            <Center display="flex" flexDirection="column" gap={4}>
              <Text fontSize="xl">You don't own any Venom IDs</Text>
              <Button
                as={Link}
                href="/"
                variant="outline"
                textAlign="left"
                borderWidth={1}
                gap={2}
                borderColor="grey">
                Claim Your Venom ID
                <RiExternalLinkLine size={'18px'} />
              </Button>
            </Center>
          )}
        </Box>
        {!isConnected && (
          <Center my={8} flexDirection="column" minH={'75vh'}>
            <Text my={4}>{t('venomWalletConnect')}</Text>
            <ConnectButton />
          </Center>
        )}
      </Container>
    </Box>
  );
}

export default ManageSection;
