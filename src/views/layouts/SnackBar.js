import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Snackbar } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'

import { deleteMessage } from "../../slices/snackBarSlice"

export default function SnackBar(){
  const { isOpen, severity, message } = useSelector((state) => state.snackBar)
  const dispatch = useDispatch()

  const handleClose = (event, reason) => {
    if(reason === 'clickaway'){
      return
    }
    dispatch(deleteMessage())
  }

  return(
    <div>
      <Snackbar open={isOpen} autoHideDuration={6000} onClose={handleClose}>
        <Alert elevation={6} variant="filled" onClose={handleClose} severity={severity} >
          {message}
        </Alert>
      </Snackbar>
    </div>
  )
}
