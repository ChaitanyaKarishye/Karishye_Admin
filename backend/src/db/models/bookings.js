const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const bookings = sequelize.define(
    'bookings',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      user_id: {
        type: DataTypes.INTEGER,
      },

      pujari_id: {
        type: DataTypes.INTEGER,
      },

      puja_id: {
        type: DataTypes.INTEGER,
      },

      notes: {
        type: DataTypes.TEXT,
      },

      price: {
        type: DataTypes.INTEGER,
      },

      event_type: {
        type: DataTypes.ENUM,

        values: [
          'At my home',

          'Near my home',

          'Online',

          'On your behalf',

          'Other',
        ],
      },

      address: {
        type: DataTypes.TEXT,
      },

      start_date: {
        type: DataTypes.DATE,
      },

      end_date: {
        type: DataTypes.DATE,
      },

      duration_hrs: {
        type: DataTypes.INTEGER,
      },

      base_price: {
        type: DataTypes.INTEGER,
      },

      final_price: {
        type: DataTypes.INTEGER,
      },

      status: {
        type: DataTypes.ENUM,

        values: [
          'under review',

          'pending payment',

          'confirmed',

          'material dispatched',

          'completed',

          'suspended',

          'cancelled',
        ],
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

  bookings.associate = (db) => {
    db.bookings.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.bookings.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return bookings;
};
