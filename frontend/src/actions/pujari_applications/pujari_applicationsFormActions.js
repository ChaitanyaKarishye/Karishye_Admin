import axios from 'axios';
import Errors from 'components/FormItems/error/errors';
import { push } from 'connected-react-router';
import { doInit } from 'actions/auth';
import { showSnackbar } from '../../components/Snackbar';

const actions = {
  doNew: () => {
    return {
      type: 'PUJARI_APPLICATIONS_FORM_RESET',
    };
  },

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: 'PUJARI_APPLICATIONS_FORM_FIND_STARTED',
      });

      axios.get(`/pujari_applications/${id}`).then(res => {
        const record = res.data;

        dispatch({
          type: 'PUJARI_APPLICATIONS_FORM_FIND_SUCCESS',
          payload: record,
        });
      })
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'PUJARI_APPLICATIONS_FORM_FIND_ERROR',
      });

      dispatch(push('/admin/pujari_applications'));
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: 'PUJARI_APPLICATIONS_FORM_CREATE_STARTED',
      });

      axios.post('/pujari_applications', { data: values }).then(res => {
        dispatch({
          type: 'PUJARI_APPLICATIONS_FORM_CREATE_SUCCESS',
        });
        showSnackbar({ type: 'success', message: 'Pujari_applications created' });
        dispatch(push('/admin/pujari_applications'));
      })
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'PUJARI_APPLICATIONS_FORM_CREATE_ERROR',
      });
    }
  },

  doUpdate: (id, values, isProfile) => async (
    dispatch,
    getState,
  ) => {
    try {
      dispatch({
        type: 'PUJARI_APPLICATIONS_FORM_UPDATE_STARTED',
      });

      await axios.put(`/pujari_applications/${id}`, {id, data: values});

      dispatch(doInit());

      dispatch({
        type: 'PUJARI_APPLICATIONS_FORM_UPDATE_SUCCESS',
      });

      if (isProfile) {
        showSnackbar({ type: 'success', message: 'Profile updated' });
      } else {
        showSnackbar({ type: 'success', message: 'Pujari_applications updated' });
        dispatch(push('/admin/pujari_applications'));
      }
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'PUJARI_APPLICATIONS_FORM_UPDATE_ERROR',
      });
    }
  },
};

export default actions;
