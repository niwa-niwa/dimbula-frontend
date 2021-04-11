import React,{ useState } from "react"

import { makeStyles } from '@material-ui/core/styles'
import { 
  Box,
  Button,
  Divider,
  TextField,
} from '@material-ui/core'
import { signStyle } from './signStyle'
import SignLayout from "./SignLayout"

import firebase from "firebase/app"
import "firebase/auth";

import { SignUpLink, SignInLink, ResendMailLink } from '../layouts/link-texts/SignLinks'


const ForgetPw = () => {
  const classes = useStyles()
  const [pw, setPw] = useState('')

  const handleInputChange = (event) => {
    setPw( event.target.value )
  }

  const submit = () => {
    firebase.auth().sendPasswordResetEmail(pw).then(response => {
      console.log(response)
      // Todo display pop-up that say confirm email
      
    }).catch(e => {
      console.log(e)
      // Todo display pop-up that say error
    })
  }

  return(
    <SignLayout>
      <Box my={3}>
        <h2 className={classes.sub_title}>Forget Password</h2>
      </Box>

      <Box className={classes.signin_form} autoComplete="off">
          <TextField
            required
            fullWidth
            name="email"
            label="Mail Address"
            variant="outlined"
            margin="none"
            defaultValue={pw}
            onChange={handleInputChange}
            />
          <Box mt={2}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={submit}
              >
              Reset Password
            </Button>
          </Box>
      </Box>

      <Box my={3}>
        <Divider variant="middle" />
      </Box>
      
      <Box textAlign={"right"} mb={4}>
        <SignUpLink component="p" underline="always" />
        <br/>
        <SignInLink component="p" underline="always" />
        <br/>
        <ResendMailLink component="p" underline="always" />
      </Box>

    </SignLayout>
  )

}
export default ForgetPw


const useStyles = makeStyles((theme) => ({ ...signStyle }))
