import Contact from '../service/ContactService';
import handleResponse from '../helpers/handleResponse';

const contact = new Contact();

const checkReceiver = (req, res, next) => {
  const { receiver } = req.body;
  contact.get({ phoneNumber: receiver })
  .then((response) => {
    if (!response) {
      return handleResponse(res, 400, 'Receiver not found');
    }
    req.body.receiverId = response.dataValues.id;
    next();
  })
  .catch((error) => {
    return handleResponse(res, 400, 'Error validating Receiver');
  });
};

export default checkReceiver;
