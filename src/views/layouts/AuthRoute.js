import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import PATHS from "../../const/paths";

const GuestRoute = (props) => {
  const isSignedIn = useSelector((state) => state.user.isSignedIn);

  return isSignedIn ? <Route {...props} /> : <Redirect to={PATHS.SIGN_IN} />;
};
export default GuestRoute;
