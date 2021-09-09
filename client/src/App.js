import './App.css';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Landing from 'views/Landing';
import NotFound from 'components/NotFound';
import LoginPage from 'pages/auth/Login';
import RegisterPage from 'pages/auth/Register';
import AuthPage from 'pages/auth';
import PrivateRoute from 'components/PrivateRoute';
import ProjectPage from 'pages/project';
import AuthProvider from 'contexts/AuthContext';
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Switch>
          <Redirect exact from='/' to='/login' />
          <PrivateRoute exact path='/project' component={ProjectPage} />
          {/* <Route exact path='/project' component={ ProjectPage}/> */}
          <Route exact path='/login' render={props => <AuthPage {...props} route="login" />} />
          <Route exact path='/register' render={props => <AuthPage {...props} route="register" />} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </AuthProvider>
    
  );
}

export default App;
