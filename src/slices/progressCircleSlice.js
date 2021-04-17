import { createSlice } from "@reduxjs/toolkit"


const progressCircleSlice = createSlice({
  name: "progressCircle",
  initialState: {
    isOpen_progressCircle: false,
  },
  reducers: {
    openProgressCircle(state) {
      state.isOpen_progressCircle = true
    },
    closeProgressCircle(state){
      state.isOpen_progressCircle = false
    }
  },
})

export const {openProgressCircle, closeProgressCircle} = progressCircleSlice.actions
export default progressCircleSlice.reducer
