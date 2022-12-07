import list from 'reducers/pujas/pujasListReducers';
import form from 'reducers/pujas/pujasFormReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
});
