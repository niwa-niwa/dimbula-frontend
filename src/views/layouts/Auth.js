import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { Redirect } from 'react-router-dom'
import firebase from '../../api/firebase'
import { signIn, signOut } from '../../slices/authSlice'


const Auth = ({ children }) => {
  const dispatch = useDispatch()
  const [ isChecking, setIsChecking ] = useState(true)
  const isSignedIn = useSelector((state) => state.auth.isSignedIn)

  useEffect(() => {
    const getStatus = async () => {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          dispatch(signIn())
          setIsChecking(false)
        }else{
          dispatch(signOut())
          setIsChecking(false)
        }
      })
    }
  getStatus()
  }, [dispatch])


  const render = () => {
    if(isChecking){
      return (
        <div>Now Loading...</div>
      )
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

