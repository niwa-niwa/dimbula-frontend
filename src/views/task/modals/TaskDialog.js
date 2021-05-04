import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import moment from "moment";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  KeyboardTimePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import {
  Button,
  TextField,
  Dialog,
  DialogContent,
  DialogTitle,
  Box,
} from "@material-ui/core";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";

const TaskDialog = () => {
  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const [selectedDue, setSelectedDue] = useState({ date: null, time: null });

  const handleClose = () => {
    console.log("close");
  };

  const onSubmit = (data) => {
    console.log("onsubmit", data, selectedDue);
    console.log("moment=", moment(selectedDue.date).format("YYYY-MM-DD"));
    console.log("moment time", moment(selectedDue.time).format("HH:mm"));
  };

  return (
    <React.Fragment>
      <Dialog
        open={true}
        onClose={handleClose}
        aria-labelledby="task-form-dialog"
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

              <Box>
                <KeyboardDatePicker
                  disableToolbar
                  autoOk
                  clearable
                  format="yyyy/MM/dd"
                  margin="normal"
                  label="Due"
                  name="due_date"
                  value={selectedDue.date || null}
                  onChange={(date) => {
                    setSelectedDue({ ...selectedDue, date: date });
                  }}
                  KeyboardButtonProps={{
                    "aria-label": "change due",
                  }}
                />
                <KeyboardTimePicker
                  disableToolbar
                  autoOk
                  clearable
                  ampm={false}
                  margin="normal"
                  label="Due Time"
                  value={selectedDue.time}
                  onChange={(date) => {
                    if (!selectedDue.date) {
                      setSelectedDue({
                        ...selectedDue,
                        date: date,
                        time: date,
                      });
                      return;
                    }
                    setSelectedDue({ ...selectedDue, time: date });
                  }}
                  KeyboardButtonProps={{
                    "aria-label": "change time",
                  }}
                  keyboardIcon={<QueryBuilderIcon />}
                />
              </Box>

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
};
export default TaskDialog;
