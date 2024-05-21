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

const saltCode = async (client,userAddress,contractAddress) => {
    const INDEX_BASE_64 =
      'te6ccgECIAEAA4IAAgE0AwEBAcACAEPQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAgaK2zUfBAQkiu1TIOMDIMD/4wIgwP7jAvILHAYFHgOK7UTQ10nDAfhmifhpIds80wABn4ECANcYIPkBWPhC+RDyqN7TPwH4QyG58rQg+COBA+iogggbd0CgufK0+GPTHwHbPPI8EQ4HA3rtRNDXScMB+GYi0NMD+kAw+GmpOAD4RH9vcYIImJaAb3Jtb3Nwb3T4ZNwhxwDjAiHXDR/yvCHjAwHbPPI8GxsHAzogggujrde64wIgghAWX5bBuuMCIIIQR1ZU3LrjAhYSCARCMPhCbuMA+EbycyGT1NHQ3vpA0fhBiMjPjits1szOyds8Dh8LCQJqiCFus/LoZiBu8n/Q1PpA+kAwbBL4SfhKxwXy4GT4ACH4a/hs+kJvE9cL/5Mg+GvfMNs88gAKFwA8U2FsdCBkb2Vzbid0IGNvbnRhaW4gYW55IHZhbHVlAhjQIIs4rbNYxwWKiuIMDQEK103Q2zwNAELXTNCLL0pA1yb0BDHTCTGLL0oY1yYg10rCAZLXTZIwbeICFu1E0NdJwgGOgOMNDxoCSnDtRND0BXEhgED0Do6A34kg+Gz4a/hqgED0DvK91wv/+GJw+GMQEQECiREAQ4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAD/jD4RvLgTPhCbuMA0x/4RFhvdfhk0ds8I44mJdDTAfpAMDHIz4cgznHPC2FeIMjPkll+WwbOWcjOAcjOzc3NyXCOOvhEIG8TIW8S+ElVAm8RyM+EgMoAz4RAzgH6AvQAcc8LaV4gyPhEbxXPCx/OWcjOAcjOzc3NyfhEbxTi+wAaFRMBCOMA8gAUACjtRNDT/9M/MfhDWMjL/8s/zsntVAAi+ERwb3KAQG90+GT4S/hM+EoDNjD4RvLgTPhCbuMAIZPU0dDe+kDR2zww2zzyABoYFwA6+Ez4S/hK+EP4QsjL/8s/z4POWcjOAcjOzc3J7VQBMoj4SfhKxwXy6GXIz4UIzoBvz0DJgQCg+wAZACZNZXRob2QgZm9yIE5GVCBvbmx5AELtRNDT/9M/0wAx+kDU0dD6QNTR0PpA0fhs+Gv4avhj+GIACvhG8uBMAgr0pCD0oR4dABRzb2wgMC41OC4yAAAADCD4Ye0e2Q==';
    // Gettind a code from Index StateInit
    const code =  (await client.boc.get_code_from_tvc({tvc:INDEX_BASE_64})).code;
    console.log(code);
    // Salt structure that we already know
    const saltStruct = [
      { name: 'collection', type: 'address' },
      { name: 'owner', type: 'address' },
      { name: 'type', type: 'fixedbytes3' }, // according on standards, each index salted with string 'nft'
    ];

    const { code: saltedCode } = await client.boc.set_code_salt({
      code: code,
      salt: {
        structure: saltStruct,
        abiVersion: '2.1',
        data: {
          collection: new Address(contractAddress),
          owner: new Address(userAddress),
          type: Buffer.from('nft').toString('base64'),
        },
      },
    });

    return saltedCode;
  };

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

    const saltedCode = await saltCode(client,ownerAddress,ROOT_CONTRACT_ADDRESS);

    console.log('saltedCode');
    console.log(saltedCode);

    const code =  (await client.boc.get_code_from_tvc({tvc:RootContract.tvc})).code;
  

    console.log(code)

    // Then get the hash.
    // https://github.com/tonlabs/ever-sdk/blob/master/docs/reference/types-and-methods/mod_boc.md#get_boc_hash
    const hashCode = (await client.boc.get_boc_hash({boc:code})).hash;
    
    console.log(` code hash: ${hashCode}`)


    const query = `
            query {
              accounts(
                filter:{
                  workchain_id:{
                    eq:0
                  },
                  code_hash:{
                    eq:"${hashCode}"
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

          res.status(200).json({data : JSON.parse(result.data)});
        } else {
          res.status(200).send('nothing');
        }
        
        
    
    
  } catch (err) {
    console.error(err);
    res.status(202).json({status:'error',message:'owner does not own a venom id'});
    
  }
}