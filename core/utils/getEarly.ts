import axios from 'axios';

const getEarly = async (address:string) => {
  return axios({
    method: 'get',
    url: '/api/owner?ownerAddress='+address
  });
};

export default getEarly;