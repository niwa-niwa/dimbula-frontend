import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import backend from "../apis/backend";

import NAMES from "../const/names";


export const asyncGetTaskFolders = createAsyncThunk(
  "taskFolders/get",
  async () => {
    const {data} = await backend.get(NAMES.V1 + "task-folders/", {
      headers:{
        Authorization: `Bearer ${localStorage.getItem(NAMES.STORAGE_TOKEN)}`,
      },
    });
    return {data};
  }
);

const initialState = {
  taskFolders: [
    {
      id:"",
      name:"",
      person:"",
    },
  ],
  taskSections: [
    {
      id:"",
      name:"",
      default: false,
      taskFolders:"",
      person:"",
    },
  ],
  tasks:[
    {
      id:"",
      name:"",
      memo:"",
      is_star:false,
      is_done:false,
      taskSection:"",
      taskFolder:"",
      person:"",
      start_date:"",
      due_date:"",
    },
  ],
  subTasks:[
    {
      id:"",
      name:"",
      is_done:false,
      task:"",
      person:"",
    },
  ]
};

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(asyncGetTaskFolders.fulfilled, (state, action) => {
      return {
        ...state,
        taskFolders : action.payload.data,
      };
    });
  },
});

export default taskSlice.reducer;
export const all = (state) => state.task;
export const selectTaskFolders = (state) => state.task.taskFolders;
