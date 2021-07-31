import React from "react";
import TaskList from "./layouts/TaskList";
import { TaskModal } from './modals/TaskModal';

const Task = () => {
  return (
    <React.Fragment>
      <TaskList />
      <TaskModal />
    </React.Fragment>
  );
};
export default Task;
