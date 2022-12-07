import React, { useState, useEffect } from 'react';
import Pujari_applicationsForm from 'pages/CRUD/Pujari_applications/form/Pujari_applicationsForm';
import { push } from 'connected-react-router';
import actions from 'actions/pujari_applications/pujari_applicationsFormActions';
import { connect } from 'react-redux';

const Pujari_applicationsFormPage = (props) => {

  const {
    dispatch,
    match,
    saveLoading,
    findLoading,
    record,
    currentUser
  } = props;

  const [dispatched, setDispatched] = useState(false);

  const isEditing = () => {
    return !!match.params.id;
  };

  const isProfile = () => {
    return match.url === '/app/profile';
  };

  const doSubmit = (id, data) => {
    if (isEditing() || isProfile()) {
      dispatch(actions.doUpdate(id, data, isProfile()))
    } else {
      dispatch(actions.doCreate(data))
    }
  };

  useEffect(() => {
    if (isEditing()) {
      dispatch(actions.doFind(match.params.id));
    } else {
      if (isProfile()) {
        const currentUser = JSON.parse(localStorage.getItem('user'));
        const currentUserId = currentUser.user.id;
        dispatch(actions.doFind(currentUserId));
      } else {
        dispatch(actions.doNew())
      }
    }
    setDispatched(true);
  }, [match, dispatch])

  return (
    <React.Fragment>
      {dispatched && (
        <Pujari_applicationsForm
        saveLoading={saveLoading}
        findLoading={findLoading}
        currentUser={currentUser}
        record={(isEditing() || isProfile()) ? record : {}}
        isEditing={isEditing()}
        isProfile={isProfile()}
        onSubmit={doSubmit}
        onCancel={() => dispatch(push('/admin/pujari_applications'))}
        />
        )}
    </React.Fragment>
  );
}

function mapStateToProps(store) {
  return {
    findLoading: store.pujari_applications.form.findLoading,
    saveLoading: store.pujari_applications.form.saveLoading,
    record: store.pujari_applications.form.record,
    currentUser: store.auth.currentUser,
  };
}

export default connect(mapStateToProps)(Pujari_applicationsFormPage);
