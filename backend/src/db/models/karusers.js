const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const karusers = sequelize.define(
    'karusers',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      name: {
        type: DataTypes.TEXT,
      },

      surname: {
        type: DataTypes.TEXT,
      },

      date_of_birth: {
        type: DataTypes.DATE,
      },

      date_of_registration: {
        type: DataTypes.DATE,
      },

      address: {
        type: DataTypes.TEXT,
      },

      gothram: {
        type: DataTypes.TEXT,
      },

      nakshatram: {
        type: DataTypes.TEXT,
      },

      email_id: {
        type: DataTypes.TEXT,
      },

      gender: {
        type: DataTypes.ENUM,

        values: ['Male', 'Female', 'Other'],
      },

      importHash: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
      freezeTableName: true,
    },
  );

  karusers.associate = (db) => {
    db.karusers.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.karusers.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return karusers;
};
