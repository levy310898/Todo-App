import React,{createContext,useReducer} from 'react'
import axios from 'axios';
import { authReducer } from 'reducers/authReducer';
import { apiUrl, localStorageTokenName } from './constant';
import setAuthToken from 'utils/setAuthToken';
import { useEffect } from 'react';

export const AuthContext = createContext();

export default function AuthProvider({children}) {
  const [authState, dispatch] = useReducer(authReducer,
    {
      authLoading: true,
      isAuthenticated: false,
      user:null
    })
  
  // authenticate user

  const loadUser = async () => {  // get userData
    // check if localStorage has token
    if (localStorage[localStorageTokenName]) {
      setAuthToken(localStorage[localStorageTokenName])
    }

    try {
      // get auth to check if token is real
      const response = await axios.get(`${apiUrl}/auth`);
      if (response.data.success) {
        dispatch({
          type: 'SET_AUTH',
          payload: {
            authLoading:false,
            isAuthenticated: true,
            user:response.data.user
          }
        })
      }
    } catch (error) {
      localStorage.removeItem(localStorageTokenName);
      setAuthToken();
      dispatch({
        type: "SET_AUTH",
        payload: {
          authLoading: false,
          isAuthenticated: false,
          user: null
        }
      })
    }
  }

  useEffect(() => {
    loadUser();
  },[])
  // login method
  const loginUser = async loginData => {
    try {
      const api = `${apiUrl}/auth/login`;
      const response = await axios.post(api, loginData);
      if (response.data.success) {
        localStorage.setItem(localStorageTokenName, response.data.accessToken);
        // active loadUser to get userData
        await loadUser();
        return response.data
      }
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return {success:false,message:error.message}
    }
  }
  // registerMethod
  const registerUser = async registerData => {
    try {
      const api = `${apiUrl}/auth/register`;
      const response = await axios.post(api, registerData);
      if (response.data.success) {
        localStorage.setItem(localStorageTokenName, response.data.accessToken);
        await loadUser();
        return response.data
      }
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message }
    }
  }

  // logout method 

  const logoutUser = () => {
    localStorage.removeItem(localStorageTokenName);
    setAuthToken();
    dispatch({
      type: "SET_AUTH",
      payload: {
        authLoading: false,
        isAuthenticated: false,
        user: null
      }
    })
  }

  const authData = { loginUser, authState, registerUser,logoutUser}
  return (
    <AuthContext.Provider value={authData}>{children }</AuthContext.Provider>
  )
}
