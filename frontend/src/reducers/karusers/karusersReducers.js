import list from 'reducers/karusers/karusersListReducers';
import form from 'reducers/karusers/karusersFormReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
});
