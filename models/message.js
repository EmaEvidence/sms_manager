'use strict';
module.exports = (sequelize, DataTypes) => {
  var Message = sequelize.define('Message', {
    message: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Message can not be empty'
        }
      }
    },
    sender: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Sender can not be empty'
        }
      }
    },
    receiver: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  }, {});
  Message.associate = function(models) {
    // associations can be defined here
    Message.hasOne(models.Contact, {foreignKey: 'id', as: 'sender'});
    Message.hasOne(models.Contact, {foreignKey: 'id', as: 'receiver'});
  };
  return Message;
};