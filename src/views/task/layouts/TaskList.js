import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Box, Typography, List, Container } from "@material-ui/core";

import history from "../../../history";
import TaskCard from "./TaskCard";
import DeleteDialog from "../modals/DeleteDialog";
import { selectTaskFolders, asyncDeleteTaskFolder } from "../../../slices/taskSlice";
import { openTaskFolderDialog } from "../../../slices/taskFolderDialogSlice";
import { setSnackBar } from "../../../slices/snackBarSlice";

import PATHS from "../../../const/paths";
import ACTIONS from "../../../const/actions";

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
}));

const TaskList = ({ taskFolder }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const task_folders = useSelector(selectTaskFolders);
  const [currentFolder, setCurrentFolder] = useState({});
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (task_folders.length > 0) {
      const folder = task_folders.filter((folder) => {
        return folder.id === taskFolder.id;
      })["0"];

      if (folder) {
        setCurrentFolder({ ...folder });
      }
      if (!folder) {
        history.push(PATHS.HOME);
      }
    }
  }, [task_folders, taskFolder, dispatch]);

  const onRename = () => {
    dispatch(
      openTaskFolderDialog({
        action_type: ACTIONS.TASK_FOLDERS_EDIT,
        taskFolder_id: currentFolder.id,
        taskFolder_name: currentFolder.name,
      })
    );
  };

  const onDelete = () => {
    setIsDeleting(true);
  }

  const dispatchDelete = async () => {
    const response = await dispatch(asyncDeleteTaskFolder(currentFolder.id));
    if (response.type === ACTIONS.TASK_FOLDERS_DELETE + "/rejected") {
      dispatch(
        setSnackBar({
          severity: "error",
          message: response.payload.message,
        })
      );
      return;
    }
    if (response.type === ACTIONS.TASK_FOLDERS_DELETE + "/fulfilled") {
      dispatch(setSnackBar({ message: `Deleted "${currentFolder.name}".` }));
      history.push(PATHS.HOME);
      return;
    }
  };

  const renderTaskCard = () => {
    return taskFolder.tasks.map((task) => {
      return <TaskCard key={task.id} task={task} />;
    });
  };

  return (
    <Container maxWidth="md">
      <Box display="flex" alignItems="center">
        <Typography variant="h6" className={classes.title}>
          {currentFolder.name}
        </Typography>
        <Button
          variant="outlined"
          onClick={() => {
            onRename();
          }}
        >
          Rename
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => {
            onDelete();
          }}
        >
          Delete
        </Button>
      </Box>
      <Box>
        <List>{renderTaskCard()}</List>
      </Box>

      <DeleteDialog
        isOpen={isDeleting}
        onClose={()=>{setIsDeleting(false)}}
        onDelete={()=>{dispatchDelete()}}
        subtitle={`You are going to delete "${currentFolder.name}".`}
      />
    </Container>
  );
};
export default TaskList;