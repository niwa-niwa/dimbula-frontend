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
 * OnCallback
 * callback function that delete something
 * 
 * @returns nothing
 */
export default function SelectDialog({
  isOpen = false,
  onClose = null,
  title = "Are You Sure ?",
  subtitle = "You are going to do it.",
  OnCallback = null,
}) {

  const handleClose = () => {
    onClose();
  };

  const submit = () => {
    OnCallback();
    handleClose();
  };

  return (
    <React.Fragment>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="select-dialog-slide-title"
        aria-describedby="select-dialog-slide-description"
      >
        <DialogTitle id="select-dialog-slide-title">
          {title}
        </DialogTitle>

        <DialogContent>
          <DialogContentText id="select-dialog-slide-description">
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
    </React.Fragment>
  );
}
