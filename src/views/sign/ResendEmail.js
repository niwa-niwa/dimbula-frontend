import React from "react"
import { useForm, Controller } from 'react-hook-form'
import { useHistory } from "react-router-dom"

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


const useStyles = makeStyles((theme) => ({ ...signStyle }))

const ResendEmail = () => {
  const classes = useStyles()
  const { handleSubmit, control, formState:{errors}} = useForm()
  const history = useHistory()

  const onSubmit = data => {
    console.log(data)
    firebase.auth().signInWithEmailAndPassword(
      data.email,
      data.password
    ).then( ({user}) => {
      if(!user.emailVerified){
        user.sendEmailVerification({
          url: 'http://localhost:3000/',
          handleCodeInApp: false,
        })
        //Todo display pop-up that notice confirm your email
      }else{
        history.push("/")
      }
    }).catch( e => {
      console.log(e)
      //Todo display pop-up that notice error message
    })
  }

  return(
    <SignLayout>
      <Box my={3}>
        <h2 className={classes.sub_title}>Re-Send Email</h2>
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
            required: true,
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: 'invalid email address'
            }
          }}
        />

        <Controller
          name="password"
          control={control}
          defaultValue=""
          render={({field}) => <TextField
            {...field}
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            autoComplete="off"
            variant="outlined"
            margin="normal"
          />}
        />

        <Box mt={2}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
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
        <br/>
        <SignLink path={PATHS.SIGN_IN} />
        <br/>
        <SignLink path={PATHS.FORGET_PASSWORD} />
      </Box>

    </SignLayout>
  )

}
export default ResendEmail
