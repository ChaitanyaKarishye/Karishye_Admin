import axios from 'axios';
import Errors from 'components/FormItems/error/errors';
import { push } from 'connected-react-router';
import { doInit } from 'actions/auth';
import { showSnackbar } from '../../components/Snackbar';

const actions = {
  doNew: () => {
    return {
      type: 'BOOKINGS_FORM_RESET',
    };
  },

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: 'BOOKINGS_FORM_FIND_STARTED',
      });

      axios.get(`/bookings/${id}`).then((res) => {
        const record = res.data;

        dispatch({
          type: 'BOOKINGS_FORM_FIND_SUCCESS',
          payload: record,
        });
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'BOOKINGS_FORM_FIND_ERROR',
      });

      dispatch(push('/admin/bookings'));
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: 'BOOKINGS_FORM_CREATE_STARTED',
      });

      axios.post('/bookings', { data: values }).then((res) => {
        dispatch({
          type: 'BOOKINGS_FORM_CREATE_SUCCESS',
        });
        showSnackbar({ type: 'success', message: 'Bookings created' });
        dispatch(push('/admin/bookings'));
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'BOOKINGS_FORM_CREATE_ERROR',
      });
    }
  },

  doUpdate: (id, values, isProfile) => async (dispatch, getState) => {
    try {
      dispatch({
        type: 'BOOKINGS_FORM_UPDATE_STARTED',
      });

      await axios.put(`/bookings/${id}`, { id, data: values });

      dispatch(doInit());

      dispatch({
        type: 'BOOKINGS_FORM_UPDATE_SUCCESS',
      });

      if (isProfile) {
        showSnackbar({ type: 'success', message: 'Profile updated' });
      } else {
        showSnackbar({ type: 'success', message: 'Bookings updated' });
        dispatch(push('/admin/bookings'));
      }
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'BOOKINGS_FORM_UPDATE_ERROR',
      });
    }
  },
};

export default actions;
