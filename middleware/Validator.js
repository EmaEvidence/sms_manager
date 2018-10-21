import handleResponse from '../helpers/handleResponse';

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

  message() {

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
}

export default Validator;
