import React, { useState, useEffect } from 'react';
import Puja_samagri_mappingsForm from 'pages/CRUD/Puja_samagri_mappings/form/Puja_samagri_mappingsForm';
import { push } from 'connected-react-router';
import actions from 'actions/puja_samagri_mappings/puja_samagri_mappingsFormActions';
import { connect } from 'react-redux';

const Puja_samagri_mappingsFormPage = (props) => {
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
        <Puja_samagri_mappingsForm
          saveLoading={saveLoading}
          findLoading={findLoading}
          currentUser={currentUser}
          record={isEditing() || isProfile() ? record : {}}
          isEditing={isEditing()}
          isProfile={isProfile()}
          onSubmit={doSubmit}
          onCancel={() => dispatch(push('/admin/puja_samagri_mappings'))}
        />
      )}
    </React.Fragment>
  );
};

function mapStateToProps(store) {
  return {
    findLoading: store.puja_samagri_mappings.form.findLoading,
    saveLoading: store.puja_samagri_mappings.form.saveLoading,
    record: store.puja_samagri_mappings.form.record,
    currentUser: store.auth.currentUser,
  };
}

export default connect(mapStateToProps)(Puja_samagri_mappingsFormPage);
