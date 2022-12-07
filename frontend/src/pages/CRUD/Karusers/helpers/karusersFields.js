const karusersFields = {
  id: { type: 'id', label: 'ID' },

  name: {
    type: 'string',
    label: 'Name',

    options: [{ value: 'value', label: 'value' }],
  },

  surname: {
    type: 'string',
    label: 'Surname',

    options: [{ value: 'value', label: 'value' }],
  },

  date_of_birth: {
    type: 'datetime',
    label: 'Date Of Birth',

    options: [{ value: 'value', label: 'value' }],
  },

  date_of_registration: {
    type: 'datetime',
    label: 'Date Of Registration',

    options: [{ value: 'value', label: 'value' }],
  },

  address: {
    type: 'string',
    label: 'Address',

    options: [{ value: 'value', label: 'value' }],
  },

  gothram: {
    type: 'string',
    label: 'Gothram',

    options: [{ value: 'value', label: 'value' }],
  },

  nakshatram: {
    type: 'string',
    label: 'Nakshatram',

    options: [{ value: 'value', label: 'value' }],
  },

  email_id: {
    type: 'string',
    label: 'Email Id',

    options: [{ value: 'value', label: 'value' }],
  },

  gender: {
    type: 'enum',
    label: 'Gender',

    options: [
      { value: 'Male', label: 'Male' },

      { value: 'Female', label: 'Female' },

      { value: 'Other', label: 'Other' },
    ],
  },
};

export default karusersFields;
