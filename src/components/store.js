import {configureStore} from '@reduxjs/toolkit'

import drawerReducer from "./slices/drawerSlice"


export default configureStore({
  reducer:{
    drawer: drawerReducer,
  }
})
