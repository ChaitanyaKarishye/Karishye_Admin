const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class BookingsDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const bookings = await db.bookings.create(
      {
        id: data.id || undefined,

        user_id: data.user_id || null,
        pujari_id: data.pujari_id || null,
        puja_id: data.puja_id || null,
        notes: data.notes || null,
        price: data.price || null,
        event_type: data.event_type || null,
        address: data.address || null,
        start_date: data.start_date || null,
        end_date: data.end_date || null,
        duration_hrs: data.duration_hrs || null,
        base_price: data.base_price || null,
        final_price: data.final_price || null,
        status: data.status || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    return bookings;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const bookings = await db.bookings.findByPk(id, {
      transaction,
    });

    await bookings.update(
      {
        user_id: data.user_id || null,
        pujari_id: data.pujari_id || null,
        puja_id: data.puja_id || null,
        notes: data.notes || null,
        price: data.price || null,
        event_type: data.event_type || null,
        address: data.address || null,
        start_date: data.start_date || null,
        end_date: data.end_date || null,
        duration_hrs: data.duration_hrs || null,
        base_price: data.base_price || null,
        final_price: data.final_price || null,
        status: data.status || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    return bookings;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const bookings = await db.bookings.findByPk(id, options);

    await bookings.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await bookings.destroy({
      transaction,
    });

    return bookings;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const bookings = await db.bookings.findOne({ where }, { transaction });

    if (!bookings) {
      return bookings;
    }

    const output = bookings.get({ plain: true });

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

      if (filter.notes) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('bookings', 'notes', filter.notes),
        };
      }

      if (filter.address) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('bookings', 'address', filter.address),
        };
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

      if (filter.pujari_idRange) {
        const [start, end] = filter.pujari_idRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            pujari_id: {
              ...where.pujari_id,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            pujari_id: {
              ...where.pujari_id,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.puja_idRange) {
        const [start, end] = filter.puja_idRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            puja_id: {
              ...where.puja_id,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            puja_id: {
              ...where.puja_id,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.priceRange) {
        const [start, end] = filter.priceRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            price: {
              ...where.price,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            price: {
              ...where.price,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.start_dateRange) {
        const [start, end] = filter.start_dateRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            start_date: {
              ...where.start_date,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            start_date: {
              ...where.start_date,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.end_dateRange) {
        const [start, end] = filter.end_dateRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            end_date: {
              ...where.end_date,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            end_date: {
              ...where.end_date,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.duration_hrsRange) {
        const [start, end] = filter.duration_hrsRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            duration_hrs: {
              ...where.duration_hrs,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            duration_hrs: {
              ...where.duration_hrs,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.base_priceRange) {
        const [start, end] = filter.base_priceRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            base_price: {
              ...where.base_price,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            base_price: {
              ...where.base_price,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.final_priceRange) {
        const [start, end] = filter.final_priceRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            final_price: {
              ...where.final_price,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            final_price: {
              ...where.final_price,
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

      if (filter.event_type) {
        where = {
          ...where,
          event_type: filter.event_type,
        };
      }

      if (filter.status) {
        where = {
          ...where,
          status: filter.status,
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

    let { rows, count } = await db.bookings.findAndCountAll({
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
          Utils.ilike('bookings', 'id', query),
        ],
      };
    }

    const records = await db.bookings.findAll({
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
