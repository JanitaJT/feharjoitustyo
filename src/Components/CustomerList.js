import React, {useState, useEffect, useRef} from 'react'
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Snackbar from '@material-ui/core/Snackbar';
import AddCustomer from './AddCustomer';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import AddTraining from './AddTraining';



export default function CustomerList() {
    const [customers, setCustomers] = useState([]);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState('');
   

    const gridRef = useRef();

    useEffect(() => {
        getCustomers();
    }, [])

    const getCustomers = () => {
        fetch("https://customerrest.herokuapp.com/api/customers")
        .then(response => response.json())
        .then(data => setCustomers(data.content))
        .catch(err => console.error(err))
    }

    const addCusto = (newCustomer) => {
        fetch("https://customerrest.herokuapp.com/api/customers", {
        method: 'POST',
        headers: {'Content-type' : 'application/json'},
        body: JSON.stringify(newCustomer)
    })
    .then(_ => gridRef.current.refreshCells({rowNodes : getCustomers()}))
    .catch(err => console.error(err))

    }
    const deleteCustomer = (url) => {
        console.log(url);
        if (window.confirm('Are you sure?')) {
        fetch(url   , {
            method: 'DELETE',
            header: {'Content-Type': 'application/json'}
            
        })
        .then(_ => gridRef.current.refreshCells({rowNodes : getCustomers()}))
        .then(_ => setMsg('Customer was deleted succesfully'))
        .then(_ => setOpen(true))
        .catch(err => console.error(err))
    }
}

    const addTraining = (newTraining) => {
        fetch("https://customerrest.herokuapp.com/api/trainings/", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newTraining)
        })
        .then(_ => gridRef.current.refreshCells({rowNodes : getCustomers()}))
        .catch(err => console.error(err))
    }
    
    const closeSnackbar = () => {
        setOpen(false);
    }


    const columns = [
        { headerName: 'Firstname', field: 'firstname', sortable: true, filter: true},
        { headerName: 'Lastname', field: 'lastname', sortable: true, filter: true},
        { headerName: 'Streetaddress', field: 'streetaddress', sortable: true, filter: true},
        { headerName: 'Postcode', field: 'postcode', sortable: true, filter: true},
        { headerName: 'City', field: 'city', sortable: true, filter: true},
        { headerName: 'Email', field: 'email', sortable: true, filter: true},
        { headerName: 'Phone', field: 'phone', sortable: true, filter: true},
        {
            headerName: '',
            field: 'links[0].href',
            width: 90,
            cellRendererFramework: params => 
            <IconButton aria-label="delete" color='inherit' size='small' onClick={() => deleteCustomer(params.data.links[0].href)}>
            <DeleteIcon />
          </IconButton>
        },
        {
            headerName: '',
            field: 'links[0].href',
            cellRendererFramework: params => <AddTraining addTraining={addTraining} params={params} link={params.data.links[0].href} />
          
           
        }

    ]

    return (
        <div>
        <AddCustomer addCusto={addCusto} />
        <div className="ag-theme-material" style={{height: '500px', width: '100%', margin: 'auto' }}>
            <AgGridReact
            suppressCellSelection={true}
            ref={gridRef}
            onGridReady={params => {
                gridRef.current = params.api
            }}
            columnDefs={columns}
            rowData={customers}
            pagination={true}
            paginationAutoPageSize={true}
            ></AgGridReact>
            <Snackbar 
            open={open}
            autoHideDuration={3000}
            onClose={closeSnackbar}
            message={msg}
            />
          
        </div>
        </div>
    )
}

