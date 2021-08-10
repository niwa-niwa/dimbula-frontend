import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Box, Typography, List, Container } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";

import history from "../../../history";
import TaskCard from "./TaskCard";
import DeleteDialog from "../modals/DeleteDialog";
import {
  convertToEndPoint,
  asyncGetCurrentTaskFolder,
  asyncDeleteTaskFolder,
  selectCurrentTaskFolder,
} from "../../../slices/taskSlice";
import { openTaskFolderDialog } from "../../../slices/taskFolderDialogSlice";
import {
  openProgressLiner,
  closeProgressLiner,
} from "../../../slices/progressLinerSlice";
import {
  setIsOpen_TaskModal,
} from "../../../slices/taskModalSlice";

import PATHS from "../../../const/paths";
import ACTIONS from "../../../const/actions";

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
  hidden: {
    display: "none",
  },
}));

const TaskList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { id } = useParams<any>();
  const currentTaskFolder = useSelector(selectCurrentTaskFolder);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showCompleted, setShowCompleted] = useState(false);

  useEffect(() => {
    dispatch(openProgressLiner());
    let isMounted = true;
    if (!id) {
      history.push(PATHS.APP_INBOX);
    }

    const effect = async () => {
      await dispatch(
        asyncGetCurrentTaskFolder(
          convertToEndPoint(history.location.pathname),
          {
            failure: () => {
              history.push(PATHS.APP_INBOX);
            },
          }
        )
      );
      if (isMounted) {
        dispatch(closeProgressLiner());
        setIsLoading(false);
      }
    };
    effect();

    return () => {
      isMounted = false;
    };
  }, [id, dispatch]);

  const dispatchEdit = () => {
    dispatch(
      openTaskFolderDialog({
        action_type: ACTIONS.TASK_FOLDERS_EDIT,
        taskFolder_id: currentTaskFolder.id,
        taskFolder_name: currentTaskFolder.name,
      })
    );
  };

  const dispatchDelete = () => {
    dispatch(
      asyncDeleteTaskFolder(currentTaskFolder, {
        success: () => {
          history.push(PATHS.APP_INBOX);
        },
      })
    );
  };

  const renderTaskCard = (list_flag = true) => {
    if (
      !Object.keys(currentTaskFolder).length ||
      !currentTaskFolder.tasks.length
    ) {
      return <h1>Nothing tasks for now.</h1>;
    }

    const render_tasks = currentTaskFolder.tasks.filter((task: any) => {
      if (list_flag && !task.is_done) {
        // not done tasks
        return task;
      }
      if (!list_flag && task.is_done) {
        // already done tasks
        return task;
      }
      return false;
    });

    return render_tasks.map((task: any) => {
      return <TaskCard key={task.id} task={task} />;
    });
  };

  const renderTaskList = () => (
    <React.Fragment>
      <Box display="flex" alignItems="center">
        <Typography variant="h6" className={classes.title}>
          {currentTaskFolder.name}
        </Typography>
        <Button
          className={currentTaskFolder.id ? "" : classes.hidden}
          variant="outlined"
          onClick={() => {
            dispatchEdit();
          }}
        >
          Rename
        </Button>
        <Button
          className={currentTaskFolder.id ? "" : classes.hidden}
          variant="outlined"
          color="secondary"
          onClick={() => {
            setIsDeleting(true);
          }}
        >
          Delete
        </Button>
      </Box>

      <Box>
        <Button
          onClick={() => {
            dispatch(setIsOpen_TaskModal(
              { 
                isOpen: true,
                task :{taskFolder: currentTaskFolder.id}
              }
            ))
          }}
          color="primary"
          startIcon={<AddIcon />}
        >
          Create A Task
        </Button>
      </Box>

      <Box>
        <List>{renderTaskCard()}</List>
      </Box>

    </React.Fragment>
  );

  const rendering = () => {
    if (isLoading) {
      return <h3 style={{textAlign:'center'}}>Now Loading...</h3>;
    }
    return renderTaskList();
  };

  return (
    <Container maxWidth="md">
      {rendering()}
      <Box mt={3}>
        {showCompleted ? (
          <Button
            onClick={() => {
              setShowCompleted(false);
            }}
            startIcon={<RemoveCircleOutlineIcon />}
          >
            Hide completed Tasks
          </Button>
        ) : (
          <Button
            onClick={() => {
              setShowCompleted(true);
            }}
            startIcon={<AddCircleOutlineIcon />}
          >
            Show already completed Tasks
          </Button>
        )}
        {showCompleted ? renderTaskCard(false) : false}
      </Box>

      <DeleteDialog
        isOpen={isDeleting}
        onClose={() => {
          setIsDeleting(false);
        }}
        onDelete={() => {
          dispatchDelete();
        }}
        subtitle={`You are going to delete "${currentTaskFolder.name}".`}
      />

    </Container>
  );
};
export default TaskList;
