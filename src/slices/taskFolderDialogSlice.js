import { createSlice } from "@reduxjs/toolkit";

const taskFolderDialogSlice = createSlice({
  name: "taskFolderDialog",
  initialState: {
    isOpen_taskFolderDialog: false,
  },
  reducers: {
    openTaskFolderDialog(state) {
      state.isOpen_taskFolderDialog = true;
    },
    closeTaskFolderDialog(state) {
      state.isOpen_taskFolderDialog = false;
    },
  },
});
export const select_isOpen_taskFolderDialog = (state) =>
  state.taskFolderDialog.isOpen_taskFolderDialog;
export const {
  openTaskFolderDialog,
  closeTaskFolderDialog,
} = taskFolderDialogSlice.actions;
export default taskFolderDialogSlice.reducer;
