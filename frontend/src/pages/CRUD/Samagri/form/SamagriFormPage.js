import React, { useState, useEffect } from 'react';
import SamagriForm from 'pages/CRUD/Samagri/form/SamagriForm';
import { push } from 'connected-react-router';
import actions from 'actions/samagri/samagriFormActions';
import { connect } from 'react-redux';

const SamagriFormPage = (props) => {
  const { dispatch, match, saveLoading, findLoading, record, currentUser } =
    props;

  const [dispatched, setDispatched] = useState(false);

  const isEditing = () => {
    return !!match.params.id;
  };

  const isProfile = () => {
    return match.url === '/app/profile';
  };

  const doSubmit = (id, data) => {
    if (isEditing() || isProfile()) {
      dispatch(actions.doUpdate(id, data, isProfile()));
    } else {
      dispatch(actions.doCreate(data));
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
        dispatch(actions.doNew());
      }
    }
    setDispatched(true);
  }, [match, dispatch]);

  return (
    <React.Fragment>
      {dispatched && (
        <SamagriForm
          saveLoading={saveLoading}
          findLoading={findLoading}
          currentUser={currentUser}
          record={isEditing() || isProfile() ? record : {}}
          isEditing={isEditing()}
          isProfile={isProfile()}
          onSubmit={doSubmit}
          onCancel={() => dispatch(push('/admin/samagri'))}
        />
      )}
    </React.Fragment>
  );
};

function mapStateToProps(store) {
  return {
    findLoading: store.samagri.form.findLoading,
    saveLoading: store.samagri.form.saveLoading,
    record: store.samagri.form.record,
    currentUser: store.auth.currentUser,
  };
}

export default connect(mapStateToProps)(SamagriFormPage);
