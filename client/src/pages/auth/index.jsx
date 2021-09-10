import { Paper,Grid,Avatar } from '@material-ui/core'
import React,{useContext} from 'react'
import LoginForm from './Login'
import RegisterForm from './Register'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { AuthContext } from 'contexts/AuthContext';
import { Redirect } from 'react-router-dom';
import Loading from 'components/Loading';

export default function AuthPage({route}) {
  const { authState: { authLoading, isAuthenticated} } = useContext(AuthContext);
  
  if (authLoading) {
      return <Loading />
    } else if(isAuthenticated) {
      return <Redirect to = 'project'/>  
  } else {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>

        <Paper elevation={10}>

          <div style={{ width: '500px', minHeight: '300px', padding: '16px' }}>
            <h1 style={{ textAlign: 'center' }}>Todo App</h1>
            <Grid align='center'>

              <Avatar><AccountCircleIcon /></Avatar>

              <h2>{route}</h2>
            </Grid>

            {route === 'login' && <LoginForm />}

            {route === 'register' && <RegisterForm />}

          </div>
        </Paper>



      </div>
    )
  }
}
