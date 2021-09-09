import React from 'react'
import {CircularProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  contains: {
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:'1rem'
  },
});

export default function Loading() {
  const classes = useStyles();

  return (
    <div className = {classes.contains}>
      <CircularProgress/>
    </div>
  )
}
