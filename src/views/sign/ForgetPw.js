import React,{ useState } from "react"
import { Link } from "react-router-dom"

import { makeStyles } from '@material-ui/core/styles'
import { 
  Box,
  Container,
  Button,
  Divider,
  TextField,
} from '@material-ui/core'
import { signStyle } from './userStyle'

import firebase from "firebase/app"
import "firebase/auth";


const ForgetPw = () => {
  const classes = useStyles()
  const [pw, setPw] = useState('')

  const handleInputChange = (event) => {
    setPw( event.target.value )
  }

  const submit = async () => {
    // Todo implement try/catch
    // Todo display pop-up that say confirm email
    await firebase.auth().sendPasswordResetEmail(pw)
  }


  return(
    <React.Fragment>
      <Box my={4}>
        <h1 className={classes.title} >Dimbula</h1>
      </Box>

      <Container className={classes.signin_container} maxWidth="sm" >

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
          <p><Link to="/signup/">Sign Up</Link></p>
          <br/>
          <p><Link to="/signin/">Sign In</Link></p>
          <br/>
          <p>Re-send confirm email?
            <span>
              <Link to="/resend-email/">  Here</Link>
            </span>
          </p> 
        </Box>

      </Container>
    </React.Fragment>
  )

}
export default ForgetPw


const useStyles = makeStyles((theme) => ({ ...signStyle }))
