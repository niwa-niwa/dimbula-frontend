import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import history from "../../../history";

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
  selectTaskFolderDialog,
  closeTaskFolderDialog,
} from "../../../slices/taskFolderDialogSlice";
import {
  convertToEndPoint,
  asyncGetCurrentTaskFolder,
  asyncCreateTaskFolder,
  asyncEditTaskFolder,
} from "../../../slices/taskSlice";

import NAMES from "../../../const/names";
import ACTIONS from "../../../const/actions";

export default function FormDialog() {
  const dispatch = useDispatch();
  const {
    isOpen_taskFolderDialog,
    action_type,
    taskFolder_id,
    taskFolder_name,
  } = useSelector(selectTaskFolderDialog);
  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setValue("name", taskFolder_name);
  }, [setValue, taskFolder_name]);

  const handleClose = () => {
    dispatch(closeTaskFolderDialog());
    reset({ name: "" });
  };

  const onSubmit = async (data: any) => {
    if (action_type === ACTIONS.TASK_FOLDERS_EDIT) {
      dispatch(
        asyncEditTaskFolder(
          {
            ...data,
            id: taskFolder_id,
            person: localStorage.getItem(NAMES.STORAGE_UID),
          },
          {
            success: () => {
              dispatch(
                asyncGetCurrentTaskFolder(
                  convertToEndPoint(history.location.pathname)
                )
              );
              handleClose();
            },
          }
        )
      );
    }

    if (action_type === ACTIONS.TASK_FOLDERS_CREATE) {
      dispatch(
        asyncCreateTaskFolder(
          {
            ...data,
            person: localStorage.getItem(NAMES.STORAGE_UID),
          },
          {
            success: () => {
              handleClose();
            },
          }
        )
      );
    }
  };

  return (
    <div>
      <Dialog
        open={isOpen_taskFolderDialog}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          {action_type === ACTIONS.TASK_FOLDERS_EDIT
            ? "Edit Task Folder Name"
            : "New Task Folder"}
        </DialogTitle>

        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <DialogContentText>Type name of the task folder.</DialogContentText>
            <Controller
              name="name"
              control={control}
              defaultValue={taskFolder_name}
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
