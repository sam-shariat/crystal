import { sql } from '@vercel/postgres';


export default async function handler(req, res) {
  try {
    

    const { rows } = await sql`SELECT * FROM winners;`;
    //console.log(rows[0]);
      res.status(200).json({
        nfts: rows
      });
  } catch (err) {
    console.error(err);
    res.status(202).json({ status: 'error', message: err });
  }
}
