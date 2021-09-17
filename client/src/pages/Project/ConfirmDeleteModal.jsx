import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useState, forwardRef, useImperativeHandle,useContext } from 'react';
import { ProjectContext } from 'contexts/ProjectContext';
import { NotificationContext } from 'contexts/NotificationContext';
import LoadingButton from '@mui/lab/LoadingButton';

function ConfirmDeleteModal(_,ref) {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(null);

  const { addNotification } = useContext(NotificationContext);

  const { deleteProject,getAllProject } = useContext(ProjectContext);
  const [loading,setLoading] = useState(false);

  useImperativeHandle(ref, () => ({

    handleOpen(id) {
      setId(id);
      setOpen(true);
    }
  }), []);
  
  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = async() => {
    setLoading(true);
    const response = await deleteProject(id);
    if (response.success) {
      try {
        setLoading(false);
        handleClose();
        addNotification(response)
        getAllProject();
      } catch (error) {
        setLoading(false);
        addNotification(response);
      }
    }
  }


  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"You want to delete this project ? "}</DialogTitle>
        <DialogActions>
          <LoadingButton
            onClick={handleConfirm}
            color = "primary"
            loading={loading}
          >
            Confirm
          </LoadingButton>
          <Button onClick={handleClose} color="secondary" autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default forwardRef(ConfirmDeleteModal)