import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import history from "../../../history";
import moment from "moment";
import {
  Button,
  TextField,
  Dialog,
  DialogContent,
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
import {
  select_isOpenTaskModal,
  select_task,
  setIsOpen_TaskModal,
} from "../../../slices/taskModalSlice";
import DeleteDialog from "../modals/DeleteDialog";
import { Task } from "../../../types/task";
import { TaskFolder } from "../../../types/taskFolder";
import {
  convertToEndPoint,
  asyncGetCurrentTaskFolder,
  selectTaskFolders,
  asyncCreateTask,
  asyncEditTask,
  asyncDeleteTask,
} from "../../../slices/taskSlice";
import NAMES from "../../../const/names";

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
  const is_edit: boolean = task.id ? true : false;
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [selectedDue, setSelectedDue] = useState<any>({
    date: task.due_date,
    time: task.due_date,
  });
  const [selectedFolder, setSelectedFolder] = useState<string>(
    task.taskFolder || "inbox"
  );
  const [selectedStar, setSelectedStar] = useState<boolean>(task.is_star);

  React.useEffect(() => {
    if (is_edit) {
      setValue("name", task.name);
      setValue("memo", task.memo);
      setSelectedDue({
        date: task.due_date,
        time: task.due_date,
      });
      setSelectedStar(task.is_star);
    }
    setSelectedFolder(task.taskFolder || "inbox");
  }, [setValue, task, is_edit]);

  function convertDate(stateDate: any) {
    const date = moment(stateDate.date).format("YYYY-MM-DD");
    const time = moment(stateDate.time).format("HH:mm:ss");

    let due = null;
    if (stateDate.data !== null && stateDate.time !== null) {
      due = date + "T" + time;
    }
    if (!stateDate.date && stateDate.time) {
      due = moment(stateDate.time).format();
    }
    if (stateDate.date && !stateDate.time) {
      due = date + "T00:00:00";
    }
    return due;
  }

  const dispatchDelete = () => {
    dispatch(
      asyncDeleteTask(task, {
        success: () => {
          dispatch(
            asyncGetCurrentTaskFolder(
              convertToEndPoint(history.location.pathname)
            )
          );
          handleClose();
          setIsDeleting(false);
        },
        failure: () => {
          setIsDeleting(false);
        },
      })
    );
  };

  const onSubmit = (data: any) => {
    const taskFolder = selectedFolder === "inbox" ? null : selectedFolder;
    const due_date = convertDate(selectedDue);

    if (is_edit) {
      const edit_task = {
        ...task,
        ...data,
        due_date,
        taskFolder,
        is_star: selectedStar,
      };
      dispatch(
        asyncEditTask(edit_task, {
          success: () => {
            dispatch(
              asyncGetCurrentTaskFolder(
                convertToEndPoint(history.location.pathname)
              )
            );
            handleClose();
          },
        })
      );
    } else {
      const new_task = {
        person: localStorage.getItem(NAMES.STORAGE_UID),
        ...data,
        due_date,
        taskFolder,
        is_star: selectedStar,
      };
      dispatch(
        asyncCreateTask(new_task, {
          success: () => {
            dispatch(
              asyncGetCurrentTaskFolder(
                convertToEndPoint(history.location.pathname)
              )
            );
            handleClose();
          },
        })
      );
    }
  };

  function handleClose() {
    history.push(history.location.pathname.split("?")[0]);
    dispatch(
      setIsOpen_TaskModal({
        isOpen: false,
      })
    );
    reset({ name: "", memo: "" });
    setSelectedDue({ date: null, time: null });
    setSelectedStar(false);
    setSelectedFolder("inbox");
  }

  return (
    <React.Fragment>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="task-form-dialog"
      >
        <DialogTitle>
          {is_edit ? "Edit a Task" : "Create a Task"}
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          {is_edit && (
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => {
                setIsDeleting(true);
              }}
            >
              Delete
            </Button>
          )}
        </DialogTitle>

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
                    onChange={(event: any) => {
                      setSelectedFolder(event.target.value);
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

      <DeleteDialog
        isOpen={isDeleting}
        onClose={() => {
          setIsDeleting(false);
        }}
        onDelete={() => {
          dispatchDelete();
        }}
        subtitle={`You are going to delete "${task.name}".`}
      />
    </React.Fragment>
  );
};
