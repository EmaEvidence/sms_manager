import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const username = process.env.SMSUSERNAME;
const password = process.env.SMSPASSWORD;

const url = 'http://portal.bulksmsnigeria.net/api/?username='

const sendSms = (payload, done) => {
  axios.get(`${url}${username}&password=${password}&message=${payload.message}&sender=${payload.sender}&mobiles=${payload.receiver}`)
    .then((response) => {
      done('Sent');
    })
    .catch((error) => {
      done('Not Sent');
    })
};

export default sendSms;
