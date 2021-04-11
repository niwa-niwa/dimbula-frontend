import React from "react"
import { Link } from "react-router-dom"
import {  Link as UiLink } from '@material-ui/core'

import PATHS from "../../../const/paths"

export const SignUpLink = (args) => {
  return (
    <UiLink {...args} >
      <Link to={PATHS.SIGN_UP}>Sign Up</Link>
    </UiLink>
  )
}

export const SignInLink = (args) => {
  return (
    <UiLink {...args} >
      <Link to={PATHS.SIGN_IN}>Sign In</Link>
    </UiLink>
  )
}

export const ForgetPwLink = (args) => {
  return(
    <UiLink {...args} >
      <Link to={PATHS.FORGET_PASSWORD}>Forget your password?</Link>
    </UiLink>
  )
}

export const ResendMailLink = (args) => {
  return(
    <UiLink {...args} >
      <Link to={PATHS.RESEND_EMAIL}>Re-send confirm email?</Link>
    </UiLink>
  )
}