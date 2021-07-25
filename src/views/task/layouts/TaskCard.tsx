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
import TaskDialog from "../modals/TaskDialog";
import DeleteDialog from "../modals/DeleteDialog";

import {
  convertToEndPoint,
  asyncGetCurrentTaskFolder,
  asyncEditTask,
  asyncDeleteTask,
} from "../../../slices/taskSlice";
import ACTIONS from "../../../const/actions";

const useStyles = makeStyles((theme) => ({
  item_style: {
    borderBottom: "1px solid #f0f0f0",
  },
  done_style: {
    color: "#cccccc",
  },
}));

const TaskCard = ({ task }: { task: any }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [_task, set_Task] = useState({ ...task });
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const dispatchEdit = (edited_task: any) => {
    dispatch(
      asyncEditTask(edited_task, {
        success: () => {
          setIsEditing(false);
          set_Task({ _task, ...edited_task });
          dispatch(
            asyncGetCurrentTaskFolder(
              convertToEndPoint(history.location.pathname)
            )
          );
        },
      })
    );
  };

  const dispatchDelete = () => {
    dispatch(
      asyncDeleteTask(_task, {
        success: () => {
          dispatch(
            asyncGetCurrentTaskFolder(
              convertToEndPoint(history.location.pathname)
            )
          );
          setIsEditing(false);
          setIsDeleting(false);
        },
        failure: () => {
          setIsDeleting(false);
        },
      })
    );
  };

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
          // button="true"
          className={_task.is_done ? classes.done_style : ""}
          onClick={() => {
            setIsEditing(true);
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

      <TaskDialog
        isOpen={isEditing}
        title={"Edit A Task."}
        action_type={ACTIONS.TASKS_EDIT}
        editTask={_task}
        onClose={() => {
          setIsEditing(false);
        }}
        onCallback={(edited_task: any) => {
          dispatchEdit(edited_task);
        }}
        onDelete={() => {
          setIsDeleting(true);
        }}
      />

      <DeleteDialog
        isOpen={isDeleting}
        onClose={() => {
          setIsDeleting(false);
        }}
        onDelete={() => {
          dispatchDelete();
        }}
        subtitle={`You are going to delete "${_task.name}".`}
      />
    </React.Fragment>
  );
};
export default TaskCard;
