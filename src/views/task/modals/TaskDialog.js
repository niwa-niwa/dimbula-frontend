import React,{ useState } from 'react';
import { useForm, Controller } from "react-hook-form";
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import {
  Button,
  TextField,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import {
  KeyboardDatePicker
} from "@material-ui/pickers";


const TaskDialog = () => {
  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const [due, setDue] = useState(null);

  const handleClose = () => {
    console.log("close")
  }

  const onSubmit = (data) => {
    console.log("onsubmit",data,due)
  }

  return (
    <React.Fragment>
      <Dialog
        open={true}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle>
          {" Create a new task."}
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogTitle>

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogContent>

              <Controller
                name="name"
                control={control}
                defaultValue={""}
                render={({ field }) => (
                  <TextField
                    {...field}
                    required
                    autoFocus
                    fullWidth
                    margin="normal"
                    label="Title"
                    type="text"
                    helperText={errors.name && errors.name.message}
                  />
                )}
                rules={{
                  required: true,
                  pattern: {
                    value: /.*\S+.*/,
                    message: "You have to enter the characters",
                  },
                }}
              />

              <KeyboardDatePicker
                disableToolbar
                autoOk
                variant="inline"
                format="yyyy/MM/dd"
                margin="normal"
                label="Due"
                value={due}
                onChange={(date) => {
                  setDue(date)
                }}
                KeyboardButtonProps={{
                  'aria-label': 'change due',
                }}
              />

              <Controller
                name="memo"
                control={control}
                defaultValue={""}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    multiline
                    rows={6}
                    margin="normal"
                    label="Memo"
                    type="text"
                    variant="outlined"
                  />
                )}
              />

              <Button fullWidth type="submit" color="primary">
                Register
              </Button>
            </DialogContent>

          </form>
          </MuiPickersUtilsProvider>
      </Dialog>
    </React.Fragment>
  );
}
export default TaskDialog;