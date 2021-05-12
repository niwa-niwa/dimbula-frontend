import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useSelector } from "react-redux";
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import StarIcon from '@material-ui/icons/Star';
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";

import { selectTaskFolders } from "../../../slices/taskSlice";
import ACTIONS from "../../../const/actions";

const useStyles = makeStyles(theme => ({
  textField: {
    width:"100%"
  },
  iconButtonRoot: {
    paddingLeft:0,
  },
  iconButtonLabel: {
    display: "flex",
    flexDirection: "column",
  },
  starFont: {
    color: 'rgba(0, 0, 0, 0.54)',
    padding: 0,
    fontSize: "0.75rem",
    fontFamily: "Roboto Helvetica Arial sansSerif",
    fontWeight: 400,
    lineHeight: 1,
    letterSpacing: "0.00938em",
    paddingTop:"4px",
  },
  starIcon:{
    marginTop:"8px"
  }
}));

const TaskDialog = ({
  isOpen = false,
  title = "",
  subtitle = "",
  action_type = "",
  editTask = {},
  onClose = null,
  onCallback = null,
  onDelete = null,
}) => {
  const classes = useStyles();
  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const [selectedDue, setSelectedDue] = useState({ date: null, time: null });
  const [selectedFolder, setSelectedFolder] = useState("inbox");
  const [selectedStar, setSelectedStar] = useState(false);
  const taskFolders = useSelector(selectTaskFolders);

  useEffect(() => {
    // TODO implement initValue with useCallBack
    if(action_type === ACTIONS.TASKS_EDIT){
      setValue("name", editTask.name);
      setValue("memo", editTask.memo);
      setSelectedDue({
        date: editTask.due_date,
        time: editTask.due_date
      });
      setSelectedStar(editTask.is_star);
    }
    setSelectedFolder(editTask.taskFolder || "inbox");
  }, [setValue, editTask, action_type])

  const handleClose = () => {
    initValue();
    onClose();
  };

  function initValue(){
    if(action_type === ACTIONS.TASKS_EDIT){
      setValue("name", editTask.name);
      setValue("memo", editTask.memo);
      setSelectedDue({
        date: editTask.due_date,
        time: editTask.due_date
      });
      setSelectedStar(editTask.is_star);
    }
    setSelectedFolder(editTask.taskFolder || "inbox");
  }
  
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
    setSelectedStar(false)
    setSelectedFolder("inbox")
  }

  const onSubmit = (data) => {
    const taskFolder = selectedFolder === "inbox" ? null : selectedFolder;
    const due_date = convertDate(selectedDue);
    const task = { ...editTask, ...data, due_date, taskFolder, is_star:selectedStar };
    onCallback(task, () => {
      resetValue();
    });
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
          {action_type === ACTIONS.TASKS_EDIT && (
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => {
                onDelete();
              }}
            >
              Delete
            </Button>
          )}
        </DialogTitle>

        <DialogContentText>{subtitle}</DialogContentText>

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <DialogContent>
              <Box mb={2} display="flex" >
                <IconButton
                  classes={{root:classes.iconButtonRoot ,label:classes.iconButtonLabel}}
                  onClick={()=>{setSelectedStar(!selectedStar)}}
                >
                  <div className={classes.starFont}>Star</div>
                  { selectedStar ?
                    <StarIcon className={classes.starIcon} /> :
                    <StarBorderIcon className={classes.starIcon} />
                  }
                </IconButton>
                <Controller
                  name="name"
                  control={control}
                  defaultValue={""}
                  render={({ field }) => (
                    <TextField
                    {...field}
                      className={classes.textField}
                      required
                      autoFocus
                      // fullWidth
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

              </Box>

              <Box>
                <FormControl fullWidth>
                  <InputLabel>Task Folder</InputLabel>
                  <Select
                    value={selectedFolder}
                    onChange={(event) => {
                      setSelectedFolder(event.target.value);
                    }}
                  >
                    <MenuItem value="inbox">Inbox</MenuItem>
                    {taskFolders.map((folder) => (
                      <MenuItem key={folder.id} value={folder.id}>
                        {folder.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

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
