import React from "react";
import { Link } from "react-router-dom";
import { Link as UiLink } from "@material-ui/core";

import PATHS from "../../../const/paths";

const SignLinks = (path = null) => {
  const getLink = (_path) => {
    switch (_path) {
      case PATHS.SIGN_UP:
        return <Link to={PATHS.SIGN_UP}>Sign Up</Link>;

      case PATHS.SIGN_IN:
        return <Link to={PATHS.SIGN_IN}>Sign In</Link>;

      case PATHS.FORGET_PASSWORD:
        return <Link to={PATHS.FORGET_PASSWORD}>Forget your password?</Link>;

      case PATHS.RESEND_EMAIL:
        return <Link to={PATHS.RESEND_EMAIL}>Re-send confirm email?</Link>;

      default:
        return false;
    }
  };

  return (
    <UiLink component="p" underline="always">
      {getLink(path.path)}
    </UiLink>
  );
};
export default SignLinks;
