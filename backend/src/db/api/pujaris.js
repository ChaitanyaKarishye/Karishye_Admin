
const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class PujarisDBApi {

  static async create(data, options) {
  const currentUser = (options && options.currentUser) || { id: null };
  const transaction = (options && options.transaction) || undefined;

  const pujaris = await db.pujaris.create(
  {
  id: data.id || undefined,

    application_id: data.application_id
    ||
    null
,

    name: data.name
    ||
    null
,

    surname: data.surname
    ||
    null
,

    date_of_birth: data.date_of_birth
    ||
    null
,

    date_of_joining: data.date_of_joining
    ||
    null
,

    qualification: data.qualification
    ||
    null
,

    experience_yrs: data.experience_yrs
    ||
    null
,

    address: data.address
    ||
    null
,

    email_id: data.email_id
    ||
    null
,

    phone_number: data.phone_number
    ||
    null
,

    razorpay_id: data.razorpay_id
    ||
    null
,

    gender: data.gender
    ||
    null
,

    Language: data.Language
    ||
    null
,

    online_pujas: data.online_pujas
    ||
    false

,

    travel: data.travel
    ||
    false

,

    city: data.city
    ||
    null
,

    active: data.active
    ||
    false

,

  importHash: data.importHash || null,
  createdById: currentUser.id,
  updatedById: currentUser.id,
  },
  { transaction },
  );

    await FileDBApi.replaceRelationFiles(
    {
    belongsTo: db.pujaris.getTableName(),
    belongsToColumn: 'photo',
    belongsToId: pujaris.id,
    },
    data.photo,
    options,
    );

  return pujaris;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || {id: null};
    const transaction = (options && options.transaction) || undefined;

    const pujaris = await db.pujaris.findByPk(id, {
      transaction,
    });

    await pujaris.update(
      {

        application_id: data.application_id
        ||
        null
,

        name: data.name
        ||
        null
,

        surname: data.surname
        ||
        null
,

        date_of_birth: data.date_of_birth
        ||
        null
,

        date_of_joining: data.date_of_joining
        ||
        null
,

        qualification: data.qualification
        ||
        null
,

        experience_yrs: data.experience_yrs
        ||
        null
,

        address: data.address
        ||
        null
,

        email_id: data.email_id
        ||
        null
,

        phone_number: data.phone_number
        ||
        null
,

        razorpay_id: data.razorpay_id
        ||
        null
,

        gender: data.gender
        ||
        null
,

        Language: data.Language
        ||
        null
,

        online_pujas: data.online_pujas
        ||
        false

,

        travel: data.travel
        ||
        false

,

        city: data.city
        ||
        null
,

        active: data.active
        ||
        false

,

        updatedById: currentUser.id,
      },
      {transaction},
    );

    await FileDBApi.replaceRelationFiles(
      {
        belongsTo: db.pujaris.getTableName(),
        belongsToColumn: 'photo',
        belongsToId: pujaris.id,
      },
      data.photo,
      options,
    );

    return pujaris;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || {id: null};
    const transaction = (options && options.transaction) || undefined;

    const pujaris = await db.pujaris.findByPk(id, options);

    await pujaris.update({
      deletedBy: currentUser.id
    }, {
      transaction,
    });

    await pujaris.destroy({
      transaction
    });

    return pujaris;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const pujaris = await db.pujaris.findOne(
      { where },
      { transaction },
    );

    if (!pujaris) {
      return pujaris;
    }

    const output = pujaris.get({plain: true});

    output.photo = await pujaris.getPhoto({
      transaction
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
          [Op.and]: Utils.ilike(
            'pujaris',
            'name',
            filter.name,
          ),
        };
      }

      if (filter.surname) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'pujaris',
            'surname',
            filter.surname,
          ),
        };
      }

      if (filter.qualification) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'pujaris',
            'qualification',
            filter.qualification,
          ),
        };
      }

      if (filter.address) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'pujaris',
            'address',
            filter.address,
          ),
        };
      }

      if (filter.email_id) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'pujaris',
            'email_id',
            filter.email_id,
          ),
        };
      }

      if (filter.phone_number) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'pujaris',
            'phone_number',
            filter.phone_number,
          ),
        };
      }

      if (filter.razorpay_id) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'pujaris',
            'razorpay_id',
            filter.razorpay_id,
          ),
        };
      }

      if (filter.city) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'pujaris',
            'city',
            filter.city,
          ),
        };
      }

      if (filter.application_idRange) {
        const [start, end] = filter.application_idRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            application_id: {
              ...where.application_id,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            application_id: {
              ...where.application_id,
              [Op.lte]: end,
            },
          };
        }
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

      if (filter.date_of_joiningRange) {
        const [start, end] = filter.date_of_joiningRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            date_of_joining: {
              ...where.date_of_joining,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            date_of_joining: {
              ...where.date_of_joining,
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
          active:
            filter.active === true ||
            filter.active === 'true',
        };
      }

      if (filter.gender) {
        where = {
          ...where,
          gender: filter.gender,
        };
      }

      if (filter.Language) {
        where = {
          ...where,
          Language: filter.Language,
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

      if (filter.active) {
        where = {
          ...where,
          active: filter.active,
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

    let { rows, count } = await db.pujaris.findAndCountAll(
      {
        where,
        include,
        distinct: true,
        limit: limit ? Number(limit) : undefined,
        offset: offset ? Number(offset) : undefined,
        order: (filter.field && filter.sort)
          ? [[filter.field, filter.sort]]
          : [['createdAt', 'desc']],
        transaction,
      },
    );

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
          Utils.ilike(
            'pujaris',
            'id',
            query,
          ),
        ],
      };
    }

    const records = await db.pujaris.findAll({
      attributes: [ 'id', 'id' ],
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

