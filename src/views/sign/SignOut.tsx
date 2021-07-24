import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";

import { signOut } from "../../slices/userSlice";

import PATHS from "../../const/paths";

/**
 * This component is for sign out
 * @returns component
 */
const SignOut = () => {
  const dispatch: any = useDispatch();

  useEffect(() => dispatch(signOut()), [dispatch]);

  return <Redirect to={PATHS.SIGN_IN} />;
};
export default SignOut;
