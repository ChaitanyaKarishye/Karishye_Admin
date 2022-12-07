import list from 'reducers/samagri/samagriListReducers';
import form from 'reducers/samagri/samagriFormReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
});
