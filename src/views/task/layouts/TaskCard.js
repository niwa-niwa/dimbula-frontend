import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {makeStyles} from "@material-ui/core/styles";
import {
  ListItem,
  ListItemText,
  Checkbox,
  IconButton,
} from '@material-ui/core';
import StarBorderIcon from '@material-ui/icons/StarBorder';
// import StarIcon from '@material-ui/icons/Star';
import { setSnackBar } from "../../../slices/snackBarSlice";
import TaskDialog from "../modals/TaskDialog";

import { asyncEditTask } from "../../../slices/taskSlice";
import ACTIONS from "../../../const/actions";

const useStyles = makeStyles((theme) => ({
  item_style: {
    borderBottom:"1px solid #f0f0f0"
  }
}))


const TaskCard = ({task, onEditTaskList}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [_task, set_Task] = useState({...task});
  const [isEditing, setIsEditing] = useState(false);

  const onEdit = async (edited_task) => {
    console.log(edited_task);
    const response = await dispatch(asyncEditTask(edited_task));

    if (response.type === ACTIONS.TASKS_EDIT + "/fulfilled") {
      dispatch(setSnackBar({ message: `Edited "${response.payload.name}".` }));
      set_Task({ ...response.payload });
      setIsEditing(false);
      return;
    }
    if (response.type === ACTIONS.TASKS_EDIT + "/rejected") {
      dispatch(
        setSnackBar({
          severity: "error",
          message: response.payload.message,
        })
      );
      return;
    }

  }

  return (
    <React.Fragment>
      <ListItem
        button
        className={classes.item_style}
        onClick={() => {
          setIsEditing(true);
        }}
      >
        <Checkbox edge="start" />
        <ListItemText primary={_task.name} />
        <IconButton>
          <StarBorderIcon />
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
          onEdit(edited_task);
        }}
      />
    </React.Fragment>
  );
}
export default TaskCard;