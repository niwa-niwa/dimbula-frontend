import { createSlice } from "@reduxjs/toolkit";
import { Task } from "../types/Task";

type Props_Initial = {
  isOpen_TaskModal: boolean;
  task: Task;
};

export const initialState: Props_Initial = {
  isOpen_TaskModal: false,
  task: {
    id: "",
    name: "",
    memo: "",
    is_done: false,
    is_star: false,
    start_date: null,
    due_date: null,
    taskSection: null,
    taskFolder: null,
    person: "",
    updated_at: "",
    created_at: "",
  },
};

export const taskModalSlice = createSlice({
  name: "taskModal",
  initialState,
  reducers: {
    setIsOpen_TaskModal(state, action) {
      state.task = action.payload.task
        ? { ...action.payload.task }
        : { ...initialState };
      state.isOpen_TaskModal = action.payload.isOpen;
    },
  },
});

export default taskModalSlice.reducer;

export const select_isOpenTaskModal = (state: any) =>
  state.taskModal.isOpen_TaskModal;

export const select_task = (state: any) => state.taskModal.task;

export const { setIsOpen_TaskModal } = taskModalSlice.actions;
