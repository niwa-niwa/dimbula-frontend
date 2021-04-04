import React from "react"
import firebase from "firebase/app"
import "firebase/auth";


// Todo add layout
// Todo redirect Task-page after signIn
const SignIn = () => {
  return(
    <React.Fragment>
      <h1>ようこそDimbula</h1>
      
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
