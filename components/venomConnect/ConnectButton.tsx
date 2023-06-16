import { Button, Box, useMediaQuery, Text, Center } from '@chakra-ui/react';
import { VenomFoundation } from 'components/logos';
import { truncAddress } from 'core/utils';
import { useAtom, useAtomValue } from 'jotai';
import {
  walletAtom,
  addressAtom,
  balanceAtom,
  venomProviderAtom,
  venomSProviderAtom,
  venomContractAtom,
  venomContractAddressAtom,
  isConnectedAtom,
} from 'core/atoms';
import VenomAbi from 'abi/Collection.abi.json';
import { Address, ProviderRpcClient } from 'everscale-inpage-provider';
import React, { useEffect } from 'react';

export default function ConnectButton() {
  const [notMobile] = useMediaQuery('(min-width: 800px)');
  const VenomContractAddress = useAtomValue(venomContractAddressAtom);
  const venomConnect = useAtomValue(walletAtom);
  const [isConnected, setIsConnected] = useAtom(isConnectedAtom);

  const login = async () => {
    if (!venomConnect) return;
    console.log('connecting ...', venomConnect.getStandalone());
    console.log('current :', venomConnect.currentProvider);
    await venomConnect.connect();
  };

  const [venomProvider, setVenomProvider] = useAtom(venomProviderAtom);
  const [venomSProvider, setVenomSProvider] = useAtom(venomSProviderAtom);
  const [venomContract, setVenomContract] = useAtom(venomContractAtom);
  const [address, setAddress] = useAtom(addressAtom);
  const [balance, setBalance] = useAtom(balanceAtom);

  // This method allows us to gen a wallet address from inpage provider
  const getAddress = async (provider: any) => {
    const providerState = await provider?.getProviderState?.();
    return providerState?.permissions.accountInteraction?.address.toString();
  };

  // This function will call walletOf function of TokenRoot contract, to obtain TokenWallet of connecte4d user.

  // Same idea for token balance fetching. Usage of standalone client and balance method of TIP-3 TokenWallet
  // We already knows user's TokenWallet address
  const getBalance = async (wallet: string) => {
    try {
      if (!venomConnect) return;
      const standalone: ProviderRpcClient | undefined = await venomConnect?.getStandalone(
        'venomwallet'
      );
      if (standalone) {
        console.log('standalone set', standalone);
        setVenomSProvider(standalone);
        const nativeBalance = await standalone.getBalance(new Address(address));
        setBalance(nativeBalance);
        console.log('balance is', nativeBalance);
      } else {
        alert('Standalone is not available now');
      }
    } catch (e) {
      console.log('error balance', e);
    }
  };

  // Any interaction with venom-wallet (address fetching is included) needs to be authentificated
  const checkAuth = async (_venomConnect: any) => {
    try {
      const auth = await _venomConnect?.checkAuth();
      console.log('auth : ', auth);
      if (auth) await getAddress(_venomConnect);
    } catch (e) {
      console.log('auth error ', e);
    }
  };

  // This handler will be called after venomConnect.login() action
  // connect method returns provider to interact with wallet, so we just store it in state
  const onConnect = async (provider: any) => {
    try {
      console.log('provider ', provider);
      if(!provider) return
      setIsConnected(true);
      console.log('connected');
      setVenomProvider(provider);
      console.log('provider set');
      const venomWalletAddress = provider ? await getAddress(provider) : undefined;
      setAddress(venomWalletAddress);
      console.log('address set');
      const _venomContract = new provider.Contract(VenomAbi, new Address(VenomContractAddress));
      setVenomContract(_venomContract);
      console.log("venomid contract set",_venomContract)
    } catch (e) {
      console.log(e);
    }
  };

  // This handler will be called after venomConnect.disconnect() action
  // By click logout. We need to reset address and balance.
  const onDisconnect = async () => {
    venomProvider?.disconnect();
    setAddress('');
    setIsConnected(false);
    setBalance('');
  };

  // When our provider is ready, we need to get address and balance from.

  useEffect(() => {
    // connect event handler
    //const off = venomConnect?.on('connect', onConnect);
    function auth() {
      //venomConnect?.on('extension-auth', onConnect);
      venomConnect?.on('connect', onConnect);
      if (venomConnect) {
        checkAuth(venomConnect);
      }
    }
    if (venomConnect && !isConnected) {
      auth();
    }
  }, [venomConnect]);

  // Hook for balance setup
  useEffect(() => {
    if (address) getBalance(address);
  }, [address]);

  return (
    <>
      <Box>
        {!address ? (
          <Button variant="solid" onClick={login}>
            <Center>
              <VenomFoundation />
              Connect
            </Center>
          </Button>
        ) : (
          <Button variant="solid" onClick={onDisconnect}>
            <Center>
              <VenomFoundation />
              <Text mx={2} color="var(--venom1)">
                {Math.round(Number(balance) / 10e5) / 10e2}
              </Text>
              {notMobile && truncAddress(address)}
            </Center>
          </Button>
        )}
      </Box>
    </>
  );
}
