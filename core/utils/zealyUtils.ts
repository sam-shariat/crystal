import axios from 'axios';

export const getZealyByTwitterId = (twitterId: string) => {
  if(twitterId === '') return false
  const Id = Buffer.from(twitterId).toString('base64');
  return axios({
    method: 'get',
    url: `/api/zealy?Id=${Id}`,
  });
};
