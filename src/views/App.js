import React from "react"
import { Router, Route, Switch } from 'react-router-dom'
import history from '../history'

import Auth from "./layouts/Auth"
import Header from "./layouts/Header"
import LeftDrawer from "./layouts/LeftDrawer"
import SignIn from "./user/SignIn"

import Task from "./task/Index"

const App = () => {

  const MainLayout = () => (
    <React.Fragment>
      <Auth>
        <Header />
        <LeftDrawer>
          <Switch>
            <Route exact path="/" component={Task} />
          </Switch>
        </LeftDrawer>
      </Auth>
    </React.Fragment>
  )

  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={MainLayout} />
        <Route exact path="/signin/" component={SignIn} />
      </Switch>

    </Router>
  )

}
export default App
