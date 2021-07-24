import React from "react";
import { useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { Redirect } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import { Box, Button, Divider, TextField } from "@material-ui/core";

import firebase from "firebase/app";
import "firebase/auth";

import { setSnackBar } from "../../slices/snackBarSlice";
import { showDialog } from "../../slices/alertDialogSlice";
import {
  openProgressCircle,
  closeProgressCircle,
} from "../../slices/progressCircleSlice";

import google_img from "../../img/google-icon-mini.svg";
import SignLayout from "./layouts/SignLayout";
import { signStyle } from "./styles/signStyle";

import SignLink from "./parts/SignLinks";
import PATHS from "../../const/paths";

// style object
const styles: any = { ...signStyle };
const useStyles = makeStyles(() => styles);
// Example it could change style that is scope in this component.
// put syntax google_logo:{...signStyle.google_logo, width:"32px"} in argument

// main component
const SignUp = () => {
  const classes:any = useStyles();
  const dispatch = useDispatch();
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const signUpWithGoogle = () => {
    dispatch(openProgressCircle());
    const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(googleAuthProvider)
      .then(() => {
        <Redirect to={PATHS.APP_INBOX} />;
      })
      .catch((e) => {
        dispatch(
          setSnackBar({
            isOpen: true,
            severity: "error",
            message: e.message,
          })
        );
        dispatch(closeProgressCircle());
      });
  };

  const onSubmit = (data:any) => {
    dispatch(openProgressCircle());
    firebase
      .auth()
      .createUserWithEmailAndPassword(data.email, data.password)
      .then(({ user }:{user: firebase.User | null}) => {
        user?.sendEmailVerification();
        dispatch(
          showDialog({
            isOpen: true,
            title: "Confirm Your Email Box",
            message:
              "Please check your email box to continue to create an account.",
            isChosen: false,
          })
        );
      })
      .catch((e) => {
        dispatch(
          setSnackBar({
            severity: "error",
            message: e.message,
          })
        );
      })
      .finally(() => {
        dispatch(closeProgressCircle());
        reset({
          email: data.email,
          password: "",
        });
      });
  };

  return (
    <SignLayout>
      <React.Fragment>
        <Box my={3}>
          <h2 className={classes.sub_title} data-testid="page_title">
            Sign Up
          </h2>
        </Box>

        <Box mb={4}>
          <Button
            fullWidth
            variant="outlined"
            onClick={() => {
              signUpWithGoogle();
            }}
            className={classes.google_button}
            data-testid="google_submit"
          >
            <img
              className={classes.google_logo}
              src={google_img}
              alt="Sign in with google"
            />
            Sign Up With Google
          </Button>
        </Box>

        <Box mb={4} display="flex" alignItems="center">
          <div className={classes.border}></div>
          <span>OR</span>
          <div className={classes.border}></div>
        </Box>

        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          className={classes.signin_form}
        >
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                required
                fullWidth
                name="email"
                label="Email Address"
                variant="outlined"
                margin="none"
                error={Boolean(errors.email)}
                helperText={errors.email && errors.email.message}
                data-testid="email"
              />
            )}
            rules={{
              required: true,
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "invalid email address",
              },
            }}
          />
          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                autoComplete="off"
                variant="outlined"
                margin="normal"
                error={Boolean(errors.password)}
                helperText={errors.password && errors.password.message}
                data-testid="password"
              />
            )}
            rules={{
              required: true,
              minLength: {
                value: 8,
                message: "min length is 8 and max is 32",
              },
              maxLength: {
                value: 32,
                message: "min length is 8 and max is 32",
              },
            }}
          />
          <Box mt={2}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              data-testid="submit"
            >
              Sign Up
            </Button>
          </Box>
        </Box>

        <Box my={3}>
          <Divider variant="middle" />
        </Box>

        <Box textAlign={"right"} mb={4}>
          <SignLink path={PATHS.SIGN_IN} />
          <br />
          <SignLink path={PATHS.RESEND_EMAIL} />
          <br />
          <SignLink path={PATHS.FORGET_PASSWORD} />
        </Box>
      </React.Fragment>
    </SignLayout>
  );
};
export default SignUp;
