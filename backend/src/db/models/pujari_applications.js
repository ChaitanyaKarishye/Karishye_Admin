const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function(sequelize, DataTypes) {
  const pujari_applications = sequelize.define(
    'pujari_applications',
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

gender: {
        type: DataTypes.ENUM,

        values: [

"Male",

"Female",

"Other"

        ],

      },

application_status: {
        type: DataTypes.ENUM,

        values: [

"Pending",

"Approved",

"Rejected",

"Suspended"

        ],

      },

language: {
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

  pujari_applications.associate = (db) => {

    db.pujari_applications.hasMany(db.file, {
      as: 'photo',
      foreignKey: 'belongsToId',
      constraints: false,
      scope: {
        belongsTo: db.pujari_applications.getTableName(),
        belongsToColumn: 'photo',
      },
    });

    db.pujari_applications.hasMany(db.file, {
      as: 'video',
      foreignKey: 'belongsToId',
      constraints: false,
      scope: {
        belongsTo: db.pujari_applications.getTableName(),
        belongsToColumn: 'video',
      },
    });

    db.pujari_applications.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.pujari_applications.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return pujari_applications;
};

