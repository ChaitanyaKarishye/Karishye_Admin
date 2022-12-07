import list from 'reducers/pujari_applications/pujari_applicationsListReducers';
import form from 'reducers/pujari_applications/pujari_applicationsFormReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
});
