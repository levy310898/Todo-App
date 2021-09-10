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
import EditProjectModal from './EditProjectModal';
import { useState } from 'react';
import { useRef } from 'react';

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

  const modalRef = useRef();

  console.log('modal ref = ', modalRef);

  const [open, setOpen] = useState(false);

  const [data, setData] = useState({ title: "", description:""})

  const { projectState:{project,loading}, getAllProject } = useContext(ProjectContext);
  useEffect(() => {
    getAllProject();
  }, [])

  console.log('project = ', project);
  return (
    <>
      <Container className={classes.root}>
        {loading ? <loading /> :
          !project || project.length == 0 ? "no project is here" :
            <Grid container spacing={3}>
              {project.map(item => <Grid item xs={12} sm = {6} md = {4} lg = {3}><ProjectItem {...item} handleOpenModal={modalRef.current ? modalRef.current.handleOpen : () => console.log('hello')}/></Grid>)}
            </Grid>

        }
        {/* modalRef.current.handleOpen */}
        <Fab color="primary" aria-label="add" className={classes.addButton} onClick={modalRef.current ? modalRef.current.handleOpen:()=>console.log('hello')}>
          <AddIcon />
        </Fab>
      </Container>

      <EditProjectModal open={open} setOpen={setOpen} data={data} ref={modalRef}/>
    </>
    
  )
}
