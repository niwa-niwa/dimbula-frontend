import { createSlice } from '@reduxjs/toolkit'
import firebase from '../api/firebase'

// Todo reject user if user confirm email to signup 
const authSlice = createSlice({
  name:'auth',
  initialState: {
    isSignedIn: false,
  },
  reducers:{
    signIn(state){
      state.isSignedIn = true
      // Todo Backend login process
    },
    signOut(state){
      firebase.auth().signOut()
      state.isSignedIn = false
    }
  }
})

export const { signIn, signOut } = authSlice.actions
export default authSlice.reducer
