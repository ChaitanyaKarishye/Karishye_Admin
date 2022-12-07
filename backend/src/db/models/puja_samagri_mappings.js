const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function(sequelize, DataTypes) {
  const puja_samagri_mappings = sequelize.define(
    'puja_samagri_mappings',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

puja_id: {
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

  puja_samagri_mappings.associate = (db) => {

    db.puja_samagri_mappings.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.puja_samagri_mappings.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return puja_samagri_mappings;
};

