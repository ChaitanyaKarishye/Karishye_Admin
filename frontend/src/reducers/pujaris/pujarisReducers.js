import list from 'reducers/pujaris/pujarisListReducers';
import form from 'reducers/pujaris/pujarisFormReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
});
