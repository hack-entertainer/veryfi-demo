import { Box, Button, TextField } from '@mui/material';
import { Form, Formik, useFormik } from 'formik';
import * as React from 'react';

import * as Yup from "yup";


const validationSchema = Yup.object().shape({
  clientId: Yup.string().required('Client ID is required'),
  userName: Yup.string().required('User Name is required'),
  apiKey: Yup.string().required('API Key is required')
});


const Config = () => {
  const formik = useFormik({
    initialValues: {
      clientId: '',
      userName: '',
      apiKey: ''
    },
    onSubmit: values => {
      console.log(JSON.stringify(values, null, 2));
    },
  });

  return <>
    <Box component="div">
      <Formik initialValues={{ clientId: '', userName: '', apiKey: '' }}
        validationSchema={validationSchema}
        onSubmit={(values) => { console.log(values) }}>

        {({ values, touched, errors, handleChange, handleBlur, isValid }) => (<>

          <Form>
            <TextField
              margin="normal"
              // required
              fullWidth
              id="clientId"
              name="clientId"
              label="Client ID"
              type="text"
              value={values.clientId}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.clientId && Boolean(errors.clientId)}
              helperText={touched.clientId && errors.clientId}
              autoComplete="current-text" />

            <TextField
              margin="normal"
              // required
              fullWidth
              id="cliuserNameentId"
              name="userName"
              label="User Name"
              type="text"
              value={values.userName}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.userName && Boolean(errors.userName)}
              helperText={touched.userName && errors.userName}
              autoComplete="current-text" />

            <TextField
              margin="normal"
              // required
              fullWidth
              id="apiKey"
              name="apiKey"
              label="API Key"
              type="text"
              value={values.apiKey}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.apiKey && Boolean(errors.apiKey)}
              helperText={touched.apiKey && errors.apiKey}
              autoComplete="current-text" />

            <Button
              type="submit"
              color="primary"
              variant="contained"
              disabled={!isValid}
            >
              save
            </Button>
          </Form>
        </>)}
      </Formik>
    </Box>
  </>
  // return (
  //   <form onSubmit={formik.handleSubmit}>
  //     <label htmlFor="clientId">Client ID</label>
  //     <input
  //       id="clientId"
  //       name="clientId"
  //       type="text"
  //       onChange={formik.handleChange}
  //       value={formik.values.clientId}
  //     />

  //     <label htmlFor="userName">User Name</label>
  //     <input
  //       id="userName"
  //       name="userName"
  //       type="text"
  //       onChange={formik.handleChange}
  //       value={formik.values.userName}
  //     />

  //     <label htmlFor="apiKey">Api Key</label>
  //     <input
  //       id="apiKey"
  //       name="apiKey"
  //       type="text"
  //       onChange={formik.handleChange}
  //       value={formik.values.apiKey}
  //     />

  //     <button type="submit">Submit</button>
  //   </form>
  // );
}

export default Config;