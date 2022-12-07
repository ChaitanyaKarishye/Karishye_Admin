
const pujasFields = {
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

    language: { type: 'enum', label: 'Language',

    options: [

    { value: 'Telugu', label: 'Telugu' },

    { value: 'Other', label: 'Other' },

]

    },

    duration_hrs: { type: 'int', label: 'Duration Hrs',

    options: [

    { value: 'value', label: 'value' },

]

    },

}

export default pujasFields;
