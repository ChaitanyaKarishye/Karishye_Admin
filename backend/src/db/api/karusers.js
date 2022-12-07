const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class KarusersDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const karusers = await db.karusers.create(
      {
        id: data.id || undefined,

        name: data.name || null,
        surname: data.surname || null,
        date_of_birth: data.date_of_birth || null,
        date_of_registration: data.date_of_registration || null,
        address: data.address || null,
        gothram: data.gothram || null,
        nakshatram: data.nakshatram || null,
        email_id: data.email_id || null,
        gender: data.gender || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    return karusers;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const karusers = await db.karusers.findByPk(id, {
      transaction,
    });

    await karusers.update(
      {
        name: data.name || null,
        surname: data.surname || null,
        date_of_birth: data.date_of_birth || null,
        date_of_registration: data.date_of_registration || null,
        address: data.address || null,
        gothram: data.gothram || null,
        nakshatram: data.nakshatram || null,
        email_id: data.email_id || null,
        gender: data.gender || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    return karusers;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const karusers = await db.karusers.findByPk(id, options);

    await karusers.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await karusers.destroy({
      transaction,
    });

    return karusers;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const karusers = await db.karusers.findOne({ where }, { transaction });

    if (!karusers) {
      return karusers;
    }

    const output = karusers.get({ plain: true });

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

      if (filter.name) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('karusers', 'name', filter.name),
        };
      }

      if (filter.surname) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('karusers', 'surname', filter.surname),
        };
      }

      if (filter.address) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('karusers', 'address', filter.address),
        };
      }

      if (filter.gothram) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('karusers', 'gothram', filter.gothram),
        };
      }

      if (filter.nakshatram) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('karusers', 'nakshatram', filter.nakshatram),
        };
      }

      if (filter.email_id) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('karusers', 'email_id', filter.email_id),
        };
      }

      if (filter.date_of_birthRange) {
        const [start, end] = filter.date_of_birthRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            date_of_birth: {
              ...where.date_of_birth,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            date_of_birth: {
              ...where.date_of_birth,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.date_of_registrationRange) {
        const [start, end] = filter.date_of_registrationRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            date_of_registration: {
              ...where.date_of_registration,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            date_of_registration: {
              ...where.date_of_registration,
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

      if (filter.gender) {
        where = {
          ...where,
          gender: filter.gender,
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

    let { rows, count } = await db.karusers.findAndCountAll({
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
          Utils.ilike('karusers', 'id', query),
        ],
      };
    }

    const records = await db.karusers.findAll({
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
