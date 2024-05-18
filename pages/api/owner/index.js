import { ROOT_CONTRACT_ADDRESS } from 'core/utils/constants';
const { TonClient, signerKeys } = require('@eversdk/core');
const { libNode } = require('@eversdk/lib-node');
const { Account } = require('@eversdk/appkit');
const { RootContract } = require('abi/RootContract');
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

export default async function handler(req, res) {
  try {
    // console.log(req.query)
    if(!req.query.ownerAddress){
      res.status(202).json({status:'error',message:'ownerAddress(string) param is required'});
      process.exit(1);
    };

    const ownerAddress = req.query.ownerAddress;

    const client = await getClient();
    const keys = await client.crypto.generate_random_sign_keys();


    const root = new Account(RootContract, {
      signer: signerKeys(keys),
      client,
      address: ROOT_CONTRACT_ADDRESS,
    });

    let _codeHash = await root.runLocal('expectedCertificateCodeHash', {
      target: ownerAddress,
      sid: 1,
      answerId: 0,
    });

    
    const codeHash_ = _codeHash.decoded.output.codeHash;
    //console.log(codeHash_);
    const codeHash = BigInt(_codeHash.decoded.output.codeHash).toString(16).padStart(64, '0')

    const query = `
            query {
              accounts(
                filter:{
                  workchain_id:{
                    eq:0
                  },
                  code_hash:{
                    eq:"${codeHash}"
                  }
                  last_paid:{
                    ge:1688684221
                  }
                }
                orderBy:[
                  {path:"last_paid", direction:ASC}      
                  {path:"id", direction:ASC}
                ]
              ){
                id
                balance(format:DEC)
                last_paid
              }
            }`
        const result  = (await client.net.query({query})).result;
        if(result.data.accounts.length > 0){
          const nft = new Account(NftContract, {
            signer: signerKeys(keys),
            client,
            address: result.data.accounts[0].id,
          });
      
          let json = await nft.runLocal('getJson', {
            answerId: 0,
            type:0
          });
      

          res.status(200).json({data : JSON.parse(json.decoded.output.json)});
        } else {
          res.status(200).send('');
        }
        
        
    
    
  } catch (err) {
    console.error(err);
    res.status(202).json({status:'error',message:'owner does not own a venom id'});
    
  }
}