import React, { useState, useEffect } from "react";
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
  DialogContentText,
  DialogTitle,
  Box,
} from "@material-ui/core";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";

import ACTIONS from "../../../const/actions";


const TaskDialog = ({
  isOpen = false,
  title = "",
  subtitle = "",
  action_type = "",
  editTask = {},
  onClose = null,
  onCallback = null,
}) => {
  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const [selectedDue, setSelectedDue] = useState({ date: null, time: null });

  useEffect(() => {
    if(action_type === ACTIONS.TASKS_EDIT){
      setValue("name", editTask.name);
      setValue("memo", editTask.memo);
      setSelectedDue({
        date: editTask.due_date,
        time: editTask.due_date
      });
    }
    
  }, [setValue, editTask, action_type])

  const handleClose = () => {
    onClose();
  };

  function convertDate(stateDate){
    const date = moment(stateDate.date).format("YYYY-MM-DD")
    const time = moment(stateDate.time).format("HH:mm:ss")
    
    let due = null;
    if(stateDate.data !== null && stateDate.time !== null){
      due = date + "T" + time
    }
    if(!stateDate.date && stateDate.time){
      due = moment(stateDate.time).format()
    }
    if(stateDate.date && !stateDate.time){
      due = date + "T00:00:00"
    }
    return due;
  }

  function resetValue(){
    reset({name:"", memo:"",})
    setSelectedDue({ date: null, time: null })
  }

  const onSubmit = (data) => {
    const due_date = convertDate(selectedDue);
    const task = {...editTask, ...data, due_date};
    onCallback(task, ()=>{resetValue()});
    /**
     * second argument is callback function that reset form values 
     * Caller should call the function.
     */
  };

  return (
    <React.Fragment>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="task-form-dialog"
      >
        <DialogTitle>
          {title}
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogTitle>

        <DialogContentText>
          {subtitle}
        </DialogContentText>

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
