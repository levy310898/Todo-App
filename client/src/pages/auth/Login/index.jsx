import React, { useContext } from 'react'
import { FormControlLabel, TextField, Checkbox, Button, Typography,Link} from '@material-ui/core';
import { useState } from 'react';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';
import { AuthContext } from 'contexts/AuthContext';
import { useHistory } from 'react-router-dom';
import { NotificationContext } from 'contexts/NotificationContext';
import LoadingButton from '@mui/lab/LoadingButton';

function LoginForm() {
  const [rememberCheck, setRememberCheck] = useState(false);
  const { loginUser } = useContext(AuthContext);
  const { addNotification } = useContext(NotificationContext);
  const history = useHistory();

  const [loading,setLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string().email(),
    password: Yup.string()
      .required('No password provided')
    .min(8,"Password must contain at least 8 characters")
  })
  return (
    <>
      <Formik

        initialValues={{ email: '', password: '' }}
        onSubmit={ async (values, _) => {
          setLoading(true);
          const response = await loginUser(values);
          if (response.success) {
            setLoading(false);
            addNotification(response);
            history.push('/project');
          } else {
            setLoading(false);
            addNotification(response)
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
              {/* <TextField
                name="email"
                label="email"
                placeholder="nhập email"
                fullWidth
                required
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />*/}

              <ErrorMessage name="email" component="div" /> 
              <Field as={TextField} label="Password" name="password" placeholder="Nhập password" type = "password" fullWidth required />
              {/* <TextField
                name="password"
                label="Password"
                placeholder="nhập password"
                type="password"
                fullWidth
                required
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              /> */}

              <ErrorMessage name="password" component="div" />

              <FormControlLabel
                control={<Checkbox checked={rememberCheck} name="rememberCheck" onChange={() => setRememberCheck(!rememberCheck)} />}
                label="remember me"
              />

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
        <Link href="/register">
          Đăng ký
        </Link>
      </Typography>
    </>
      
    
  )
}

export default LoginForm
