import React, { useContext} from 'react'
import { TextField, Button, Typography, Link } from '@material-ui/core';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';
import { AuthContext } from 'contexts/AuthContext';
import { useHistory } from 'react-router-dom';
import { NotificationContext } from 'contexts/NotificationContext';

function RegisterForm() {

  const { registerUser } = useContext(AuthContext);
  const history = useHistory();
  const { addNotification } = useContext(NotificationContext);

  const validationSchema = Yup.object().shape({
    email: Yup.string().email(),
    password: Yup.string()
      .required('No password provided')
      .min(8, "Password must contain at least 8 characters"),
    passwordConfirm: Yup.string()
      .required('No password provided')
      .oneOf([Yup.ref('password'), null], 'Passwords must match'),
    name: Yup.string()
      .required("No name provided")
  })
  return (
      <>
      <Formik

        initialValues={{ email: '', password: '' }}
        onSubmit={async (values, props) => {
          delete values.passwordConfirm;
          console.log('value before submit = ', values);
          const response = await registerUser(values);
          if (response.success) {
            addNotification(response)
            history.push('/project');
          } else {
            addNotification(response);
          }
        }}

        validationSchema = {validationSchema}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          onSubmit
          /* and other goodies */
        }) => {
          return (
            <Form>
              <Field as={TextField} label="Email" name="email" placeholder="Nhập email" fullWidth required/>
              <ErrorMessage name="email" component="div" />
              
              <Field as={TextField} label="Password" name="password" placeholder="Nhập password" type = "password" fullWidth required />
              <ErrorMessage name="password" component="div" />

              <Field as={TextField} label="Password confirm" name="passwordConfirm" placeholder="Nhập lại password" type="password" fullWidth required />
              <ErrorMessage name="passwordConfirm" component="div" />

              <Field as={TextField} label="Họ tên" name="name" placeholder="Nhập họ tên" fullWidth required />
              <ErrorMessage name="name" component="div" />
              <Button type = 'submit' variant="contained" color="primary" fullWidth style={{ marginBottom: '16px' }}>
              Đăng ký
              </Button>
            </Form>
          )
        }}
      </Formik>

      <Typography>
        Chưa có tài khoản ? 
        <Link href="/login">
          Đăng nhập
        </Link>
      </Typography>
      </>
      

  )
}

export default RegisterForm
