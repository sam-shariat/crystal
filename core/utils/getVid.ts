import axios from 'axios';

const getVid = async (address:string) => {
  console.log('/api/owner/name?ownerAddress:',address)
  return axios({
    method: 'get',
    url: '/api/owner/name?ownerAddress='+address
  });
};

export default getVid;