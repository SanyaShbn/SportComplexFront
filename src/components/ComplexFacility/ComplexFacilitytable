
import React,  { useEffect, useState } from 'react';
import { SERVER_URL } from '../../constants.js';
import {DataGrid, ruRU} from '@mui/x-data-grid';
import {GridToolbarContainer} from '@mui/x-data-grid';
import {GridToolbarExport} from '@mui/x-data-grid';
import {gridClasses } from '@mui/x-data-grid';
import Snackbar from '@mui/material/Snackbar';
import '../CSS/employeeCSS.css';
import '../CSS/table.css';
import AddFacility from './AddFacility.js';
import EditFacility from './EditFacility.js';

function CustomToolbar() {
  return (
    <GridToolbarContainer className={gridClasses.toolbarContainer}>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

function ComplexFacilityTable() {

    const [facilities, setFacilities] = useState([]);
    const [open, setOpen] = useState(false);
  
    useEffect(() => {
      fetchFacilities();
    }, []);
  
    const fetchFacilities = () => {
      // const token = sessionStorage.getItem("jwt");
      fetch(SERVER_URL + '/api/complexFacilities', {
        // headers: { 'Authorization' : token }
      })
      .then(response => response.json())
      .then(data => setFacilities(data._embedded.complexFacilities))
      .catch(err => console.error(err));    
    }
    const onDelClick = (url) => {
      if (window.confirm("ВЫ уверены, что хотите удалить запись о сооружении комплекса?")) {

        // const token = sessionStorage.getItem("jwt");

        fetch(url, {
          method: 'DELETE',
          // headers: { 'Authorization' : token }
          })
        .then(response => {
          if (response.ok) {
            fetchFacilities();
            setOpen(true);
          }
          else {
            alert('Что-то пошло не так!');
          }
        })
        .catch(err => console.error(err))
      }
    }
    const addFacility = (facility) => {

      // const token = sessionStorage.getItem("jwt");

      fetch(SERVER_URL + '/api/complexFacilities',
        { method: 'POST', headers: {
          'Content-Type':'application/json',
          // 'Authorization' : token
        },
        body: JSON.stringify(facility)
      })
      .then(response => {
        if (response.ok) {
          fetchFacilities();
        }
        else {
          alert('Что-то пошло не так!');
        }
      })
      .catch(err => console.error(err))
    }
  

    const updateFacility = (facility, link) => {

      // const token = sessionStorage.getItem("jwt");

      fetch(link,
        { 
          method: 'PUT', 
          headers: {
          'Content-Type':  'application/json',
          // 'Authorization' : token
        },
        body: JSON.stringify(facility)
      })
      .then(response => {
        if (response.ok) {
          fetchFacilities();
        }
        else {
          alert('Что-то пошло не так!');
        }
      })
      .catch(err => console.error(err))
    }
    
    const columns = [
      {field: 'facilityType', headerName: 'Вид сооружения', width: 300},
      {field: 'trainingsAmount', headerName: 'Количество тренировок', width: 300},
      {field: 'cleaningServiceTime', headerName: 'Время уборки и обслуживания', width: 400},
      {
        field: '_links.facility.href', 
        headerName: '', 
        sortable: false,
        filterable: false,
        width: 100,
        renderCell: row => <EditFacility 
                              data={row} 
                              updateFacility={updateFacility} />
      },
      {
        field: '_links.self.href', 
        headerName: '', 
        width:120,
        sortable: false,
        filterable: false,
        renderCell: row => 
        <button className="shine-button" variant="contained" onClick={() => onDelClick(row.id)}> Удалить </button>
      }
    ];
    
  return (
      <main className='info_pages_body'>
      <h1>Сооружения спортивно-оздоровительного комплекса</h1>
      <h2>Сооружения, зарегестрированные в системе</h2>
    <React.Fragment>
      <AddFacility addFacility={addFacility} />
      <div className="container" style={{ height: 400, width: "100%"}}>
        <DataGrid localeText={ruRU.components.MuiDataGrid.defaultProps.localeText} className="grid_component" 
          columns={columns} 
          rows={facilities} 
          disableSelectionOnClick={true}
          getRowId={row => row._links.self.href}
          components={{ Toolbar: CustomToolbar }}
        />
        <Snackbar
          open={open}
          autoHideDuration={2000}
          onClose={() => setOpen(false)}
          message="Запись о сооружении удалена"
        />
      </div>
    </React.Fragment>
    </main>
  );
}

export default ComplexFacilityTable;
