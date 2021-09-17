import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import { useState,useEffect } from 'react';
import { useContext } from 'react';
import { NotificationContext } from 'contexts/NotificationContext';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginBottom:'.5rem',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function TransitionAlerts({id,type='success',message}) {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const [_, setPercent] = useState(0);
  const [intervalId, setIntervalId] = useState(null);

  const { removeNotification } = useContext(NotificationContext);

  const handleStartTime = () => {
    const intervalId = setInterval(() => {
      setPercent(prev => {
        if (prev < 100) return prev + 1;
        // when 100% , close alert
        handleClose();
        clearInterval(intervalId);
        return prev;
      })
    }, 30);// 3s sau là 100%;

    setIntervalId(intervalId);
  }

  const handlePauseTime = () => {
    clearInterval(intervalId);
  }

  useEffect(() => {
    handleStartTime();
  }, [])

  const handleClose = () => {
    setOpen(false);

    setTimeout(() => {
      removeNotification(id);
    }, 300);
    // setTimeOut so that can delete error message out of store
  }

  return (
    <div className={classes.root}>
      <Collapse in={open} timeout = {300} onMouseEnter = {handlePauseTime} onMouseLeave = {handleStartTime}>
        <Alert
          severity={type}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                handleClose();
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {message}
        </Alert>
      </Collapse>
    </div>
  );
}