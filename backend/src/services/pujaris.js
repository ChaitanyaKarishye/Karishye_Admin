const db = require('../db/models');
const PujarisDBApi = require('../db/api/pujaris');

module.exports = class PujarisService {
  static async create(data, currentUser) {
    const transaction = await db.sequelize.transaction();
    try {
      await PujarisDBApi.create(
        data,
        {
          currentUser,
          transaction,
        },
      );

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  };
  static async update(data, id, currentUser) {
    const transaction = await db.sequelize.transaction();
    try {
      let pujaris = await PujarisDBApi.findBy(
        {id},
        {transaction},
      );

      if (!pujaris) {
        throw new ValidationError(
          'pujarisNotFound',
        );
      }

      await PujarisDBApi.update(
        id,
        data,
        {
          currentUser,
          transaction,
        },
      );

      await transaction.commit();
      return pujaris;

    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  };

  static async remove(id, currentUser) {
    const transaction = await db.sequelize.transaction();

    try {
      if (currentUser.role !== 'admin') {
        throw new ValidationError(
          'errors.forbidden.message',
        );
      }

      await PujarisDBApi.remove(
        id,
        {
          currentUser,
          transaction,
        },
      );

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
};

