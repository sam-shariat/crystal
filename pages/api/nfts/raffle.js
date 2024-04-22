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
      address: RAFFLE_CONTRACT_ADDRESS,
    });


    const nfts = await Promise.all([...Array(2222)].map(async (indexAddress,i) => {
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
            let out = _nftInfo.decoded.output;
            out.address = String(_nftAddress.decoded.output.nft);

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