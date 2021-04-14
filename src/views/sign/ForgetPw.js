import React from "react"
import { useDispatch } from 'react-redux'
import { setMessage } from '../../slices/snackBarSlice'
import { useForm, Controller } from 'react-hook-form'

import { makeStyles } from '@material-ui/core/styles'
import { 
  Box,
  Button,
  Divider,
  TextField,
} from '@material-ui/core'
import { signStyle } from './styles/signStyle'
import SignLayout from "./layouts/SignLayout"

import firebase from "firebase/app"
import "firebase/auth";

import SignLink from './parts/SignLinks'
import PATHS from '../../const/paths'

import { showDialog } from '../../slices/alertDialogSlice'

/**
 * Style Object
 */
const useStyles = makeStyles((theme) => ({ ...signStyle }))

/**
 * Main Component
 * @returns JSX
 */
const ForgetPw = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { handleSubmit, control, reset, formState:{errors}} = useForm()

  const onSubmit = (data) => {
    firebase.auth().sendPasswordResetEmail(
      data.email
      ).then(() => {
        dispatch(showDialog(
          {
            isOpen:true,
            title:"Confirm Your Email Box",
            message:"We sent a email to reset your password. Please Check your mail box.",
            isChosen:false
          }
        ))
        reset()
      
    }).catch(e => {
      dispatch(setMessage(
        {
          severity:"error",
          message:e.message,
        }
      ))
    })
  }

  return(
    <SignLayout>
      <Box my={3}>
        <h2 className={classes.sub_title}>Forget Password</h2>
      </Box>

      <Box component="form" onSubmit={handleSubmit(onSubmit)} className={classes.signin_form} autoComplete="off">
        <Controller
          name="email"
          control={control}
          defaultValue=''
          render={
            ({field})=><TextField
              {...field}
              required
              fullWidth
              name="email"
              label="Email Address"
              variant="outlined"
              margin="none"
              error={Boolean(errors.email)}
              helperText={errors.email && errors.email.message
            }/>
          }
          rules={{
            required:true,
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: 'invalid email address'
            }
          }}
        />

        <Box mt={2}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
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
        <br/>
        <SignLink path={PATHS.SIGN_IN} />
        <br/>
        <SignLink path={PATHS.RESEND_EMAIL} />
      </Box>

    </SignLayout>
  )

}
export default ForgetPw
