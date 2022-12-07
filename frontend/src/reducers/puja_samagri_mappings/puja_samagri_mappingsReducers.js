import list from 'reducers/puja_samagri_mappings/puja_samagri_mappingsListReducers';
import form from 'reducers/puja_samagri_mappings/puja_samagri_mappingsFormReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
});
