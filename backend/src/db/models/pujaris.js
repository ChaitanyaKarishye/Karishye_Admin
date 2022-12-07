const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function(sequelize, DataTypes) {
  const pujaris = sequelize.define(
    'pujaris',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

application_id: {
        type: DataTypes.INTEGER,

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

date_of_joining: {
        type: DataTypes.DATE,

      },

qualification: {
        type: DataTypes.TEXT,

      },

experience_yrs: {
        type: DataTypes.INTEGER,

      },

address: {
        type: DataTypes.TEXT,

      },

email_id: {
        type: DataTypes.TEXT,

      },

phone_number: {
        type: DataTypes.TEXT,

      },

razorpay_id: {
        type: DataTypes.TEXT,

      },

gender: {
        type: DataTypes.ENUM,

        values: [

"Male",

"Female",

"Other"

        ],

      },

Language: {
        type: DataTypes.ENUM,

        values: [

"Telugu",

"Other"

        ],

      },

online_pujas: {
        type: DataTypes.BOOLEAN,

        allowNull: false,
        defaultValue: false,

      },

travel: {
        type: DataTypes.BOOLEAN,

        allowNull: false,
        defaultValue: false,

      },

city: {
        type: DataTypes.TEXT,

      },

active: {
        type: DataTypes.BOOLEAN,

        allowNull: false,
        defaultValue: false,

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

  pujaris.associate = (db) => {

    db.pujaris.hasMany(db.file, {
      as: 'photo',
      foreignKey: 'belongsToId',
      constraints: false,
      scope: {
        belongsTo: db.pujaris.getTableName(),
        belongsToColumn: 'photo',
      },
    });

    db.pujaris.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.pujaris.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return pujaris;
};

