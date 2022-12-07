const initialData = {
  rows: [],
  loading: false,
};

export default (state = initialData, { type, payload }) => {
  if (type === 'PUJARIS_LIST_FILTERED') {
    return {
      ...state,
      loading: false,
      rows: payload.rows,
      count: payload.count,
    };
  }

  if (type === 'PUJARIS_LIST_FETCH_STARTED') {
    return {
      ...state,
      loading: true,
    };
  }

  if (type === 'PUJARIS_LIST_FETCH_SUCCESS') {
    return {
      ...state,
      loading: false,
      rows: payload.rows,
      count: payload.count,
    };
  }

  if (type === 'PUJARIS_LIST_FETCH_ERROR') {
    return {
      ...state,
      loading: false,
      rows: [],
    };
  }

  if (type === 'PUJARIS_LIST_DELETE_STARTED') {
    return {
      ...state,
      loading: true,
    };
  }

  if (type === 'PUJARIS_LIST_DELETE_SUCCESS') {
    return {
      ...state,
      loading: false,
      modalOpen: false,
    };
  }

  if (type === 'PUJARIS_LIST_DELETE_ERROR') {
    return {
      ...state,
      loading: false,
      modalOpen: false,
    };
  }

  if (type === 'PUJARIS_LIST_OPEN_CONFIRM') {
    return {
      ...state,
      loading: false,
      modalOpen: true,
      idToDelete: payload.id,
    };
  }

  if (type === 'PUJARIS_LIST_CLOSE_CONFIRM') {
    return {
      ...state,
      loading: false,
      modalOpen: false,
    };
  }

  return state;
};
