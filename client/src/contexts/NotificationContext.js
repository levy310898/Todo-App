import React, { createContext, useReducer } from 'react'
import { ADD_NOTIFICATION, REMOVE_NOTIFICATION } from './constant';
import { notificationReducer } from 'reducers/notificationReducer';
import { v4 } from 'uuid';
export const NotificationContext = createContext();
export default function NotificationProvider({ children }) {

  const [notificationState, dispatch] = useReducer(notificationReducer,[],
  )

  const addNotification = ({success,message}) => {
    dispatch({
      type: ADD_NOTIFICATION,
      payload: {
        id: v4(),
        type: success ? 'success' : 'error',
        message
      }
    })
  }

  const removeNotification = (id) => {
    dispatch({
      type: REMOVE_NOTIFICATION,
      payload: id
    })
  }

  return (
    <NotificationContext.Provider value={{ notificationState,addNotification,removeNotification }}>{children}</NotificationContext.Provider>
  )
}
