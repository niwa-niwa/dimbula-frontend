import React from "react";
import history from "../../history";
import { useDispatch } from "react-redux";
import TaskList from "./layouts/TaskList";
import { TaskModal } from './modals/TaskModal';
import { useLocation } from "react-router-dom";
import {
  setIsOpen_TaskModal,
} from "../../slices/taskModalSlice";
import {
  asyncGetCurrentTask,
} from "../../slices/taskSlice";


const Task = () => {
  const dispatch = useDispatch();
  const task_id = new URLSearchParams(useLocation().search).get('task_id');

  React.useEffect(()=>{
    if(task_id){
      console.log("task_id=",task_id)
      const effect = async () => {
        // sample id = 03e5542d-a9c0-4e08-ae26-05cb50ff0075
        const task = await asyncGetCurrentTask(task_id)
        if(task){
          dispatch(setIsOpen_TaskModal({ isOpen:true, task }));
        }else{
          // if a task is nothing remove query in the url
          history.push(history.location.pathname);
        }
      }
      effect();
    }
  },[task_id, dispatch])

  return (
    <React.Fragment>
      <TaskList />
      <TaskModal />
    </React.Fragment>
  );
};
export default Task;
