import { sql } from '@vercel/postgres';


export default async function handler(req, res) {
  try {
    //console.log(req.query);
    if (!req.query.ownerAddress || !req.query.name || !req.query.pdate) {
      res.status(202).json({ status: 'error', message: 'ownerAddress param is required' });
      process.exit(1);
    }

    const _owner = String(req.query.ownerAddress).toLowerCase();
    const _name = String(req.query.name).toLowerCase();
    const _pdate = String(req.query.pdate).toLowerCase();

    const winner = {
        winner_wallet: _owner,
        winner_name: _name,
        prize_date: _pdate
      };
  
      await sql`
        INSERT INTO winners (owner, winner_name, prize_date, request_date)
        VALUES (${winner.winner_wallet}, ${winner.winner_name}, ${winner.prize_date}, ${new Date().toISOString().split('T')[0]});`;
    //console.log(rows[0]);
      res.status(200).json({
        status: 'ok'
      });
  } catch (err) {
    console.error(err);
    res.status(202).json({ status: 'error', message: err });
  }
}
