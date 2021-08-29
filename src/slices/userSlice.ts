import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import firebase from "../apis/firebase";
import { backend } from "../apis/backend";
import { setSnackBar } from "./snackBarSlice";
import { openProgressCircle, closeProgressCircle } from "./progressCircleSlice";
import NAMES from "../const/names";
import debug from "../utils/debug";

type props_asyncSignIn = {
  token: any;
  refreshToken: any;
};
export const asyncSignIn = createAsyncThunk<any, props_asyncSignIn, {}>(
  "user/signin",
  async ({ token, refreshToken }, { rejectWithValue }) => {
    try {
      localStorage.setItem(NAMES.STORAGE_TOKEN, token);
      localStorage.setItem(NAMES.STORAGE_REFRESH_TOKEN, refreshToken);
      const response = await backend(NAMES.V1 + "persons/");
      return response.data;
    } catch (e: any) {
      if (!e.response) {
        debug(() => console.error("asyncSignIn unexpected error", e));
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

function deleteState(state: any) {
  localStorage.removeItem(NAMES.STORAGE_TOKEN);
  localStorage.removeItem(NAMES.STORAGE_REFRESH_TOKEN);
  localStorage.removeItem(NAMES.STORAGE_UID);
  state.userInfo = {};
}

const initialState = {
  isSignedIn: false,
  userInfo: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signOut(state) {
      deleteState(state);
      state.isSignedIn = false;
      firebase.auth().signOut();
    },
    deleteUserState(state) {
      deleteState(state);
      state.isSignedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(asyncSignIn.fulfilled, (state, action) => {
      localStorage.setItem(NAMES.STORAGE_UID, action.payload.id);
      return {
        ...state,
        isSignedIn: true,
        userInfo: { ...action.payload },
      };
    });
    builder.addCase(asyncSignIn.rejected, (state, action) => {
      // if (action.payload) {
      //   state.error = { ...action.payload };
      // } else {
      debug(() =>
        console.error(
          "Unexpected error from asyncSignIn = ",
          action.error.message
        )
      );
      // }
    });
  },
});

export default userSlice.reducer;
export const { signOut, deleteUserState } = userSlice.actions;
export const selectUser = (state: any) => state.user;

export const asyncDeleteUser = () => (dispatch: any) => {
  dispatch(openProgressCircle());

  backend
    .delete(
      NAMES.V1 + `persons/delete/${localStorage.getItem(NAMES.STORAGE_UID)}/`
    )
    .then(() => {
      firebase
        .auth()
        .currentUser?.delete()
        .then(() => {
          dispatch(
            setSnackBar({
              message: "Thank you for using my app.",
            })
          );
        })
        .catch((error) => {
          debug(() => console.error(error));
          dispatch(
            setSnackBar({
              message: "Sorry something is wrong. retry after log-in again.",
            })
          );
        })
        .finally(() => {
          dispatch(deleteUserState());
        });
    })
    .catch((error) => {
      debug(() => console.error(error));
      dispatch(
        setSnackBar({
          severity: "error",
          message: "Sorry couldn't delete account. Try again later",
        })
      );
    })
    .finally(() => {
      dispatch(closeProgressCircle());
    });
};
