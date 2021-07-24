import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./slices/userSlice";
import snackBarReducer from "./slices/snackBarSlice";
import alertDialogReducer from "./slices/alertDialogSlice";
import progressCircleReducer from "./slices/progressCircleSlice";
import progressLinerReducer from "./slices/progressLinerSlice";
import taskReducer from "./slices/taskSlice";
import taskFolderDialogReducer from "./slices/taskFolderDialogSlice";

export default configureStore({
  reducer: {
    progressCircle: progressCircleReducer,
    progressLiner: progressLinerReducer,
    user: userReducer,
    snackBar: snackBarReducer,
    alertDialog: alertDialogReducer,
    task: taskReducer,
    taskFolderDialog: taskFolderDialogReducer,
  },
});
