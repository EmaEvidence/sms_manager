import db from '../models/index';

class ContactService {
  add(data) {
    return db.Contact.findOrCreate({ where: data });
  }

  get(data) {
    return db.Contact.findOne({ where: data });
  }

  getAll(data) {
    return db.Contact.findAll();
  }

  delete(data) {
    return db.Contact.destroy({ where: data })
  }

  edit(data) {
    return db.Contact.findAll({ where: data })
  }

};

export default ContactService;
