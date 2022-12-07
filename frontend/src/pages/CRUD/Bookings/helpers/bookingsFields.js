const bookingsFields = {
  id: { type: 'id', label: 'ID' },

  user_id: {
    type: 'int',
    label: 'User Id',

    options: [{ value: 'value', label: 'value' }],
  },

  pujari_id: {
    type: 'int',
    label: 'Pujari Id',

    options: [{ value: 'value', label: 'value' }],
  },

  puja_id: {
    type: 'int',
    label: 'Puja Id',

    options: [{ value: 'value', label: 'value' }],
  },

  notes: {
    type: 'string',
    label: 'Notes',

    options: [{ value: 'value', label: 'value' }],
  },

  price: {
    type: 'int',
    label: 'Price',

    options: [{ value: 'value', label: 'value' }],
  },

  event_type: {
    type: 'enum',
    label: 'Event Type',

    options: [
      { value: 'At my home', label: 'At my home' },

      { value: 'Near my home', label: 'Near my home' },

      { value: 'Online', label: 'Online' },

      { value: 'On your behalf', label: 'On your behalf' },

      { value: 'Other', label: 'Other' },
    ],
  },

  address: {
    type: 'string',
    label: 'Address',

    options: [{ value: 'value', label: 'value' }],
  },

  start_date: {
    type: 'datetime',
    label: 'Start Date',

    options: [{ value: 'value', label: 'value' }],
  },

  end_date: {
    type: 'datetime',
    label: 'End Date',

    options: [{ value: 'value', label: 'value' }],
  },

  duration_hrs: {
    type: 'int',
    label: 'Duration Hrs',

    options: [{ value: 'value', label: 'value' }],
  },

  base_price: {
    type: 'int',
    label: 'Base Price',

    options: [{ value: 'value', label: 'value' }],
  },

  final_price: {
    type: 'int',
    label: 'Final Price',

    options: [{ value: 'value', label: 'value' }],
  },

  status: {
    type: 'enum',
    label: 'Status',

    options: [
      { value: 'under review', label: 'under review' },

      { value: 'pending payment', label: 'pending payment' },

      { value: 'confirmed', label: 'confirmed' },

      { value: 'material dispatched', label: 'material dispatched' },

      { value: 'completed', label: 'completed' },

      { value: 'suspended', label: 'suspended' },

      { value: 'cancelled', label: 'cancelled' },
    ],
  },
};

export default bookingsFields;
