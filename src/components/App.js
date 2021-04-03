import React from "react"

import Header from "./layouts/Header"
import LeftDrawer from "./layouts/LeftDrawer"
import TestAuth from "./auth/TestAuth"


const App = () => {

  return (
    <React.Fragment>
      <Header />
      <LeftDrawer>
        <div>Dimbula Login</div>
        <br />
        <TestAuth />
      </LeftDrawer>
    </React.Fragment>
  )
}
export default App
