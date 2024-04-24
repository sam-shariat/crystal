import { sql } from '@vercel/postgres';


export default async function handler(req, res) {
  try {
    //console.log(req.query);
    await sql`DROP TABLE IF EXISTS winners;`;
    const results = await sql`CREATE TABLE winners (
        owner VARCHAR(255),
        winner_name VARCHAR(255),
        prize VARCHAR(255),
        prize_date VARCHAR(255),
        request_date DATE,
        completed_date DATE,
        completed_tx VARCHAR(255)
      );`;

    //console.log(rows[0]);
      res.status(200).json({
        results
      });
  } catch (err) {
    console.error(err);
    res.status(202).json({ status: 'error', message: err });
  }
}
