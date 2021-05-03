import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Box, Typography, List, Container } from "@material-ui/core";

import { selectTaskFolders } from "../../../slices/taskSlice";

import TaskCard from "./TaskCard";
import ACTIONS from "../../../const/actions";
import { openTaskFolderDialog } from "../../../slices/taskFolderDialogSlice";

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

  useEffect(() => {
    if (task_folders.length > 0) {
      const folder = task_folders.filter((folder) => {
        return folder.id === taskFolder.id;
      })["0"];

      if (folder) {
        setCurrentFolder({ ...folder });
      }
      if (!folder) {
        // TODO Handling Error
      }
    }
  }, [task_folders, taskFolder]);

  const openModal = () => {
    dispatch(
      openTaskFolderDialog({
        action_type: ACTIONS.TASK_FOLDERS_EDIT,
        taskFolder_id: currentFolder.id,
        taskFolder_name: currentFolder.name,
      })
    );
  };

  // TODO : Implement Delete function

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
            openModal();
          }}
        >
          Rename
        </Button>
        <Button variant="outlined" color="secondary">
          Delete
        </Button>
      </Box>
      <Box>
        <List>{renderTaskCard()}</List>
      </Box>
    </Container>
  );
};
export default TaskList;
