import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

import { deleteSnackBar } from "../../slices/snackBarSlice";

export default function SnackBar() {
  const { isOpen, severity, message } = useSelector(
    (state: any) => state.snackBar
  );
  const dispatch = useDispatch();

  const handleClose = (reason: any) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(deleteSnackBar());
  };

  return (
    <div>
      <Snackbar open={isOpen} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          elevation={6}
          variant="filled"
          onClose={handleClose}
          severity={severity}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
