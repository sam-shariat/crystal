import axios from 'axios';

export const getTwitterAuthUrl = (state:string) => {
  return axios({
    method: 'get',
    url: `/api/twitter/authUrl?state=${state}`,
  });
};

export const refreshAccessToken = (refreshToken:string) => {
  const _refreshToken = Buffer.from(refreshToken).toString('base64') ;
  return axios({
    method: 'get',
    url: `/api/twitter/refreshAuth?token=${_refreshToken}`,
  });
};
