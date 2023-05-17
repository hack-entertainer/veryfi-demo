import * as React from 'react';

import { Box, Button, TextField, Typography } from '@mui/material';
import { Form, Formik, useField } from 'formik';

import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';

import * as Yup from "yup";

import { useDispatch, useSelector } from 'react-redux';

import { setConfig } from '../state/slices/configSlice';


// components/FormikDatePicker.tsx
import { DatePickerProps } from "@mui/x-date-pickers/DatePicker";
import { useFormikContext } from "formik";

type Props<TInputDate, TDate> = {
  name: string;
} & Omit<DatePickerProps<TInputDate, TDate>, "onChange" | "value">;

export const FormikDatePicker = <TInputDate, TDate = TInputDate>(
  props: Props<TInputDate, TDate>
) => {
  const { name, ...restProps } = props;
  const [field] = useField(name);
  const { setFieldValue } = useFormikContext();
  return (
    <DatePicker
      {...restProps}
      value={field.value ?? null}
      onChange={(val) => {
        setFieldValue(name, val.toISOString().substring(0, 10));
        console.log(val);
      }}
    />
  );
};

const validationSchema = Yup.object().shape({
  clientId: Yup.string().required('Client ID is required'),
  userName: Yup.string().required('User Name is required'),
  apiKey: Yup.string().required('API Key is required'),
  startDate: Yup.date().required('Start Date is required')
});

const Data = ({ refetch }) => {
  const config = useSelector((state: any) => state.config);
  const dispatch = useDispatch();

  return <Box component="div">
    <Formik initialValues={{
      clientId: config.clientId,
      userName: config.userName,
      apiKey: config.apiKey,
      startDate: config.startDate
    }}
      validationSchema={validationSchema}
      // onSubmit={(values) => { dispatch(setConfig(values)) }}>
      onSubmit={(values) => {
        // console.log(JSON.stringify(values.startDate))
        dispatch(setConfig({ ...values, startDate: JSON.stringify(values.startDate) }));
        console.log(refetch);
        refetch();
      }}>

      {({ values, touched, errors, handleChange, handleBlur, isValid, ...params }) => <Form>
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

        <Typography>Start Date</Typography>

        <FormikDatePicker
          name="startDate"
          id="startDate"
          renderInput={(params) => (
            <TextField {...params} />
          )}
        />

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

