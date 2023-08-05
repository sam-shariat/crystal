import React, { useEffect } from 'react';
import {
  Button,
  Box,
  useMediaQuery,
  Text,
  Center,
  Stack,
  useColorMode,
  IconButton,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  Tooltip,
  LinkBox,
  LinkOverlay,
  useClipboard,
} from '@chakra-ui/react';
import { VenomFoundation, VenomScanIcon } from 'components/logos';
import { SITE_PROFILE_URL, VENOMSCAN_NFT } from 'core/utils/constants';
import { sleep, truncAddress, capFirstLetter } from 'core/utils';
import { useConnect, useVenomProvider } from 'venom-react-hooks';
import { useAtom, useAtomValue } from 'jotai';
import { Address } from 'everscale-inpage-provider';
import VenomAbi from 'abi/Collection.abi.json';
import { RiLogoutBoxRLine, RiFileCopyLine, RiCheckDoubleFill } from 'react-icons/ri';
import LogoIcon from '../Layout/LogoIcon';
import { primaryNameAtom, venomContractAddressAtom, venomContractAtom } from 'core/atoms';

export default function ConnectButton() {
  const [notMobile] = useMediaQuery('(min-width: 800px)');
  const { login, disconnect, isConnected, account } = useConnect();
  const { provider } = useVenomProvider();
  const { colorMode } = useColorMode();
  const address = account?.address.toString();
  const [primaryName, setPrimaryName] = useAtom(primaryNameAtom);
  const venomContractAddress = useAtomValue(venomContractAddressAtom);
  const [venomContract, setVenomContract] = useAtom(venomContractAtom);
  const { onCopy, hasCopied } = useClipboard(String(address));

  async function getPrimary() {
    if (!provider) return;
    const _venomContract = new provider.Contract(VenomAbi, new Address(venomContractAddress));
    setVenomContract(_venomContract);
    // @ts-ignore: Unreachable code error
    const { value0 } = await _venomContract?.methods.getPrimaryName({ _owner: new Address(String(address)) }).call();
    console.log(value0);
    if (value0) {
      setPrimaryName(value0);
    }
  }

  useEffect(() => {
    async function checkPrimary() {
      if (account && isConnected && provider) {
        if (!provider?.isInitialized) {
          console.log('provider not ready');
          await sleep(1000);
          checkPrimary();
          return;
        }
      }
      getPrimary();
    }
    checkPrimary();
  }, [account]);
  return (
    <>
      <Box>
        {!isConnected ? (
          <Button variant="solid" onClick={login}>
            <Center>
              <VenomFoundation />
              Connect
            </Center>
          </Button>
        ) : (
          <Menu>
            <MenuButton
              as={Button}
              minH={'58px'}
              borderRadius={12}
              bgColor={colorMode === 'light' ? 'whiteAlpha.900' : 'var(--dark)'}
              variant={colorMode === 'light' ? 'solid' : 'outline'}>
              <Center>
                <VenomFoundation />
                <Stack gap={0.5} mx={1}>
                  <Text
                    fontWeight={'semibold'}
                    textAlign={'left'}
                    my={'0 !important'}
                    fontSize="14px">
                    {Math.round(Number(account?.balance) / 10e5) / 10e2} {notMobile ? 'VENOM' : ''}
                  </Text>
                  <Text
                    fontWeight={'semibold'}
                    textAlign={'left'}
                    fontSize="14px"
                    color={primaryName?.name !== '' ? 'var(--venom2)' : 'gray.500'}
                    my={'0 !important'}>
                    {primaryName?.name !== ''
                      ? capFirstLetter(String(primaryName.name))
                      : truncAddress(String(address))}
                  </Text>
                </Stack>
              </Center>
            </MenuButton>
            <MenuList
              width={320}
              py={0}
              borderWidth={1}
              zIndex={199}
              borderColor={'gray.800'}
              bg={colorMode === 'light' ? 'var(--white)' : 'var(--dark)'}>
              <Flex p={5} alignItems="center" gap={1}>
                <VenomFoundation />
                <Stack gap={0.5} mx={1} flexGrow={1}>
                  <Text
                    fontWeight={'semibold'}
                    textAlign={'left'}
                    fontSize="14px"
                    my={'0 !important'}>
                    {primaryName?.name !== ''
                      ? capFirstLetter(String(primaryName.name))
                      : truncAddress(String(address))}
                  </Text>
                  <Text
                    fontWeight={'semibold'}
                    textAlign={'left'}
                    my={'0 !important'}
                    fontSize="14px"
                    color="gray.500">
                    {Math.round(Number(account?.balance) / 10e5) / 10e2} {notMobile ? 'VENOM' : ''}
                  </Text>
                </Stack>
                <Tooltip
                  borderRadius={4}
                  label={<Text p={2}>Copy Address</Text>}
                  color="white"
                  bgColor={'black'}
                  hasArrow>
                  <IconButton onClick={onCopy} variant="ghost" aria-label="copy-venom-address">
                    {hasCopied ? <RiCheckDoubleFill size={22} /> : <RiFileCopyLine size={22} />}
                  </IconButton>
                </Tooltip>
                <Tooltip
                  borderRadius={4}
                  label={<Text p={2}>Disconnect Wallet</Text>}
                  hasArrow
                  color="white"
                  bgColor={'black'}>
                  <IconButton onClick={disconnect} variant="ghost" aria-label="disconnect-wallet">
                    <RiLogoutBoxRLine size={22} />
                  </IconButton>
                </Tooltip>
              </Flex>
              {primaryName.name !== '' && (
                <LinkBox px={5}>
                  <LinkOverlay href={SITE_PROFILE_URL + primaryName.name} target="_blank">
                    <Button borderColor={'gray.800'} gap={2} variant="outline" width={'100%'} size="lg">
                      <LogoIcon />
                      View at VenomID.link
                    </Button>
                  </LinkOverlay>
                </LinkBox>
              )}
              <LinkBox p={5} pt={4}>
                <LinkOverlay href={VENOMSCAN_NFT + address} target="_blank">
                  <Button borderColor={'gray.800'} gap={2} variant="outline" width={'100%'} size="lg">
                    <VenomScanIcon />
                    View on VenomScan
                  </Button>
                </LinkOverlay>
              </LinkBox>
            </MenuList>
          </Menu>
        )}
      </Box>
    </>
  );
}
