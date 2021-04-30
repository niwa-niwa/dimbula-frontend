import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
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
import { asyncCreateTaskFolder } from "../../../slices/taskSlice";
import { setSnackBar } from "../../../slices/snackBarSlice";
import NAMES from "../../../const/names";

export default function FormDialog() {
  const dispatch = useDispatch();
  const isOpen_taskFolderDialog = useSelector(select_isOpen_taskFolderDialog);
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const handleClose = () => {
    dispatch(closeTaskFolderDialog());
    reset({ name: "" });
  };

  const onSubmit = async (data) => {
    const response = await dispatch(
      asyncCreateTaskFolder({
        ...data,
        person: localStorage.getItem(NAMES.STORAGE_UID),
      })
    );
    handleClose();

    if (response.type === "taskFolders/create/rejected") {
      // Handling error message
      dispatch(
        setSnackBar({
          severity: "error",
          message: response.payload.message,
        })
      );
      return;
    }

    dispatch(setSnackBar({ message: `Created "${data.name}".` }));
  };

  return (
    <div>
      <Dialog
        open={isOpen_taskFolderDialog}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">New Task Folder</DialogTitle>

        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <DialogContentText>Type name of new task folder.</DialogContentText>
            <Controller
              name="name"
              control={control}
              defaultValue={""}
              render={({ field }) => (
                <TextField
                  {...field}
                  required
                  autoFocus
                  fullWidth
                  margin="dense"
                  id="name"
                  label="name"
                  type="text"
                  helperText={errors.name && errors.name.message}
                />
              )}
              rules={{
                required: true,
                pattern: {
                  value: /.*\S+.*/,
                  message: "You have to enter the characters",
                }
              }}
            />
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Register
            </Button>
          </DialogActions>
          
        </form>
      </Dialog>
    </div>
  );
}
