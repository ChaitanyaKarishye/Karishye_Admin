import { Formik } from 'formik';
import React, { Component } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Loader from 'components/Loader';
// eslint-disable-next-line no-unused-vars
import InputFormItem from 'components/FormItems/items/InputFormItem';
// eslint-disable-next-line no-unused-vars
import SwitchFormItem from 'components/FormItems/items/SwitchFormItem';
// eslint-disable-next-line no-unused-vars
import RadioFormItem from 'components/FormItems/items/RadioFormItem';
// eslint-disable-next-line no-unused-vars
import SelectFormItem from 'components/FormItems/items/SelectFormItem';
// eslint-disable-next-line no-unused-vars
import DatePickerFormItem from 'components/FormItems/items/DatePickerFormItem';
// eslint-disable-next-line no-unused-vars
import ImagesFormItem from 'components/FormItems/items/ImagesFormItem';
// eslint-disable-next-line no-unused-vars
import FilesFormItem from 'components/FormItems/items/FilesFormItem';
// eslint-disable-next-line no-unused-vars

import pujari_applicationsFields from 'pages/CRUD/Pujari_applications/helpers/pujari_applicationsFields';
import IniValues from 'components/FormItems/iniValues';
import PreparedValues from 'components/FormItems/preparedValues';
import FormValidations from 'components/FormItems/formValidations';
import Widget from 'components/Widget';

const Pujari_applicationsForm = (props) => {
  const {
    isEditing,
    isProfile,
    findLoading,
    saveLoading,
    record,
    onSubmit,
    onCancel,
    modal,
  } = props;

  const iniValues = () => {
    return IniValues(pujari_applicationsFields, record || {});
  };

  const formValidations = () => {
    return FormValidations(pujari_applicationsFields, record || {});
  };

  const handleSubmit = (values) => {
    const { id, ...data } = PreparedValues(
      pujari_applicationsFields,
      values || {},
    );
    onSubmit(id, data);
  };

  const title = () => {
    if (isProfile) {
      return 'Edit My Profile';
    }

    return isEditing ? 'Edit Pujari_applications' : 'Add Pujari_applications';
  };

  const renderForm = () => (
    <Widget title={<h4>{title()}</h4>} collapse close>
      <Formik
        onSubmit={handleSubmit}
        initialValues={iniValues()}
        validationSchema={formValidations()}
      >
        {(form) => (
          <form onSubmit={form.handleSubmit}>
            <Grid container spacing={3} direction='column'>
              <Grid item>
                <InputFormItem
                  name={'name'}
                  schema={pujari_applicationsFields}
                  autoFocus
                />
              </Grid>

              <Grid item>
                <InputFormItem
                  name={'surname'}
                  schema={pujari_applicationsFields}
                />
              </Grid>

              <Grid item>
                <DatePickerFormItem
                  name={'date_of_birth'}
                  schema={pujari_applicationsFields}
                  showTimeInput
                />
              </Grid>

              <Grid item>
                <InputFormItem
                  multiline
                  wysiwyg
                  name={'qualification'}
                  schema={pujari_applicationsFields}
                />
              </Grid>

              <Grid item>
                <InputFormItem
                  name={'experience_yrs'}
                  schema={pujari_applicationsFields}
                />
              </Grid>

              <Grid item>
                <InputFormItem
                  multiline
                  wysiwyg
                  name={'address'}
                  schema={pujari_applicationsFields}
                />
              </Grid>

              <Grid item>
                <InputFormItem
                  name={'email_id'}
                  schema={pujari_applicationsFields}
                />
              </Grid>

              <Grid item>
                <InputFormItem
                  name={'phone_number'}
                  schema={pujari_applicationsFields}
                />
              </Grid>

              <Grid item>
                <ImagesFormItem
                  name={'photo'}
                  schema={pujari_applicationsFields}
                  path={'pujari_applications/photo'}
                  fileProps={{
                    size: undefined,
                    formats: undefined,
                  }}
                  max={undefined}
                />
              </Grid>

              <Grid item>
                <FilesFormItem
                  name={'video'}
                  schema={pujari_applicationsFields}
                  path={'pujari_applications/video'}
                  fileProps={{
                    size: undefined,
                    formats: undefined,
                  }}
                  max={undefined}
                />
              </Grid>

              <Grid item>
                <RadioFormItem
                  name={'gender'}
                  schema={pujari_applicationsFields}
                />
              </Grid>

              <Grid item>
                <RadioFormItem
                  name={'application_status'}
                  schema={pujari_applicationsFields}
                />
              </Grid>

              <Grid item>
                <RadioFormItem
                  name={'language'}
                  schema={pujari_applicationsFields}
                />
              </Grid>

              <Grid item>
                <SwitchFormItem
                  name={'online_pujas'}
                  schema={pujari_applicationsFields}
                />
              </Grid>

              <Grid item>
                <SwitchFormItem
                  name={'travel'}
                  schema={pujari_applicationsFields}
                />
              </Grid>

              <Grid item>
                <InputFormItem
                  name={'city'}
                  schema={pujari_applicationsFields}
                />
              </Grid>
            </Grid>
            <Grid container spacing={3} mt={2}>
              <Grid item>
                <Button
                  color='primary'
                  variant='contained'
                  onClick={form.handleSubmit}
                >
                  Save
                </Button>
              </Grid>
              <Grid item>
                <Button
                  color='primary'
                  variant='outlined'
                  onClick={form.handleReset}
                >
                  Reset
                </Button>
              </Grid>
              <Grid item>
                <Button
                  color='primary'
                  variant='outlined'
                  onClick={() => onCancel()}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </Widget>
  );
  if (findLoading) {
    return <Loader />;
  }
  if (isEditing && !record) {
    return <Loader />;
  }
  return renderForm();
};
export default Pujari_applicationsForm;
