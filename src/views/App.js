import React from "react"
import { Router, Route, Switch } from 'react-router-dom'
import history from '../history'

import Auth from "./layouts/Auth"
import Header from "./layouts/Header"
import LeftDrawer from "./layouts/LeftDrawer"
import SignIn from "./user/SignIn"
import SignUp from "./user/SignUp"
import ResendEmail from "./user/ResendEmail"
import ForgetPw from "./user/ForgetPw"
import ConfirmEmail from "./user/ConfirmEmail"

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
        <Route exact path="/signup/" component={SignUp} />
        <Route exact path="/resend-email/" component={ResendEmail} />
        <Route exact path="/confirm-email/" component={ConfirmEmail} />
        <Route exact path="/forget-password" component={ForgetPw} />
      </Switch>

    </Router>
  )

}
export default App
