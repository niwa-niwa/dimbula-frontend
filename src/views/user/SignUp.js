import React,{useState, useEffect} from "react"
import { useHistory } from "react-router-dom"

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


// Todo redirect email-confirm-page
const SignUp = () => {
  const classes = useStyles()
  const history = useHistory()
  const [info, setInfo] = useState(
    {
      email:"",
      password:"",
    }
  )
  

  // useEffect(() => {
  //   firebase.auth().onAuthStateChanged(user => {
  //     if (user) {
  //       history.push("/");
  //     }
  //   })
  // },[history])

  const signUpWithGoogle = () => {
    const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
    firebase.auth().signInWithPopup(googleAuthProvider)
  }

  const handleInputChange = (event) => {
    setInfo({...info, [event.target.name]:event.target.value})
  }

  const submit = async () => {
    const res = await firebase.auth().createUserWithEmailAndPassword(
      info.email,
      info.password
    )
    res.user.sendEmailVerification()
  }

  return(
    <React.Fragment>
      <Box my={4}>
        <h1 className={classes.title} >Dimbula</h1>
      </Box>

      <Container className={classes.signin_container} maxWidth="sm" >

        <Box my={3}>
          <h2 className={classes.sub_title}>Sign Up</h2>
        </Box>

        <Box mb={4}>
          <Button 
            fullWidth
            variant="outlined"
            onClick={()=>{signUpWithGoogle()}}
            className={classes.google_button}
            >
            <img 
              className={classes.google_logo}
              src={google_img}
              alt="Sign in with google"
            />
            Sign Up With Google
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
                Sign Up
              </Button>
            </Box>
        </Box>

        <Box my={3}>
          <Divider variant="middle" />
        </Box>
        
        <Box textAlign={"right"} mb={4}>
          <p>If you have an account?<span>  Sign In</span></p>
          <br/>
          <p>Forget your password?</p>
        </Box>

      </Container>
    </React.Fragment>
  )
}
export default SignUp


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
    fontWeight:"bold",
  },
  sub_title:{
    fontSize:'24px',
  },
  google_button:{
    fontSize:"14px",
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
  border:{
    borderBottom:" 1px solid #c0c0c0",
    width: "100%",
    margin:"0 12px",
  },

}))
