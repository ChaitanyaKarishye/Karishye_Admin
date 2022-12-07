import axios from 'axios';
import Errors from 'components/FormItems/error/errors';
import { push } from 'connected-react-router';
import { doInit } from 'actions/auth';
import { showSnackbar } from '../../components/Snackbar';

const actions = {
  doNew: () => {
    return {
      type: 'PUJARIS_FORM_RESET',
    };
  },

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: 'PUJARIS_FORM_FIND_STARTED',
      });

      axios.get(`/pujaris/${id}`).then(res => {
        const record = res.data;

        dispatch({
          type: 'PUJARIS_FORM_FIND_SUCCESS',
          payload: record,
        });
      })
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'PUJARIS_FORM_FIND_ERROR',
      });

      dispatch(push('/admin/pujaris'));
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: 'PUJARIS_FORM_CREATE_STARTED',
      });

      axios.post('/pujaris', { data: values }).then(res => {
        dispatch({
          type: 'PUJARIS_FORM_CREATE_SUCCESS',
        });
        showSnackbar({ type: 'success', message: 'Pujaris created' });
        dispatch(push('/admin/pujaris'));
      })
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'PUJARIS_FORM_CREATE_ERROR',
      });
    }
  },

  doUpdate: (id, values, isProfile) => async (
    dispatch,
    getState,
  ) => {
    try {
      dispatch({
        type: 'PUJARIS_FORM_UPDATE_STARTED',
      });

      await axios.put(`/pujaris/${id}`, {id, data: values});

      dispatch(doInit());

      dispatch({
        type: 'PUJARIS_FORM_UPDATE_SUCCESS',
      });

      if (isProfile) {
        showSnackbar({ type: 'success', message: 'Profile updated' });
      } else {
        showSnackbar({ type: 'success', message: 'Pujaris updated' });
        dispatch(push('/admin/pujaris'));
      }
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'PUJARIS_FORM_UPDATE_ERROR',
      });
    }
  },
};

export default actions;
