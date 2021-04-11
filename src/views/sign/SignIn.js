import React,{ useState } from "react"

import { makeStyles } from '@material-ui/core/styles'
import { 
  Box,
  Button,
  Divider,
  TextField,
  Checkbox,
  FormControlLabel,
} from '@material-ui/core'
import { signStyle } from './signStyle'
import SignLayout from "./SignLayout"

import google_img from '../../img/google-icon-mini.svg'

import firebase from "firebase/app"
import "firebase/auth";

import { ForgetPwLink, SignUpLink, ResendMailLink } from '../layouts/link-texts/SignLinks'


const SignIn = () => {
  const classes = useStyles()
  const [info, setInfo] = useState(
    {
      "email":"",
      "password":"",
      "save":false,
    }
  )

  const signInWithGoogle = () => {
    const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
    firebase.auth().signInWithPopup(googleAuthProvider)
  }

  const handleInputChange = (event)=>{
    if("save" === event.target.name){
      setInfo({...info, [event.target.name]:!info.save})
      return
    }
    setInfo({...info, [event.target.name]:event.target.value})
  }

  const submit = ()=>{
    firebase.auth().signInWithEmailAndPassword(
      info.email,
      info.password
    ).catch(e=>{
      console.warn(e)
      // Todo : display pop-up that notice error
    })
  }

  return(
    <SignLayout>
      <Box my={3}>
        <h2 className={classes.sub_title}>Sign In</h2>
      </Box>

      <Box mb={4}>
        <Button 
          fullWidth
          variant="outlined"
          onClick={()=>{signInWithGoogle()}}
          className={classes.google_button}
          >
          <img 
            className={classes.google_logo}
            src={google_img}
            alt="Sign in with google"
          />
          Sign In With Google
        </Button>
      </Box>

      <Box mb={4} display="flex" alignItems="center">
        <div className={classes.border}></div>
        <span>OR</span>
        <div className={classes.border}></div>
      </Box>

      <Box className={classes.signin_form} autoComplete="off">
          <TextField
            required
            fullWidth
            name="email"
            label="Mail Address"
            variant="outlined"
            margin="none"
            defaultValue={info.email}
            onChange={handleInputChange}
            />
          <TextField
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            autoComplete="off"
            variant="outlined"
            margin="normal"
            value={info.password}
            onChange={handleInputChange}
          />
          <Box mt={2}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={submit}
              >
              Sign In
            </Button>
          </Box>
      </Box>

      <Box>
        <FormControlLabel
          control={<Checkbox
                    color="primary"
                    name="save" 
                    onChange={handleInputChange}
                    checked={info.save}
                  />}
          label="Save login information"            
        />
      </Box>

      <Box my={3}>
        <Divider variant="middle" />
      </Box>
      
      <Box textAlign={"right"} mb={4}>
        <SignUpLink component="p" underline="always" />
        <br/>
        <ResendMailLink component="p" underline="always" />
        <br/>
        <ForgetPwLink component="p" underline="always" />
      </Box>

    </SignLayout>
  )

}
export default SignIn


const useStyles = makeStyles((theme) => ({ ...signStyle }))
