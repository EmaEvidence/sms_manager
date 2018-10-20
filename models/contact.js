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
    Contact.hasMany(models.Message, {foreignKey: 'sender', sourceKey: 'id'}, {onDelete: 'DELETE'});
    Contact.hasMany(models.Message, {foreignKey: 'receiver', sourceKey: 'id'}, { onDelete: 'SET NULL' });
  };
  return Contact;
};