import React from "react"
import { Router, Route, Switch } from 'react-router-dom'
import history from '../history'

import Header from "./layouts/Header"
import LeftDrawer from "./layouts/LeftDrawer"
import TestAuth from "./auth/TestAuth"
import Login from "./login/Login"

const App = () => {

  const MainLayout = () => (
    <React.Fragment>
      <Header />
        <LeftDrawer>
        <Switch>
          <Route exact path="/" component={TestAuth} />
        </Switch>
        </LeftDrawer>
    </React.Fragment>
  )

  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={MainLayout} />
        <Route exact path="/login/" component={Login} />
      </Switch>

    </Router>
  )


}
export default App
