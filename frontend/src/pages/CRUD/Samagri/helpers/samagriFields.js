
const samagriFields = {
	id: { type: 'id', label: 'ID' },

    name: { type: 'string', label: 'Name',

    options: [

    { value: 'value', label: 'value' },

]

    },

    description: { type: 'string', label: 'Description',

    options: [

    { value: 'value', label: 'value' },

]

    },

    standard_qty: { type: 'int', label: 'Standard Qty',

    options: [

    { value: 'value', label: 'value' },

]

    },

    qty_units: { type: 'enum', label: 'Qty Units',

    options: [

    { value: 'kg', label: 'kg' },

    { value: 'no(s)', label: 'no(s)' },

    { value: 'ml', label: 'ml' },

    { value: 'gms', label: 'gms' },

    { value: 'dozens', label: 'dozens' },

    { value: 'other', label: 'other' },

]

    },

    price_standard_qty: { type: 'int', label: 'Price Standard Qty',

    options: [

    { value: 'value', label: 'value' },

]

    },

    karishye_provided: { type: 'boolean', label: 'Karishye Provided',

    options: [

    { value: 'value', label: 'value' },

]

    },

    units_in_stock: { type: 'int', label: 'Units In Stock',

    options: [

    { value: 'value', label: 'value' },

]

    },

}

export default samagriFields;
