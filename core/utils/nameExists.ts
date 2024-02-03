import axios from 'axios';

const doesNameExists = async (name:string) => {
  return axios({
    method: 'get',
    url: '/api/name/exists?name='+name
  });
};

export default doesNameExists;