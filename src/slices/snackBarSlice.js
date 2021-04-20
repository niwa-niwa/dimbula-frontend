import { createSlice } from '@reduxjs/toolkit'

const snackBarSlice = createSlice({
  name:'snackBar',
  initialState:{
    isOpen:false,
    severity:"info", // expected values are error, info, success, warning
    message:"",
  },
  reducers: {
    setSnackBar(state, action){
      state.isOpen = action.payload.isOpen || true
      state.severity = action.payload.severity || "info"
      state.message = action.payload.message
    },
    deleteSnackBar(state){
      state.isOpen = false
      state.severity = "info"
      state.message = ''
    }
  }
})
export default snackBarSlice.reducer
export const { setSnackBar, deleteSnackBar} = snackBarSlice.actions
