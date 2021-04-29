import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";

import {
  select_isOpen_taskFolderDialog,
  closeTaskFolderDialog,
} from "../../../slices/taskFolderDialogSlice";

export default function FormDialog() {
  const dispatch = useDispatch();
  const isOpen_taskFolderDialog = useSelector(select_isOpen_taskFolderDialog);

  const handleClose = () => {
    dispatch(closeTaskFolderDialog());
  };

  return (
    <div>
      <Dialog
        open={isOpen_taskFolderDialog}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
