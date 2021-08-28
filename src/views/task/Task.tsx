import React from "react";
import history from "../../history";
import { useSelector, useDispatch } from "react-redux";
import TaskList from "./layouts/TaskList";
import { TaskModal } from "./modals/TaskModal";
import { useLocation } from "react-router-dom";
import { setIsOpen_TaskModal, select_task } from "../../slices/taskModalSlice";
import { asyncGetCurrentTask } from "../../slices/taskSlice";

import { Task as type_task } from "../../types/task";

const Task = () => {
  const dispatch = useDispatch();
  const task: type_task = useSelector(select_task);
  const task_id = new URLSearchParams(useLocation().search).get("task_id");

  React.useEffect(() => {
    /**
     * URL has query of task_id
     * and
     * Redux has not the task that is task_id of URL
     */
    if (task_id && task_id !== task.id) {
      const effect = async () => {
        const task = await asyncGetCurrentTask(task_id);
        if (task) {
          dispatch(setIsOpen_TaskModal({ isOpen: true, task }));
        } else {
          // if a task is nothing remove query in the url
          history.push(history.location.pathname);
        }
      };
      effect();
    }
  }, [task_id, dispatch, task.id]);

  return (
    <React.Fragment>
      <TaskList />
      <TaskModal />
    </React.Fragment>
  );
};
export default Task;
