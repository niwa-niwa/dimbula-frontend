import React from "react";
import { useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { Redirect } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";

import { makeStyles } from "@material-ui/core/styles";
import { Box, Button, Divider, TextField } from "@material-ui/core";

import { setSnackBar } from "../../slices/snackBarSlice";
import { showDialog } from "../../slices/alertDialogSlice";
import {
  openProgressCircle,
  closeProgressCircle,
} from "../../slices/progressCircleSlice";

import { signStyle } from "./styles/signStyle";
import SignLayout from "./layouts/SignLayout";

import SignLink from "./parts/SignLinks";
import PATHS from "../../const/paths";

/**
 * style object
 */
const useStyles = makeStyles((theme) => ({ ...signStyle }));

/**
 * Main component
 * @returns JSX
 */
const ResendEmail = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(openProgressCircle());
    firebase
      .auth()
      .signInWithEmailAndPassword(data.email, data.password)
      .then(({ user }) => {
        if (!user.emailVerified) {
          user.sendEmailVerification({
            url: process.env.REACT_APP_FRONTEND_URL,
            handleCodeInApp: false,
          });
          dispatch(closeProgressCircle());
          dispatch(
            showDialog({
              isOpen: true,
              title: "Confirm Your Email Box",
              message:
                "Please check your email box to continue to create an account.",
              isChosen: false,
            })
          );
        } else {
          <Redirect to={PATHS.APP_INBOX} />;
        }
      })
      .catch((e) => {
        dispatch(closeProgressCircle());
        dispatch(
          setSnackBar({
            severity: "error",
            message: e.message,
          })
        );
      })
      .finally(() => {
        reset({ email: "", password: "" });
      });
  };

  return (
    <SignLayout>
      <Box my={3}>
        <h2 className={classes.sub_title} data-testid="page_title">
          Re-Send Email
        </h2>
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
            Re-send
          </Button>
        </Box>
      </Box>

      <Box my={3}>
        <Divider variant="middle" />
      </Box>

      <Box textAlign={"right"} mb={4}>
        <SignLink path={PATHS.SIGN_UP} />
        <br />
        <SignLink path={PATHS.SIGN_IN} />
        <br />
        <SignLink path={PATHS.FORGET_PASSWORD} />
      </Box>
    </SignLayout>
  );
};
export default ResendEmail;
