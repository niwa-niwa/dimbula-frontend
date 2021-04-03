import React from "react"
import { Router, Route, Switch } from 'react-router-dom'
import history from '../history'

import Header from "./layouts/Header"
import LeftDrawer from "./layouts/LeftDrawer"
import TestAuth from "./auth/TestAuth"


const App = () => {

  return (
    <Router history={history}>

      <Header />
      <LeftDrawer>
        <div>Dimbula Login</div>
        <Switch>
          <Route path="/" exact component={TestAuth} />
        </Switch>
      </LeftDrawer>

    </Router>
  )
}
export default App
