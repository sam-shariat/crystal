import { Button, Box, useMediaQuery, Text } from '@chakra-ui/react';
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
  const VenomContractAddress = useAtomValue(venomContractAddressAtom)
  const venomConnect = useAtomValue(walletAtom);
  const [isConnected,setIsConnected] = useAtom(isConnectedAtom);
  const login = async () => {
    if (!venomConnect) return;
    console.log('connecting ...', venomConnect.getStandalone());
    console.log('current :', venomConnect.currentProvider);
    await venomConnect.connect();
  };
  const [venomProvider, setVenomProvider] = useAtom(venomProviderAtom);
  const [venomSProvider, setVenomSProvider] = useAtom(venomSProviderAtom);
  const [venomContract,setVenomContract] = useAtom(venomContractAtom);
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
    if (!venomConnect) return;
    const standalone: ProviderRpcClient | undefined = await venomConnect?.getStandalone(
      'venomwallet'
    );
    if (standalone) {
      setVenomSProvider(standalone);
      const nativeBalance = await standalone.getBalance(new Address(address));
      setBalance(nativeBalance);
      // if (!tokenWalletAddress) {
      //   await setupTokenWalletAddress(standalone, wallet);
      // }
      // if (!venomProvider || !tokenWalletAddress) return;
      // try {
      //   const contractAddress = new Address(tokenWalletAddress);
      //   const contract = new standalone.Contract(tokenWalletAbi, contractAddress);
      //   // We check a contract state here to acknowledge if TokenWallet already deployed
      //   // As you remember, wallet can be deployed with first transfer on it.
      //   // If our wallet isn't deployed, so it's balance is 0 :)
      //   const contractState = await venomProvider.rawApi.getFullContractState({
      //     address: tokenWalletAddress,
      //   });
      //   if (contractState.state) {
      //     // But if this deployed, just call a balance function
      //     const result = (await contract.methods.balance({ answerId: 0 } as never).call()) as any;
      //     const tokenBalance = result.value0; // It will be with decimals. Format if you want by dividing with 10**decimals
      //     setBalance(tokenBalance);
      //     console.log(tokenBalance);
      //   } else {
      //     setBalance('0');
      //   }
      // } catch (e) {
      //   console.error(e);
      // }
    } else {
      alert('Standalone is not available now');
    }
  };

  // Any interaction with venom-wallet (address fetching is included) needs to be authentificated
  const checkAuth = async (_venomConnect: any) => {
    const auth = await _venomConnect?.checkAuth();
    if (auth) await getAddress(_venomConnect);
  };

  // This handler will be called after venomConnect.login() action
  // connect method returns provider to interact with wallet, so we just store it in state
  const onConnect = async (provider: any) => {
    const venomWalletAddress = provider ? await getAddress(provider) : undefined;
    setAddress(venomWalletAddress);
    console.log(provider)
    const _venomContract = provider ? new provider.Contract(VenomAbi, VenomContractAddress) : undefined;
    setVenomContract(_venomContract);
    setVenomProvider(provider);
    setIsConnected(true);
    await onProviderReady(provider);
  };

  // This handler will be called after venomConnect.disconnect() action
  // By click logout. We need to reset address and balance.
  const onDisconnect = async () => {
    venomProvider?.disconnect();
    setAddress("");
    setIsConnected(false);
    setBalance("");
  };

  // When our provider is ready, we need to get address and balance from.
  const onProviderReady = async (provider: any) => {
    const venomWalletAddress = provider ? await getAddress(provider) : undefined;
    setAddress(venomWalletAddress);
    const _venomContract = provider ? new provider.Contract(VenomAbi, VenomContractAddress) : undefined;
    setVenomContract(_venomContract);
    console.log(_venomContract);
    console.log(venomWalletAddress);
  };

  useEffect(() => {
    // connect event handler
    const off = venomConnect?.on('connect', onConnect);
    if (venomConnect) {
      checkAuth(venomConnect);
    }
    // just an empty callback, cuz we don't need it
    return () => {
      off?.();
    };
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
          <VenomFoundation />
          Connect
        </Button>
      ) : (
        <Button variant="solid" onClick={onDisconnect}>
          <VenomFoundation />
          <Text mx={2} color="var(--venom1)">
            {Math.round(Number(balance) / 10e5) / 10e2}
          </Text>
          {notMobile && truncAddress(address)}
        </Button>
      )}
      </Box>
    </>
  );
}
