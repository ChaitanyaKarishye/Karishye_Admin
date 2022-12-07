module.exports = {
    /**
     * @param {QueryInterface} queryInterface
     * @param {Sequelize} Sequelize
     * @returns {Promise<void>}
     */
    async up(queryInterface, Sequelize) {
        /**
         * @type {Transaction}
         */
        const transaction = await queryInterface.sequelize.transaction();
        try {

                    await queryInterface.createTable('booking_participants', {
                        id: {
                            type: Sequelize.DataTypes.UUID,
                            defaultValue: Sequelize.DataTypes.UUIDV4,
                            primaryKey: true,
                        },
                        createdById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        updatedById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        createdAt: { type: Sequelize.DataTypes.DATE },
                        updatedAt: { type: Sequelize.DataTypes.DATE },
                        deletedAt: { type: Sequelize.DataTypes.DATE },
                        importHash: {
                            type: Sequelize.DataTypes.STRING(255),
                            allowNull: true,
                            unique: true,
                        },
                    }, { transaction });

                    await queryInterface.createTable('pujaris', {
                        id: {
                            type: Sequelize.DataTypes.UUID,
                            defaultValue: Sequelize.DataTypes.UUIDV4,
                            primaryKey: true,
                        },
                        createdById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        updatedById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        createdAt: { type: Sequelize.DataTypes.DATE },
                        updatedAt: { type: Sequelize.DataTypes.DATE },
                        deletedAt: { type: Sequelize.DataTypes.DATE },
                        importHash: {
                            type: Sequelize.DataTypes.STRING(255),
                            allowNull: true,
                            unique: true,
                        },
                    }, { transaction });

                    await queryInterface.createTable('pujari_applications', {
                        id: {
                            type: Sequelize.DataTypes.UUID,
                            defaultValue: Sequelize.DataTypes.UUIDV4,
                            primaryKey: true,
                        },
                        createdById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        updatedById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        createdAt: { type: Sequelize.DataTypes.DATE },
                        updatedAt: { type: Sequelize.DataTypes.DATE },
                        deletedAt: { type: Sequelize.DataTypes.DATE },
                        importHash: {
                            type: Sequelize.DataTypes.STRING(255),
                            allowNull: true,
                            unique: true,
                        },
                    }, { transaction });

                    await queryInterface.createTable('pujas', {
                        id: {
                            type: Sequelize.DataTypes.UUID,
                            defaultValue: Sequelize.DataTypes.UUIDV4,
                            primaryKey: true,
                        },
                        createdById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        updatedById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        createdAt: { type: Sequelize.DataTypes.DATE },
                        updatedAt: { type: Sequelize.DataTypes.DATE },
                        deletedAt: { type: Sequelize.DataTypes.DATE },
                        importHash: {
                            type: Sequelize.DataTypes.STRING(255),
                            allowNull: true,
                            unique: true,
                        },
                    }, { transaction });

                    await queryInterface.createTable('puja_samagri_mappings', {
                        id: {
                            type: Sequelize.DataTypes.UUID,
                            defaultValue: Sequelize.DataTypes.UUIDV4,
                            primaryKey: true,
                        },
                        createdById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        updatedById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        createdAt: { type: Sequelize.DataTypes.DATE },
                        updatedAt: { type: Sequelize.DataTypes.DATE },
                        deletedAt: { type: Sequelize.DataTypes.DATE },
                        importHash: {
                            type: Sequelize.DataTypes.STRING(255),
                            allowNull: true,
                            unique: true,
                        },
                    }, { transaction });

                    await queryInterface.createTable('samagri', {
                        id: {
                            type: Sequelize.DataTypes.UUID,
                            defaultValue: Sequelize.DataTypes.UUIDV4,
                            primaryKey: true,
                        },
                        createdById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        updatedById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        createdAt: { type: Sequelize.DataTypes.DATE },
                        updatedAt: { type: Sequelize.DataTypes.DATE },
                        deletedAt: { type: Sequelize.DataTypes.DATE },
                        importHash: {
                            type: Sequelize.DataTypes.STRING(255),
                            allowNull: true,
                            unique: true,
                        },
                    }, { transaction });

                    await queryInterface.createTable('booking_samagri_mappings', {
                        id: {
                            type: Sequelize.DataTypes.UUID,
                            defaultValue: Sequelize.DataTypes.UUIDV4,
                            primaryKey: true,
                        },
                        createdById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        updatedById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        createdAt: { type: Sequelize.DataTypes.DATE },
                        updatedAt: { type: Sequelize.DataTypes.DATE },
                        deletedAt: { type: Sequelize.DataTypes.DATE },
                        importHash: {
                            type: Sequelize.DataTypes.STRING(255),
                            allowNull: true,
                            unique: true,
                        },
                    }, { transaction });

                    await queryInterface.createTable('bookings', {
                        id: {
                            type: Sequelize.DataTypes.UUID,
                            defaultValue: Sequelize.DataTypes.UUIDV4,
                            primaryKey: true,
                        },
                        createdById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        updatedById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        createdAt: { type: Sequelize.DataTypes.DATE },
                        updatedAt: { type: Sequelize.DataTypes.DATE },
                        deletedAt: { type: Sequelize.DataTypes.DATE },
                        importHash: {
                            type: Sequelize.DataTypes.STRING(255),
                            allowNull: true,
                            unique: true,
                        },
                    }, { transaction });

                    await queryInterface.addColumn(
                      'karusers',
                      'date_of_birth',
                      {
                          type: Sequelize.DataTypes.DATE,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'karusers',
                      'date_of_registration',
                      {
                          type: Sequelize.DataTypes.DATE,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'karusers',
                      'address',
                      {
                          type: Sequelize.DataTypes.TEXT,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'karusers',
                      'gothram',
                      {
                          type: Sequelize.DataTypes.TEXT,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'karusers',
                      'nakshatram',
                      {
                          type: Sequelize.DataTypes.TEXT,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'karusers',
                      'email_id',
                      {
                          type: Sequelize.DataTypes.TEXT,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'karusers',
                      'gender',
                      {
                          type: Sequelize.DataTypes.ENUM,

                            values: ['Male','Female','Other'],

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'booking_participants',
                      'booking_id',
                      {
                          type: Sequelize.DataTypes.INTEGER,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'booking_participants',
                      'member_id',
                      {
                          type: Sequelize.DataTypes.INTEGER,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'booking_participants',
                      'user_id',
                      {
                          type: Sequelize.DataTypes.INTEGER,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'pujaris',
                      'application_id',
                      {
                          type: Sequelize.DataTypes.INTEGER,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'pujaris',
                      'name',
                      {
                          type: Sequelize.DataTypes.TEXT,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'pujaris',
                      'surname',
                      {
                          type: Sequelize.DataTypes.TEXT,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'pujaris',
                      'date_of_birth',
                      {
                          type: Sequelize.DataTypes.DATE,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'pujaris',
                      'date_of_joining',
                      {
                          type: Sequelize.DataTypes.DATE,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'pujaris',
                      'qualification',
                      {
                          type: Sequelize.DataTypes.TEXT,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'pujaris',
                      'experience_yrs',
                      {
                          type: Sequelize.DataTypes.INTEGER,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'pujaris',
                      'address',
                      {
                          type: Sequelize.DataTypes.TEXT,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'pujaris',
                      'email_id',
                      {
                          type: Sequelize.DataTypes.TEXT,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'pujaris',
                      'phone_number',
                      {
                          type: Sequelize.DataTypes.TEXT,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'pujaris',
                      'razorpay_id',
                      {
                          type: Sequelize.DataTypes.TEXT,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'pujaris',
                      'gender',
                      {
                          type: Sequelize.DataTypes.ENUM,

                            values: ['Male','Female','Other'],

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'pujaris',
                      'Language',
                      {
                          type: Sequelize.DataTypes.ENUM,

                            values: ['Telugu','Other'],

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'pujaris',
                      'online_pujas',
                      {
                          type: Sequelize.DataTypes.BOOLEAN,

                            defaultValue: false,
                            allowNull: false,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'pujaris',
                      'travel',
                      {
                          type: Sequelize.DataTypes.BOOLEAN,

                            defaultValue: false,
                            allowNull: false,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'pujaris',
                      'city',
                      {
                          type: Sequelize.DataTypes.TEXT,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'pujaris',
                      'active',
                      {
                          type: Sequelize.DataTypes.BOOLEAN,

                            defaultValue: false,
                            allowNull: false,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'pujari_applications',
                      'name',
                      {
                          type: Sequelize.DataTypes.TEXT,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'pujari_applications',
                      'surname',
                      {
                          type: Sequelize.DataTypes.TEXT,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'pujari_applications',
                      'date_of_birth',
                      {
                          type: Sequelize.DataTypes.DATE,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'pujari_applications',
                      'qualification',
                      {
                          type: Sequelize.DataTypes.TEXT,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'pujari_applications',
                      'experience_yrs',
                      {
                          type: Sequelize.DataTypes.INTEGER,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'pujari_applications',
                      'address',
                      {
                          type: Sequelize.DataTypes.TEXT,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'pujari_applications',
                      'email_id',
                      {
                          type: Sequelize.DataTypes.TEXT,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'pujari_applications',
                      'phone_number',
                      {
                          type: Sequelize.DataTypes.TEXT,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'pujari_applications',
                      'gender',
                      {
                          type: Sequelize.DataTypes.ENUM,

                            values: ['Male','Female','Other'],

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'pujari_applications',
                      'application_status',
                      {
                          type: Sequelize.DataTypes.ENUM,

                            values: ['Pending','Approved','Rejected','Suspended'],

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'pujari_applications',
                      'language',
                      {
                          type: Sequelize.DataTypes.ENUM,

                            values: ['Telugu','Other'],

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'pujari_applications',
                      'online_pujas',
                      {
                          type: Sequelize.DataTypes.BOOLEAN,

                            defaultValue: false,
                            allowNull: false,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'pujari_applications',
                      'travel',
                      {
                          type: Sequelize.DataTypes.BOOLEAN,

                            defaultValue: false,
                            allowNull: false,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'pujari_applications',
                      'city',
                      {
                          type: Sequelize.DataTypes.TEXT,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'pujas',
                      'name',
                      {
                          type: Sequelize.DataTypes.TEXT,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'pujas',
                      'description',
                      {
                          type: Sequelize.DataTypes.TEXT,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'pujas',
                      'language',
                      {
                          type: Sequelize.DataTypes.ENUM,

                            values: ['Telugu','Other'],

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'pujas',
                      'duration_hrs',
                      {
                          type: Sequelize.DataTypes.INTEGER,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'puja_samagri_mappings',
                      'puja_id',
                      {
                          type: Sequelize.DataTypes.INTEGER,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'puja_samagri_mappings',
                      'samagri_id',
                      {
                          type: Sequelize.DataTypes.INTEGER,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'puja_samagri_mappings',
                      'no_of_standard_qty',
                      {
                          type: Sequelize.DataTypes.INTEGER,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'samagri',
                      'name',
                      {
                          type: Sequelize.DataTypes.TEXT,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'samagri',
                      'description',
                      {
                          type: Sequelize.DataTypes.TEXT,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'samagri',
                      'standard_qty',
                      {
                          type: Sequelize.DataTypes.INTEGER,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'samagri',
                      'qty_units',
                      {
                          type: Sequelize.DataTypes.ENUM,

                            values: ['kg','no(s)','ml','gms','dozens','other'],

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'samagri',
                      'price_standard_qty',
                      {
                          type: Sequelize.DataTypes.INTEGER,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'samagri',
                      'karishye_provided',
                      {
                          type: Sequelize.DataTypes.BOOLEAN,

                            defaultValue: false,
                            allowNull: false,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'samagri',
                      'units_in_stock',
                      {
                          type: Sequelize.DataTypes.INTEGER,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'booking_samagri_mappings',
                      'booking_id',
                      {
                          type: Sequelize.DataTypes.INTEGER,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'booking_samagri_mappings',
                      'samagri_id',
                      {
                          type: Sequelize.DataTypes.INTEGER,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'booking_samagri_mappings',
                      'no_of_standard_qty',
                      {
                          type: Sequelize.DataTypes.INTEGER,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'bookings',
                      'user_id',
                      {
                          type: Sequelize.DataTypes.INTEGER,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'bookings',
                      'pujari_id',
                      {
                          type: Sequelize.DataTypes.INTEGER,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'bookings',
                      'puja_id',
                      {
                          type: Sequelize.DataTypes.INTEGER,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'bookings',
                      'notes',
                      {
                          type: Sequelize.DataTypes.TEXT,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'bookings',
                      'price',
                      {
                          type: Sequelize.DataTypes.INTEGER,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'bookings',
                      'event_type',
                      {
                          type: Sequelize.DataTypes.ENUM,

                            values: ['At my home','Near my home','Online','On your behalf','Other'],

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'bookings',
                      'address',
                      {
                          type: Sequelize.DataTypes.TEXT,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'bookings',
                      'start_date',
                      {
                          type: Sequelize.DataTypes.DATE,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'bookings',
                      'end_date',
                      {
                          type: Sequelize.DataTypes.DATE,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'bookings',
                      'duration_hrs',
                      {
                          type: Sequelize.DataTypes.INTEGER,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'bookings',
                      'base_price',
                      {
                          type: Sequelize.DataTypes.INTEGER,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'bookings',
                      'final_price',
                      {
                          type: Sequelize.DataTypes.INTEGER,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'bookings',
                      'status',
                      {
                          type: Sequelize.DataTypes.ENUM,

                            values: ['under review','pending payment','confirmed','material dispatched','completed','suspended','cancelled'],

                      },
                      { transaction }
                    );

            await transaction.commit();
        } catch (err) {
            await transaction.rollback();
            throw err;
        }
    },
    /**
     * @param {QueryInterface} queryInterface
     * @param {Sequelize} Sequelize
     * @returns {Promise<void>}
     */
    async down(queryInterface, Sequelize) {
        /**
         * @type {Transaction}
         */
        const transaction = await queryInterface.sequelize.transaction();
        try {

                    await queryInterface.removeColumn(
                        'bookings',
                        'status',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'bookings',
                        'final_price',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'bookings',
                        'base_price',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'bookings',
                        'duration_hrs',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'bookings',
                        'end_date',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'bookings',
                        'start_date',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'bookings',
                        'address',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'bookings',
                        'event_type',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'bookings',
                        'price',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'bookings',
                        'notes',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'bookings',
                        'puja_id',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'bookings',
                        'pujari_id',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'bookings',
                        'user_id',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'booking_samagri_mappings',
                        'no_of_standard_qty',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'booking_samagri_mappings',
                        'samagri_id',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'booking_samagri_mappings',
                        'booking_id',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'samagri',
                        'units_in_stock',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'samagri',
                        'karishye_provided',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'samagri',
                        'price_standard_qty',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'samagri',
                        'qty_units',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'samagri',
                        'standard_qty',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'samagri',
                        'description',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'samagri',
                        'name',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'puja_samagri_mappings',
                        'no_of_standard_qty',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'puja_samagri_mappings',
                        'samagri_id',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'puja_samagri_mappings',
                        'puja_id',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'pujas',
                        'duration_hrs',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'pujas',
                        'language',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'pujas',
                        'description',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'pujas',
                        'name',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'pujari_applications',
                        'city',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'pujari_applications',
                        'travel',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'pujari_applications',
                        'online_pujas',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'pujari_applications',
                        'language',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'pujari_applications',
                        'application_status',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'pujari_applications',
                        'gender',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'pujari_applications',
                        'phone_number',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'pujari_applications',
                        'email_id',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'pujari_applications',
                        'address',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'pujari_applications',
                        'experience_yrs',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'pujari_applications',
                        'qualification',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'pujari_applications',
                        'date_of_birth',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'pujari_applications',
                        'surname',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'pujari_applications',
                        'name',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'pujaris',
                        'active',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'pujaris',
                        'city',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'pujaris',
                        'travel',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'pujaris',
                        'online_pujas',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'pujaris',
                        'Language',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'pujaris',
                        'gender',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'pujaris',
                        'razorpay_id',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'pujaris',
                        'phone_number',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'pujaris',
                        'email_id',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'pujaris',
                        'address',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'pujaris',
                        'experience_yrs',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'pujaris',
                        'qualification',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'pujaris',
                        'date_of_joining',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'pujaris',
                        'date_of_birth',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'pujaris',
                        'surname',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'pujaris',
                        'name',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'pujaris',
                        'application_id',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'booking_participants',
                        'user_id',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'booking_participants',
                        'member_id',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'booking_participants',
                        'booking_id',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'karusers',
                        'gender',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'karusers',
                        'email_id',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'karusers',
                        'nakshatram',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'karusers',
                        'gothram',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'karusers',
                        'address',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'karusers',
                        'date_of_registration',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'karusers',
                        'date_of_birth',
                        { transaction }
                    );

                    await queryInterface.dropTable('bookings', { transaction });

                    await queryInterface.dropTable('booking_samagri_mappings', { transaction });

                    await queryInterface.dropTable('samagri', { transaction });

                    await queryInterface.dropTable('puja_samagri_mappings', { transaction });

                    await queryInterface.dropTable('pujas', { transaction });

                    await queryInterface.dropTable('pujari_applications', { transaction });

                    await queryInterface.dropTable('pujaris', { transaction });

                    await queryInterface.dropTable('booking_participants', { transaction });

            await transaction.commit();
        } catch (err) {
            await transaction.rollback();
            throw err;
        }
    }
};
