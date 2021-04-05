import React from "react"

import { makeStyles } from '@material-ui/core/styles'
import { 
  Box,
  Container,
  Button,
  Divider,
  TextField,
  Checkbox,
  FormControlLabel,
} from '@material-ui/core'
import google_img from '../../img/google-icon-mini.svg'

import firebase from "firebase/app"
import "firebase/auth";


const useStyles = makeStyles((theme) => ({
  signin_container:{
    display:'flex',
    flexFlow:'column',
    border:'solid 2px #f0f0f0',
    borderRadius:'16px',
  },
  title:{
    fontSize:'32px',
    textAlign:"center",
    padding:"32px 0",
    fontWeight:"bold",
  },
  sub_title:{
    fontSize:'24px',
    padding:"24px 0"
  },
  google_button:{
    fontSize:"14px",
    padding:"12px",
    margin:"0 0 24px 0",
    '&:before':{
      backgroundImage:`url(${google_img})`,
      content:'',
      display:'inline-block',
      backgroundSize: 'contain',
      verticalAlign: 'middle',
    },
  },
  google_logo:{
    position:"absolute",
    left:"16px"
  },
  signin_form:{
    display:"flex",
    flexFlow:"column",
  }

}))

// Todo add layout
// Todo redirect Task-page after signIn
const SignIn = () => {
  const classes = useStyles()

  return(
    <React.Fragment>
        <h1 className={classes.title} >Dimbula</h1>
      <Container className={classes.signin_container} maxWidth="sm" >
          <h2 className={classes.sub_title}>Sign In</h2>
          <Button 
            variant="outlined"
            className={classes.google_button}
          >
            <img className={classes.google_logo} src={google_img} alt="Sign in with google" />
            Sign In With Google
          </Button>

          <Box mb={3}>
            <Divider variant="middle"/>
          </Box>

          <form className={classes.signin_form} autoComplete="off">
            <TextField required name="mail" label="Mail Address" variant="outlined" margin="normal" />
            <TextField required name="password" label="Password" type="password" autoComplete="off" variant="outlined" margin="normal" />
            <Box mt={3}>
              <Button variant="contained" color="primary" fullWidth="true">
                Sign In
              </Button>
            </Box>
          </form>

          <FormControlLabel
            control={<Checkbox color="primary" name="checked" />}
            label="Save login information"
            />

          <Box mt={4} mb={4}>
            <Divider variant="middle" />
          </Box>
          
          <Box textAlign={"right"} mb={4}>
            <span >Forget your password?</span>
            <br/>
            <br/>
            <p>Don't have an account?<span>  Sign Up</span></p>
          </Box>


      </Container>
      

      {/* Google Sign in */}
      <button
        onClick={() => {
          const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
          firebase.auth().signInWithPopup(googleAuthProvider)
        }}
      >
        Sign In with Google
      </button>


      <br />
      <br />

      {/* E-Mail Sign in */}
      <button
        onClick={() => {firebase.auth().signInWithEmailAndPassword(process.env.REACT_APP_LOGIN_EMAIL, process.env.REACT_APP_LOGIN_PASSWORD)}}
        >
        Log In with Mail
      </button>

      <br />
      <br />

    </React.Fragment>
  )

}
export default SignIn
