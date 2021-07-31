import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
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
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  KeyboardTimePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import StarIcon from "@material-ui/icons/Star";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import { makeStyles } from "@material-ui/core/styles";
import { selectTaskFolders } from "../../../slices/taskSlice";
import {
  select_isOpenTaskModal,
  select_task,
  setIsOpen_TaskModal,
} from "../../../slices/taskModalSlice";
import { Task } from "../../../types/Task";
import { TaskFolder } from "../../../types/TaskFolder";

const useStyles = makeStyles((theme) => ({
  textField: {
    width: "100%",
  },
  iconButtonRoot: {
    paddingLeft: 0,
  },
  iconButtonLabel: {
    display: "flex",
    flexDirection: "column",
  },
  starFont: {
    color: "rgba(0, 0, 0, 0.54)",
    padding: 0,
    fontSize: "0.75rem",
    fontFamily: "Roboto Helvetica Arial sansSerif",
    fontWeight: 400,
    lineHeight: 1,
    letterSpacing: "0.00938em",
    paddingTop: "4px",
  },
  starIcon: {
    marginTop: "8px",
  },
}));

type Props_TaskModal = {};

export const TaskModal: React.FC<Props_TaskModal> = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const taskFolders: TaskFolder[] = useSelector(selectTaskFolders);
  const isOpen: boolean = useSelector(select_isOpenTaskModal);
  const task: Task = useSelector(select_task);
  const [selectedDue, setSelectedDue] = useState<any>({
    date: task.due_date,
    time: task.due_date,
  });
  const [selectedFolder, setSelectedFolder] = useState<string>(
    task.taskFolder || "inbox"
  );
  const [selectedStar, setSelectedStar] = useState<boolean>(task.is_star);

  function onSubmit() {
    console.log("onClick submit");
    console.log(isOpen, task);
    console.log(taskFolders);
  }

  return (
    <React.Fragment>
      <Dialog
        open={isOpen}
        // onClose={handleClose}
        aria-labelledby="task-form-dialog"
      >
        <DialogTitle>
          {task.id ? "Edit a Task" : "Create a Task"}
          <Button
            onClick={() => setIsOpen_TaskModal({ isOpen: false, task })}
            color="primary"
          >
            Cancel
          </Button>
          {task.id && (
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => {
                // onDelete();
              }}
            >
              Delete
            </Button>
          )}
        </DialogTitle>

        {/* <DialogContentText>{subtitle}</DialogContentText> */}

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <DialogContent>
              <Box mb={2} display="flex">
                <IconButton
                  classes={{
                    root: classes.iconButtonRoot,
                    label: classes.iconButtonLabel,
                  }}
                  onClick={() => {
                    setSelectedStar(!selectedStar);
                  }}
                >
                  <div className={classes.starFont}>Star</div>
                  {selectedStar ? (
                    <StarIcon className={classes.starIcon} />
                  ) : (
                    <StarBorderIcon className={classes.starIcon} />
                  )}
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
                      // setSelectedFolder(event.target.value);
                    }}
                  >
                    <MenuItem value="inbox">Inbox</MenuItem>
                    {taskFolders.map((folder: any) => (
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
