import { RAFFLE_CONTRACT_ADDRESS } from 'core/utils/constants';
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
        endpoints: ['https://gql.venom.foundation/graphql'],
      },
    });
  }
  return client;
}

const sleep = async (ms) => new Promise((r) => setTimeout(r, ms));


export default async function handler(req, res) {
  try {
    // console.log(req.query)
    
    const client = await getClient();
    const keys = await client.crypto.generate_random_sign_keys();


    const root = new Account(CollectionContract, {
      signer: signerKeys(keys),
      client,
      address: '0:f283ba1b50a520b591f241a8e56ee4b3207d36a7ded0abef0e0f17c8a44ab3fc',
    });


    const nfts = await Promise.all([...Array(1000)].map(async (indexAddress,i) => {
        try {

            if(i % 25 === 0){
                await sleep(1000);
            }

          let _nftAddress = await root.runLocal('nftAddress', {
            id: i,
            answerId: 0,
          });

          //console.log(_nftAddress.decoded.output.nft)

          const nftContract = new Account(NftContract, {
            signer: signerKeys(keys),
            client,
            address: String(_nftAddress.decoded.output.nft),
          });

          //console.log(nftContract)


            const _nftInfo = await nftContract.runLocal('getInfo', {
                answerId: 0
              });

            //console.log(_nftInfo)

          if (_nftInfo) {
            let out = _nftInfo.decoded.output.owner;
            return out;
          } else {
            return {};
          }
          
        } catch (e) {
            console.log(e)
          return {};
        }
      }));

    
    
    res.status(200).json({nfts});
    
    
  } catch (err) {
    console.error(err);
    res.status(202).json({status:'error',message:'owner does not own a venom id'});
    
  }
}