import {
    TLD,
    ROOT_CONTRACT_ADDRESS,
  } from 'core/utils/constants';
  const { TonClient, signerKeys } = require('@eversdk/core');
  const { libNode } = require('@eversdk/lib-node');
  const { Account } = require('@eversdk/appkit');
  const { RootContract } = require('abi/RootContract');
  const { DomainContract } = require('abi/DomainContract');
  const { NftContract } = require('abi/NftContract');
  import axios from 'axios';
  
  let client = null;
  
  async function getClient() {
    if (!client) {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      TonClient.useBinaryLibrary(libNode);
      client = new TonClient({
        network: {
          endpoints: ['https://gql.venom.foundation/graphql'],
        },
      });
    }
    return client;
  }
  
  export default async function handler(req, res) {
    try {
        
      const client = await getClient();
      const keys = await client.crypto.generate_random_sign_keys();
  
      
      const root = new Account(RootContract, {
        signer: signerKeys(keys),
        client,
        address: ROOT_CONTRACT_ADDRESS,
      });
  
      let totalRegistered = await root.runLocal('totalSupply', {
        answerId: 0,
      });

      // let configs = await root.runLocal('getConfigs', {
      //   answerId: 0,
      // });
  
          res.status(200).json({
            total : totalRegistered.decoded.output,
            //configs : configs.decoded.output
          });

     
      
    } catch (err) {
      console.error(err);
      res.status(202).json({ status: 'error', message: 'name does not exist' });
    }
  }
  