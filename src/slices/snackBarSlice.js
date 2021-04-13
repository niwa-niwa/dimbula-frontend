import { createSlice } from '@reduxjs/toolkit'

const snackBarSlice = createSlice({
  name:'snackBar',
  initialState:{
    isOpen:false,
    severity:"",
    message:"",
    props:{},
  },
  reducers: {
    setMessage(state, action){
      state.isOpen = action.payload.isOpen
      state.severity = action.payload.severity
      state.message = action.payload.message
      state.props = {...action.payload.props}
    },
    deleteMessage(state){
      state.isOpen = false
      state.severity = ""
      state.message = ''
      state.props = {}
    }
  }
})
export default snackBarSlice.reducer
export const { setMessage, deleteMessage} = snackBarSlice.actions
