import { VenomConnect } from 'venom-connect';
import { ProviderRpcClient } from 'everscale-inpage-provider';
import { EverscaleStandaloneClient } from 'everscale-standalone-client';
import { useAtom } from 'jotai';
import { networkIdAtom } from 'core/atoms';

const standaloneFallback = () =>
  EverscaleStandaloneClient.create({
    connection: {
      id: 1,
      group: 'venom_mainnet',
      type: 'jrpc',
      data: {
        endpoint: 'https://jrpc.venom.foundation/rpc',
      },
    },
  });

export const initVenomConnect = async () => {  
  return new VenomConnect({
    theme: 'dark',
    checkNetworkId: 1,
    providersOptions: {
      venomwallet: {
        walletWaysToConnect: [
          {
            // NPM package
            package: ProviderRpcClient,
            packageOptions: {
              fallback:
                VenomConnect.getPromise('venomwallet', 'extension') || (() => Promise.reject()),
              forceUseFallback: true,
            },
            packageOptionsStandalone: {
              fallback: standaloneFallback,
              forceUseFallback: true,
            },

            // Setup
            id: 'extension',
            type: 'extension',

            // name: "Custom Name",
            // logo: "",

            // High-level setup
            // options: ,
            // connector: ,
            // authConnector: ,
          },
          {
            // NPM package
            package: ProviderRpcClient,
            packageOptions: {
              fallback:
                VenomConnect.getPromise('venomwallet', 'mobile') || (() => Promise.reject()),
              forceUseFallback: true,
            },
            packageOptionsStandalone: {
              fallback: standaloneFallback,
              forceUseFallback: true,
            },

            // Setup
            id: 'mobile',
            type: 'mobile',

            // name: "Custom Name",
            // logo: "",

            // High-level setup
            // options: ,
            // connector: ,
            // authConnector: ,
          },
        ],
        defaultWalletWaysToConnect: [
          // List of enabled options
          'mobile',
          'ios',
          'android',
        ],
      },
      oneartwallet: {
        walletWaysToConnect: [
          {
            // NPM package
            package: ProviderRpcClient,
            packageOptions: {
              fallback:
                VenomConnect.getPromise('oneartwallet', 'extension') || (() => Promise.reject()),
              forceUseFallback: true,
            },
            packageOptionsStandalone: {
              fallback: standaloneFallback,
              forceUseFallback: true,
            },

            // Setup
            id: 'extension',
            type: 'extension',
          },
        ],
        defaultWalletWaysToConnect: [
          // List of enabled options
          'mobile',
          'ios',
          'android',
        ],
      },
    },
  });
};
