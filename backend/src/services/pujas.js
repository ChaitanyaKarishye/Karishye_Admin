const db = require('../db/models');
const PujasDBApi = require('../db/api/pujas');

module.exports = class PujasService {
  static async create(data, currentUser) {
    const transaction = await db.sequelize.transaction();
    try {
      await PujasDBApi.create(data, {
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
      let pujas = await PujasDBApi.findBy({ id }, { transaction });

      if (!pujas) {
        throw new ValidationError('pujasNotFound');
      }

      await PujasDBApi.update(id, data, {
        currentUser,
        transaction,
      });

      await transaction.commit();
      return pujas;
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

      await PujasDBApi.remove(id, {
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
