import React from "react";
import { useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";

import firebase from "firebase/app";
import "firebase/auth";

import { makeStyles } from "@material-ui/core/styles";
import { Box, Button, Divider, TextField } from "@material-ui/core";
import { signStyle } from "./styles/signStyle";
import SignLayout from "./layouts/SignLayout";

import SignLink from "./parts/SignLinks";
import PATHS from "../../const/paths";

import { setSnackBar } from "../../slices/snackBarSlice";
import { showDialog } from "../../slices/alertDialogSlice";
import {
  openProgressCircle,
  closeProgressCircle,
} from "../../slices/progressCircleSlice";

/**
 * Style Object
 */
const styles: any = { ...signStyle };
const useStyles = makeStyles(() => styles);

/**
 * Main Component
 * @returns JSX
 */
const ForgetPw = () => {
  const classes: any = useStyles();
  const dispatch = useDispatch();
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    dispatch(openProgressCircle());
    firebase
      .auth()
      .sendPasswordResetEmail(data.email)
      .then(() => {
        dispatch(closeProgressCircle());
        dispatch(
          showDialog({
            isOpen: true,
            title: "Confirm Your Email Box",
            message:
              "We sent a email to reset your password. Please Check your mail box.",
            isChosen: false,
          })
        );
        reset({ email: "" });
      })
      .catch((e) => {
        dispatch(
          setSnackBar({
            severity: "error",
            message: e.message,
          })
        );
        dispatch(closeProgressCircle());
      })
      .finally(() => {
        reset({ email: "" });
      });
  };

  return (
    <SignLayout>
      <React.Fragment>
        <Box my={3}>
          <h2 className={classes.sub_title} data-testid="page_title">
            Forget Password
          </h2>
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

          <Box mt={2}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              data-testid="submit"
            >
              Reset Password
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
          <SignLink path={PATHS.RESEND_EMAIL} />
        </Box>
      </React.Fragment>
    </SignLayout>
  );
};
export default ForgetPw;
