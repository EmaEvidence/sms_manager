import MessageService from '../service/MessageService';
import sendSms from '../service/sendSms';
import handleResponse from '../helpers/handleResponse';
import pruneResponse from '../helpers/pruneResponse';

const messageService = new MessageService();

class Message {
  add(req, res) {
    const { message, receiver, sender, senderId, receiverId } = req.body;
    sendSms({ message, receiver, sender }, (status) => {
      messageService.add({ message, receiverId, senderId, status }).
        then((response) => {
          handleResponse(res, 201, `Message ${status}.`, pruneResponse(response));
        })
        .catch((error) => {
          handleResponse(res, 500, `Error saving Message. Message ${status}.`);
        });
    });
  }

  getAll(req, res) {
    messageService.getAll().
      then((response) => {
        if (response.length === 0) {
          return handleResponse(res, 404, 'Messages not found');
        }
        return handleResponse(res, 200, 'Messages loaded', pruneResponse(response));
      })
      .catch((error) => {
        return handleResponse(res, 500, 'Error loading Messages');
      });
  }
};

export default Message;
