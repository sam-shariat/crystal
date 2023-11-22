import axios from 'axios';

const sendEmail = async (subject:string, email:string, message:string) => {
  return axios({
    method: 'post',
    url: '/api/mail',
    data: {
      email: email,
      subject: subject,
      message: message,
    },
  });
};

export default sendEmail;