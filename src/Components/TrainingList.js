import React, {useState, useEffect, useRef} from 'react'
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import moment from  'moment';


export default function TrainingList() {

    const [trainings, setTrainings] = useState([]);
    const [open, setOpen] = useState(false);
    //const [msg, setMsg] = useState('');
  
    const gridRef = useRef();
    

    useEffect(() => {
        getTrainings();
        
    }, [])

    const getTrainings = () => {
        fetch("https://customerrest.herokuapp.com/api/trainings")
        .then(response => response.json())
        .then(data => {
            
            setTrainings(data.content)})
        .catch(err => console.error(err))
    }

   // const addTrainings = (newTraining) => {
     //   console.log(newTraining);
        // fetch("https://customerrest.herokuapp.com/api/trainings", {
        //     method: 'POST',
        //     headers: {'Content-type' : 'application/json'},
        //     body: JSON.stringify(newTraining) 

        // })
        // .then(_ => gridRef.current.refreshCells({rowNodes : getTrainings()}))
        // .catch(err => console.error(err))
    

    const columns = [
       
        {headerName: 'Date', field: 'date', sortable: true, filter: true, valueFormatter: dateFormatter},
        {headerName: 'Duration', field: 'duration', sortable: true, filter: true},
        {headerName: 'Activity', field: 'activity', sortable: true, filter: true},
    ]

    function dateFormatter(params) {
        return moment(params.value).locale('fi').format("Do MMM YY"); 
      }
    
    return (
        <div>
       
        <div className="ag-theme-material" style={{height: '700px', width: '100%', margin: 'auto'}}>
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
            
        </div>
        </div>
    )
}
