const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function(sequelize, DataTypes) {
  const booking_samagri_mappings = sequelize.define(
    'booking_samagri_mappings',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

booking_id: {
        type: DataTypes.INTEGER,

      },

samagri_id: {
        type: DataTypes.INTEGER,

      },

no_of_standard_qty: {
        type: DataTypes.INTEGER,

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

  booking_samagri_mappings.associate = (db) => {

    db.booking_samagri_mappings.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.booking_samagri_mappings.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return booking_samagri_mappings;
};

