import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import history from "../../history";
import TaskList from "./layouts/TaskList";
import { backend } from "../../apis/backend";
import NAMES from "../../const/names";
import PATHS from "../../const/paths";
import { setSnackBar } from "../../slices/snackBarSlice";

const Tasks = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [taskFolder, setTaskFolder] = useState();

  useEffect(() => {
    if (!id) {
      return;
    }

    const effect = async () => {
      try {
        const response = await backend.get(
          NAMES.V1 + history.location.pathname.slice(1)
        );
        setTaskFolder({ ...response.data });
      } catch (e) {
        console.log(e.message);
        dispatch(
          setSnackBar({
            severity: "error",
            message: "Not found tasks that you find",
          })
        );
        history.push(PATHS.HOME);
      }
    };
    effect();
  }, [id, dispatch]);

  const render = () => {
    if (!id) {
      return <h1>Task Index</h1>;
    }
    if (taskFolder) {
      return <TaskList taskFolder={taskFolder} />;
    }
  };

  return <React.Fragment>{render()}</React.Fragment>;
};
export default Tasks;
