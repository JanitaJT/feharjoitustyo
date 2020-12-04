import React, { useState, useEffect, useRef } from 'react'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import moment from 'moment';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Snackbar from '@material-ui/core/Snackbar';


export default function TrainingList(props) {

    const [trainings, setTrainings] = useState([]);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState('');

    const gridRef = useRef();


    useEffect(() => {
        getTrainings();

    }, [])

    const getTrainings = () => {
        fetch("https://customerrest.herokuapp.com/gettrainings/")
            .then(response => response.json())
            .then(data => {
                // console.log(data);
                setTrainings(data)
            })
            .catch(err => console.error(err))
    }

    const deleteTraining = (id) => {

        if (window.confirm('Are you sure?')) {
            fetch("https://customerrest.herokuapp.com/api/trainings/" + id, {
                method: 'DELETE'
            })
                .then(_ => gridRef.current.refreshCells({ rowNodes: getTrainings() }))
                .then(_ => setMsg('Traininng was deleted succesfully'))
                .then(_ => setOpen(true))
                .catch(err => console.error(err))
        }

    }

    const columns = [

        { headerName: 'Date', field: 'date', sortable: true, filter: true, valueFormatter: dateFormatter },
        { headerName: 'Duration', field: 'duration', sortable: true, filter: true },
        { headerName: 'Activity', field: 'activity', sortable: true, filter: true },
        {
            headerName: 'Customer', field: 'customer', sortable: true, filter: true,
            valueGetter:
                function sumField(params) {
                    console.log(params)
                    return params.data.customer.firstname + ' ' + params.data.customer.lastname
                }
        },
        {
            headerName: '',
            width: 90,
            cellRendererFramework: params =>
                <IconButton aria-label="delete" color='inherit' size='small' onClick={() => deleteTraining(params.data.id)}>
                    <DeleteIcon />
                </IconButton>
        }
    ]

    function dateFormatter(params) {
        return moment(params.value).locale('fi').format("Do MMM YY");
    }
    const closeSnackbar = () => {
        setOpen(false);
    }

    return (
        <div>

            <div className="ag-theme-material" style={{ height: '700px', width: '100%', margin: 'auto' }}>
                <AgGridReact
                    suppressCellSelection={true}
                    ref={gridRef}
                    onGridReady={params => {
                        gridRef.current = params.api
                    }}
                    columnDefs={columns}
                    rowData={trainings}
                    pagination={true}
                    paginationAutoPageSize={true}
                >
                </AgGridReact>
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
