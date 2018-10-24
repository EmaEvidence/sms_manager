import handleResponse from '../helpers/handleResponse';
import ContactService from '../service/ContactService';

class Validator {
  contact(req, res, next) {
    const { name, phoneNumber } = req.body;
    if (!name || name.trim().length === 0) {
      handleResponse(res, 400, 'Name must be specified');
    } else if (!phoneNumber || phoneNumber.trim().length !== 11) {
      handleResponse(res, 400, 'Invalid Phone number, Phone number must be 11 digits');
    } else {
      next();
    }
  }

  message(req, res, next) {
    const { message, receiver, sender } = req.body;
    if ((message && typeof message === 'string') && (message.length > 0 && message.length <= 145)
    && (sender && sender.trim().length === 11)
    && (receiver && receiver.trim().length === 11) && receiver.trim() !== sender.trim() ) {
      next();
    } else if (!sender || sender.trim().length !== 11)  {
      handleResponse(res, 400, 'Invalid Sender\'s Phone number, Phone number must be 11 digits');
    } else if (!receiver || receiver.trim().length !== 11) {
      handleResponse(res, 400, 'Invalid Receiver\'s Phone number, Phone number must be 11 digits');
    } else if (!message || message.length === 0 || message.length > 145) {
      handleResponse(res, 400, 'Invalid Message, Message must be more than a character and less than 145 characters');
    } else if (receiver.trim() === sender.trim()) {
      handleResponse(res, 400, 'Sender and Receiver can not be the same');
    }
  }

  phone(req, res, next) {
    const bodyPhoneNumber = req.body.phoneNumber;
    const paramsPhoneNumber = req.params.phoneNumber;
    const phoneNumber = bodyPhoneNumber || paramsPhoneNumber;
    if (!phoneNumber || phoneNumber.trim().length !== 11) {
      handleResponse(res, 400, 'Invalid Phone number, Phone number must be 11 digits');
    } else {
      next();
    }
  }

  checkIfContactExist(req, res, next) {
    const { receiver, sender } = req.body;
    ContactService.get()
    .then(() => {
      ContactService.get()
      .then(() => {

      })
      .catch(() => {

      })
    })
    .catch(() => {

    })
  }
}

export default Validator;
