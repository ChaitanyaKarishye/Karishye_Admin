const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class Pujari_applicationsDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const pujari_applications = await db.pujari_applications.create(
      {
        id: data.id || undefined,

        name: data.name || null,
        surname: data.surname || null,
        date_of_birth: data.date_of_birth || null,
        qualification: data.qualification || null,
        experience_yrs: data.experience_yrs || null,
        address: data.address || null,
        email_id: data.email_id || null,
        phone_number: data.phone_number || null,
        gender: data.gender || null,
        application_status: data.application_status || null,
        language: data.language || null,
        online_pujas: data.online_pujas || false,

        travel: data.travel || false,

        city: data.city || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await FileDBApi.replaceRelationFiles(
      {
        belongsTo: db.pujari_applications.getTableName(),
        belongsToColumn: 'photo',
        belongsToId: pujari_applications.id,
      },
      data.photo,
      options,
    );

    await FileDBApi.replaceRelationFiles(
      {
        belongsTo: db.pujari_applications.getTableName(),
        belongsToColumn: 'video',
        belongsToId: pujari_applications.id,
      },
      data.video,
      options,
    );

    return pujari_applications;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const pujari_applications = await db.pujari_applications.findByPk(id, {
      transaction,
    });

    await pujari_applications.update(
      {
        name: data.name || null,
        surname: data.surname || null,
        date_of_birth: data.date_of_birth || null,
        qualification: data.qualification || null,
        experience_yrs: data.experience_yrs || null,
        address: data.address || null,
        email_id: data.email_id || null,
        phone_number: data.phone_number || null,
        gender: data.gender || null,
        application_status: data.application_status || null,
        language: data.language || null,
        online_pujas: data.online_pujas || false,

        travel: data.travel || false,

        city: data.city || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await FileDBApi.replaceRelationFiles(
      {
        belongsTo: db.pujari_applications.getTableName(),
        belongsToColumn: 'photo',
        belongsToId: pujari_applications.id,
      },
      data.photo,
      options,
    );

    await FileDBApi.replaceRelationFiles(
      {
        belongsTo: db.pujari_applications.getTableName(),
        belongsToColumn: 'video',
        belongsToId: pujari_applications.id,
      },
      data.video,
      options,
    );

    return pujari_applications;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const pujari_applications = await db.pujari_applications.findByPk(
      id,
      options,
    );

    await pujari_applications.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await pujari_applications.destroy({
      transaction,
    });

    return pujari_applications;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const pujari_applications = await db.pujari_applications.findOne(
      { where },
      { transaction },
    );

    if (!pujari_applications) {
      return pujari_applications;
    }

    const output = pujari_applications.get({ plain: true });

    output.photo = await pujari_applications.getPhoto({
      transaction,
    });

    output.video = await pujari_applications.getVideo({
      transaction,
    });

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
    let include = [
      {
        model: db.file,
        as: 'photo',
      },

      {
        model: db.file,
        as: 'video',
      },
    ];

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
          [Op.and]: Utils.ilike('pujari_applications', 'name', filter.name),
        };
      }

      if (filter.surname) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'pujari_applications',
            'surname',
            filter.surname,
          ),
        };
      }

      if (filter.qualification) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'pujari_applications',
            'qualification',
            filter.qualification,
          ),
        };
      }

      if (filter.address) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'pujari_applications',
            'address',
            filter.address,
          ),
        };
      }

      if (filter.email_id) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'pujari_applications',
            'email_id',
            filter.email_id,
          ),
        };
      }

      if (filter.phone_number) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'pujari_applications',
            'phone_number',
            filter.phone_number,
          ),
        };
      }

      if (filter.city) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('pujari_applications', 'city', filter.city),
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

      if (filter.experience_yrsRange) {
        const [start, end] = filter.experience_yrsRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            experience_yrs: {
              ...where.experience_yrs,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            experience_yrs: {
              ...where.experience_yrs,
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

      if (filter.application_status) {
        where = {
          ...where,
          application_status: filter.application_status,
        };
      }

      if (filter.language) {
        where = {
          ...where,
          language: filter.language,
        };
      }

      if (filter.online_pujas) {
        where = {
          ...where,
          online_pujas: filter.online_pujas,
        };
      }

      if (filter.travel) {
        where = {
          ...where,
          travel: filter.travel,
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

    let { rows, count } = await db.pujari_applications.findAndCountAll({
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
          Utils.ilike('pujari_applications', 'id', query),
        ],
      };
    }

    const records = await db.pujari_applications.findAll({
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
