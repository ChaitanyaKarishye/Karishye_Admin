const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const samagri = sequelize.define(
    'samagri',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      name: {
        type: DataTypes.TEXT,
      },

      description: {
        type: DataTypes.TEXT,
      },

      standard_qty: {
        type: DataTypes.INTEGER,
      },

      qty_units: {
        type: DataTypes.ENUM,

        values: ['kg', 'no(s)', 'ml', 'gms', 'dozens', 'other'],
      },

      price_standard_qty: {
        type: DataTypes.INTEGER,
      },

      karishye_provided: {
        type: DataTypes.BOOLEAN,

        allowNull: false,
        defaultValue: false,
      },

      units_in_stock: {
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

  samagri.associate = (db) => {
    db.samagri.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.samagri.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return samagri;
};
