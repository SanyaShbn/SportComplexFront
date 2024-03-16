
import React,  { useEffect, useState } from 'react';
import { SERVER_URL } from '../../constants.js';
import {DataGrid, ruRU} from '@mui/x-data-grid';
import {GridToolbarContainer} from '@mui/x-data-grid';
import {GridToolbarExport} from '@mui/x-data-grid';
import {gridClasses } from '@mui/x-data-grid';
import Snackbar from '@mui/material/Snackbar';
import '../CSS/employeeCSS.css';
import '../CSS/table.css';
import EditClient from './EditClient';

function CustomToolbar() {
  return (
    <GridToolbarContainer className={gridClasses.toolbarContainer}>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

function ClientTable() {

    const [clients, setClients] = useState([]);
    const [open, setOpen] = useState(false);
  
    useEffect(() => {
      fetchClients();
    }, []);
  
    const fetchClients = () => {
      // const token = sessionStorage.getItem("jwt");
      fetch(SERVER_URL + '/api/clients', {
        // headers: { 'Authorization' : token }
      })
      .then(response => response.json())
      .then(data => setClients(data._embedded.clients))
      .catch(err => console.error(err));    
    }
    const onDelClick = (url) => {
      if (window.confirm("ВЫ уверены, что хотите удалить запись о клиенте?")) {

        // const token = sessionStorage.getItem("jwt");

        fetch(url, {
          method: 'DELETE',
          // headers: { 'Authorization' : token }
          })
        .then(response => {
          if (response.ok) {
            fetchClients();
            setOpen(true);
          }
          else {
            alert('Что-то пошло не так!');
          }
        })
        .catch(err => console.error(err))
      }
    }

    const updateClient = (client, link) => {

      // const token = sessionStorage.getItem("jwt");

      fetch(link,
        { 
          method: 'PUT', 
          headers: {
          'Content-Type':  'application/json',
          // 'Authorization' : token
        },
        body: JSON.stringify(client)
      })
      .then(response => {
        if (response.ok) {
          fetchClients();
        }
        else {
          alert('Что-то пошло не так!');
        }
      })
      .catch(err => console.error(err))
    }
     
    const columns = [
      {field: 'firstName', headerName: 'Имя', width: 100},
      {field: 'surName', headerName: 'Фамилия', width: 150},
      {field: 'patrSurName', headerName: 'Отчество', width: 150},
      {field: 'phoneNumber', headerName: 'Номер телефона', width: 200},
      {field: 'email', headerName: 'Дата рождения', width: 250},
      {
        field: '_links.employee.href', 
        headerName: '', 
        sortable: false,
        filterable: false,
        width: 100,
        renderCell: row => <EditClient 
                              data={row} 
                              updateClient={updateClient} />
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
      <h2>Клиенты</h2>
    <React.Fragment>
      <div className="container" style={{ height: 400, width: "100%"}}>
        <DataGrid localeText={ruRU.components.MuiDataGrid.defaultProps.localeText} className="grid_component" 
          columns={columns} 
          rows={clients} 
          disableSelectionOnClick={true}
          getRowId={row => row._links.self.href}
          components={{ Toolbar: CustomToolbar }}
        />
        <Snackbar
          open={open}
          autoHideDuration={2000}
          onClose={() => setOpen(false)}
          message="Запись о сотруднике удалена"
        />
      </div>
    </React.Fragment>
    </main>
  );
}

export default ClientTable;
