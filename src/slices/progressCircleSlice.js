import { createSlice } from "@reduxjs/toolkit"


const progressCircleSlice = createSlice({
  name: "progressCircle",
  initialState: {
    isOpen: false,
  },
  reducers: {
    setIsOpen(state) {
      state.isOpen = true
    },
    setIsClose(state){
      state.isOpen = false
    }
  },
})

export const {setIsOpen, setIsClose} = progressCircleSlice.actions
export default progressCircleSlice.reducer
