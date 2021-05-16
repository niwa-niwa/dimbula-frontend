import React,{ useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import {
  Drawer,
  Toolbar,
  List,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@material-ui/core";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import StarsIcon from "@material-ui/icons/Stars";
import TodayIcon from "@material-ui/icons/Today";
import AllInboxIcon from "@material-ui/icons/AllInbox";
import AssignmentIcon from '@material-ui/icons/Assignment';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import { selectTaskFolders, asyncGetTaskFolders } from "../../slices/taskSlice";
import { openTaskFolderDialog } from "../../slices/taskFolderDialogSlice";

import PATHS from "../../const/paths";
import ACTIONS from "../../const/actions";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    zIndex: 8,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: "auto",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  subHeader:{
    display: "flex",
    justifyContent: "space-between",
  }

}));

const special_folders = [
  { text: "Inbox", icon: <InboxIcon />, link: PATHS.APP_INBOX, },
  { text: "Today", icon: <TodayIcon />, link: PATHS.APP_TODAY, },
  { text: "Stars", icon: <StarsIcon />, link: PATHS.APP_STARS, },
  { text: "All Tasks", icon: <AllInboxIcon />, link:PATHS.APP_ALL_TASKS,},
];

export default function PersistentDrawer({ children, isDrawer}) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const task_folders = useSelector(selectTaskFolders);

  useEffect(() => {
    dispatch(asyncGetTaskFolders());
  }, [dispatch]);

  const renderTaskFolders = () => {
    if (!task_folders) {
      return false;
    }
    return task_folders.map((folder) => (
      <Link key={folder.id} to={PATHS.TASK_FOLDERS + folder.id + "/"}>
        <ListItem
          button
          key={folder.id}
          dense
          data-testid={`list-${folder.name}`}
        >
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText
            primary={folder.name}
            secondary={`Tasks ${folder.task_count}`}
          />
        </ListItem>
      </Link>
    ));
  };

  return (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={isDrawer}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            {special_folders.map((menu) => (
              <Link key={menu.text} to={menu.link} >
                <ListItem
                  button
                  data-testid={`list-${menu.text}`}
                >
                  <ListItemIcon>{menu.icon}</ListItemIcon>
                  <ListItemText primary={menu.text} />
                </ListItem>
              </Link>
            ))}
          </List>
          <Divider />

          <List
            subheader={
              <ListSubheader
                component="div"
                id="nested-list-subheader"
                className={classes.subHeader}
              >
                Task Folders
                <IconButton
                  aria-label="delete"
                  size="small"
                  onClick={() =>
                    dispatch(
                      openTaskFolderDialog({
                        action_type: ACTIONS.TASK_FOLDERS_CREATE,
                      })
                    )
                  }
                  data-testid="create_taskFolder_button"
                >
                  <AddCircleOutlineIcon />
                </IconButton>
              </ListSubheader>
            }
          >
            {renderTaskFolders()}
          </List>
        </div>
      </Drawer>

      <main
        className={clsx(classes.content, {
          [classes.contentShift]: isDrawer,
        })}
      >
        <Toolbar />
        {children}
      </main>
    </div>
  );
}
