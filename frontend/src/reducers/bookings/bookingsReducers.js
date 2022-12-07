import list from 'reducers/bookings/bookingsListReducers';
import form from 'reducers/bookings/bookingsFormReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
});
