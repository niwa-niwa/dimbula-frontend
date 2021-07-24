import React, { useState } from "react";

import TaskFolderDialog from "../task/modals/TaskFolderDialog";
import Header from "./Header";
import LeftDrawer from "./LeftDrawer";

const MainLayout = ({ children }) => {
  const [isDrawer, setIsDrawer] = useState(true);

  return (
    <React.Fragment>
      <Header isDrawer={isDrawer} onDrawer={setIsDrawer} />
      <LeftDrawer isDrawer={isDrawer}>{children}</LeftDrawer>
      <TaskFolderDialog />
    </React.Fragment>
  );
};
export default MainLayout;
