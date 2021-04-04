import { configureStore } from "@reduxjs/toolkit"

import drawerReducer from "./slices/drawerSlice"
import authReducer from "./slices/authSlice"


export default configureStore({
  reducer: {
    drawer: drawerReducer,
    auth: authReducer,
  },
})
