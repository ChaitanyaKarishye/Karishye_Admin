import axios from 'axios';
import Errors from 'components/FormItems/error/errors';
import { push } from 'connected-react-router';
import { doInit } from 'actions/auth';
import { showSnackbar } from '../../components/Snackbar';

const actions = {
  doNew: () => {
    return {
      type: 'PUJAS_FORM_RESET',
    };
  },

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: 'PUJAS_FORM_FIND_STARTED',
      });

      axios.get(`/pujas/${id}`).then((res) => {
        const record = res.data;

        dispatch({
          type: 'PUJAS_FORM_FIND_SUCCESS',
          payload: record,
        });
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'PUJAS_FORM_FIND_ERROR',
      });

      dispatch(push('/admin/pujas'));
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: 'PUJAS_FORM_CREATE_STARTED',
      });

      axios.post('/pujas', { data: values }).then((res) => {
        dispatch({
          type: 'PUJAS_FORM_CREATE_SUCCESS',
        });
        showSnackbar({ type: 'success', message: 'Pujas created' });
        dispatch(push('/admin/pujas'));
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'PUJAS_FORM_CREATE_ERROR',
      });
    }
  },

  doUpdate: (id, values, isProfile) => async (dispatch, getState) => {
    try {
      dispatch({
        type: 'PUJAS_FORM_UPDATE_STARTED',
      });

      await axios.put(`/pujas/${id}`, { id, data: values });

      dispatch(doInit());

      dispatch({
        type: 'PUJAS_FORM_UPDATE_SUCCESS',
      });

      if (isProfile) {
        showSnackbar({ type: 'success', message: 'Profile updated' });
      } else {
        showSnackbar({ type: 'success', message: 'Pujas updated' });
        dispatch(push('/admin/pujas'));
      }
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'PUJAS_FORM_UPDATE_ERROR',
      });
    }
  },
};

export default actions;
