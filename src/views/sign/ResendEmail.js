import React,{ useState } from "react"
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


const SignIn = () => {
  const classes = useStyles()
  const history = useHistory()
  const [info, setInfo] = useState(
    {
      "email":"",
      "password":"",
      "save":false,
    }
  )

  const handleInputChange = ( event ) => {
    if("save" === event.target.name){
      setInfo({...info, [event.target.name]:!info.save})
      return
    }
    setInfo({...info, [event.target.name]:event.target.value})
  }

  const submit = () => {
    firebase.auth().signInWithEmailAndPassword(
      info.email,
      info.password
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
export default SignIn


const useStyles = makeStyles((theme) => ({ ...signStyle }))
