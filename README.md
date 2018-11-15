# sms_manager
SMS Management API.
```sms_manager``` is a simple API that allows Users to add contacts and send text messages to these contacts.

## Dependencies
The functionality of this web app being a node.js app depends on the following technologies.

[**Express.js**](https://expressjs.com/): A Fast, opinionated, minimalist web framework for node which was used in routing this application.  
[**BodyParser**](https://babeljs.io/): This module was used to collect search data sent from the client side to the routing page.   
[**Babel**](https://babeljs.io/): This project is written in ES6, babel transpiles the code to ES5.  
[**Sequelize**](https://www.sequelizejs.com): Sequelize is a promise-based Node.js ORM for Postgres Server which is the database server for the APP . It features solid transaction support, relations, read replication and more.   
[**Postgresql**](https://www.postgresql.org/): PostgreSQL is a powerful, open source object-relational database system.


## Installation

1. Install nodejs, postgresql, sequelize-cli(globally) if not installed.
2. Navigate to the directory you want it installed to. cd your folder
3. Clone the repository ``` https://github.com/EmaEvidence/sms_manager.git ```.
4. Create a database(test and development) with PostgreSQL.
5. Open the PSM folder.
6. Create a .env file using the .envexample as a guide.
7. ``` npm install ``` to install all dependencies.
8. ``` npm run dev ``` to start the app in development mode.
9. ``` npm start ``` starts the app.
10. The app runs on port 3300
11. ``` npm run test ``` runs the unit test.

## The API.
The API exposes the following endpoints for consumption:  
  1. ```POST``` /addContact. The API takes the following parameters name, phoneNumber.  
    Adds a new contact.  
  2. ```GET``` /getAll. Retrieves every contact in the API.
    Signs In a registered user.  
  3. ```GET``` /getContact/:phoneNumber. The API takes parameter phoneNumber and returns the details of the contact with the phoneNumber.
  4. ```GET``` /sentMessages/:phoneNumber. The API retrieves all messages sent by the provided phoneNumber.
  5. ```GET``` /receivedMessages/:phoneNumber. The API retrieves all messages received by the provided phoneNumber. 
  6. ```POST``` /message. The API takes the following parameters sender, receiver and message. It sends the message and keeps a record of its status. 
    Adds a user to a group. 
  7. ```DELETE``` /contact. The API takes parameter phoneNumber and removes the contact and its records from the database. Every message the user has sent is deleted and every message the user is the receiver the receiver is set to null. 

The API documentation for this project can be found [here](https://smsmanager1.docs.apiary.io/#)

## Test  
API test is written with ``` jasmine ``` and ``` supertest ```.



## How to Contribute
The project is open for contribution. If you have other improvements you want to add, feel free to do so.

## FAQ
#### To which branch should I raise a PR?   
``` Every PR is to be raised against develop branch. ```   
