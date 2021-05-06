import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Box, Typography, List, Container } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

import { backend } from "../../../apis/backend";
import history from "../../../history";
import TaskCard from "./TaskCard";
import DeleteDialog from "../modals/DeleteDialog";
import TaskDialog from "../modals/TaskDialog";
import {
  asyncDeleteTaskFolder,
  asyncCreateTask,
} from "../../../slices/taskSlice";
import { openTaskFolderDialog } from "../../../slices/taskFolderDialogSlice";
import { setSnackBar } from "../../../slices/snackBarSlice";

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
  const [currentFolder, setCurrentFolder] = useState({});
  const [isDeleting, setIsDeleting] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const effect = async () => {
      try {
        const response = await backend.get(
          NAMES.V1 + history.location.pathname.slice(1)
        );
        setCurrentFolder({ ...response.data });
      } catch (e) {
        dispatch(
          setSnackBar({
            severity: "error",
            message: "Not found tasks that you find",
          })
        );
        history.push(PATHS.HOME);
      }
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
        taskFolder_id: currentFolder.id,
        taskFolder_name: currentFolder.name,
      })
    );
  };

  /**
   *
   * @param {*name, memo, due_date, start_date, is_done, is_star, *person, *taskFolder} data
   * @param {CallBack Function for reset values of form} reset
   * @returns nothing
   */
  const dispatchCreate = async (data, reset) => {
    const response = await dispatch(asyncCreateTask(data));
    if (response.type === ACTIONS.TASKS_CREATE + "/rejected") {
      dispatch(
        setSnackBar({
          severity: "error",
          message: response.payload.message,
        })
      );
      return;
    }
    if (response.type === ACTIONS.TASKS_CREATE + "/fulfilled") {
      dispatch(setSnackBar({ message: `Created "${response.payload.name}".` }));
      setCurrentFolder({
        ...currentFolder,
        tasks: [{ ...response.payload }, ...currentFolder.tasks],
      });
      setIsCreating(false);
      reset();
      return;
    }
  };

  const dispatchDelete = async () => {
    const response = await dispatch(asyncDeleteTaskFolder(currentFolder.id));
    if (response.type === ACTIONS.TASK_FOLDERS_DELETE + "/rejected") {
      dispatch(
        setSnackBar({
          severity: "error",
          message: response.payload.message,
        })
      );
      return;
    }
    if (response.type === ACTIONS.TASK_FOLDERS_DELETE + "/fulfilled") {
      dispatch(setSnackBar({ message: `Deleted "${currentFolder.name}".` }));
      history.push(PATHS.HOME);
      return;
    }
  };

  const editTaskList = (edited_task, action_type) => {
    let edited_list;
    if (action_type === ACTIONS.TASKS_DELETE) {
      edited_list = currentFolder.tasks.filter((task) => {
        return task.id !== edited_task.id;
      });
    }
    // prevent memory leak
    history.push(history.location.pathname);
    setCurrentFolder({ ...currentFolder, tasks: [...edited_list] });
  };

  const renderTaskCard = () => {
    return currentFolder.tasks.map((task) => {
      return (
        <TaskCard
          key={task.id}
          task={task}
          onEditTaskList={(edited_data, action_type) => {
            editTaskList(edited_data, action_type);
          }}
        />
      );
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
          {currentFolder.name}
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
        subtitle={`You are going to delete "${currentFolder.name}".`}
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
          taskFolder: currentFolder.id,
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
