import { createSlice } from "@reduxjs/toolkit";
import firebase from "../apis/firebase";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isSignedIn: false,
  },
  reducers: {
    signIn(state) {
      state.isSignedIn = true;
    },
    signOut(state) {
      firebase.auth().signOut();
      state.isSignedIn = false;
    },
  },
});

export const { signIn, signOut } = authSlice.actions;
export default authSlice.reducer;
