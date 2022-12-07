import React, { useEffect } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import classnames from 'classnames';

import SettingsIcon from '@mui/icons-material/Settings';
import GithubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';

import { Fab, IconButton } from '@mui/material';
import { connect } from 'react-redux';
// styles
import useStyles from './styles';

// components
import Header from '../Header';
import Sidebar from '../Sidebar';
import Footer from '../Footer';
import { Link } from '../Wrappers';
import ColorChangeThemePopper from './components/ColorChangeThemePopper';

import EditUser from '../../pages/user/EditUser';

// pages
import Dashboard from '../../pages/dashboard';
import BreadCrumbs from '../../components/BreadCrumbs';

// context
import { useLayoutState } from '../../context/LayoutContext';

import UsersFormPage from 'pages/CRUD/Users/form/UsersFormPage';
import UsersTablePage from 'pages/CRUD/Users/table/UsersTablePage';

import KarusersFormPage from 'pages/CRUD/Karusers/form/KarusersFormPage';
import KarusersTablePage from 'pages/CRUD/Karusers/table/KarusersTablePage';

import Booking_participantsFormPage from 'pages/CRUD/Booking_participants/form/Booking_participantsFormPage';
import Booking_participantsTablePage from 'pages/CRUD/Booking_participants/table/Booking_participantsTablePage';

import PujarisFormPage from 'pages/CRUD/Pujaris/form/PujarisFormPage';
import PujarisTablePage from 'pages/CRUD/Pujaris/table/PujarisTablePage';

import Pujari_applicationsFormPage from 'pages/CRUD/Pujari_applications/form/Pujari_applicationsFormPage';
import Pujari_applicationsTablePage from 'pages/CRUD/Pujari_applications/table/Pujari_applicationsTablePage';

import PujasFormPage from 'pages/CRUD/Pujas/form/PujasFormPage';
import PujasTablePage from 'pages/CRUD/Pujas/table/PujasTablePage';

import Puja_samagri_mappingsFormPage from 'pages/CRUD/Puja_samagri_mappings/form/Puja_samagri_mappingsFormPage';
import Puja_samagri_mappingsTablePage from 'pages/CRUD/Puja_samagri_mappings/table/Puja_samagri_mappingsTablePage';

import SamagriFormPage from 'pages/CRUD/Samagri/form/SamagriFormPage';
import SamagriTablePage from 'pages/CRUD/Samagri/table/SamagriTablePage';

import Booking_samagri_mappingsFormPage from 'pages/CRUD/Booking_samagri_mappings/form/Booking_samagri_mappingsFormPage';
import Booking_samagri_mappingsTablePage from 'pages/CRUD/Booking_samagri_mappings/table/Booking_samagri_mappingsTablePage';

import BookingsFormPage from 'pages/CRUD/Bookings/form/BookingsFormPage';
import BookingsTablePage from 'pages/CRUD/Bookings/table/BookingsTablePage';

const Redirect = (props) => {
  useEffect(() => window.location.replace(props.url));
  return <span>Redirecting...</span>;
};

function Layout(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);
  const id = open ? 'add-section-popover' : undefined;
  const handleClick = (event) => {
    setAnchorEl(open ? null : event.currentTarget);
  };

  // global
  let layoutState = useLayoutState();

  return (
    <div className={classes.root}>
      <Header history={props.history} />
      <Sidebar />
      <div
        className={classnames(classes.content, {
          [classes.contentShift]: layoutState.isSidebarOpened,
        })}
      >
        <div className={classes.fakeToolbar} />
        <BreadCrumbs />
        <Switch>
          <Route path='/admin/dashboard' component={Dashboard} />
          <Route path='/admin/user/edit' component={EditUser} />
          <Route
            path={'/admin/api-docs'}
            exact
            component={(props) => (
              <Redirect
                url={
                  process.env.NODE_ENV === 'production'
                    ? window.location.origin + '/api-docs'
                    : 'http://localhost:8080/api-docs'
                }
                {...props}
              />
            )}
          />

          <Route path={'/admin/users'} exact component={UsersTablePage} />
          <Route path={'/admin/users/new'} exact component={UsersFormPage} />
          <Route
            path={'/admin/users/:id/edit'}
            exact
            component={UsersFormPage}
          />

          <Route path={'/admin/karusers'} exact component={KarusersTablePage} />
          <Route
            path={'/admin/karusers/new'}
            exact
            component={KarusersFormPage}
          />
          <Route
            path={'/admin/karusers/:id/edit'}
            exact
            component={KarusersFormPage}
          />

          <Route
            path={'/admin/booking_participants'}
            exact
            component={Booking_participantsTablePage}
          />
          <Route
            path={'/admin/booking_participants/new'}
            exact
            component={Booking_participantsFormPage}
          />
          <Route
            path={'/admin/booking_participants/:id/edit'}
            exact
            component={Booking_participantsFormPage}
          />

          <Route path={'/admin/pujaris'} exact component={PujarisTablePage} />
          <Route
            path={'/admin/pujaris/new'}
            exact
            component={PujarisFormPage}
          />
          <Route
            path={'/admin/pujaris/:id/edit'}
            exact
            component={PujarisFormPage}
          />

          <Route
            path={'/admin/pujari_applications'}
            exact
            component={Pujari_applicationsTablePage}
          />
          <Route
            path={'/admin/pujari_applications/new'}
            exact
            component={Pujari_applicationsFormPage}
          />
          <Route
            path={'/admin/pujari_applications/:id/edit'}
            exact
            component={Pujari_applicationsFormPage}
          />

          <Route path={'/admin/pujas'} exact component={PujasTablePage} />
          <Route path={'/admin/pujas/new'} exact component={PujasFormPage} />
          <Route
            path={'/admin/pujas/:id/edit'}
            exact
            component={PujasFormPage}
          />

          <Route
            path={'/admin/puja_samagri_mappings'}
            exact
            component={Puja_samagri_mappingsTablePage}
          />
          <Route
            path={'/admin/puja_samagri_mappings/new'}
            exact
            component={Puja_samagri_mappingsFormPage}
          />
          <Route
            path={'/admin/puja_samagri_mappings/:id/edit'}
            exact
            component={Puja_samagri_mappingsFormPage}
          />

          <Route path={'/admin/samagri'} exact component={SamagriTablePage} />
          <Route
            path={'/admin/samagri/new'}
            exact
            component={SamagriFormPage}
          />
          <Route
            path={'/admin/samagri/:id/edit'}
            exact
            component={SamagriFormPage}
          />

          <Route
            path={'/admin/booking_samagri_mappings'}
            exact
            component={Booking_samagri_mappingsTablePage}
          />
          <Route
            path={'/admin/booking_samagri_mappings/new'}
            exact
            component={Booking_samagri_mappingsFormPage}
          />
          <Route
            path={'/admin/booking_samagri_mappings/:id/edit'}
            exact
            component={Booking_samagri_mappingsFormPage}
          />

          <Route path={'/admin/bookings'} exact component={BookingsTablePage} />
          <Route
            path={'/admin/bookings/new'}
            exact
            component={BookingsFormPage}
          />
          <Route
            path={'/admin/bookings/:id/edit'}
            exact
            component={BookingsFormPage}
          />
        </Switch>
        <Fab
          color='primary'
          aria-label='settings'
          onClick={(e) => handleClick(e)}
          className={classes.changeThemeFab}
          style={{ zIndex: 100 }}
        >
          <SettingsIcon style={{ color: '#fff' }} />
        </Fab>
        <ColorChangeThemePopper id={id} open={open} anchorEl={anchorEl} />
        <Footer>
          <div>
            <Link
              color={'primary'}
              href={'https://flatlogic.com/'}
              target={'_blank'}
              className={classes.link}
            >
              Flatlogic
            </Link>
            <Link
              color={'primary'}
              href={'https://flatlogic.com/about'}
              target={'_blank'}
              className={classes.link}
            >
              About Us
            </Link>
            <Link
              color={'primary'}
              href={'https://flatlogic.com/blog'}
              target={'_blank'}
              className={classes.link}
            >
              Blog
            </Link>
          </div>
          <div>
            <Link href={'https://www.facebook.com/flatlogic'} target={'_blank'}>
              <IconButton aria-label='facebook'>
                <FacebookIcon style={{ color: '#6E6E6E99' }} />
              </IconButton>
            </Link>
            <Link href={'https://twitter.com/flatlogic'} target={'_blank'}>
              <IconButton aria-label='twitter'>
                <TwitterIcon style={{ color: '#6E6E6E99' }} />
              </IconButton>
            </Link>
            <Link href={'https://github.com/flatlogic'} target={'_blank'}>
              <IconButton
                aria-label='github'
                style={{ padding: '12px 0 12px 12px' }}
              >
                <GithubIcon style={{ color: '#6E6E6E99' }} />
              </IconButton>
            </Link>
          </div>
        </Footer>
      </div>
    </div>
  );
}

export default withRouter(connect()(Layout));
