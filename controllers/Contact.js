import ContactService from '../service/ContactService';
import handleResponse from '../helpers/handleResponse';
import pruneResponse from '../helpers/pruneResponse';

const contactService = new ContactService();

class Contact {
  add(req, res) {
    const { name, phoneNumber } = req.body;
    contactService.add({name, phoneNumber})
    .then((response) => {
      if (response[1]) {
        return handleResponse(res, 201, 'Contact created', pruneResponse(response[0].dataValues));
      }
      return handleResponse(res, 409, 'Contact already exist');
    })
    .catch((error) => {
      const errorObj = error.errors[0] || {};
      if (errorObj.message === 'phoneNumber must be unique') {
        return handleResponse(res, 409, 'Phone number must be Unique');
      }
      return handleResponse(res, 500, 'Error creating Contact');
    });
  }

  get(req, res) {
    const { phoneNumber } = req.params;
    contactService.get({ phoneNumber })
    .then((response) => {
      if (!response) {
        return handleResponse(res, 404, 'Contacts not found');
      }
      return handleResponse(res, 200, 'Contacts loaded', pruneResponse(response, 'get'));
    })
    .catch(() => {
      return handleResponse(res, 500, 'Error loading Contacts');
    })
  }

  getAll(req, res) {
    contactService.getAll()
    .then((response) => {
      if (response.length === 0) {
        return handleResponse(res, 404, 'Contacts not found');
      }
      return handleResponse(res, 200, 'Contacts loaded', pruneResponse(response));
    })
    .catch((error) => {
      return handleResponse(res, 500, 'Error loading Contacts');
    });
  }

  delete(req, res) {
    const { phoneNumber } = req.body;
    contactService.delete({ phoneNumber })
    .then((response) => {
      if (response === 0) {
        return handleResponse(res, 404, 'Contact not found');
      }
      return handleResponse(res, 200, 'Contact deleted');
    })
    .catch((error) => {
      return handleResponse(res, 500, 'Error deleting Contact');
    });
  }

  getAllSentByContact(req, res) {
    const { phoneNumber } = req.params;
    contactService.getSentMessages(phoneNumber).
      then((response) => {
        if (response.length === 0) {
          return handleResponse(res, 404, 'Messages not found');
        }
        return handleResponse(res, 200, 'Messages loaded', pruneResponse(response));
      })
      .catch((error) => {
        console.log(error)
        return handleResponse(res, 500, 'Error loading Messages');
      });
  }

  getAllReceivedByContact(req, res) {
    const { phoneNumber } = req.params;
    contactService.getSReceivedMessages(phoneNumber).
      then((response) => {
        if (response.length === 0) {
          return handleResponse(res, 404, 'Messages not found');
        }
        return handleResponse(res, 200, 'Messages loaded', pruneResponse(response));
      })
      .catch((error) => {
        console.log(error)
        return handleResponse(res, 500, 'Error loading Messages');
      });
  }
};

export default Contact;
