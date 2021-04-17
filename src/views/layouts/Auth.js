import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { Redirect } from 'react-router-dom'
import firebase from '../../api/firebase'
import { signIn, signOut } from '../../slices/authSlice'
import { setIsOpen, setIsClose } from "../../slices/progressCircleSlice";


const Auth = ({ children }) => {
  const dispatch = useDispatch()
  const [ isChecking, setIsChecking ] = useState(true)
  const isSignedIn = useSelector((state) => state.auth.isSignedIn)

  useEffect(() => {
    dispatch(setIsOpen())
    // the flag is prevented to leak memory
    let isMounted = true
    const getStatus =  () => {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          dispatch(signIn())
        }else{
          dispatch(signOut())
        }
        if(isMounted){
          dispatch(setIsClose());
          setIsChecking(false)
        }
      })
    }
    getStatus();

    return () => { isMounted=false };

  }, [dispatch])


  const render = () => {
    if(isChecking){
      return false
    }

    if(isSignedIn){
      return children
    }else{
      return <Redirect to="/signin/" />
    }
  }


  return(
    <React.Fragment>
      {render()}
    </React.Fragment>
  )

}
export default Auth

