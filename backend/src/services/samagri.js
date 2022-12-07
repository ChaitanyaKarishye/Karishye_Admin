const db = require('../db/models');
const SamagriDBApi = require('../db/api/samagri');

module.exports = class SamagriService {
  static async create(data, currentUser) {
    const transaction = await db.sequelize.transaction();
    try {
      await SamagriDBApi.create(data, {
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
      let samagri = await SamagriDBApi.findBy({ id }, { transaction });

      if (!samagri) {
        throw new ValidationError('samagriNotFound');
      }

      await SamagriDBApi.update(id, data, {
        currentUser,
        transaction,
      });

      await transaction.commit();
      return samagri;
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

      await SamagriDBApi.remove(id, {
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
