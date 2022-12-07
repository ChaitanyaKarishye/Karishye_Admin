import axios from 'axios';
import Errors from 'components/FormItems/error/errors';
import { push } from 'connected-react-router';
import { doInit } from 'actions/auth';
import { showSnackbar } from '../../components/Snackbar';

const actions = {
  doNew: () => {
    return {
      type: 'SAMAGRI_FORM_RESET',
    };
  },

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: 'SAMAGRI_FORM_FIND_STARTED',
      });

      axios.get(`/samagri/${id}`).then((res) => {
        const record = res.data;

        dispatch({
          type: 'SAMAGRI_FORM_FIND_SUCCESS',
          payload: record,
        });
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'SAMAGRI_FORM_FIND_ERROR',
      });

      dispatch(push('/admin/samagri'));
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: 'SAMAGRI_FORM_CREATE_STARTED',
      });

      axios.post('/samagri', { data: values }).then((res) => {
        dispatch({
          type: 'SAMAGRI_FORM_CREATE_SUCCESS',
        });
        showSnackbar({ type: 'success', message: 'Samagri created' });
        dispatch(push('/admin/samagri'));
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'SAMAGRI_FORM_CREATE_ERROR',
      });
    }
  },

  doUpdate: (id, values, isProfile) => async (dispatch, getState) => {
    try {
      dispatch({
        type: 'SAMAGRI_FORM_UPDATE_STARTED',
      });

      await axios.put(`/samagri/${id}`, { id, data: values });

      dispatch(doInit());

      dispatch({
        type: 'SAMAGRI_FORM_UPDATE_SUCCESS',
      });

      if (isProfile) {
        showSnackbar({ type: 'success', message: 'Profile updated' });
      } else {
        showSnackbar({ type: 'success', message: 'Samagri updated' });
        dispatch(push('/admin/samagri'));
      }
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'SAMAGRI_FORM_UPDATE_ERROR',
      });
    }
  },
};

export default actions;
