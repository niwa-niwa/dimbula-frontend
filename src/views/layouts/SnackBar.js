import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Snackbar } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'

import { deleteMessage } from "../../slices/snackBarSlice"


export default function SnackBar(){
  const {isOpen, severity, message, props} = useSelector((state) => state.snackBar)
  const dispatch = useDispatch()

  const handleClose = (event, reason) => {
    if(reason === 'clickaway'){
      return
    }
    dispatch(deleteMessage())
  }

  // Todo : confirm working ...props of argument
  return(
    <div>
      <Snackbar open={isOpen} autoHideDuration={5000} onClose={handleClose}>
        <Alert elevation={6} variant="filled" onClose={handleClose} severity={severity} {...props}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  )
}
