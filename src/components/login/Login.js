import React from "react"
import firebase from "firebase/app"
import firebase_config from "../../api/firebase"
import "firebase/auth";
import {
  FirebaseAuthProvider,
  FirebaseAuthConsumer,
  IfFirebaseAuthed,
  IfFirebaseAuthedAnd
} from "@react-firebase/auth";


const Login = () => {
  return (
    <FirebaseAuthProvider {...firebase_config} firebase={firebase}>
      
      <div>
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

        {/* anonymously */}
        <button
          data-testid="signin-anon"
          onClick={() => {
            firebase.auth().signInAnonymously()
          }}
        >
          Sign In Anonymously
        </button>

        <br />
        <br />

        {/* E-Mail Sign up */}
        <button
          onClick={async () =>  {
            const res = await firebase.auth().createUserWithEmailAndPassword(process.env.REACT_APP_LOGIN_EMAIL, process.env.REACT_APP_LOGIN_PASSWORD)
            res.user.sendEmailVerification()
            console.log(res)
          }}
        >
          Sign Up with Mail
        </button>

        {/* E-Mail Sign in */}
        <button
          onClick={() => {firebase.auth().signInWithEmailAndPassword(process.env.REACT_APP_LOGIN_EMAIL, process.env.REACT_APP_LOGIN_PASSWORD)}}
          >
          Log In with Mail
        </button>

        <br />
        <br />

        {/* Sign out */}
        <button
          onClick={() => {
            firebase.auth().signOut()
          }}
        >
          Sign Out
        </button>

        <FirebaseAuthConsumer>
          {({ isSignedIn, user, providerId }) => {
            return (
              <pre style={{ height: 300, overflow: "auto" }}>
                {JSON.stringify({ isSignedIn, user, providerId }, null, 2)}
              </pre>
            )
          }}
        </FirebaseAuthConsumer>

        <div>

          <IfFirebaseAuthed>
            {
            
              () => {
                // To confirm verified Email
                const user = firebase.auth().currentUser
                if(user.emailVerified){
                  return <div>You are authenticated</div>
                }else{
                  return (
                    <div>
                      <div style={{ color: "#ff0000" }}>
                        You have to verify email
                      </div>
                      <button onClick={() => {
                        user.sendEmailVerification()
                      }}>
                        Please Send Email Again
                      </button>
                    </div>
                  )
                }
              }
            
            }
          </IfFirebaseAuthed>

          <IfFirebaseAuthedAnd
            filter={({ providerId }) => providerId !== "anonymous"}
          >
            {({ providerId }) => {
              return <div>You are authenticated with {providerId}</div>
            }}
          </IfFirebaseAuthedAnd>

        </div>
        
      </div>
    </FirebaseAuthProvider>

  )
}
export default Login
