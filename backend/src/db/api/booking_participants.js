const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class Booking_participantsDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const booking_participants = await db.booking_participants.create(
      {
        id: data.id || undefined,

        booking_id: data.booking_id || null,
        member_id: data.member_id || null,
        user_id: data.user_id || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    return booking_participants;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const booking_participants = await db.booking_participants.findByPk(id, {
      transaction,
    });

    await booking_participants.update(
      {
        booking_id: data.booking_id || null,
        member_id: data.member_id || null,
        user_id: data.user_id || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    return booking_participants;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const booking_participants = await db.booking_participants.findByPk(
      id,
      options,
    );

    await booking_participants.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await booking_participants.destroy({
      transaction,
    });

    return booking_participants;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const booking_participants = await db.booking_participants.findOne(
      { where },
      { transaction },
    );

    if (!booking_participants) {
      return booking_participants;
    }

    const output = booking_participants.get({ plain: true });

    return output;
  }

  static async findAll(filter, options) {
    var limit = filter.limit || 0;
    var offset = 0;
    const currentPage = +filter.page;

    offset = currentPage * limit;

    var orderBy = null;

    const transaction = (options && options.transaction) || undefined;
    let where = {};
    let include = [];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.booking_idRange) {
        const [start, end] = filter.booking_idRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            booking_id: {
              ...where.booking_id,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            booking_id: {
              ...where.booking_id,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.member_idRange) {
        const [start, end] = filter.member_idRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            member_id: {
              ...where.member_id,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            member_id: {
              ...where.member_id,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.user_idRange) {
        const [start, end] = filter.user_idRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            user_id: {
              ...where.user_id,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            user_id: {
              ...where.user_id,
              [Op.lte]: end,
            },
          };
        }
      }

      if (
        filter.active === true ||
        filter.active === 'true' ||
        filter.active === false ||
        filter.active === 'false'
      ) {
        where = {
          ...where,
          active: filter.active === true || filter.active === 'true',
        };
      }

      if (filter.createdAtRange) {
        const [start, end] = filter.createdAtRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.lte]: end,
            },
          };
        }
      }
    }

    let { rows, count } = await db.booking_participants.findAndCountAll({
      where,
      include,
      distinct: true,
      limit: limit ? Number(limit) : undefined,
      offset: offset ? Number(offset) : undefined,
      order:
        filter.field && filter.sort
          ? [[filter.field, filter.sort]]
          : [['createdAt', 'desc']],
      transaction,
    });

    //    rows = await this._fillWithRelationsAndFilesForRows(
    //      rows,
    //      options,
    //    );

    return { rows, count };
  }

  static async findAllAutocomplete(query, limit) {
    let where = {};

    if (query) {
      where = {
        [Op.or]: [
          { ['id']: Utils.uuid(query) },
          Utils.ilike('booking_participants', 'id', query),
        ],
      };
    }

    const records = await db.booking_participants.findAll({
      attributes: ['id', 'id'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['id', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.id,
    }));
  }
};
