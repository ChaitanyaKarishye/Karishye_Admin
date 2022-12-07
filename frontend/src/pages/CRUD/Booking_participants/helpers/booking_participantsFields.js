const booking_participantsFields = {
  id: { type: 'id', label: 'ID' },

  booking_id: {
    type: 'int',
    label: 'Booking Id',

    options: [{ value: 'value', label: 'value' }],
  },

  member_id: {
    type: 'int',
    label: 'Member Id',

    options: [{ value: 'value', label: 'value' }],
  },

  user_id: {
    type: 'int',
    label: 'User Id',

    options: [{ value: 'value', label: 'value' }],
  },
};

export default booking_participantsFields;
