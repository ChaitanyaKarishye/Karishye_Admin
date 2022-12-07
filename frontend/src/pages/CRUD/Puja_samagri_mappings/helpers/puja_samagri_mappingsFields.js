const puja_samagri_mappingsFields = {
  id: { type: 'id', label: 'ID' },

  puja_id: {
    type: 'int',
    label: 'Puja Id',

    options: [{ value: 'value', label: 'value' }],
  },

  samagri_id: {
    type: 'int',
    label: 'Samagri Id',

    options: [{ value: 'value', label: 'value' }],
  },

  no_of_standard_qty: {
    type: 'int',
    label: 'No Of Standard Qty',

    options: [{ value: 'value', label: 'value' }],
  },
};

export default puja_samagri_mappingsFields;
