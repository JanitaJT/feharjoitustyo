import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import moment from 'moment';
import IconButton from '@material-ui/core/IconButton';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

export default function AddTraining(props) {
  const [trainings, setTrainings] = useState({ date: '', duration: '', activity: '', customer: props.link });
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    let training = trainings;
    console.log(training);
    // training.duration = parseInt(training.duration);
    training.date = moment().toISOString(training.date);
    console.log(training);
    props.addTraining(training);
    handleClose();
    setTrainings({ date: '', duration: '', activity: '', customer: props.link });
  }

  const inputChanged = (event) => {
    setTrainings({ ...trainings, [event.target.name]: event.target.value });
  }

  function dateFormatter(params) {
    return moment(params.value).locale('fi').format("Do MMM YY");
  }
  return (
    <div>
      <IconButton color='inherit' onClick={handleClickOpen}>
        <AddCircleOutlineIcon />
        Add training
      </IconButton>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">New training</DialogTitle>
        <DialogContent>

          <TextField
            id="date"
            name="date"
            type="datetime-local"
            value={trainings.date}
            onChange={inputChanged}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            type="number"
            margin="dense"
            name="duration"
            value={trainings.duration}
            onChange={inputChanged}
            label="Duration"
            fullWidth
          />
          <TextField
            margin="dense"
            name="activity"
            value={trainings.activity}
            onChange={inputChanged}
            label="Activity"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
      </Button>
          <Button onClick={handleSave} color="primary">
            Save
      </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
