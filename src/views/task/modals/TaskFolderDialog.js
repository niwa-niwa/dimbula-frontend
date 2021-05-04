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

// TODO : fix [DOM] Found 2 elements with non-unique id #name: (More info: https://goo.gl/9p2vKq) 
export default function FormDialog({
  is_edit = false,
  taskFolder = {name:"", id:""},
  onClose = null,
}) {
  const dispatch = useDispatch();
  const isOpen_taskFolderDialog = useSelector(select_isOpen_taskFolderDialog);
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const handleClose = () => {
    if (is_edit) {
      onClose();
      reset({ name: taskFolder.name });
      return;
    }
    dispatch(closeTaskFolderDialog());
    reset({ name: "" });
  };

  const onSubmit = async (data) => {
    if (is_edit) {
      console.log(data);
      // TODO : Implement asyncEditTaskFolder
      // TODO : Implement handling error
      onClose(data.name);
      dispatch(setSnackBar({ message: `Edited "${data.name}".` }));
      return;
    }

    if (!is_edit) {
      const response = await dispatch(
        asyncCreateTaskFolder({
          ...data,
          person: localStorage.getItem(NAMES.STORAGE_UID),
        })
      );
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
      handleClose(data);
    }
  };

  return (
    <div>
      <Dialog
        open={is_edit || isOpen_taskFolderDialog}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          {is_edit ? "Edit Task Folder Name" : "New Task Folder"}
        </DialogTitle>

        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <DialogContentText>Type name of the task folder.</DialogContentText>
            <Controller
              name="name"
              control={control}
              defaultValue={taskFolder.name}
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
                },
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
