import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CircularProgress, Box, Grid } from '@mui/material';
import {
  useManagementDispatch,
  useManagementState,
} from '../../context/ManagementContext';
import InfoIcon from '@mui/icons-material/Info';
import axios from 'axios';
// styles
import useStyles from './styles';
// components
import Widget from '../../components/Widget/Widget';

const Dashboard = () => {
  let classes = useStyles();
  const managementDispatch = useManagementDispatch();
  const managementValue = useManagementState();

  const [users, setUsers] = useState(0);
  const [karusers, setKarusers] = useState(0);
  const [booking_participants, setBooking_participants] = useState(0);
  const [pujaris, setPujaris] = useState(0);
  const [pujari_applications, setPujari_applications] = useState(0);
  const [pujas, setPujas] = useState(0);
  const [puja_samagri_mappings, setPuja_samagri_mappings] = useState(0);
  const [samagri, setSamagri] = useState(0);
  const [booking_samagri_mappings, setBooking_samagri_mappings] = useState(0);
  const [bookings, setBookings] = useState(0);

  const [currentUser, setCurrentUser] = useState(null);

  async function loadData() {
    const fns = [
      setUsers,
      setKarusers,
      setBooking_participants,
      setPujaris,
      setPujari_applications,
      setPujas,
      setPuja_samagri_mappings,
      setSamagri,
      setBooking_samagri_mappings,
      setBookings,
    ];

    const responseUsers = await axios.get(`/users`);
    const responseKarusers = await axios.get(`/karusers`);
    const responseBooking_participants = await axios.get(
      `/booking_participants`,
    );
    const responsePujaris = await axios.get(`/pujaris`);
    const responsePujari_applications = await axios.get(`/pujari_applications`);
    const responsePujas = await axios.get(`/pujas`);
    const responsePuja_samagri_mappings = await axios.get(
      `/puja_samagri_mappings`,
    );
    const responseSamagri = await axios.get(`/samagri`);
    const responseBooking_samagri_mappings = await axios.get(
      `/booking_samagri_mappings`,
    );
    const responseBookings = await axios.get(`/bookings`);
    Promise.all([
      responseUsers,
      responseKarusers,
      responseBooking_participants,
      responsePujaris,
      responsePujari_applications,
      responsePujas,
      responsePuja_samagri_mappings,
      responseSamagri,
      responseBooking_samagri_mappings,
      responseBookings,
    ])
      .then((res) => res.map((el) => el.data))
      .then((data) => data.forEach((el, i) => fns[i](el.count)));
  }

  useEffect(() => {
    setCurrentUser(managementValue.currentUser);
    loadData();
  }, [managementDispatch, managementValue]);

  if (!currentUser) {
    return (
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        minHeight='100vh'
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div>
      <h1 className='page-title'>
        Welcome, {currentUser.firstName}! <br />
        <small>
          <small>Your role is {currentUser.role}</small>
        </small>
      </h1>
      <Grid container alignItems='center' columns={12} spacing={3}>
        <Grid item xs={12} sm={6} lg={4} xl={3}>
          <Link to={'/admin/users'} style={{ textDecoration: 'none' }}>
            <Widget title={'Users'}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <InfoIcon color='primary' sx={{ mr: 1 }} />
                <p className={classes.widgetText}>
                  Users:{' '}
                  <span className={classes.widgetTextCount}>{users}</span>
                </p>
              </div>
            </Widget>
          </Link>
        </Grid>

        <Grid item xs={12} sm={6} lg={4} xl={3}>
          <Link to={'/admin/karusers'} style={{ textDecoration: 'none' }}>
            <Widget title={'Karusers'}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <InfoIcon color='primary' sx={{ mr: 1 }} />
                <p className={classes.widgetText}>
                  Karusers:{' '}
                  <span className={classes.widgetTextCount}>{karusers}</span>
                </p>
              </div>
            </Widget>
          </Link>
        </Grid>

        <Grid item xs={12} sm={6} lg={4} xl={3}>
          <Link
            to={'/admin/booking_participants'}
            style={{ textDecoration: 'none' }}
          >
            <Widget title={'Booking_participants'}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <InfoIcon color='primary' sx={{ mr: 1 }} />
                <p className={classes.widgetText}>
                  Booking_participants:{' '}
                  <span className={classes.widgetTextCount}>
                    {booking_participants}
                  </span>
                </p>
              </div>
            </Widget>
          </Link>
        </Grid>

        <Grid item xs={12} sm={6} lg={4} xl={3}>
          <Link to={'/admin/pujaris'} style={{ textDecoration: 'none' }}>
            <Widget title={'Pujaris'}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <InfoIcon color='primary' sx={{ mr: 1 }} />
                <p className={classes.widgetText}>
                  Pujaris:{' '}
                  <span className={classes.widgetTextCount}>{pujaris}</span>
                </p>
              </div>
            </Widget>
          </Link>
        </Grid>

        <Grid item xs={12} sm={6} lg={4} xl={3}>
          <Link
            to={'/admin/pujari_applications'}
            style={{ textDecoration: 'none' }}
          >
            <Widget title={'Pujari_applications'}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <InfoIcon color='primary' sx={{ mr: 1 }} />
                <p className={classes.widgetText}>
                  Pujari_applications:{' '}
                  <span className={classes.widgetTextCount}>
                    {pujari_applications}
                  </span>
                </p>
              </div>
            </Widget>
          </Link>
        </Grid>

        <Grid item xs={12} sm={6} lg={4} xl={3}>
          <Link to={'/admin/pujas'} style={{ textDecoration: 'none' }}>
            <Widget title={'Pujas'}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <InfoIcon color='primary' sx={{ mr: 1 }} />
                <p className={classes.widgetText}>
                  Pujas:{' '}
                  <span className={classes.widgetTextCount}>{pujas}</span>
                </p>
              </div>
            </Widget>
          </Link>
        </Grid>

        <Grid item xs={12} sm={6} lg={4} xl={3}>
          <Link
            to={'/admin/puja_samagri_mappings'}
            style={{ textDecoration: 'none' }}
          >
            <Widget title={'Puja_samagri_mappings'}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <InfoIcon color='primary' sx={{ mr: 1 }} />
                <p className={classes.widgetText}>
                  Puja_samagri_mappings:{' '}
                  <span className={classes.widgetTextCount}>
                    {puja_samagri_mappings}
                  </span>
                </p>
              </div>
            </Widget>
          </Link>
        </Grid>

        <Grid item xs={12} sm={6} lg={4} xl={3}>
          <Link to={'/admin/samagri'} style={{ textDecoration: 'none' }}>
            <Widget title={'Samagri'}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <InfoIcon color='primary' sx={{ mr: 1 }} />
                <p className={classes.widgetText}>
                  Samagri:{' '}
                  <span className={classes.widgetTextCount}>{samagri}</span>
                </p>
              </div>
            </Widget>
          </Link>
        </Grid>

        <Grid item xs={12} sm={6} lg={4} xl={3}>
          <Link
            to={'/admin/booking_samagri_mappings'}
            style={{ textDecoration: 'none' }}
          >
            <Widget title={'Booking_samagri_mappings'}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <InfoIcon color='primary' sx={{ mr: 1 }} />
                <p className={classes.widgetText}>
                  Booking_samagri_mappings:{' '}
                  <span className={classes.widgetTextCount}>
                    {booking_samagri_mappings}
                  </span>
                </p>
              </div>
            </Widget>
          </Link>
        </Grid>

        <Grid item xs={12} sm={6} lg={4} xl={3}>
          <Link to={'/admin/bookings'} style={{ textDecoration: 'none' }}>
            <Widget title={'Bookings'}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <InfoIcon color='primary' sx={{ mr: 1 }} />
                <p className={classes.widgetText}>
                  Bookings:{' '}
                  <span className={classes.widgetTextCount}>{bookings}</span>
                </p>
              </div>
            </Widget>
          </Link>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
