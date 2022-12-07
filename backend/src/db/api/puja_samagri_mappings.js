const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class Puja_samagri_mappingsDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const puja_samagri_mappings = await db.puja_samagri_mappings.create(
      {
        id: data.id || undefined,

        puja_id: data.puja_id || null,
        samagri_id: data.samagri_id || null,
        no_of_standard_qty: data.no_of_standard_qty || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    return puja_samagri_mappings;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const puja_samagri_mappings = await db.puja_samagri_mappings.findByPk(id, {
      transaction,
    });

    await puja_samagri_mappings.update(
      {
        puja_id: data.puja_id || null,
        samagri_id: data.samagri_id || null,
        no_of_standard_qty: data.no_of_standard_qty || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    return puja_samagri_mappings;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const puja_samagri_mappings = await db.puja_samagri_mappings.findByPk(
      id,
      options,
    );

    await puja_samagri_mappings.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await puja_samagri_mappings.destroy({
      transaction,
    });

    return puja_samagri_mappings;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const puja_samagri_mappings = await db.puja_samagri_mappings.findOne(
      { where },
      { transaction },
    );

    if (!puja_samagri_mappings) {
      return puja_samagri_mappings;
    }

    const output = puja_samagri_mappings.get({ plain: true });

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

      if (filter.samagri_idRange) {
        const [start, end] = filter.samagri_idRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            samagri_id: {
              ...where.samagri_id,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            samagri_id: {
              ...where.samagri_id,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.no_of_standard_qtyRange) {
        const [start, end] = filter.no_of_standard_qtyRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            no_of_standard_qty: {
              ...where.no_of_standard_qty,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            no_of_standard_qty: {
              ...where.no_of_standard_qty,
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

    let { rows, count } = await db.puja_samagri_mappings.findAndCountAll({
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
          Utils.ilike('puja_samagri_mappings', 'id', query),
        ],
      };
    }

    const records = await db.puja_samagri_mappings.findAll({
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
