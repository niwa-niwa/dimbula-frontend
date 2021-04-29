import { createSlice } from "@reduxjs/toolkit";
import firebase from "../apis/firebase";

import NAMES from "../const/names";

const userSlice = createSlice({
  name: "user",
  initialState: {
    isSignedIn: false,
    id:"",
    name:"",
    email:"",
    photo:"",
  },
  reducers: {
    signIn(state, action) {
      localStorage.setItem(NAMES.STORAGE_UID, action.payload.id);
      state.isSignedIn = true;
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.photo = action.payload.photo || "";
    },
    signOut(state) {
      localStorage.removeItem(NAMES.STORAGE_TOKEN);
      localStorage.removeItem(NAMES.STORAGE_REFRESH_TOKEN);
      localStorage.removeItem(NAMES.STORAGE_UID);

      state.isSignedIn = false;
      state.id = "";
      state.name = "";
      state.email = "";
      state.photo = "";
      firebase.auth().signOut();
    },
  },
});

export default userSlice.reducer;
export const { signIn, signOut } = userSlice.actions;
export const selectUser = (state) => state.user;
