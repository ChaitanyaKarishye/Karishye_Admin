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

import pujarisFields from 'pages/CRUD/Pujaris/helpers/pujarisFields';
import IniValues from 'components/FormItems/iniValues';
import PreparedValues from 'components/FormItems/preparedValues';
import FormValidations from 'components/FormItems/formValidations';
import Widget from 'components/Widget';

const PujarisForm = (props) => {

  const {
  isEditing,
  isProfile,
  findLoading,
  saveLoading,
  record,
  onSubmit,
  onCancel,
  modal
  } = props;

  const iniValues = () => {
  return IniValues(pujarisFields, record || {});
  }

  const formValidations = () => {
  return FormValidations(pujarisFields, record || {});
  }

  const handleSubmit = (values) => {
  const { id, ...data } = PreparedValues(pujarisFields, values || {});
  onSubmit(id, data);
  };

  const title = () => {
  if(isProfile) {
  return 'Edit My Profile';
  }

  return isEditing
  ? 'Edit Pujaris'
  : 'Add Pujaris';
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
    <Grid container spacing={3} direction="column">

      <Grid item>
        <InputFormItem
          name={'application_id'}
          schema={pujarisFields}
        />
      </Grid>

      <Grid item>
        <InputFormItem
          name={'name'}
          schema={pujarisFields}

        />
      </Grid>

      <Grid item>
        <InputFormItem
          name={'surname'}
          schema={pujarisFields}

        />
      </Grid>

      <Grid item>
        <DatePickerFormItem
          name={'date_of_birth'}
          schema={pujarisFields}
          showTimeInput
        />
      </Grid>

      <Grid item>
        <DatePickerFormItem
          name={'date_of_joining'}
          schema={pujarisFields}
          showTimeInput
        />
      </Grid>

      <Grid item>
        <InputFormItem
          multiline
          wysiwyg
          name={'qualification'}
          schema={pujarisFields}

        />
      </Grid>

      <Grid item>
        <InputFormItem
          name={'experience_yrs'}
          schema={pujarisFields}
        />
      </Grid>

      <Grid item>
        <InputFormItem
          multiline
          wysiwyg
          name={'address'}
          schema={pujarisFields}

        />
      </Grid>

      <Grid item>
        <InputFormItem
          name={'email_id'}
          schema={pujarisFields}

        />
      </Grid>

      <Grid item>
        <InputFormItem
          name={'phone_number'}
          schema={pujarisFields}

        />
      </Grid>

      <Grid item>
        <InputFormItem
          name={'razorpay_id'}
          schema={pujarisFields}

        />
      </Grid>

      <Grid item>
        <ImagesFormItem
          name={'photo'}
          schema={pujarisFields}
          path={'pujaris/photo'}
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
          schema={pujarisFields}
        />
      </Grid>

      <Grid item>
        <RadioFormItem
          name={'Language'}
          schema={pujarisFields}
        />
      </Grid>

      <Grid item>
        <SwitchFormItem
          name={'online_pujas'}
          schema={pujarisFields}
        />
      </Grid>

      <Grid item>
        <SwitchFormItem
          name={'travel'}
          schema={pujarisFields}
        />
      </Grid>

      <Grid item>
        <InputFormItem
          name={'city'}
          schema={pujarisFields}

        />
      </Grid>

      <Grid item>
        <SwitchFormItem
          name={'active'}
          schema={pujarisFields}
        />
      </Grid>

  </Grid>
  <Grid container spacing={3} mt={2}>
    <Grid item>
      <Button
        color="primary"
        variant="contained"
        onClick={form.handleSubmit}
      >
        Save
      </Button>
    </Grid>
    <Grid item>
      <Button
        color="primary"
        variant="outlined"
        onClick={form.handleReset}
      >
        Reset
      </Button>
    </Grid>
    <Grid item>
      <Button
        color="primary"
        variant="outlined"
        onClick={() => onCancel()}
      >
        Cancel
      </Button>
    </Grid>
  </Grid>
      </form>
      )
      }
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
  }
  export default PujarisForm;
