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

import bookingsFields from 'pages/CRUD/Bookings/helpers/bookingsFields';
import IniValues from 'components/FormItems/iniValues';
import PreparedValues from 'components/FormItems/preparedValues';
import FormValidations from 'components/FormItems/formValidations';
import Widget from 'components/Widget';

const BookingsForm = (props) => {
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
    return IniValues(bookingsFields, record || {});
  };

  const formValidations = () => {
    return FormValidations(bookingsFields, record || {});
  };

  const handleSubmit = (values) => {
    const { id, ...data } = PreparedValues(bookingsFields, values || {});
    onSubmit(id, data);
  };

  const title = () => {
    if (isProfile) {
      return 'Edit My Profile';
    }

    return isEditing ? 'Edit Bookings' : 'Add Bookings';
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
                <InputFormItem name={'user_id'} schema={bookingsFields} />
              </Grid>

              <Grid item>
                <InputFormItem name={'pujari_id'} schema={bookingsFields} />
              </Grid>

              <Grid item>
                <InputFormItem name={'puja_id'} schema={bookingsFields} />
              </Grid>

              <Grid item>
                <InputFormItem
                  multiline
                  wysiwyg
                  name={'notes'}
                  schema={bookingsFields}
                />
              </Grid>

              <Grid item>
                <InputFormItem name={'price'} schema={bookingsFields} />
              </Grid>

              <Grid item>
                <RadioFormItem name={'event_type'} schema={bookingsFields} />
              </Grid>

              <Grid item>
                <InputFormItem
                  multiline
                  wysiwyg
                  name={'address'}
                  schema={bookingsFields}
                />
              </Grid>

              <Grid item>
                <DatePickerFormItem
                  name={'start_date'}
                  schema={bookingsFields}
                  showTimeInput
                />
              </Grid>

              <Grid item>
                <DatePickerFormItem
                  name={'end_date'}
                  schema={bookingsFields}
                  showTimeInput
                />
              </Grid>

              <Grid item>
                <InputFormItem name={'duration_hrs'} schema={bookingsFields} />
              </Grid>

              <Grid item>
                <InputFormItem name={'base_price'} schema={bookingsFields} />
              </Grid>

              <Grid item>
                <InputFormItem name={'final_price'} schema={bookingsFields} />
              </Grid>

              <Grid item>
                <RadioFormItem name={'status'} schema={bookingsFields} />
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
export default BookingsForm;
