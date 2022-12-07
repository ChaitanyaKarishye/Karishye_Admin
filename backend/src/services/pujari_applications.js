const db = require('../db/models');
const Pujari_applicationsDBApi = require('../db/api/pujari_applications');

module.exports = class Pujari_applicationsService {
  static async create(data, currentUser) {
    const transaction = await db.sequelize.transaction();
    try {
      await Pujari_applicationsDBApi.create(data, {
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
      let pujari_applications = await Pujari_applicationsDBApi.findBy(
        { id },
        { transaction },
      );

      if (!pujari_applications) {
        throw new ValidationError('pujari_applicationsNotFound');
      }

      await Pujari_applicationsDBApi.update(id, data, {
        currentUser,
        transaction,
      });

      await transaction.commit();
      return pujari_applications;
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

      await Pujari_applicationsDBApi.remove(id, {
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
