import React from "react";
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from "react-redux";

const GuestRoute = (props) => {
  const isSignedIn = useSelector((state) => state.user.isSignedIn);

  return isSignedIn ? <Redirect to="/" /> : <Route {...props} />;
}
export default GuestRoute;
