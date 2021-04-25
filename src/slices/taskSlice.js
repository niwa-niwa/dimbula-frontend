import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import backend from "../apis/backend";

import NAMES from "../const/names";

const headers = {
  "Content-Type": "application/json",
  "X-Requested-With": "XMLHttpRequest",
  Authorization: `Bearer ${localStorage.getItem(NAMES.STORAGE_TOKEN)}`,
};

export const asyncGetTaskFolders = createAsyncThunk(
  "taskFolders/get",
  /**
   *
   * @returns data taskFolders that the user have
   */
  async (name=null, { rejectWithValue }) => {
    try {
      const response = await backend.get(NAMES.V1 + "task-folders/", {
        headers,
      });
      return response.data;
    } catch (e) {
      if (!e.response) {
        console.error("asyncCreateTaskFolder unexpected error", e);
        throw new Error(e);
      }
      const data = {
        message: e.response.request.response,
        status: e.response.status,
      };
      return rejectWithValue(data);
    }
  }
);

export const asyncCreateTaskFolder = createAsyncThunk(
  "taskFolders/create",
  /**
   *
   * @param {name:any, person:current_user} payload
   * @returns object
   */
  async (payload, { rejectWithValue }) => {
    try {
      const response = await backend.post(
        NAMES.V1 + "task-folders/create/",
        payload,
        { headers }
      );
      return response.data;
    } catch (e) {
      if (!e.response) {
        console.error("asyncCreateTaskFolder unexpected error", e);
        throw new Error(e);
      }
      const data = {
        message: e.response.request.response,
        status: e.response.status,
      };
      return rejectWithValue(data);
    }
  }
);

export const asyncEditTaskFolder = createAsyncThunk(
  "taskFolders/edit",
  /**
   *
   * @param {person:current_user.id, id:taskFolder.id, any:any} payload
   * @returns object
   */
  async (payload, {rejectWithValue}) => {
    try {
      const response = await backend.patch(
        NAMES.V1 + `task-folders/edit/${payload.id}/`,
        payload,
        { headers }
      );
      return response.data;
    } catch (e) {
      if (!e.response) {
        console.error("asyncCreateTaskFolder unexpected error", e);
        throw new Error(e);
      }
      const data = {
        message: e.response.request.response,
        status: e.response.status,
      };
      return rejectWithValue(data);
    }
  }
);

export const asyncDeleteTaskFolder = createAsyncThunk(
  "taskFolders/delete",
  /**
   *
   * @param {taskFolder.id} id
   * @returns object
   */
  async (id, {rejectWithValue}) => {
    try {
      await backend.delete(NAMES.V1 + `task-folders/delete/${id}/`, {
        headers,
      });
      return id;
    } catch (e) {
      if (!e.response) {
        console.error("asyncCreateTaskFolder unexpected error", e);
        throw new Error(e);
      }
      const data = {
        message: e.response.request.response,
        status: e.response.status,
      };
      return rejectWithValue(data);
    }
  }
);

const initialState = {
  taskFolders: [
    {
      id: "",
      name: "",
      person: "",
    },
  ],
  taskSections: [
    {
      id: "",
      name: "",
      default: false,
      taskFolders: "",
      person: "",
    },
  ],
  tasks: [
    {
      id: "",
      name: "",
      memo: "",
      is_star: false,
      is_done: false,
      taskSection: "",
      taskFolder: "",
      person: "",
      start_date: "",
      due_date: "",
    },
  ],
  subTasks: [
    {
      id: "",
      name: "",
      is_done: false,
      task: "",
      person: "",
    },
  ],
  error: [
    {
      message:"",
      status:"",
    }
  ]
};

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
// ======== START asyncGetTaskFolders ===========  
    builder.addCase(asyncGetTaskFolders.fulfilled, (state, action) => {
      return {
        ...state,
        taskFolders: action.payload,
      };
    });
    builder.addCase(asyncGetTaskFolders.rejected, (state, action) => {
      if (action.payload) {
        state.error = {...action.payload}
      } else {
        console.error("Unexpected error from asyncGetTaskFolders", action.error.message)
      };
    });
// ======== END asyncGetTaskFolders ===========  

// ======== START asyncCreateTaskFolder ===========  
    builder.addCase(asyncCreateTaskFolder.fulfilled, (state, action) => {
      return {
        ...state,
        taskFolders: [...state.taskFolders, action.payload],
      };
    });
    builder.addCase(asyncCreateTaskFolder.rejected, (state, action) => {
      if (action.payload) {
        state.error = {...action.payload}
      } else {
        console.error("Unexpected error from asyncCreateTaskFolder", action.error.message)
      };
    });
// ======== END asyncCreateTaskFolder ===========  

// ======== START asyncEditTaskFolder ===========  
    builder.addCase(asyncEditTaskFolder.fulfilled, (state, action) => {
      return {
        ...state,
        taskFolders: state.taskFolders.map((folder) =>
          folder.id === action.payload.id ? action.payload : folder
        ),
      };
    });
    builder.addCase(asyncEditTaskFolder.rejected, (state, action) => {
      if (action.payload) {
        state.error = {...action.payload}
      } else {
        console.error("Unexpected error from asyncEditTaskFolderです", action.error.message)
      };
    });
// ======== END asyncEditTaskFolder ===========  

// ======== START asyncDeleteTaskFolder ===========  
    builder.addCase(asyncDeleteTaskFolder.fulfilled, (state, action) => {
      return {
        ...state,
        taskFolders: state.taskFolders.filter(
          (folder) => folder.id !== action.payload
        ),
      };
    });
    builder.addCase(asyncDeleteTaskFolder.rejected, (state, action) => {
      if (action.payload) {
        state.error = {...action.payload}
      } else {
        console.error("Unexpected error from asyncDeleteTaskFolder", action.error.message)
      };
    });
// ======== END asyncDeleteTaskFolder ===========  
  },
});

export default taskSlice.reducer;
export const selectAll = (state) => state.task;
export const selectTaskFolders = (state) => state.task.taskFolders;
export const selectTaskSections = (state) => state.task.taskSections;
export const selectTasks = (state) => state.task.tasks;
export const selectSubTasks = (state) => state.task.subTasks;
export const selectError = (state) => state.task.error;
