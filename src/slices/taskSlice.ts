import { createSlice } from "@reduxjs/toolkit";
import { backend } from "../apis/backend";
import { setSnackBar } from "./snackBarSlice";
import { TaskFolder } from "../types/taskFolder";
import debug from "../utils/debug";
import NAMES from "../const/names";

/**
 *
 * The function removes prefix that is "/app/" in path
 * and
 * removes query
 * @param {String} path
 * @returns endpoint (String)
 */
export function convertToEndPoint(path: string) {
  return path.slice(5).split("?")[0];
}

type iniProps = {
  taskFolders: TaskFolder[];
  currentTaskFolder: TaskFolder;
};

const initialState: iniProps = {
  taskFolders: [],
  currentTaskFolder: {
    id: "",
    name: "",
    person: "",
    task_count: 0,
    updated_at: "",
    created_at: "",
  },
};

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setTaskFolders(state, action) {
      state.taskFolders = [...action.payload];
    },
    setCurrentTaskFolder(state, action) {
      state.currentTaskFolder = { ...action.payload };
    },
    incrementTaskCount(state, action) {
      const task_folder: TaskFolder | undefined = state.taskFolders.find(
        (folder: any) => {
          return action.payload.taskFolder === folder.id;
        }
      );
      task_folder && task_folder.task_count++;
    },
    decrementTaskCount(state, action) {
      const task_folder: TaskFolder | undefined = state.taskFolders.find(
        (folder: any) => {
          return action.payload.taskFolder === folder.id;
        }
      );
      task_folder && task_folder.task_count--;
    },
  },
});

export default taskSlice.reducer;
export const selectAll = (state: any) => state.task;
export const selectTaskFolders = (state: any) => state.task.taskFolders;
export const selectCurrentTaskFolder = (state: any) =>
  state.task.currentTaskFolder;
export const {
  setTaskFolders,
  setCurrentTaskFolder,
  incrementTaskCount,
  decrementTaskCount,
} = taskSlice.actions;

export const asyncGetTaskFolders = () => async (dispatch: any) => {
  try {
    const { data } = await backend.get(NAMES.V1 + "task-folders/");
    dispatch(setTaskFolders(data));
  } catch (e) {
    debug(() => console.error(e));
    dispatch(
      setSnackBar({
        severity: "error",
        message: "Sorry couldn't get task folders.",
      })
    );
  }
};

export const asyncCreateTaskFolder =
  (payload: any, { success = () => {}, failure = () => {} } = {}) =>
  async (dispatch: any) => {
    try {
      const { data } = await backend.post(
        NAMES.V1 + "task-folders/create/",
        payload
      );
      dispatch(asyncGetTaskFolders());
      dispatch(setSnackBar({ message: `Created "${data.name}".` }));
      if (success) {
        success();
      }
    } catch (e) {
      debug(() => console.error(e));
      dispatch(
        setSnackBar({
          severity: "error",
          message: "Sorry couldn't create task folders.",
        })
      );
      if (failure) {
        failure();
      }
    }
  };

export const asyncEditTaskFolder =
  (payload: any, { success = () => {}, failure = () => {} } = {}) =>
  async (dispatch: any) => {
    try {
      const { data } = await backend.patch(
        NAMES.V1 + `task-folders/edit/${payload.id}/`,
        payload
      );
      dispatch(asyncGetTaskFolders());
      dispatch(setSnackBar({ message: `Edited "${data.name}".` }));
      if (success) {
        success();
      }
    } catch (e) {
      debug(() => console.error(e));
      dispatch(
        setSnackBar({
          severity: "error",
          message: "Sorry couldn't edit task folders.",
        })
      );
      if (failure) {
        failure();
      }
    }
  };

export const asyncDeleteTaskFolder =
  (task_folder: any, { success = () => {}, failure = () => {} } = {}) =>
  async (dispatch: any) => {
    try {
      await backend.delete(NAMES.V1 + `task-folders/delete/${task_folder.id}/`);
      dispatch(asyncGetTaskFolders());
      dispatch(setSnackBar({ message: `Deleted "${task_folder.name}".` }));
      if (success) {
        success();
      }
    } catch (e) {
      debug(() => console.error(e));
      dispatch(
        setSnackBar({
          severity: "error",
          message: "Sorry couldn't delete task folders.",
        })
      );
      if (failure) {
        failure();
      }
    }
  };

export const asyncGetCurrentTaskFolder =
  (path: string, { success = () => [], failure = () => {} } = {}) =>
  async (dispatch: any) => {
    try {
      const { data } = await backend.get(NAMES.V1 + path);

      /**
       * the if syntax is confirm special folder or not
       * Special folder are inbox today all task
       */
      if (path.indexOf("task-folders") !== -1) {
        dispatch(setCurrentTaskFolder({}));
        dispatch(setCurrentTaskFolder(data));
      }
      if (path.indexOf("task-folders") === -1) {
        const name =
          path.charAt(0).toUpperCase() +
          path.slice(1).replace(/-/g, " ").replace(/\//g, ""); //the function make replace UpperCase and - & / delete
        dispatch(setCurrentTaskFolder({})); //for reset tasks data
        dispatch(setCurrentTaskFolder({ id: "", name, tasks: [...data] }));
      }

      if (success) {
        success();
      }
    } catch (e) {
      dispatch(
        setSnackBar({
          severity: "error",
          message: "Not found tasks that you find",
        })
      );
      if (failure) {
        failure();
      }
    }
  };

export const asyncGetCurrentTask = async (task_id: string) => {
  try {
    const { data } = await backend.get(NAMES.V1 + "tasks/" + task_id);
    return data;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const asyncCreateTask =
  (payload: any, { success = () => {}, failure = () => {} } = {}) =>
  async (dispatch: any) => {
    try {
      const { data } = await backend.post(NAMES.V1 + "tasks/create/", payload);
      if (data.taskFolder) {
        //The task that has not a taskFolder is into inbox
        dispatch(incrementTaskCount(data));
      }
      dispatch(setSnackBar({ message: `Created "${payload.name}".` }));
      if (success) {
        success();
      }
    } catch (e) {
      debug(() => console.error(e));
      dispatch(
        setSnackBar({
          severity: "error",
          message: "Sorry couldn't create a task.",
        })
      );
      if (failure) {
        failure();
      }
    }
  };

export const asyncEditTask =
  (payload: any, { success = () => {}, failure = () => {} } = {}) =>
  async (dispatch: any) => {
    try {
      await backend.patch(NAMES.V1 + `tasks/edit/${payload.id}/`, payload);
      dispatch(setSnackBar({ message: `Edited "${payload.name}".` }));
      if (success) {
        success();
      }
    } catch (e) {
      debug(() => console.error(e));
      dispatch(
        setSnackBar({
          severity: "error",
          message: "Sorry couldn't edit a task.",
        })
      );
      if (failure) {
        failure();
      }
    }
  };

export const asyncDeleteTask =
  (
    task: any,
    // edited arguments fot typeScript
    { success = () => {}, failure = () => {} } = {}
  ) =>
  async (dispatch: any) => {
    try {
      await backend.delete(NAMES.V1 + `tasks/delete/${task.id}/`);
      if (task.taskFolder) {
        //The task that has not a taskFolder is into inbox
        dispatch(decrementTaskCount(task));
      }
      dispatch(setSnackBar({ message: `Deleted "${task.name}".` }));
      if (success) {
        success();
      }
    } catch (e) {
      debug(() => console.error(e));
      dispatch(
        setSnackBar({
          severity: "error",
          message: "Sorry couldn't delete a task.",
        })
      );
      if (failure) {
        failure();
      }
    }
  };
