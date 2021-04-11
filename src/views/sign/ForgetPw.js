import React,{ useState } from "react"

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


const useStyles = makeStyles((theme) => ({ ...signStyle }))
