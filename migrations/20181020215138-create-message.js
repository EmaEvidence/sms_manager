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
      senderId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Contacts',
          key: 'id',
          as: 'sent',
        },
        onDelete: 'cascade'
      },
      receiverId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Contacts',
          key: 'id',
          as: 'received',
        },
        onDelete: 'set null'
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