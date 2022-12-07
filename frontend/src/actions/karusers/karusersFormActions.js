import axios from 'axios';
import Errors from 'components/FormItems/error/errors';
import { push } from 'connected-react-router';
import { doInit } from 'actions/auth';
import { showSnackbar } from '../../components/Snackbar';

const actions = {
  doNew: () => {
    return {
      type: 'KARUSERS_FORM_RESET',
    };
  },

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: 'KARUSERS_FORM_FIND_STARTED',
      });

      axios.get(`/karusers/${id}`).then(res => {
        const record = res.data;

        dispatch({
          type: 'KARUSERS_FORM_FIND_SUCCESS',
          payload: record,
        });
      })
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'KARUSERS_FORM_FIND_ERROR',
      });

      dispatch(push('/admin/karusers'));
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: 'KARUSERS_FORM_CREATE_STARTED',
      });

      axios.post('/karusers', { data: values }).then(res => {
        dispatch({
          type: 'KARUSERS_FORM_CREATE_SUCCESS',
        });
        showSnackbar({ type: 'success', message: 'Karusers created' });
        dispatch(push('/admin/karusers'));
      })
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'KARUSERS_FORM_CREATE_ERROR',
      });
    }
  },

  doUpdate: (id, values, isProfile) => async (
    dispatch,
    getState,
  ) => {
    try {
      dispatch({
        type: 'KARUSERS_FORM_UPDATE_STARTED',
      });

      await axios.put(`/karusers/${id}`, {id, data: values});

      dispatch(doInit());

      dispatch({
        type: 'KARUSERS_FORM_UPDATE_SUCCESS',
      });

      if (isProfile) {
        showSnackbar({ type: 'success', message: 'Profile updated' });
      } else {
        showSnackbar({ type: 'success', message: 'Karusers updated' });
        dispatch(push('/admin/karusers'));
      }
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'KARUSERS_FORM_UPDATE_ERROR',
      });
    }
  },
};

export default actions;
