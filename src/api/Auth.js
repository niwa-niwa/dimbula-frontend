import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import firebase from './firebase'

const Auth = () => {
  const {isResult, setIsResult} = useState(false)
  const {isAuth, setIsAuth} = useState(false)
  
  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setIsAuth(true)
        setIsResult(true)
      }else{
        setIsAuth(false)
        setIsResult(true)
      }
    })
  }),[]

  return(
    <React.Fragment>
      if(isResult){
        <h1></h1>
      }
    </React.Fragment>
  )
}


