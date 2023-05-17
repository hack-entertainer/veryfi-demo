// components/FormikDatePicker.tsx
import { DatePicker, DatePickerProps } from "@mui/x-date-pickers/DatePicker";
import { useField, useFormikContext } from "formik";
import React from "react";

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
      onChange={(val) => setFieldValue(name, val)}
    />
  );
};


// pages/index.tsx
import { Button, Stack, TextField, Typography } from "@mui/material";
import { Formik, Form } from "formik";
// import { NextPage } from "next";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";


const DatePage = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {/* <Container maxWidth="xs"> */}
      <Formik
        initialValues={{
          start_date: null,
        }}
        onSubmit={(values) => console.log(JSON.stringify(values, null, 4))}
      >
        <Form>
          <Stack gap={2} my={10}>
            <Typography variant="h3" fontWeight={700}>
              My Form
            </Typography>
            <FormikDatePicker
              name="start_date"
              renderInput={(params) => (
                <TextField {...params} label="Start date" />
              )}
            />
            <Button type="submit" variant="outlined" color="primary">
              Submit
            </Button>
          </Stack>
        </Form>
      </Formik>
      {/* </Container> */}
    </LocalizationProvider>
  );
};

export default DatePage;