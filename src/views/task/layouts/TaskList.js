import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Box, Typography, List, Container } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

import history from "../../../history";
import TaskCard from "./TaskCard";
import DeleteDialog from "../modals/DeleteDialog";
import TaskDialog from "../modals/TaskDialog";
import {
  asyncGetCurrentTaskFolder,
  asyncDeleteTaskFolder,
  asyncCreateTask,
  selectCurrentTaskFolder,
} from "../../../slices/taskSlice";
import { openTaskFolderDialog } from "../../../slices/taskFolderDialogSlice";

import PATHS from "../../../const/paths";
import NAMES from "../../../const/names";
import ACTIONS from "../../../const/actions";

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
}));

const TaskList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { id } = useParams();
  const currentTaskFolder = useSelector(selectCurrentTaskFolder);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const effect = async () => {
      dispatch(asyncGetCurrentTaskFolder(history.location.pathname.slice(1)));
      if (isMounted) {
        setIsLoading(false);
      }
    };

    if (id && isMounted) {
      effect();
    }

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

  /**
   *
   * @param {*name, memo, due_date, start_date, is_done, is_star, *person, *taskFolder} data
   * @param {CallBack Function for reset values of form} reset
   * @returns nothing
   */
  const dispatchCreate = (data, reset) => {
    dispatch(
      asyncCreateTask(data, {
        success: () => {
          dispatch(
            asyncGetCurrentTaskFolder(history.location.pathname.slice(1))
          );
          setIsCreating(false);
          reset();
        },
      })
    );
  };

  const dispatchDelete = () => {
    dispatch(
      asyncDeleteTaskFolder(currentTaskFolder, {
        success: history.push(PATHS.HOME),
      })
    );
  };

  const renderTaskCard = () => {
    if (!currentTaskFolder.tasks) {
      return false;
    }
    return currentTaskFolder.tasks.map((task) => {
      return <TaskCard key={task.id} task={task} />;
    });
  };

  const renderMissingList = () => (
    <Box display="flex" alignItems="center">
      <Typography variant="h6" className={classes.title}>
        nothing tasks
      </Typography>
    </Box>
  );

  const renderTaskList = () => (
    <React.Fragment>
      <Box display="flex" alignItems="center">
        <Typography variant="h6" className={classes.title}>
          {currentTaskFolder.name}
        </Typography>
        <Button
          variant="outlined"
          onClick={() => {
            dispatchEdit();
          }}
        >
          Rename
        </Button>
        <Button
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
            setIsCreating(true);
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

      <TaskDialog
        isOpen={isCreating}
        title={"Create a new task."}
        action_type={ACTIONS.TASKS_CREATE}
        onClose={() => {
          setIsCreating(false);
        }}
        onCallback={(data, reset) => {
          dispatchCreate(data, reset);
        }}
        editTask={{
          taskFolder: currentTaskFolder.id,
          person: localStorage.getItem(NAMES.STORAGE_UID),
        }}
      />
    </React.Fragment>
  );

  const rendering = () => {
    if (isLoading) {
      // TODO centering Loading...
      return <h1>Now Loading...</h1>;
    }
    if (!id) {
      return renderMissingList();
    }
    return renderTaskList();
  };

  return <Container maxWidth="md">{rendering()}</Container>;
};
export default TaskList;
