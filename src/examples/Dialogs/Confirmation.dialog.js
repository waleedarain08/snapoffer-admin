
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


export default function ConfirmationDialog({ show, onSubmit, onCancel, title, description, confirmBtnText }) {

  const handleClose = () => {
    onCancel();
  };

  return (
    <Dialog
      open={show}
      onClose={handleClose}
      PaperProps={{
        component: 'form',
        onSubmit: (event) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const formJson = Object.fromEntries(formData.entries());
          onSubmit(formJson)
        },
      }}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{description}</DialogContentText>
        <TextField
          autoFocus
          required
          id="text"
          name="text"
          type="text"
          fullWidth
          className="text-full-width"
          variant="outlined"
        />
      </DialogContent>
      <DialogActions>
        <Button color="secondary" onClick={handleClose}>Cancel</Button>
        <Button color="primary" type="submit">{confirmBtnText ?? "Submit"}</Button>
      </DialogActions>
    </Dialog>
  )
}
