
import React,  { useEffect, useState } from 'react';
import axios from 'axios';
import { SERVER_URL } from '../../constants.js';
import {DataGrid, ruRU} from '@mui/x-data-grid';
import {GridToolbarContainer} from '@mui/x-data-grid';
import {GridToolbarExport} from '@mui/x-data-grid';
import {gridClasses } from '@mui/x-data-grid';
import {Snackbar, Box, Typography} from '@mui/material';
import '../CSS/employeeCSS.css';
import '../CSS/table.css';
import AddTraining from './AddTraining';
import EditTraining from './EditTraining';
import { grey } from '@mui/material/colors';

function CustomToolbar() {
  return (
    <GridToolbarContainer className={gridClasses.toolbarContainer}>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

const TrainingTable = ({ setSelectedLink, link }) => {

  useEffect(() => {
    setSelectedLink(link);
  }, []);


    const [trainings, setTrainings] = useState([]);
    const [open, setOpen] = useState(false);
    const [rows, setRows] = useState([]);
  
    useEffect(() => {
      fetchTrainings();
    }, []);
  
    const fetchTrainings = () => {
      // const token = sessionStorage.getItem("jwt");
      fetch(SERVER_URL + '/api/trainings', {
        // headers: { 'Authorization' : token }
      })
      .then(response => response.json())
      .then(data => setTrainings(data._embedded.trainings))
      .catch(err => console.error(err));    
    }
    const onDelClick = (url) => {
      if (window.confirm("ВЫ уверены, что хотите удалить запись о тренировке?")) {

        // const token = sessionStorage.getItem("jwt");

        fetch(url, {
          method: 'DELETE',
          // headers: { 'Authorization' : token }
          })
        .then(response => {
          if (response.ok) {
            fetchTrainings();
            setOpen(true);
          }
          else {
            alert('Что-то пошло не так!');
          }
        })
        .catch(err => console.error(err))

      }
    }
    const addTraining = (training, complexFacilityId) => {

      // const token = sessionStorage.getItem("jwt");

      fetch(SERVER_URL + '/api/save_trainings?complexFacilityId='+ complexFacilityId,
        { method: 'POST', headers: {
          'Content-Type':'application/json',
          // 'Authorization' : token
        },
        body: JSON.stringify(training)
      })
      .then(response => {
        if (response.ok) {
          fetchTrainings();
        }
        else {
          alert('Что-то пошло не так!');
        }
      })
      .catch(err => console.error(err))
    }
  

    const updateTraining = (training, link, complexFacilityId) => {

      // const token = sessionStorage.getItem("jwt");

      fetch(link + '?complexFacilityId='+ complexFacilityId,
        { 
          method: 'PUT', 
          headers: {
          'Content-Type':  'application/json',
          // 'Authorization' : token
        },
        body: JSON.stringify(training)
      })
      .then(response => {
        if (response.ok) {
          fetchTrainings();
        }
        else {
          alert('Что-то пошло не так!');
        }
      })
      .catch(err => console.error(err))
    }
     
    const fetchComplexFacility = async (url) => {
      try {
        const response = await axios.get(url);
        let id = response.data._links.self.href;
        return response.data.facilityType + " №" + id.slice(id.lastIndexOf("/") + 1);
      } catch (error) {
        console.error('Error fetching complex facility:', error);
        return 'N/A';
      }
    };


    const columns = [
      {field: 'trainingDateTime', headerName: 'Дата и время проведения', width: 300},
      {field: 'cost', headerName: 'Стоимость (бел.руб.)', width: 300},
      {field: 'complexFacility', headerName: 'Место проведения', width: 400},
      {
        field: '_links.training.href', 
        headerName: '', 
        sortable: false,
        filterable: false,
        width: 100,
        renderCell: row => <EditTraining
                              data={row} 
                              updateTraining={updateTraining} />
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
    
    useEffect(() => {
      const updateRows = async () => {
        const updatedRows = await Promise.all(trainings.map(async training => ({
          id: training._links.self.href,
          trainingDateTime: training.trainingDateTime,
          cost: training.cost,
          complexFacility: await fetchComplexFacility(training._links.complexFacility.href),
        })));
        setRows(updatedRows);
      };
  
      updateRows();
    }, [trainings]);


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
      Тренировки
    </Typography>
      <main className='info_pages_body'>
    <React.Fragment>
      <AddTraining addTraining={addTraining} />
      <div className="container" style={{ height: 400, width: "100%"}}>
        <DataGrid localeText={ruRU.components.MuiDataGrid.defaultProps.localeText} className="grid_component" 
          columns={columns} 
          rows={rows} 
          disableSelectionOnClick={true}
          getRowId={row => row.id}
          components={{ Toolbar: CustomToolbar }}
          sx={{
            [`& .${gridClasses.row}`]: {
              bgcolor: (theme) =>
                theme.palette.mode === 'light' ? grey[200] : grey[900],
            },
          }}
        />
        <Snackbar
          open={open}
          autoHideDuration={2000}
          onClose={() => setOpen(false)}
          message="Запись о тренировке удалена"
        />
      </div>
    </React.Fragment>
    </main>
    </Box>
  );
}

export default TrainingTable;
