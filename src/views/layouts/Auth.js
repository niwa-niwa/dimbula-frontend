/**
 * The component confirm an account valid
 * if a account is not valid, forced sign out from firebase and move sign-in page.
 */

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import firebase from "../../apis/firebase";
import { signIn, signOut } from "../../slices/authSlice";
import {
  openProgressCircle,
  closeProgressCircle,
} from "../../slices/progressCircleSlice";
import axios from "../../apis/backend";
import { showDialog } from "../../slices/alertDialogSlice";
import STORAGE from "../../const/storage";


const Auth = ({ children }) => {
  const dispatch = useDispatch();
  const [isChecking, setIsChecking] = useState(true);
  const isSignedIn = useSelector((state) => state.auth.isSignedIn);

  useEffect(() => {
    dispatch(openProgressCircle());
    // the flag is prevented to leak memory
    let isMounted = true;
    const getStatus = () => {
      firebase.auth().onAuthStateChanged(async (user) => {
        if (user) {
          if (user.emailVerified) {
            // Confirm the account is valid with dimbula backend
            const token = await firebase.auth().currentUser.getIdToken(true);
            localStorage.setItem(STORAGE.TOKEN,token)
            axios("/api/v1/persons/", {
              headers: { Authorization: `Bearer ${token}` },
            })
              .then((response) => {
                dispatch(signIn())
              })
              .catch((e) => {
                dispatch(signOut());
                dispatch(
                  showDialog({
                    isOpen: true,
                    title: "The Account is not valid.",
                    message:
                      "The account has not been made valid by some reason.",
                    isChosen: false,
                  })
                );
              });
          } else {
            dispatch(signOut());
            dispatch(
              showDialog({
                isOpen: true,
                title: "Confirm Your Email Box",
                message:
                  "Please check your email box to continue to create an account.",
                isChosen: false,
              })
            );
          }
        } else {
          dispatch(signOut());
        }

        if (isMounted) {
          dispatch(closeProgressCircle());
          setIsChecking(false);
        }
      });
    };
    getStatus();

    return () => {
      isMounted = false;
    };
  }, [dispatch]);

  const render = () => {
    if (isChecking) {
      return false;
    }

    if (isSignedIn) {
      return children;
    } else {
      return <Redirect to="/signin/" />;
    }
  };

  return <React.Fragment>{render()}</React.Fragment>;
};
export default Auth;
