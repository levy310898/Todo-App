import './App.css';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import NotFound from 'components/NotFound';
import AuthPage from 'pages/auth';
import PrivateRoute from 'components/PrivateRoute';
// import ProjectPage from 'pages/project';
import AuthProvider from 'contexts/AuthContext';
import ProjectRoutes from 'routes/ProjectRoutes';
import AlertMessage from 'components/AlertMessage';
import NotificationProvider from 'contexts/NotificationContext';
function App() {

  // you can handle loadUser in here. No need to handle in AuthProvider
  return (
    <AuthProvider>
      <NotificationProvider>
        <BrowserRouter>
          <Switch>
            <Redirect exact from='/' to='/login' />
            <PrivateRoute exact path='/project' component={ProjectRoutes} />
            {/* <Route exact path='/project' component={ ProjectPage}/> */}
            <Route exact path='/login' render={props => <AuthPage {...props} route="login" />} />
            <Route exact path='/register' render={props => <AuthPage {...props} route="register" />} />
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>

        <AlertMessage />
      </NotificationProvider>
      
    </AuthProvider>
    
  );
}

export default App;
