import React from "react";
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from "react-redux";
import PATHS from '../../const/paths';

const GuestRoute = (props) => {
  const isSignedIn = useSelector((state) => state.user.isSignedIn);

  return isSignedIn ? <Redirect to={PATHS.APP_INBOX} /> : <Route {...props} />;
}
export default GuestRoute;
