import { sql } from '@vercel/postgres';


export default async function handler(req, res) {
  try {
    //console.log(req.query);
    if (!req.query.ownerAddress) {
      res.status(202).json({ status: 'error', message: 'ownerAddress param is required' });
      process.exit(1);
    }

    const _owner = String(req.query.ownerAddress).toLowerCase();
    const { rows } = await sql`SELECT * FROM vids WHERE owner = ${_owner};`;
    //console.log(rows[0]);
      res.status(200).json({
        nfts: rows
      });
  } catch (err) {
    console.error(err);
    res.status(202).json({ status: 'error', message: err });
  }
}
