import { NextApiRequest, NextApiResponse } from 'next';

var nodemailer = require('nodemailer');

async function sendMail(subject: string, toEmail: string, otpText: string) {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.NEXT_PUBLIC_MAIL_USER,
      pass: process.env.NEXT_PUBLIC_MAIL_PASS,
    },
  });

  var mailOptions = {
    from: process.env.NEXT_PUBLIC_MAIL_USER,
    to: toEmail,
    subject: subject,
    text: otpText,
    html: otpText,
  };

  await new Promise((resolve, reject) => {
    // send mail
    transporter.sendMail(mailOptions, (err: any, response: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(response);
      }
    });
  });
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { method } = req;
    switch (method) {
      case 'POST': {
        //Do some thing
        await sendMail(req.body.subject, `${req.body.email},${process.env.NEXT_PUBLIC_MAIL_CC}`, req.body.message);
        res.status(200).send('Success');
        break;
      }
      default:
        res.setHeader('Allow', ['POST', 'GET', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${method} Not Allowed`);
        break;
    }
  } catch (err: any) {
    res.status(400).json({
      error_code: 'mail_error',
      message: err.message,
    });
  }
};

export default handler;
