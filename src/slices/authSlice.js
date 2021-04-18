import { createSlice } from '@reduxjs/toolkit'
import firebase from '../apis/firebase'

// Todo reject user if user confirm email to signup 
const authSlice = createSlice({
  name:'auth',
  initialState: {
    isSignedIn: false,
  },
  reducers:{
    signIn(state){
      // Todo confirm email-confirmed
      // Todo Backend login process
      
      state.isSignedIn = true
    },
    signOut(state){
      firebase.auth().signOut()
      state.isSignedIn = false
    }
  }
})

export const { signIn, signOut } = authSlice.actions
export default authSlice.reducer
