import Contact from '../service/ContactService';
import handleResponse from '../helpers/handleResponse';

const contact = new Contact();

const checkSender = (req, res, next) => {
  const { sender } = req.body;
  contact.get({ phoneNumber: sender })
  .then((response) => {
    if (!response) {
      return handleResponse(res, 400, 'Sender not found');
    }
    req.body.senderId = response.dataValues.id;
    next();
  })
  .catch((error) => {
    return handleResponse(res, 400, 'Error validating Sender');
  });
};

export default checkSender;
