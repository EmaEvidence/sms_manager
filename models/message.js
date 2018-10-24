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
    senderId: {
      type: DataTypes.INTEGER,
    },
    receiverId: {
      type: DataTypes.INTEGER,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  }, {});
  Message.associate = function(models) {
    Message.belongsTo(models.Contact, { foreignKey: 'senderId' }, { onDelete: 'cascade', hooks: true });
    Message.belongsTo(models.Contact, { foreignKey: 'receiverId' }, { onDelete: 'set null', hooks: true });
  };
  return Message;
};