import { CircularProgress } from '@material-ui/core';
import NavBar from 'components/Navbar/Navbar';
import { AuthContext } from 'contexts/AuthContext'
import React from 'react'
import { useContext } from 'react'
import { Redirect, Route } from 'react-router-dom'

// this will checking if you have accessToken , you can access else go back to Login page
function PrivateRoute({ component: Component, ...props }) {
  const { authState: { authLoading, isAuthenticated } } = useContext(AuthContext);
  return (
    <Route
      {...props}
      render={props => isAuthenticated ?
        <>
          <NavBar />
          <Component {...props} />
        </>
        
        : authLoading ?
          <CircularProgress /> :
          <Redirect to="/login" />}
    />
  )
}

export default PrivateRoute
