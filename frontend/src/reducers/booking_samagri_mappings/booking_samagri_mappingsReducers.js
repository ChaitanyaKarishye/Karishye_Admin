import list from 'reducers/booking_samagri_mappings/booking_samagri_mappingsListReducers';
import form from 'reducers/booking_samagri_mappings/booking_samagri_mappingsFormReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
});
