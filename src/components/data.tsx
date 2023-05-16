import { Box, Button, TextField } from '@mui/material';
import { Form, Formik, useFormik } from 'formik';
import * as React from 'react';

import * as Yup from "yup";

import { useDispatch, useSelector } from 'react-redux';

import { setConfig } from '../state/slices/configSlice';

const validationSchema = Yup.object().shape({
  clientId: Yup.string().required('Client ID is required'),
  userName: Yup.string().required('User Name is required'),
  apiKey: Yup.string().required('API Key is required')
});


const Data = () => {
  const dispatch = useDispatch();

  const config = useSelector((state: any) => state.config);
  console.log('config', config);

  return <Box component="div">
    <Formik initialValues={{
      clientId: config.clientId,
      userName: config.userName,
      apiKey: config.apiKey
    }}
      validationSchema={validationSchema}
      onSubmit={(values) => { dispatch(setConfig(values)) }}>

      {({ values, touched, errors, handleChange, handleBlur, isValid }) => <Form>
        <TextField
          margin="normal"
          fullWidth
          id="clientId"
          name="clientId"
          label="Client ID"
          type="text"
          value={values.clientId}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.clientId && Boolean(errors.clientId)}
          helperText={touched.clientId && errors.clientId && `${errors.clientId}`}
          autoComplete="current-text" />

        <TextField
          margin="normal"
          fullWidth
          id="userName"
          name="userName"
          label="User Name"
          type="text"
          value={values.userName}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.userName && Boolean(errors.userName)}
          helperText={touched.userName && `${errors.userName}`}
          autoComplete="current-text" />

        <TextField
          margin="normal"
          fullWidth
          id="apiKey"
          name="apiKey"
          label="API Key"
          type="text"
          value={values.apiKey}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.apiKey && Boolean(errors.apiKey)}
          helperText={touched.apiKey && errors.apiKey && `${errors.apiKey}`}
          autoComplete="current-text" />

        <Button
          type="submit"
          color="primary"
          variant="contained"
          disabled={!isValid}>
          fetch
        </Button>
      </Form>
      }
    </Formik>
  </Box>
}

export default Data;

