const db = require('../db/models');
const Booking_samagri_mappingsDBApi = require('../db/api/booking_samagri_mappings');

module.exports = class Booking_samagri_mappingsService {
  static async create(data, currentUser) {
    const transaction = await db.sequelize.transaction();
    try {
      await Booking_samagri_mappingsDBApi.create(
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
      let booking_samagri_mappings = await Booking_samagri_mappingsDBApi.findBy(
        {id},
        {transaction},
      );

      if (!booking_samagri_mappings) {
        throw new ValidationError(
          'booking_samagri_mappingsNotFound',
        );
      }

      await Booking_samagri_mappingsDBApi.update(
        id,
        data,
        {
          currentUser,
          transaction,
        },
      );

      await transaction.commit();
      return booking_samagri_mappings;

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

      await Booking_samagri_mappingsDBApi.remove(
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

