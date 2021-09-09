import { Container,Typography } from '@material-ui/core'
import React,{useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { useContext } from 'react';
import { ProjectContext } from 'contexts/ProjectContext';
import { Grid } from '@material-ui/core';
import Loading from 'components/Loading';
import ProjectItem from './ProjectItem';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles({
  root: {
    paddingTop: '80px',
    minHeight: '100vh',
    position: 'relative',
  },
  addButton: {
    position: 'absolute',
    bottom: '50px',
    right: '50px',
  }

});
export default function ProjectPage() {
  const classes = useStyles();
  const { projectState:{project,loading}, getAllProject } = useContext(ProjectContext);
  useEffect(() => {
    getAllProject();
  }, [])
  return (
    <Container className={classes.root}>
      {loading ? <loading /> :
        !project || project.length == 0 ? "no project is here" :
          <Grid container spacing={3}>
            {project.map(item => <Grid item xs={4}><ProjectItem {...item} /></Grid> )}
      </Grid>
          
      }
      <Fab color="primary" aria-label="add" className = {classes.addButton}>
        <AddIcon />
      </Fab>
    </Container>
  )
}
