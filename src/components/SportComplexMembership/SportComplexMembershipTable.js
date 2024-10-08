
import React,  { useEffect, useState } from 'react';
import { SERVER_URL, StyledDataGrid } from '../../constants.js';
import {ruRU, gridClasses} from '@mui/x-data-grid';
import {GridToolbarContainer} from '@mui/x-data-grid';
import {GridToolbarExport} from '@mui/x-data-grid';
import {Snackbar, Box, Typography} from '@mui/material';
import '../CSS/employeeCSS.css';
import '../CSS/table.css';
import AddSportComplexMembership from './AddSportComplexMembership.js';
import { grey } from '@mui/material/colors';
import EditSportComplexMembership from './EditSportComplexMembership.js';

function CustomToolbar() {
  return (
    <GridToolbarContainer className={gridClasses.toolbarContainer}>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

const SportComplexMembershipTable = ({ setSelectedLink, link }) => {

  useEffect(() => {
    setSelectedLink(link);
  }, []);

    const [memberships, setMemberships] = useState([]);
    const [open, setOpen] = useState(false);
  
    useEffect(() => {
      fetchMemberships();
    }, []);
  
    const fetchMemberships = () => {
      // const token = sessionStorage.getItem("jwt");
      fetch(SERVER_URL + '/api/sportComplexMemberships', {
        // headers: { 'Authorization' : token }
      })
      .then(response => response.json())
      .then(data => setMemberships(data._embedded.sportComplexMemberships))
      .catch(err => console.error(err));    
    }
    const onDelClick = (url) => {
      if (window.confirm("ВЫ уверены, что хотите удалить запись об абонементе?")) {

        // const token = sessionStorage.getItem("jwt");

        fetch(url, {
          method: 'DELETE',
          // headers: { 'Authorization' : token }
          })
        .then(response => {
          if (response.ok) {
            fetchMemberships();
            setOpen(true);
          }
          else {
            alert('Что-то пошло не так!');
          }
        })
        .catch(err => console.error(err))
      }
    }
    const addMembership = (membership) => {

      // const token = sessionStorage.getItem("jwt");

      fetch(SERVER_URL + '/api/sportComplexMemberships',
        { method: 'POST', headers: {
          'Content-Type':'application/json',
          // 'Authorization' : token
        },
        body: JSON.stringify(membership)
      })
      .then(response => {
        if (response.ok) {
          fetchMemberships();
        }
        else {
          alert('Что-то пошло не так!');
        }
      })
      .catch(err => console.error(err))
    }
  

    const updateMembership = (membership, link) => {

      // const token = sessionStorage.getItem("jwt");

      fetch(link,
        { 
          method: 'PUT', 
          headers: {
          'Content-Type':  'application/json',
          // 'Authorization' : token
        },
        body: JSON.stringify(membership)
      })
      .then(response => {
        if (response.ok) {
          fetchMemberships();
        }
        else {
          alert('Что-то пошло не так!');
        }
      })
      .catch(err => console.error(err))
    }
    
    const columns = [
      {field: 'name', headerName: 'Наименование', width: 300},
      {field: 'durationDeadline', headerName: 'Дата истечения', width: 250},
      {field: 'cost', headerName: 'Стоимость (бел.руб.)', width: 250},
      {field: 'completeVisitsAmount', headerName: 'Количество входящих в абонемент занятий', width: 400},
      {
        field: '_links.membership.href', 
        headerName: '', 
        sortable: false,
        filterable: false,
        width: 100,
        renderCell: row => <EditSportComplexMembership
                              data={row} 
                              updateMembership={updateMembership} />
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
    <Box
    sx={{
      height: 400,
      width: '100%',
    }}
  >
    <Typography
      variant="h4"
      component="h4"
      sx={{ textAlign: 'center', mt: 3, mb: 3 }}
    >
      Абонементы
    </Typography>
    <main className='info_pages_body'>
    <React.Fragment>
      <AddSportComplexMembership addMembership={addMembership} />
      <div className="container" style={{ height: 400, width: "100%"}}>
        <StyledDataGrid localeText={ruRU.components.MuiDataGrid.defaultProps.localeText} className="grid_component" 
          columns={columns} 
          rows={memberships} 
          disableSelectionOnClick={true}
          getRowId={row => row._links.self.href}
          components={{ Toolbar: CustomToolbar }}
          sx={{
            [`& .${gridClasses.row}`]: {
              bgcolor: (theme) =>
                theme.palette.mode === 'light' ? grey[200] : grey[900],
            },
          }}/>
        <Snackbar
          open={open}
          autoHideDuration={2000}
          onClose={() => setOpen(false)}
          message="Запись о сотруднике удалена"
        />
      </div>
    </React.Fragment>
    </main>
    </Box>
  );
}

export default SportComplexMembershipTable;
