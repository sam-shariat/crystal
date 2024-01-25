import { TWITTER_CALLBACK_URL, TWITTER_SCOPES, TWITTER_ME } from 'core/utils/constants';
import { Client, auth } from 'twitter-api-sdk';
import axios from 'axios';

async function getAuthClient() {
  const authClient = new auth.OAuth2User({
    client_id: process.env.TWITTER_CLIENT_ID,
    client_secret: process.env.TWITTER_CLIENT_SECRET,
    callback: TWITTER_CALLBACK_URL,
    scopes: TWITTER_SCOPES,
  });
  return authClient;
}

const STATE = 'mystate';

export default async function handler(req, res) {
  try {
    const { code, state } = req.query;
    //console.log(req.query);
    // if(!req.query.ownerAddress){
    //   res.status(202).json({status:'error',message:'ownerAddress(string) param is required'});
    //   process.exit(1);
    // };

    const authClient = await getAuthClient();
    const authUrl = authClient.generateAuthURL({
      state: state,
      code_challenge_method: 'plain',
      code_challenge: btoa(state),
    });

    //console.log(authUrl);

    try {
      //if (state !== STATE) return res.status(500).send("State isn't matching");
      //console.log(code);
      const _token = await authClient.requestAccessToken(String(code));
      const token = Buffer.from(JSON.stringify({access : _token.token.access_token, refresh: _token.token.refresh_token, ex: _token.token.expires_at})).toString('base64');
      console.log(token);
      const _user = await axios({url : TWITTER_ME, headers : { 'Authorization' : `Bearer ${_token.token.access_token}`}});
      console.log(_user.data)
      const user = Buffer.from(JSON.stringify(_user.data)).toString('base64') ;
      console.log(user);
      res.redirect(`/auth?auth=x&status=ok&code=${code}&state=${state}&token=${token}&u=${user}`);
    } catch (error) {
      res.redirect(`/auth?auth=x&status=error`);
    }
  } catch (err) {
    console.error(err);
    res.redirect(`/community?auth=x&status=error`);
  }
}
