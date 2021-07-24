import { createSlice } from '@reduxjs/toolkit'

const alertDialogSlice = createSlice({
  name:"alertDialog",
  initialState:{
    isOpen:false,
    title:"",
    message:"",
    isChosen:false,
  },
  reducers:{
    showDialog(state, action){
      state.isOpen = action.payload.isOpen || true
      state.title = action.payload.title
      state.message = action.payload.message
      state.isChosen = action.payload.isChosen || false
    },
    deleteDialog(state){
      state.isOpen = false
      state.title = ""
      state.message = ""
      state.isChosen = false
    }
  }
})
export default alertDialogSlice.reducer
export const { showDialog, deleteDialog } = alertDialogSlice.actions