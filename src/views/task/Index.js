import React from "react"
import firebase from "firebase/app"
import firebase_config from "../../apis/firebase";
import "firebase/auth";
import {
  FirebaseAuthProvider,
  FirebaseAuthConsumer,
  IfFirebaseAuthed,
  IfFirebaseAuthedAnd
} from "@react-firebase/auth";
import axios from "../../apis/backend";


const Index = () => {
  const test_fire = async ()=>{
    console.log("Fire trigger");
    const {data} = await axios.get("/api/v1/persons/",{
      headers:{
        Authorization: `Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjJjOGUyYjI5NmM2ZjMyODRlYzMwYjg4NjVkNzI5M2U2MjdmYTJiOGYiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoi5bqt5bGx5LiI5bm4IiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS8tZ0Yza0ZmWWQxajgvQUFBQUFBQUFBQUkvQUFBQUFBQUFBQUEvQU1adXVjbmhSSWhKVWk5eExPcWlvUTNVX0VMekRPYW13QS9zOTYtYy9waG90by5qcGciLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vZGltYnVsYS1kZXYiLCJhdWQiOiJkaW1idWxhLWRldiIsImF1dGhfdGltZSI6MTYxODcyOTk1OSwidXNlcl9pZCI6Ik5Kc1B3dWc4MFFPV1o0MTVPT2huN0JmOWFyaTEiLCJzdWIiOiJOSnNQd3VnODBRT1daNDE1T09objdCZjlhcmkxIiwiaWF0IjoxNjE4NzI5OTU5LCJleHAiOjE2MTg3MzM1NTksImVtYWlsIjoibml3YXlhbWEudGFrZXl1a2lAYi1hcmNoaXRlY3RzLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7Imdvb2dsZS5jb20iOlsiMTAzODI0MDQyNzkwNDExNTM4NjAwIl0sImVtYWlsIjpbIm5pd2F5YW1hLnRha2V5dWtpQGItYXJjaGl0ZWN0cy5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJnb29nbGUuY29tIn19.CUm2FLH5zc-6JIcJyUxu4Z61cc-zkGUfere2XjcD5XHZFwX-qyykoDyWcLDjic79yFnakUrlCewlLM2JYuyAgPKpVteyN6NszqORW2TdDAnkycHIQDNIAwFLM-m2s2sSd81-U8st1OjUmhj7cxDyJIhS8e2AnjfffYl2o-_-pq10jnAsWzn1YFV8TSeEReZdyIlLNA0PNPNKDI2OxHEU7vdL9L7gQbpWlmYIAcr77pUQxSBAMKrAVclj7_kfpHRLMF_UF1CYS90sMLCbPNwhy-tpprOQsJQRW07aqpKx5dtu4XDczBLxkBJaox-us6ET7Z3AnBWSa2c5-5eW1B5W1w`
      }
    });
    console.log(data);
  };

  return (
    <React.Fragment>
      <button onClick={()=>test_fire()}>Connect Backend</button><br/><br/>
      <h1>Task Index</h1>

      <FirebaseAuthProvider {...firebase_config} firebase={firebase}>
        <div>

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

    </React.Fragment>
  )
}
export default Index
