import { Router } from 'express';
import Message from '../controllers/Message';
import Contact from '../controllers/Contact';
import Validator from '../middleware/Validator';

const validator = new Validator();
const contact = new Contact();

const Route = Router();

Route.get('/', (req, res) => {
  res.json({
    message: 'Welcome to SMS Manager'
  }).status(200);
});

Route.post('/addContact', validator.contact, contact.add);

Route.get('/getAll', contact.getAll);

Route.get('/getContact/:phoneNumber', validator.phone, contact.get);

// Route.get('/sentMessages', Validator.phone, Message.getAllSentForContact);

// Route.get('/recievedMessages', Validator.phone, Message.getAllRecievedForContact);

// Route.post('/sendMessage', Validator.message, Message.add);

Route.delete('/contact', validator.phone, contact.delete);

export default Route;
