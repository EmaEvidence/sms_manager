import db from '../models/index';

class MessageService {
  add(data) {
    return db.Message.create(data);
  }

  get(data) {
    return db.Message.find(data);
  }

  getAll(data) {
    return db.Message.findAll({ where: data });
  }

};

export default MessageService;
