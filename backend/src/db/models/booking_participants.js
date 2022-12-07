const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const booking_participants = sequelize.define(
    'booking_participants',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      booking_id: {
        type: DataTypes.INTEGER,
      },

      member_id: {
        type: DataTypes.INTEGER,
      },

      user_id: {
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

  booking_participants.associate = (db) => {
    db.booking_participants.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.booking_participants.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return booking_participants;
};
