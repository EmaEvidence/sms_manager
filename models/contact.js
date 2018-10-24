'use strict';
module.exports = (sequelize, DataTypes) => {
  var Contact = sequelize.define('Contact', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Name can not be empty'
        }
      }
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Phone Number can not be empty'
        }
      }
    },
  }, {});
  Contact.associate = function(models) {
    Contact.hasMany(models.Message, { foreignKey: 'senderId', as: 'sent' }, { onDelete: 'cascade', hooks: true });
    Contact.hasMany(models.Message, { foreignKey: 'receiverId', as: 'received' }, { onDelete: 'set null', hooks: true });
  };
  return Contact;
};