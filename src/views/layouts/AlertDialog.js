import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
}from '@material-ui/core/';

import { deleteDialog } from '../../slices/alertDialogSlice'

/**
 * Main Component
 * @returns JSX
 */
export default function AlertDialog() {
  const { isOpen, title, message, isChosen  } = useSelector((state)=>state.alertDialog)
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(deleteDialog())
  };

  const setButtons = () => {
    if(isChosen){
      return(
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            OK
          </Button>
        </DialogActions>
      )
    }else{
      return(
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            OK
          </Button>
      </DialogActions>
      )
    }
  }

  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {title}
        </DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {message}
          </DialogContentText>
        </DialogContent>

        {setButtons()}

      </Dialog>
    </div>
  )
}
