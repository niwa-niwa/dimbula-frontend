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
import StarIcon from '@material-ui/icons/Star';
import history from "../../../history";
import TaskDialog from "../modals/TaskDialog";
import DeleteDialog from "../modals/DeleteDialog";

import {
  asyncGetCurrentTaskFolder,
  asyncEditTask,
  asyncDeleteTask,
} from "../../../slices/taskSlice";
import ACTIONS from "../../../const/actions";

const useStyles = makeStyles((theme) => ({
  item_style: {
    borderBottom: "1px solid #f0f0f0",
  },
}));

const TaskCard = ({ task }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [_task, set_Task] = useState({ ...task });
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const dispatchEdit = (edited_task) => {
    dispatch(
      asyncEditTask(edited_task, {
        success: () => {
          setIsEditing(false);
          set_Task({ _task, ...edited_task });
          dispatch(
            asyncGetCurrentTaskFolder(history.location.pathname.slice(1))
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
            asyncGetCurrentTaskFolder(history.location.pathname.slice(1))
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

  function onStar(){
    dispatch(
      asyncEditTask(
        {..._task,is_star:!_task.is_star},
        {
          success: () => {
            set_Task({..._task,is_star:!_task.is_star});
            dispatch(
              asyncGetCurrentTaskFolder(history.location.pathname.slice(1))
            );
          },
        },
      )
    );
  }

  function onDone(){
    dispatch(
      asyncEditTask(
        {..._task,is_done:!_task.is_done},
        {
          success: () => {
            set_Task({..._task,is_done:!_task.is_done});
            dispatch(
              asyncGetCurrentTaskFolder(history.location.pathname.slice(1))
            );
          },
        },
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
          onChange={()=>{onDone()}}
        />
        <ListItemText
          button="true"
          onClick={() => {
            setIsEditing(true);
          }}
          primary={_task.name}
        />
        <IconButton
          onClick={()=>{onStar()}}
        >
          { _task.is_star ?
            <StarIcon /> :
            <StarBorderIcon />
          }
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
        onCallback={(edited_task) => {
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
