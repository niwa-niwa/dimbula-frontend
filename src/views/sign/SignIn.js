import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { Redirect } from "react-router-dom";

import firebase from "firebase/app";
import "firebase/auth";

import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Button,
  Divider,
  TextField,
  Checkbox,
  FormControlLabel,
} from "@material-ui/core";
import { signStyle } from "./styles/signStyle";
import SignLayout from "./layouts/SignLayout";
import google_img from "../../img/google-icon-mini.svg";

import { setSnackBar } from "../../slices/snackBarSlice";
import {
  openProgressCircle,
  closeProgressCircle,
} from "../../slices/progressCircleSlice";

import SignLink from "./parts/SignLinks";
import PATHS from "../../const/paths";
import NAMES from "../../const/names";

const useStyles = makeStyles((theme) => ({ ...signStyle }));

const SignIn = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [save, setSave] = useState(false);
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  function success(path = PATHS.APP_INBOX) {
    <Redirect to={PATHS.APP_INBOX} />;
    // <Redirect to={localStorage.getItem(NAMES.STORAGE_REDIRECT || PATHS.APP_INBOX)} />;
    localStorage.removeItem(NAMES.STORAGE_REDIRECT);
  }

  function fail(error) {
    dispatch(
      setSnackBar({
        isOpen: true,
        severity: "error",
        message: error.message,
      })
    );
    dispatch(closeProgressCircle());
  }

  const signInWithGoogle = () => {
    dispatch(openProgressCircle());
    const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(googleAuthProvider)
      .then(() => {
        success();
      })
      .catch((e) => {
        fail(e);
      });
  };

  const onSubmit = (data) => {
    dispatch(openProgressCircle());
    firebase
      .auth()
      .signInWithEmailAndPassword(data.email, data.password)
      .then(() => {
        success();
      })
      .catch((e) => {
        fail(e);
      })
      .finally(() => {
        if (save) {
          localStorage.setItem(NAMES.STORAGE_PASSWORD, data.password);
          localStorage.setItem(NAMES.STORAGE_EMAIL, data.email);
        } else {
          localStorage.removeItem(NAMES.STORAGE_PASSWORD);
          localStorage.removeItem(NAMES.STORAGE_EMAIL, data.email);
        }
        reset({
          email: data.email,
          password: "",
        });
      });
  };

  return (
    <SignLayout>
      <Box my={3}>
        <h2 className={classes.sub_title} data-testid="page_title">
          Sign In
        </h2>
      </Box>

      <Box mb={4}>
        <Button
          fullWidth
          variant="outlined"
          data-testid="google_submit"
          onClick={() => {
            signInWithGoogle();
          }}
          className={classes.google_button}
        >
          <img
            className={classes.google_logo}
            src={google_img}
            alt="Sign in with google"
          />
          Sign In With Google
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
        autoComplete="off"
      >
        <Controller
          name="email"
          control={control}
          defaultValue={localStorage.getItem(NAMES.STORAGE_EMAIL) || ""}
          render={({ field }) => (
            <TextField
              {...field}
              name="email"
              required
              fullWidth
              type="text"
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
          defaultValue={localStorage.getItem(NAMES.STORAGE_PASSWORD) || ""}
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
              data-testid="password"
            />
          )}
        />

        <Box mt={2}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            data-testid="submit"
          >
            Sign In
          </Button>
        </Box>
      </Box>

      <Box>
        <FormControlLabel
          control={
            <Checkbox
              color="primary"
              name="save"
              onChange={() => setSave(!save)}
              checked={save}
              inputProps={{
                "data-testid": "save_checkbox",
              }}
            />
          }
          label="Save login information"
        />
      </Box>

      <Box my={3}>
        <Divider variant="middle" />
      </Box>

      <Box textAlign={"right"} mb={4}>
        <SignLink path={PATHS.SIGN_UP} />
        <br />
        <SignLink path={PATHS.RESEND_EMAIL} />
        <br />
        <SignLink path={PATHS.FORGET_PASSWORD} />
      </Box>
    </SignLayout>
  );
};
export default SignIn;
