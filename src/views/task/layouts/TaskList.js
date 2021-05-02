import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Box,
  Typography,
  List,
  Container,
} from '@material-ui/core';

import TaskCard from './TaskCard';


const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
}));

const TaskList = ({taskFolder}) => {
  const classes = useStyles();

  const renderTaskCard = () => {
    return taskFolder.tasks.map( task =>{
      return (
        <TaskCard key={task.id} task={task} />
      )
    })
  }

  return (
    <Container maxWidth="md">
      <Box display="flex" alignItems="center" >
        <Typography variant="h6" className={classes.title}>
          {taskFolder.name}
        </Typography>
        <Button variant="outlined">
          Rename
        </Button>
        <Button variant="outlined" color="secondary">
          Delete
        </Button>
      </Box>
      <Box>
        <List>
          {renderTaskCard()}
        </List>
      </Box>
    </Container>
  );
}
export default TaskList;