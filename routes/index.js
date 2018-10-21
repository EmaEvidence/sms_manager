import { Router } from 'express';
import Message from '../controllers/Message';
import Contact from '../controllers/Contact';
import Validator from '../middleware/Validator';

const Route = Router();

Route.get('/', (req, res) => {
  res.json({
    message: 'Welcome to SMS Manager'
  }).status(200);
});

Route.post('/addContact', Validator.contact, Contact.add);

Route.get('/sentMessages', Validator.phone, Message.getAllSentForContact);

Route.get('/recievedMessages', Validator.phone, Message.getAllRecievedForContact);

Route.post('/sendMessage', Validator.message, Message.add);

Route.delete('/contact/:phoneNumber', Validator.phone, Contact.delete);

export default Route;
