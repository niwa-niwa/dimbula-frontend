import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

import TaskList from "./layouts/TaskList";
import { backend } from "../../apis/backend";
import NAMES from "../../const/names";


const Tasks = () => {
  const { id } = useParams();
  const history = useHistory();
  const [taskFolder, setTaskFolder] = useState();
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    console.log(id);
    if (!id) {
      return;
    }

    const effect = async () => {
      console.log(history.location.pathname);
      try {
        const response = await backend.get(
          NAMES.V1 + history.location.pathname.slice(1)
        );
        console.log("success= ", response.data);
        setTaskFolder({ ...response.data });
      } catch (e) {
        console.log(e.message);
        setErrorMessage("Not found tasks that you find");
      }
    };
    effect();
  }, [id, history]);

  const render = () => {
    if (!id) {
      return <h1>Task Index</h1>;
    }
    if(errorMessage){
      return <p>{errorMessage}</p>
    }
    if(taskFolder){
      return (
        <TaskList taskFolder={taskFolder} />
        
      );
    }
  };

  return <React.Fragment>{render()}</React.Fragment>;
};
export default Tasks;
