import requests from 'supertest';
import app from '../index';

const api = new requests(app);

describe('GET /', () => {
  it('should serve welcome route', (done) => {
    api.get('/')
      .end((err, res) => {
        expect(res.status).toEqual(200);
        expect(JSON.parse(res.text).message).toEqual('Welcome to SMS Manager');
        done();
      });
  });
});

describe('POST /addContact', () => {
  it('should add a contact when the details are correct', (done) => {
    api.post('/addContact')
      .send({
        name: 'Emma Emma',
        phoneNumber: '08011223344'
      })
      .end((err, res) => {
        expect(res.status).toEqual(201);
        expect(JSON.parse(res.text).message).toEqual('Contact created');
        expect(JSON.parse(res.text).data.name).toEqual('Emma Emma');
        expect(JSON.parse(res.text).data.phoneNumber).toEqual('08011223344');
        done();
      });
      api.post('/addContact')
      .send({
        name: 'Emma Emma',
        phoneNumber: '08011223344'
      })
      .end((err, res) => {
        expect(res.status).toEqual(409);
        expect(JSON.parse(res.text).message).toEqual('Contact already exist');
        done();
      });
  });

  it('should return an error when the details are incorrect', (done) => {
    api.post('/addContact')
      .send({
        name: ' ',
        phoneNumber: ' '
      })
      .end((err, res) => {
        expect(res.status).toEqual(400);
        expect(JSON.parse(res.text).message).toEqual('Name must be specified');
        done();
      });
  });

  it('should return an error when the details are incorrect', (done) => {
    api.post('/addContact')
      .send({
        name: 'Ema Em',
        phoneNumber: ' '
      })
      .end((err, res) => {
        expect(res.status).toEqual(400);
        expect(JSON.parse(res.text).message).toEqual('Invalid Phone number, Phone number must be 11 digits');
        done();
      });
  });
});


describe('GET /getAll', () => {
  it('should return all contacts', (done) => {
    api.post('/addContact')
      .send({
        name: 'Emma Emm2g',
        phoneNumber: '08011223340'
      })
      .end((err, res) => {
        api.get('/getAll')
          .end((err, res) => {
            expect(res.status).toEqual(200);
            expect(JSON.parse(res.text).message).toEqual('Contacts loaded');
            expect(JSON.parse(res.text).data.length).toBeGreaterThan(0);
          });
        done();
      });
      done();
  });
});

describe('GET /getContact/:phoneNumber', () => {
  it('should return user if user exists', (done) => {
    api.get('/getContact/08000000000')
      .end((err, res) => {
        expect(res.status).toEqual(404);
        expect(JSON.parse(res.text).message).toEqual('Contacts not found');
        done();
      });
    api.post('/addContact')
      .send({
        name: 'Andela Andela',
        phoneNumber: '08011111111'
      })
      .end((err, res) => {
        api.get('/getContact/08011111111')
          .end((err, res) => {
            expect(res.status).toEqual(200);
            expect(JSON.parse(res.text).message).toEqual('Contacts loaded');
            expect(JSON.parse(res.text).data.name).toEqual('Andela Andela');
            expect(JSON.parse(res.text).data.phoneNumber).toEqual('08011111111');
          });
        done();
      });
    done();
  });
});

describe('POST /message', () => {
  it('should send message to a contact', (done) => {
    api.post('/addContact')
      .send({
        name: 'Andela1',
        phoneNumber: '08011111112'
      })
      .end((err, res) => {
        api.post('/addContact')
          .send({
            name: 'Andela2',
            phoneNumber: '08011111113'
          })
          .end((err, res) => {
            api.post('/message')
              .send({
                sender: '',
                receiver: '',
                message: 'vfds sdjhfdsf dsjhbds jhfds fhjdsfdsj jhbfsd'
              })
              .end((err, res) => {
                expect(res.status).toEqual(400);
                expect(JSON.parse(res.text).message).toEqual('Invalid Sender\'s Phone number, Phone number must be 11 digits');
                done();
              });
            done();
            api.post('/message')
              .send({
                sender: '08011111112',
                receiver: '',
                message: 'vfds sdjhfdsf dsjhbds jhfds fhjdsfdsj jhbfsd'
              })
              .end((err, res) => {
                expect(res.status).toEqual(400);
                expect(JSON.parse(res.text).message).toEqual('Invalid Receiver\'s Phone number, Phone number must be 11 digits');
                done();
              });
            api.post('/message')
            .send({
              sender: '08011111112',
              receiver: '08011111113',
              message: 'vfds sdjhfdsf dsjhbds jhfds fhjdsfdsj jhbfsd'
            })
            .end((err, res) => {
              expect(res.status).toEqual(201);
              expect(JSON.parse(res.text).message).toEqual('Message Sent.');
              done();
            });
            done();
          });
        });
    done();
  });
});

describe('GET /sentMessages/:phoneNumber', () => {
  it('should get all message sent by a contact', (done) => {
    api.get('/sentMessages/08011111192')
      .end((err, res) => {
        expect(res.status).toEqual(404);
        expect(JSON.parse(res.text).message).toEqual('Messages not found');
        done();
      });
  });
});


describe('GET /receivedMessages/:phoneNumber', () => {
  it('should get all message received by a contact', (done) => {
    api.get('/receivedMessages/08011111119')
      .end((err, res) => {
        expect(res.status).toEqual(404);
        expect(JSON.parse(res.text).message).toEqual('Messages not found');
        done();
      });
  });
});

describe('DELETE /contact', () => {
  it('should delete a contact', (done) => {
    api.post('/addContact')
    .send({
      name: 'Andelan1',
      phoneNumber: '08021111112'
    })
    .end((err, res) => {
      api.delete('/contact')
        .send({
          phoneNumber: JSON.parse(res.text).data.phoneNumber
        })
        .end((err, res) => {
          expect(res.status).toEqual(200);
          expect(JSON.parse(res.text).message).toEqual('Contact deleted');
          done();
        });
      done();
    });
  });
});
