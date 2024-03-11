import React, { useEffect, useState } from 'react';
import {
  Button,
  Container,
  Text,
  Stack,
  Avatar,
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
  Badge,
} from '@chakra-ui/react';
import { useTranslate } from 'core/lib/hooks/use-translate';
import Logo from 'components/logos/Logo';
import { sleep, truncAddress } from 'core/utils';
import { sql } from '@vercel/postgres';
import { ConnectButton } from 'components/venomConnect';
import { useConnect, useVenomProvider } from 'venom-react-hooks';
import {
  primaryNameAtom,
  venomContractAtom,
  venomContractAddressAtom,
  manageListViewAtom,
  ipfsGatewayAtom,
  networkAtom,
  connectedAccountAtom,
} from 'core/atoms';
import { useAtom, useAtomValue } from 'jotai';
import { Address, Transaction } from 'everscale-inpage-provider';
import {
  AVATAR_API_URL,
  CONTRACT_ADDRESS,
  CONTRACT_ADDRESS_V1,
  CONTRACT_ADDRESS_V2,
  ROOT_CONTRACT_ADDRESS,
  SITE_PROFILE_URL,
  SITE_URL,
  ZERO_ADDRESS,
} from 'core/utils/constants';
import { MdOutlinePreview, MdOutlineVisibility } from 'react-icons/md';
import axios from 'axios';
import getNftsByAddress from 'core/utils/getNftsByAddress';
import { useAddress } from '@thirdweb-dev/react';
import { createWeb3Name } from '@web3-name-sdk/core';
import MigrateModal from 'components/manage/MigrateModal';
import { useRouter } from 'next/router';
import { BaseNftJson, getAllNames } from 'core/utils/reverse';
import { LinkIcon } from 'components/logos';

function SettingsSection() {
  const { provider } = useVenomProvider();
  const { isConnected, account } = useConnect();
  const connectedAccount = useAtomValue(connectedAccountAtom);
  const ethAddress = useAddress();
  const [_ethAddress, _setEthAddress] = useState(ethAddress);
  const [listIsEmpty, setListIsEmpty] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [names, setNames] = useState<string[]>();
  const [loaded, setLoaded] = useState(false);
  const [nftjsons, setNftJsons] = useState<BaseNftJson[] | undefined>(undefined);
  const network = useAtomValue(networkAtom);
  const [_network, _setNetwork] = useState(network);
  const { t } = useTranslate();
  const ipfsGateway = useAtomValue(ipfsGatewayAtom);
  const [primaryName, setPrimaryName] = useAtom(primaryNameAtom);
  const [notMobile] = useMediaQuery('(min-width: 800px)');
  const { colorMode } = useColorMode();
  const web3Name = createWeb3Name();
  const { pathname } = useRouter();

  const loadVenomNFTs = async () => {
    try {
      // Take a salted code
      // console.log('loading all nfts', account?.address);
      if (!provider?.isInitialized) return;
      setNftJsons([]);
      setIsLoading(true);
      setListIsEmpty(false);
      const __nftjsons = await getAllNames(provider, connectedAccount);
      setNftJsons(__nftjsons);
      console.log(__nftjsons);
      setLoaded(true);
      setIsLoading(false);
    } catch (e) {
      console.error(e);
      setIsLoading(false);
    }
  };

  const loadEthNFTs = async () => {
    try {
      // Take a salted code
      // console.log('loading all nfts', account?.address);
      if (!ethAddress) return;
      setNftJsons([]);
      setIsLoading(true);
      setListIsEmpty(false);

      const nfts = await web3Name.getDomainNames({ address: ethAddress });
      console.log(ethAddress, nfts);

      nfts.map(async (nft: any) => {
        try {
          //let r = await web3Name.getDomainRecord({name: nft});
          let _avatar = await web3Name.getDomainRecord({ name: nft, key: 'avatar' });
          let _nftJson: BaseNftJson = {
            name: nft,
            avatar: _avatar ?? '',
            address: nft,
            init_time: 0,
            expire_time: 0,
          };
          //_nftJson.ipfsData = _venomid;
          _nftJson.address = nft; //_nftJson.preview?.source;
          _nftJson.network = nft.slice(nft.indexOf('.') + 1); //_nftJson.preview?.source;
          _nftJson.external_url = SITE_PROFILE_URL + 'sid/' + _nftJson.name;
          _nftJson.manageUrl = '/managesid/' + _nftJson.address;
          console.log(_nftJson);
          setNftJsons((nfts) => [...(nfts ? nfts : []), _nftJson]);
        } catch (e: any) {
          // console.log('error getting venomid nft ', indexAddress);
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
    if (nftjsons?.length === 0 && loaded) {
      setListIsEmpty(true);
    } else {
      setListIsEmpty(false);
    }
  }, [nftjsons]);

  return (
    <Box>
      <Container
        as="main"
        maxW="container.md"
        display="grid"
        flexDir={'column'}
        minH={'88vh'}
        flexGrow={1}>
        
        {!isConnected ? (
          <Center my={8} flexDirection="column">
            <Text my={4}>{t('venomWalletConnect')}</Text>
            <ConnectButton />
          </Center>
        ) : <Stack gap={10} width={'100%'} pb={12}>
        <Flex
          minWidth={['350px', '420px', '580px', '800px']}
          align={'center'}
          height={'64px'}
          gap={3}>
          <Text
            flexGrow={1}
            fontWeight="bold"
            fontSize={notMobile ? '4xl' : '2xl'}
            my={notMobile ? 10 : 4}>
            Settings
          </Text>
        </Flex>

        <Stack
          gap={2}
          width={'100%'}
          background={colorMode === 'dark' ? 'blackAlpha.300' : 'white'}
          rounded={'2xl'} p={2}>
          <Flex gap={2} align={'center'} p={2}>
            {primaryName?.name !== '' ? (
              <Avatar
                color="white"
                bgGradient={
                  colorMode === 'light'
                    ? 'linear(to-r, var(--venom2), var(--bluevenom2))'
                    : 'linear(to-r, var(--venom0), var(--bluevenom0))'
                }
                icon={<LinkIcon type="RiUserLine" size={22} color="#ffffff" />}
                rounded={'full'}
                src={AVATAR_API_URL + primaryName?.name}
                size={['md']}
              />
            ) : (
              <Box p={3} rounded={'full'} border={'1px #77777750 solid'}>
                <LinkIcon type="RiUserLine" size={22} color="#27aa6b" />
              </Box>
            )}
            <Stack gap={0}>
            <Text
              fontWeight={'semibold'}
              textAlign={'left'}
              fontSize='xl'
              bgGradient={
                colorMode === 'light'
                  ? 'linear(to-r, var(--venom2), var(--bluevenom2))'
                  : 'linear(to-r, var(--venom0), var(--bluevenom0))'
              }
              bgClip="text"
              my={'0 !important'}>
              {primaryName?.name && primaryName?.name !== ''
                ? primaryName.name
                : truncAddress(String(account?.address))}
            </Text>
            <Text>Primary Name</Text>
            </Stack>
            
            {/* </Stack> */}
          </Flex>
          <Button isDisabled gap={2}>
              Select Primary Name
              <Badge p={1} colorScheme='blue'>Soon</Badge>
            </Button>
        </Stack>
        
      </Stack>}
      </Container>
    </Box>
  );
}

export default SettingsSection;
