import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { TextField } from '@material-ui/core';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';
import { useState, forwardRef, useImperativeHandle,useContext } from 'react';
import { ProjectContext } from 'contexts/ProjectContext';
import { NotificationContext } from 'contexts/NotificationContext';
import LoadingButton from '@mui/lab/LoadingButton';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;

  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    minWidth:'400px'
  },
}))(MuiDialogContent);

function EditProjectModal(_,ref) {
  // const { values, submitForm } = useFormikContext();
  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .required('No title provided')
  })

  const { addProject, getAllProject,updateProject } = useContext(ProjectContext);
  const [open, setOpen] = useState(false);
  const [data,setData] = useState({id:'',title:'',description:''})
  const [id, setId] = useState(null);

  const [loading,setLoading] = useState(false);


  const { addNotification } = useContext(NotificationContext);
  const handleClose = () => {
    setOpen(false);
  };

  useImperativeHandle(ref, () => ({

    handleOpen({_id=null,title='',description=''}) {
      setData({ title, description })
      setId(_id)
      setOpen(true);
    }

  }),[]);

  return (
    <div>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          {id?"Update":"Add"} Project 
        </DialogTitle>
        <DialogContent dividers>
          <Formik

            initialValues={data}
            onSubmit={async (values, _) => {
              setLoading(true);
              if (id) {
                const response = await updateProject(id,values);
                if (response.success) {
                  setLoading(false);
                  getAllProject();
                  handleClose();

                  addNotification(response)
                } else {
                  setLoading(false);
                  addNotification(response)
                }
              } else {
                const response = await addProject(values);
                if (response.success) {
                  setLoading(false);
                  getAllProject();
                  handleClose();
                  addNotification(response)
                } else {
                  setLoading(false);
                  addNotification(response)
                }
              }
            }}

            validationSchema={validationSchema}
          >
            {() => {
              return (
                <Form>
                  <Field as={TextField} label="Title" name="title" placeholder="Nhập tiêu đề" fullWidth required />

                  <ErrorMessage name="title" component="div" />
                  <Field as={TextField} label="Description" name="description" placeholder="Nhập mô tả" multiline ={true} rows = {3} fullWidth />

                  <ErrorMessage name="description" component="div" />

                  <div style = {{display:'flex',justifyContent:'flex-end'}}>
                    <LoadingButton
                    type = 'submit'
                    color = "primary"
                    loading={loading}
                    // variant="outlined"
                    >
                    Save changes
                  </LoadingButton>

                    <Button onClick={handleClose} color="secondary">
                      Cancel
                    </Button>
                  </div>
                </Form>
              )
            }}
          </Formik>
        </DialogContent>
        
      </Dialog>
    </div>
  );
}

export default forwardRef(EditProjectModal)