const pujari_applicationsFields = {
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

  qualification: {
    type: 'string',
    label: 'Qualification',

    options: [{ value: 'value', label: 'value' }],
  },

  experience_yrs: {
    type: 'int',
    label: 'Experience Yrs',

    options: [{ value: 'value', label: 'value' }],
  },

  address: {
    type: 'string',
    label: 'Address',

    options: [{ value: 'value', label: 'value' }],
  },

  email_id: {
    type: 'string',
    label: 'Email Id',

    options: [{ value: 'value', label: 'value' }],
  },

  phone_number: {
    type: 'string',
    label: 'Phone Number',

    options: [{ value: 'value', label: 'value' }],
  },

  photo: {
    type: 'images',
    label: 'Photo',

    options: [{ value: 'value', label: 'value' }],
  },

  video: {
    type: 'files',
    label: 'Video',

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

  application_status: {
    type: 'enum',
    label: 'Application Status',

    options: [
      { value: 'Pending', label: 'Pending' },

      { value: 'Approved', label: 'Approved' },

      { value: 'Rejected', label: 'Rejected' },

      { value: 'Suspended', label: 'Suspended' },
    ],
  },

  language: {
    type: 'enum',
    label: 'Language',

    options: [
      { value: 'Telugu', label: 'Telugu' },

      { value: 'Other', label: 'Other' },
    ],
  },

  online_pujas: {
    type: 'boolean',
    label: 'Online Pujas',

    options: [{ value: 'value', label: 'value' }],
  },

  travel: {
    type: 'boolean',
    label: 'Travel',

    options: [{ value: 'value', label: 'value' }],
  },

  city: {
    type: 'string',
    label: 'City',

    options: [{ value: 'value', label: 'value' }],
  },
};

export default pujari_applicationsFields;
