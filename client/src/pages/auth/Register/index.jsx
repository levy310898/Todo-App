import React, { useContext,useState} from 'react'
import { TextField, Button, Typography, Link } from '@material-ui/core';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';
import { AuthContext } from 'contexts/AuthContext';
import { useHistory } from 'react-router-dom';
import { NotificationContext } from 'contexts/NotificationContext';
import LoadingButton from '@mui/lab/LoadingButton';

function RegisterForm() {

  const { registerUser } = useContext(AuthContext);
  const history = useHistory();
  const { addNotification } = useContext(NotificationContext);
  const [loading,setLoading] = useState(false);

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
          setLoading(true);

          delete values.passwordConfirm;
          const response = await registerUser(values);
          if (response.success) {
            setLoading(false);
            addNotification(response)
            history.push('/project');
          } else {
            setLoading(false);
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
              <LoadingButton
              type = 'submit'
              color = "primary"
              fullWidth style={{ marginBottom: '16px' }}
              loading={loading}
              loadingPosition="end"
              variant="contained"
            >
              Đăng nhập
            </LoadingButton>
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
