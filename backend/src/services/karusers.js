const db = require('../db/models');
const KarusersDBApi = require('../db/api/karusers');

module.exports = class KarusersService {
  static async create(data, currentUser) {
    const transaction = await db.sequelize.transaction();
    try {
      await KarusersDBApi.create(data, {
        currentUser,
        transaction,
      });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
  static async update(data, id, currentUser) {
    const transaction = await db.sequelize.transaction();
    try {
      let karusers = await KarusersDBApi.findBy({ id }, { transaction });

      if (!karusers) {
        throw new ValidationError('karusersNotFound');
      }

      await KarusersDBApi.update(id, data, {
        currentUser,
        transaction,
      });

      await transaction.commit();
      return karusers;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  static async remove(id, currentUser) {
    const transaction = await db.sequelize.transaction();

    try {
      if (currentUser.role !== 'admin') {
        throw new ValidationError('errors.forbidden.message');
      }

      await KarusersDBApi.remove(id, {
        currentUser,
        transaction,
      });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
};
