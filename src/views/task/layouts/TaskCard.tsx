import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  ListItem,
  ListItemText,
  Checkbox,
  IconButton,
} from "@material-ui/core";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import StarIcon from "@material-ui/icons/Star";
import history from "../../../history";

import {
  convertToEndPoint,
  asyncGetCurrentTaskFolder,
  asyncEditTask,
} from "../../../slices/taskSlice";
import { Task } from "../../../types/Task";
import { setIsOpen_TaskModal } from "../../../slices/taskModalSlice";

const useStyles = makeStyles((theme) => ({
  item_style: {
    borderBottom: "1px solid #f0f0f0",
  },
  done_style: {
    color: "#cccccc",
  },
}));

const TaskCard = ({ task }: { task: Task }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [_task, set_Task] = useState<Task>({ ...task });

  function onStar() {
    dispatch(
      asyncEditTask(
        { ..._task, is_star: !_task.is_star },
        {
          success: () => {
            set_Task({ ..._task, is_star: !_task.is_star });
            dispatch(
              asyncGetCurrentTaskFolder(
                convertToEndPoint(history.location.pathname)
              )
            );
          },
        }
      )
    );
  }

  function onDone() {
    dispatch(
      asyncEditTask(
        { ..._task, is_done: !_task.is_done },
        {
          success: () => {
            set_Task({ ..._task, is_done: !_task.is_done });
            dispatch(
              asyncGetCurrentTaskFolder(
                convertToEndPoint(history.location.pathname)
              )
            );
          },
        }
      )
    );
  }

  return (
    <React.Fragment>
      <ListItem button className={classes.item_style}>
        <Checkbox
          edge="start"
          color="default"
          checked={_task.is_done}
          onChange={() => {
            onDone();
          }}
        />
        <ListItemText
          className={_task.is_done ? classes.done_style : ""}
          onClick={() => {
            dispatch(
              setIsOpen_TaskModal({
                isOpen: true,
                task: _task,
              })
            );
            history.push({
              pathname: history.location.pathname,
              search: `?task_id=${_task.id}`,
            });
          }}
          primary={_task.name}
        />
        <IconButton
          onClick={() => {
            onStar();
          }}
        >
          {_task.is_star ? <StarIcon /> : <StarBorderIcon />}
        </IconButton>
      </ListItem>
    </React.Fragment>
  );
};
export default TaskCard;
