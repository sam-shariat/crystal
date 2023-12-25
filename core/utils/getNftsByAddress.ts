import axios from 'axios';

const getNftsByAddress = async (address:string) => {
  return axios({
    method: 'get',
    url: '/api/nfts?ownerAddress='+address
  });
};

export default getNftsByAddress;