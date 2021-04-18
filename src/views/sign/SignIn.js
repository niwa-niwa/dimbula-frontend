import React,{ useState } from "react"
import { useDispatch } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'

import { makeStyles } from '@material-ui/core/styles'
import { 
  Box,
  Button,
  Divider,
  TextField,
  Checkbox,
  FormControlLabel,
} from '@material-ui/core'
import { signStyle } from './styles/signStyle'
import SignLayout from "./layouts/SignLayout"

import google_img from '../../img/google-icon-mini.svg'

import firebase from "firebase/app"
import "firebase/auth";

import SignLink from './parts/SignLinks'
import PATHS from '../../const/paths'

import { setMessage } from "../../slices/snackBarSlice"
import { openProgressCircle, closeProgressCircle } from "../../slices/progressCircleSlice";


const useStyles = makeStyles((theme) => ({ ...signStyle }))

const SignIn = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [save, setSave] = useState(false);
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const signInWithGoogle = () => {
    const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(googleAuthProvider);
  };

  const onSubmit = data => {
    dispatch(openProgressCircle());
    firebase.auth().signInWithEmailAndPassword(
      data.email,
      data.password
      // Todo : save login info
    ).catch(e=>{
      dispatch(setMessage(
        {
          isOpen:true,
          severity:"error",
          message:e.message,
        }
      ))
    }).finally(()=>{
      reset({
        email:data.email,
        password:"",
      });
      dispatch(closeProgressCircle());

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

      <Box component="form" onSubmit={handleSubmit(onSubmit)} className={classes.signin_form} autoComplete="off">
        
        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={ 
            ({field}) => <TextField
              {...field}
              name="email"
              required
              fullWidth
              type="text"
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
          render={
            ({field}) => <TextField
              {...field}
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              autoComplete="off"
              variant="outlined"
              margin="normal"
            />
          }
        />

        <Box mt={2}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
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
                    onChange={()=>setSave(!save)}
                    checked={save}
                  />}
          label="Save login information"            
        />
      </Box>

      <Box my={3}>
        <Divider variant="middle" />
      </Box>

      <Box textAlign={"right"} mb={4}>
        <SignLink path={PATHS.SIGN_UP} />
        <br/>
        <SignLink path={PATHS.RESEND_EMAIL} />
        <br/>
        <SignLink path={PATHS.FORGET_PASSWORD} />
      </Box>

    </SignLayout>
  )

}
export default SignIn
