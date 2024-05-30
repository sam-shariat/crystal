import {
    TLD,
    ROOT_CONTRACT_ADDRESS,
} from 'core/utils/constants';
const { TonClient, signerKeys } = require('@eversdk/core');
const { libNode } = require('@eversdk/lib-node');
const { Account } = require('@eversdk/appkit');
const { RootContract } = require('abi/RootContract');
const { NftContract } = require('abi/NftContract');
const { DomainContract } = require('abi/DomainContract');

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
        if (!req.query.address && !req.query.name) {
            res.status(202).json({ status: 'error', message: 'address(string) or name(string) param is required' });
            process.exit(1);
        };

        const __ownerAddress = req.query.address ?? 'not set';
        const __name = req.query.name ?? 'not set';
        const __details = req.query.details ?? 'not set';

        const client = await getClient();
        const keys = await client.crypto.generate_random_sign_keys();


        const root = new Account(RootContract, {
            signer: signerKeys(keys),
            client,
            address: ROOT_CONTRACT_ADDRESS,
        });


        if (__ownerAddress !== 'not set') {

            let _codeHash = await root.runLocal('expectedCertificateCodeHash', {
                target: __ownerAddress,
                sid: 1,
                answerId: 0,
            });

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
            const result = (await client.net.query({ query })).result;
            if (result.data.accounts.length > 0) {
                const nft = new Account(NftContract, {
                    signer: signerKeys(keys),
                    client,
                    address: result.data.accounts[0].id,
                });

                let json = await nft.runLocal('getJson', {
                    answerId: 0,
                    type: 0
                });

                let data = JSON.parse(json.decoded.output.json);

                if(__details !== 'not set'){
                    res.status(200).json({data})
                } else {
                    res.status(200).send(data.name);
                }
            } else {
                res.status(200).json({ status: 'error', message: 'owner does not own a venom id' });

            }
        }

        if (__name !== 'not set') {

            const name = String(req.query.name).toLowerCase().includes('.venom') ? String(req.query.name).toLowerCase().replace('.venom', '') : String(req.query.name).toLowerCase();
            const name_ = String(name).includes('.vid') ? String(name).replace('.vid', '') : String(name);
            const _name = String(name_).toLowerCase();


            let certificateAddr = await root.runLocal('resolve', {
                path: String(_name) + '.' + TLD,
                answerId: 0,
            });

            //console.log(String(_name) + '.' + TLD)
            //console.log(certificateAddr)

            const domainContract = new Account(DomainContract, {
                signer: signerKeys(keys),
                client,
                address: String(certificateAddr.decoded.output.certificate),
            });

            //console.log(certificateAddr.decoded.output.certificate)

            let nftAddress = '';
            let type = 'nft';

            try {
                // @ts-ignore: Unreachable code error
                let status = await domainContract.runLocal('getStatus', {
                    answerId: 0,
                });
                if (String(status.decoded.output.status)) {
                    nftAddress = String(certificateAddr.decoded.output.certificate);
                    type = 'domain';
                }
            } catch (e) { }

            if (nftAddress !== '') {
                //console.log('address : ',nftAddress);

                const nft = new Account(NftContract, {
                    signer: signerKeys(keys),
                    client,
                    address: nftAddress,
                });

                let responseJson = await nft.runLocal('getJson', { answerId: 0 });
                let json = JSON.parse(responseJson.decoded.output.json);
                if (__details !== 'not set') {
                    res.status(200).json({
                        data: json
                    });
                } else {
                    res.status(200).send(
                        json.target
                    );
                }
            } else {
                res.status(200).json({ status: 'error', message: 'name not exists' });
            }

        }

    } catch (err) {
        console.error(err);
        res.status(202).json({ status: 'error', message: 'owner does not own a venom id' });

    }
}