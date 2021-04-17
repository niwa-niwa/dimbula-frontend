import React from "react"
import { Router, Route, Switch } from 'react-router-dom'
import history from '../history'

import PATHS from "../const/paths"
import SnackBar from './layouts/SnackBar'
import AlertDialog from "./layouts/AlertDialog"
import ProgressCircle from './layouts/ProgressCircle' 

import Auth from "./layouts/Auth"
import UnAuth from "./layouts/UnAuth"
import Header from "./layouts/Header"
import LeftDrawer from "./layouts/LeftDrawer"
import SignIn from "./sign/SignIn"
import SignUp from "./sign/SignUp"
import ResendEmail from "./sign/ResendEmail"
import ForgetPw from "./sign/ForgetPw"

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
          <UnAuth>
            <Route exact path={PATHS.SIGN_IN} component={SignIn} />
            <Route exact path={PATHS.SIGN_UP} component={SignUp} />
            <Route exact path={PATHS.RESEND_EMAIL} component={ResendEmail} />
            <Route exact path={PATHS.FORGET_PASSWORD} component={ForgetPw} />
          </UnAuth>
      </Switch>
      <SnackBar />
      <AlertDialog />
      <ProgressCircle />
    </Router>
  )

}
export default App
