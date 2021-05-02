import React from "react";

import {makeStyles} from "@material-ui/core/styles";
import {
  ListItem,
  ListItemText,
  Checkbox,
  IconButton,
} from '@material-ui/core';
// import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';

const useStyles = makeStyles((theme) => ({
  item_style: {
    borderBottom:"1px solid #f0f0f0"
  }
}))

const TaskCard = ({task}) => {
  const classes = useStyles();

  return(
    <ListItem className={classes.item_style}>
      <Checkbox edge="start" />
      <ListItemText primary={task.name} />
      <IconButton>
        <StarBorderIcon />
      </IconButton>
    </ListItem>
  )
}
export default TaskCard;