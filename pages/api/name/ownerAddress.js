import {
  CONTRACT_ADDRESS,
  CONTRACT_ADDRESS_V1,
  CONTRACT_ADDRESS_V2,
  ZERO_ADDRESS,
} from 'core/utils/constants';
const { TonClient, signerKeys } = require('@eversdk/core');
const { libNode } = require('@eversdk/lib-node');
const { Account } = require('@eversdk/appkit');
const { CollectionContract } = require('abi/CollectionContract');
const { NftContract } = require('abi/NftContract');

let client = null;

async function getClient() {
  if (!client) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    TonClient.useBinaryLibrary(libNode);
    client = new TonClient({
      network: {
        endpoints: ['https://gql-testnet.venom.foundation/graphql'],
      },
    });
  }
  return client;
}

export default async function handler(req, res) {
  try {
    // console.log(req.query);
    if (!req.query.name) {
      res.status(202).json({ status: 'error', message: 'name param is required' });
      process.exit(1);
    }

    let _name;
    if (String(req.query.name).toLowerCase().includes('.vid')) {
      _name = String(req.query.name).toLowerCase().slice(0, -4);
    } else {
      _name = String(req.query.name).toLowerCase();
    }
    const name = _name;

    const client = await getClient();
    const keys = await client.crypto.generate_random_sign_keys();

    const collection = new Account(CollectionContract, {
      signer: signerKeys(keys),
      client,
      address: CONTRACT_ADDRESS,
    });

    const collectionv1 = new Account(CollectionContract, {
      signer: signerKeys(keys),
      client,
      address: CONTRACT_ADDRESS_V1,
    });

    const collectionv2 = new Account(CollectionContract, {
      signer: signerKeys(keys),
      client,
      address: CONTRACT_ADDRESS_V2,
    });

    let response = await collection.runLocal('getInfoByName', { name: String(name) });
    if (response.decoded.output.value0?.owner) {
      // res.setHeader('Content-Type','text/plain');
      if (response.decoded.output.value0?.owner !== ZERO_ADDRESS) {
        res.status(200).send(response.decoded.output.value0?.owner);
      } else {
        let responsev1 = await collectionv1.runLocal('getInfoByName', { name: String(name) });
        if (responsev1.decoded.output.value0?.owner !== ZERO_ADDRESS) {
          res.status(200).send(responsev1.decoded.output.value0?.owner);
        } else {
          let responsev2 = await collectionv2.runLocal('getInfoByName', { name: String(name) });
          if (responsev2.decoded.output.value0?.owner !== ZERO_ADDRESS) {
            res.status(200).send(responsev2.decoded.output.value0?.owner);
          } else {
            res.status(202).json({ status: 'error', message: 'name does not exist' });
          }
        }
      }
    }
  } catch (err) {
    console.error(err);
    res.status(202).json({ status: 'error', message: 'name does not exist' });
  }
}
