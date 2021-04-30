import React from "react";

import firebase from "firebase/app";
import firebase_config from "../../apis/firebase";
import "firebase/auth";
import {
  FirebaseAuthProvider,
  FirebaseAuthConsumer,
  IfFirebaseAuthed,
  IfFirebaseAuthedAnd,
} from "@react-firebase/auth";

const Task = () => {

  return (
    <React.Fragment>
      <h1>Task Index</h1>

      <FirebaseAuthProvider {...firebase_config} firebase={firebase}>
        <div>

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

    </React.Fragment>
  );
}
export default Task;
