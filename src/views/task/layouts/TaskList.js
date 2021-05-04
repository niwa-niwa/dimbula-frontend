import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Box, Typography, List, Container } from "@material-ui/core";

import TaskCard from "./TaskCard";
import TaskFolderDialog from "../modals/TaskFolderDialog";

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
}));

const TaskList = ({ taskFolder }) => {
  const classes = useStyles();
  const [taskFolderName, setTaskFolderName] = useState();
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    setTaskFolderName(taskFolder.name);
  }, [taskFolderName, taskFolder]);

  const closeModal = (value) => {
    setModalOpen(false);
    if (value) {
      setTaskFolderName(value);
    }
  };

  const openModal = () => {
    setModalOpen(true);
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
          {taskFolderName}
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
      <TaskFolderDialog
        is_edit={modalOpen}
        taskFolder={{ name: taskFolderName, id: taskFolder.id }}
        onClose={closeModal}
      />
    </Container>
  );
};
export default TaskList;