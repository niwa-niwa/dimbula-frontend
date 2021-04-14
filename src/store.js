import { configureStore } from "@reduxjs/toolkit"

import drawerReducer from "./slices/drawerSlice"
import authReducer from "./slices/authSlice"
import snackBarSlice from "./slices/snackBarSlice"


export default configureStore({
  reducer: {
    drawer: drawerReducer,
    auth: authReducer,
    snackBar: snackBarSlice,
  },
})
