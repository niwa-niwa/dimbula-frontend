import { configureStore } from "@reduxjs/toolkit";

import drawerReducer from "./slices/drawerSlice";
import userReducer from "./slices/userSlice";
import snackBarReducer from "./slices/snackBarSlice";
import alertDialogReducer from "./slices/alertDialogSlice";
import progressCircleReducer from "./slices/progressCircleSlice";
import taskReducer from "./slices/taskSlice";
import taskFolderDialogReducer from "./slices/taskFolderDialogSlice";

export default configureStore({
  reducer: {
    drawer: drawerReducer,
    progressCircle: progressCircleReducer,
    user: userReducer,
    snackBar: snackBarReducer,
    alertDialog: alertDialogReducer,
    task: taskReducer,
    taskFolderDialog: taskFolderDialogReducer,
  },
});
