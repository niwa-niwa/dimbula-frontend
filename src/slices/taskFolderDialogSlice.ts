import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen_taskFolderDialog: false,
  action_type: "",
  taskFolder_id: "",
  taskFolder_name: "",
};

const taskFolderDialogSlice = createSlice({
  name: "taskFolderDialog",
  initialState,
  reducers: {
    openTaskFolderDialog(state, action) {
      state.isOpen_taskFolderDialog = true;
      state.action_type = action.payload.action_type;
      state.taskFolder_id = action.payload.taskFolder_id || "";
      state.taskFolder_name = action.payload.taskFolder_name || "";
    },
    closeTaskFolderDialog(state) {
      state.isOpen_taskFolderDialog = initialState.isOpen_taskFolderDialog;
      state.action_type = initialState.action_type;
      //maybe not necessary // state.taskFolder = initialState.taskFolder;
      state.taskFolder_id = initialState.taskFolder_id;
      state.taskFolder_name = initialState.taskFolder_name;
    },
  },
});

export const selectTaskFolderDialog = (state:any) => state.taskFolderDialog;
export const {
  openTaskFolderDialog,
  closeTaskFolderDialog,
} = taskFolderDialogSlice.actions;
export default taskFolderDialogSlice.reducer;
