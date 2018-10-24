import { Router } from 'express';
import Message from '../controllers/Message';
import Contact from '../controllers/Contact';
import Validator from '../middleware/Validator';
import checkReceiver from '../middleware/checkReceiver';
import checkSender from '../middleware/checkSender';

const validator = new Validator();
const contact = new Contact();
const message = new Message();

const Route = Router();

Route.get('/', (req, res) => {
  res.json({
    message: 'Welcome to SMS Manager'
  }).status(200);
});

Route.post('/addContact', validator.contact, contact.add);

Route.get('/getAll', contact.getAll);

Route.get('/getContact/:phoneNumber', validator.phone, contact.get);

Route.get('/sentMessages/:phoneNumber', validator.phone, contact.getAllSentByContact);

Route.get('/receivedMessages/:phoneNumber', validator.phone, contact.getAllReceivedByContact);

Route.post('/message', validator.message, checkReceiver, checkSender, message.add);

Route.delete('/contact', validator.phone, contact.delete);

export default Route;
