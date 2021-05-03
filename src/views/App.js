import React, { useState, useEffect } from "react";
import { Router, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import history from "../history";
import firebase from "../apis/firebase";

import GuestRoute from "./layouts/GuestRoute";
import AuthRoute from "./layouts/AuthRoute";
import SnackBar from "./layouts/SnackBar";
import AlertDialog from "./layouts/AlertDialog";
import ProgressCircle from "./layouts/ProgressCircle";

import MainLayout from "./layouts/MainLayout";
import SignIn from "./sign/SignIn";
import SignUp from "./sign/SignUp";
import SignOut from "./sign/SignOut";
import ResendEmail from "./sign/ResendEmail";
import ForgetPw from "./sign/ForgetPw";
import Tasks from "./task/Tasks";
import Settings from "./settings/Settings";
import SettingsHeader from "./settings/layouts/Header";

import PATHS from "../const/paths";
import NAMES from "../const/names";

import { setSnackBar } from "../slices/snackBarSlice"
import { signOut, asyncSignIn } from "../slices/userSlice";
import {
  openProgressCircle,
  closeProgressCircle,
} from "../slices/progressCircleSlice";

const App = () => {
  const dispatch = useDispatch();
  const [isChecking, setIsChecking] = useState(true); // the flag is loading user state

  useEffect(() => {
    let isMounted = true; // the flag is prevented to leak memory
    dispatch(openProgressCircle());

    const effect = async () => {
      firebase.auth().onAuthStateChanged(async (user) => {
        if (!user) {
          dispatch(signOut());
        }

        if (user && !user.emailVerified) {
          // Confirm the account is valid with dimbula backend
          dispatch(signOut());
          dispatch(
            setSnackBar({
              severity: "error",
              message: "You have to confirm our Email.",
            })
          );
        }

        if (user && user.emailVerified) {
          let token = localStorage.getItem(NAMES.STORAGE_TOKEN);
          if (!token) {
            token = await firebase.auth().currentUser.getIdToken(true);
          }
          const signIn = () =>
            new Promise((resolve) => {
              resolve(
                dispatch(
                  asyncSignIn({ token, refreshToken: user.refreshToken })
                )
              );
            });
          const response = await signIn();

          if (response.type === "user/signin/rejected") {
            dispatch(signOut());
            dispatch(
              setSnackBar({
                severity: "error",
                message: "Something is wrong.",
              })
            );
          }
        }

        if (isMounted) {
          dispatch(closeProgressCircle());
          setIsChecking(false);
        }
      });
    };
    effect();
  
    return () => {
      isMounted = false;
    };
  }, [dispatch]);

  const SettingsLayout = ({children}) => (
    <React.Fragment>
      <SettingsHeader />
      {children}
    </React.Fragment>
  )

  const render = () => {
    if (isChecking) {
      return false;
    }
    return (
      <Switch>

        <AuthRoute exact path={PATHS.HOME} component={Tasks} layout={MainLayout}/>
        <AuthRoute exact path={`${PATHS.HOME}:id`} component={Tasks} layout={MainLayout}/>
        <AuthRoute exact path={`${PATHS.TASK_FOLDERS}:id`} component={Tasks} layout={MainLayout}/>

        <AuthRoute exact path={PATHS.SETTINGS} component={Settings} layout={SettingsLayout} />
        <AuthRoute exact path={PATHS.SIGN_OUT} component={SignOut} layout={SettingsLayout} />

        <GuestRoute exact path={PATHS.SIGN_IN} component={SignIn} />
        <GuestRoute exact path={PATHS.SIGN_UP} component={SignUp} />
        <GuestRoute exact path={PATHS.RESEND_EMAIL} component={ResendEmail} />
        <GuestRoute exact path={PATHS.FORGET_PASSWORD} component={ForgetPw} />

      </Switch>
    );
  };

  return (
    <Router history={history}>
      {render()}
      <SnackBar />
      <AlertDialog />
      <ProgressCircle />
    </Router>
  );
};
export default App;
