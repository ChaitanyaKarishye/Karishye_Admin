import auth from 'reducers/auth';
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import users from 'reducers/users/usersReducers';

import karusers from 'reducers/karusers/karusersReducers';

import booking_participants from 'reducers/booking_participants/booking_participantsReducers';

import pujaris from 'reducers/pujaris/pujarisReducers';

import pujari_applications from 'reducers/pujari_applications/pujari_applicationsReducers';

import pujas from 'reducers/pujas/pujasReducers';

import puja_samagri_mappings from 'reducers/puja_samagri_mappings/puja_samagri_mappingsReducers';

import samagri from 'reducers/samagri/samagriReducers';

import booking_samagri_mappings from 'reducers/booking_samagri_mappings/booking_samagri_mappingsReducers';

import bookings from 'reducers/bookings/bookingsReducers';

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    auth,

    users,

    karusers,

    booking_participants,

    pujaris,

    pujari_applications,

    pujas,

    puja_samagri_mappings,

    samagri,

    booking_samagri_mappings,

    bookings,
  });
