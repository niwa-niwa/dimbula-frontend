import { createSlice } from "@reduxjs/toolkit"


const progressCircleSlice = createSlice({
  name: "progressCircle",
  initialState: {
    isOpen_progressCircle: false,
  },
  reducers: {
    setIsOpen_progressCircle(state) {
      state.isOpen_progressCircle = true
    },
    setIsClose_progressCircle(state){
      state.isOpen_progressCircle = false
    }
  },
})

export const {setIsOpen_progressCircle, setIsClose_progressCircle} = progressCircleSlice.actions
export default progressCircleSlice.reducer
