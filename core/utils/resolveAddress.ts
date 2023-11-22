import axios from 'axios';

const resolveAddress = async (name:string) => {
  return axios({
    method: 'get',
    url: '/api/name/ownerAddress?name='+name
  });
};

export default resolveAddress;