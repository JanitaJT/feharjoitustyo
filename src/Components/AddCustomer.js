import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import IconButton from '@material-ui/core/IconButton';

export default function AddCustomer(props) {
    const [customers, setCustomers] = useState({firstname: '', lastname: '', streetaddress: '', postcode: '', city: '', email: '', phone:''});
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        props.addCusto(customers);
        handleClose();
    }
    
    const inputChanged = (event) => {
        setCustomers({...customers, [event.target.name]: event.target.value});
    }
    return (
        <div>
        <IconButton color='inherit' onClick={handleClickOpen}>
      Add Customer
        <PersonAddIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">New Customer</DialogTitle>
        <DialogContent>
        <TextField
        margin="dense"
        name="firstname"
        value={customers.firstname}
        onChange={inputChanged}
         label="Firstname"
         fullWidth
        />
        <TextField
        margin="dense"
        name="lastname"
        value={customers.lastname}
        onChange={inputChanged}
         label="Lastname"
         fullWidth
        />
        <TextField
        margin="dense"
        name="streetaddress"
        value={customers.streetaddress}
        onChange={inputChanged}
         label="Streetadress"
         fullWidth
        />
        <TextField
        margin="dense"
        name="postcode"
        value={customers.postcode}
        onChange={inputChanged}
         label="Postcode"
         fullWidth
        />
        <TextField
        margin="dense"
        name="city"
        value={customers.city}
        onChange={inputChanged}
         label="City"
         fullWidth
        />
        <TextField
        margin="dense"
        name="email"
        value={customers.email}
        onChange={inputChanged}
         label="Email"
         fullWidth
        />
        <TextField
        margin="dense"
        name="phone"
        value={customers.phone}
        onChange={inputChanged}
         label="Phone"
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
