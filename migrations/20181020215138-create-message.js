'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Messages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      message: {
        type: Sequelize.STRING,allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Message can not be empty'
          }
        }
      },
      sender: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Contacts',
          key: 'id',
          as: 'sender',
        },
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Sender can not be empty'
          }
        }
      },
      receiver: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Contacts',
          key: 'id',
          as: 'receiver',
        },
        validate: {
          notEmpty: {
            args: true,
            msg: 'Receiver can not be empty'
          }
        }
      },
      status: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Messages');
  }
};