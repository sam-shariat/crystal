import axios from 'axios';

const checkPrize = async (owner:string) => {
  return axios({
    method: 'get',
    url: '/api/nfts/checkPrize?ownerAddress='+owner
  });
};

const reqPrize = async (owner:string,name:string,pdate:string) => {
    return axios({
      method: 'get',
      url: '/api/nfts/requestPrize?ownerAddress='+owner+'&name='+name+'&pdate='+pdate
    });
  };

export {checkPrize , reqPrize };