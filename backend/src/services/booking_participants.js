const db = require('../db/models');
const Booking_participantsDBApi = require('../db/api/booking_participants');

module.exports = class Booking_participantsService {
  static async create(data, currentUser) {
    const transaction = await db.sequelize.transaction();
    try {
      await Booking_participantsDBApi.create(data, {
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
      let booking_participants = await Booking_participantsDBApi.findBy(
        { id },
        { transaction },
      );

      if (!booking_participants) {
        throw new ValidationError('booking_participantsNotFound');
      }

      await Booking_participantsDBApi.update(id, data, {
        currentUser,
        transaction,
      });

      await transaction.commit();
      return booking_participants;
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

      await Booking_participantsDBApi.remove(id, {
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
