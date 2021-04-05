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

          <Box mb={5}>
            <Divider variant="middle"/>
          </Box>

          <form className={classes.signin_form} autoComplete="off">
            <TextField required name="mail" label="Mail Address" variant="outlined" />
            <TextField required name="password" label="Password" type="password" autoComplete="off" variant="outlined" />
            <Button variant="contained" color="primary">
              Sign In
            </Button>
          </form>

          <FormControlLabel
            control={<Checkbox color="primary" name="checked" />}
            label="Save login information"
            />
          <span >Forget your password?</span>

          <Box mb={4}>
            <Divider variant="middle" />
          </Box>

          <p>Don't have an account?<span>  Sign Up</span></p>
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
