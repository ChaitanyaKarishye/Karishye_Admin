const db = require('../db/models');
const BookingsDBApi = require('../db/api/bookings');

module.exports = class BookingsService {
  static async create(data, currentUser) {
    const transaction = await db.sequelize.transaction();
    try {
      await BookingsDBApi.create(
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
      let bookings = await BookingsDBApi.findBy(
        {id},
        {transaction},
      );

      if (!bookings) {
        throw new ValidationError(
          'bookingsNotFound',
        );
      }

      await BookingsDBApi.update(
        id,
        data,
        {
          currentUser,
          transaction,
        },
      );

      await transaction.commit();
      return bookings;

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

      await BookingsDBApi.remove(
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

