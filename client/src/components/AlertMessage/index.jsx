import React from 'react'
import AlertMessageItem from './AlertMessageItem'
import { makeStyles } from '@material-ui/core/styles';
import { useContext } from 'react';
import { NotificationContext } from 'contexts/NotificationContext';

const useStyles = makeStyles(() => ({
  root: {
    position: 'fixed',
    bottom: '20px',
    left: '50%',
    transform:'translateX(-50%)',
  },
}));

export default function AlertMessage() {

  const { notificationState } = useContext(NotificationContext);

  const classes = useStyles();

  return (
    <div className={classes.root}>
      
      {notificationState.map(note => <AlertMessageItem key = {note.id} {...note}/>) }
    </div>
  )
}
