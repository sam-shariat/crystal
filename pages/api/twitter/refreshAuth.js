import { TWITTER_SCOPES, TWITTER_CALLBACK_URL, TWITTER_ME } from 'core/utils/constants';
import { Client, auth } from 'twitter-api-sdk';
import axios from 'axios';

//const STATE = 'mystate';
async function getAuthClient(token) {
  const authClient = new auth.OAuth2User({
    client_id: process.env.TWITTER_CLIENT_ID,
    client_secret: process.env.TWITTER_CLIENT_SECRET,
    callback: TWITTER_CALLBACK_URL,
    scopes: TWITTER_SCOPES,
    token: { refresh_token: token },
  });
  return authClient;
}

export default async function handler(req, res) {
  try {
    //console.log(req.query)
    if (!req.query.token) {
      res.status(202).json({ status: 'error', message: 'x param is required' });
      process.exit(1);
    }

    const token = Buffer.from(req.query.token, 'base64').toString();
    console.log(token)

    const authClient = await getAuthClient(token);
    const ress = await authClient.refreshAccessToken();
    const _user = await axios({
      url: TWITTER_ME,
      headers: { Authorization: `Bearer ${ress.token.access_token}` },
    });
    const user = Buffer.from(JSON.stringify(_user.data)).toString('base64') ;
    const newtoken = Buffer.from(JSON.stringify({access : ress.token.access_token, refresh: ress.token.refresh_token, ex: ress.token.expires_at})).toString('base64');
    console.log(_user.data);
    if (ress.token) {
      res.status(200).json({
        status: 'ok',
        token: newtoken,
        u: user
      });
    } else {
      res.status(202).json({
        status: 'error',
        message: 'auth error',
      });
    }
  } catch (err) {
    console.error(err);
    res.status(202).json({ status: 'error', message: 'auth error catch' });
  }
}
