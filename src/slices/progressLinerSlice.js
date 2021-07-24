import { createSlice } from "@reduxjs/toolkit";

const progressLinerSlice = createSlice({
  name: "progressLiner",
  initialState: {
    isOpen_progressLiner: false,
  },
  reducers: {
    openProgressLiner(state) {
      state.isOpen_progressLiner = true;
    },
    closeProgressLiner(state) {
      state.isOpen_progressLiner = false;
    },
  },
});

export const { openProgressLiner, closeProgressLiner } =
  progressLinerSlice.actions;
export default progressLinerSlice.reducer;
export const selectProgressLiner = (state) =>
  state.progressLiner.isOpen_progressLiner;
