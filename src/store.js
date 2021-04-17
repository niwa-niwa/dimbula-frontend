import { configureStore } from "@reduxjs/toolkit"

import drawerReducer from "./slices/drawerSlice"
import authReducer from "./slices/authSlice"
import snackBarReducer from "./slices/snackBarSlice"
import alertDialogReducer from './slices/alertDialogSlice'
import progressCircleReducer from "./slices/progressCircleSlice"

export default configureStore({
  reducer: {
    drawer: drawerReducer,
    progressCircle: progressCircleReducer,
    auth: authReducer,
    snackBar: snackBarReducer,
    alertDialog: alertDialogReducer,
  },
})
