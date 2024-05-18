import axios from 'axios';

const getRootConfigs = async (address:string) => {
  return axios({
    method: 'get',
    url: '/api/nfts/root'
  });
};

export default getRootConfigs;