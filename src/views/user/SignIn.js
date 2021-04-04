import React from "react"

import { makeStyles } from '@material-ui/core/styles'
import { 
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
  },
  google_button:{
    '&:before':{
      backgroundImage:`url(${google_img})`,
      content:'',
      display:'inline-block',
      backgroundSize: 'contain',
      verticalAlign: 'middle',
    }
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
      <Container className={classes.signin_container} maxWidth="sm" >
        <h1>Dimbula</h1>
        <h2>ログイン</h2>
        <Button 
          variant="outlined"
          className={classes.google_button}
        >Googleでログイン
        </Button>

        <Divider variant="middle" />

        <form className={classes.signin_form} autoComplete="off">
          <TextField required name="mail" label="Mail Address" variant="outlined" />
          <TextField required name="password" label="Password" type="password" autoComplete="off" variant="outlined" />
          <Button variant="contained" color="secondary">
            ログイン
          </Button>
        </form>

        <FormControlLabel
          control={<Checkbox color="primary" name="checked" />}
          label="ログインしたままにする"
          />
        <span >パスワードをお忘れですか?</span>

        <Divider variant="middle" />

        <p>アカウントをお持ちではないですか?<span>  サインアップ</span></p>

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
