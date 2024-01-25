import { TWITTER_SCOPES, TWITTER_CALLBACK_URL } from 'core/utils/constants';
import { Client, auth } from "twitter-api-sdk";
import axios from 'axios';

//const STATE = 'mystate';
async function getAuthClient() {
  const authClient = new auth.OAuth2User({
    client_id: process.env.TWITTER_CLIENT_ID,
    client_secret: process.env.TWITTER_CLIENT_SECRET,
    callback: TWITTER_CALLBACK_URL,
    scopes: TWITTER_SCOPES,
  });
  return authClient;
}

export default async function handler(req, res) {
  try {
    //console.log(req.query)
    if(!req.query.state){
      res.status(202).json({status:'error',message:'x param is required'});
      process.exit(1);
    };

    const state = String(req.query.state).slice(-24,-4);

    const authClient = await getAuthClient();
    const authUrl = authClient.generateAuthURL({
      state: state,
      code_challenge_method: 'plain',
      code_challenge: btoa(state)
    });

    if (authUrl) {
     res
          .status(200)
          .json({
            status: 'ok',
            auth: authUrl
          });
      
    } else {
      res
        .status(202)
        .json({
          status: 'error',
          message: 'auth error',
        });
    }
  } catch (err) {
    console.error(err);
    res.status(202).json({ status: 'error', message: 'auth error catch' });
  }
}
