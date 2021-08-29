import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

/**
 *
 * @param
 * isOpen
 * default false
 *
 * @param
 * onClose
 * callback function that made this dialog close
 *
 * @param
 * title
 * default "Are You Sure ?"
 *
 * @param
 * subtitle
 * Type of String
 * default "You are going to delete it."
 *
 * @param
 * onDelete
 * callback function that delete something
 *
 * @returns nothing
 */
export default function DeleteDialog({
  isOpen = false,
  onClose = () => {},
  title = "Are You Sure ?",
  subtitle = "You are going to delete it.",
  onDelete = () => {},
}) {
  const handleClose = () => {
    onClose();
  };

  const submit = () => {
    onDelete();
    handleClose();
  };

  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {subtitle}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Disagree
          </Button>
          <Button onClick={submit} color="primary">
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
