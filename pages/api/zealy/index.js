import { ZEALY_USERS_API } from 'core/utils/constants';
import axios from 'axios';


export default async function handler(req, res) {
  try {
    //console.log(req.query)
    if (!req.query.Id) {
      res.status(202).json({ status: 'error', message: 'x param is required' });
      process.exit(1);
    }

    const Id = Buffer.from(req.query.Id, 'base64').toString();
    //console.log(Id)

    const _user = await axios({
      url: ZEALY_USERS_API + '?twitterId=' + Id,
      headers: { 'x-api-key': process.env.ZEALY_API_KEY },
    });

    if (_user.data) {
      res.status(200).json({
        status: 'ok',
        data: _user.data
      });
    } else {
      res.status(202).json({
        status: 'error',
        message: 'fetch error',
      });
    }
  } catch (err) {
    //console.error(err);
    res.status(202).json({ status: 'error', message: 'fetch error catch' });
  }
}
