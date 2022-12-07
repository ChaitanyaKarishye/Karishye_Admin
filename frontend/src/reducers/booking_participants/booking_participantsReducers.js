import list from 'reducers/booking_participants/booking_participantsListReducers';
import form from 'reducers/booking_participants/booking_participantsFormReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
});
