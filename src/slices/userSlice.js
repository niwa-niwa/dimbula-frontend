import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import firebase from "../apis/firebase";

import { backend } from "../apis/backend";
import NAMES from "../const/names";

export const asyncSignIn = createAsyncThunk(
  "user/signin",
  async ({ token, refreshToken }, { rejectWithValue }) => {
    try {
      localStorage.setItem(NAMES.STORAGE_TOKEN, token);
      localStorage.setItem(NAMES.STORAGE_REFRESH_TOKEN, refreshToken);
      const response = await backend(NAMES.V1 + "persons/");
      return response.data;
    } catch (e) {
      if (!e.response) {
        console.error("asyncSignIn unexpected error", e);
        throw new Error(e);
      }
      const data = {
        message: e.response.request.response,
        status: e.response.status,
      };
      return rejectWithValue(data);
    }
  }
);
const initialState = {
  isSignedIn: false,
  id: "",
  name: "",
  email: "",
  photo_url: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signIn(state) {
      state.isSignedIn = true;
    },
    signOut(state) {
      localStorage.removeItem(NAMES.STORAGE_TOKEN);
      localStorage.removeItem(NAMES.STORAGE_REFRESH_TOKEN);
      localStorage.removeItem(NAMES.STORAGE_UID);
      state.isSignedIn = false;
      state.id = "";
      state.name = "";
      state.email = "";
      state.photo_url = "";
      firebase.auth().signOut();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(asyncSignIn.fulfilled, (state, action) => {
      localStorage.setItem(NAMES.STORAGE_UID, action.payload.id);
      return {
        ...state,
        isSignedIn: true,
        ...action.payload,
      };
    });
    builder.addCase(asyncSignIn.rejected, (state, action) => {
      if (action.payload) {
        state.error = { ...action.payload };
      } else {
        console.error(
          "Unexpected error from asyncSignIn = ",
          action.error.message
        );
      }
    });
  },
});

export default userSlice.reducer;
export const { signIn, signOut } = userSlice.actions;
export const selectUser = (state) => state.user;