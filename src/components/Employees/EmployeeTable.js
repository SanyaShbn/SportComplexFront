
import React,  { useEffect, useState } from 'react';
import { SERVER_URL } from '../../constants.js';
import {DataGrid, ruRU} from '@mui/x-data-grid';
import {GridToolbarContainer} from '@mui/x-data-grid';
import {GridToolbarExport} from '@mui/x-data-grid';
import {gridClasses } from '@mui/x-data-grid';
import Snackbar from '@mui/material/Snackbar';
import './table.css';
import AddEmployee from './AddEmployee';
import EditEmployee from './EditEmployee';

function CustomToolbar() {
  return (
    <GridToolbarContainer className={gridClasses.toolbarContainer}>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

function EmployeeTable() {

    const [employees, setEmployees] = useState([]);
    const [open, setOpen] = useState(false);
  
    useEffect(() => {
      fetchEmployees();
    }, []);
  
    const fetchEmployees = () => {
      fetch('api/serviceEmployees')
      .then(response => response.json())
      .then(data => setEmployees(data._embedded.serviceEmployees))
      .catch(err => console.error(err));    
    }
    const onDelClick = (url) => {
      if (window.confirm("ВЫ уверены, что хотите удалить запись о сотруднике обслуживающего персонала?")) {
        fetch(url.replace(SERVER_URL, ''),  {method:  'DELETE'})
        .then(response => {
          if (response.ok) {
            fetchEmployees();
            setOpen(true);
          }
          else {
            alert('Что-то пошло не так!');
          }
        })
        .catch(err => console.error(err))
      }
    }
    const addEmployee = (employee) => {
      fetch('api/serviceEmployees',
        { method: 'POST', headers: {
          'Content-Type':'application/json',
        },
        body: JSON.stringify(employee)
      })
      .then(response => {
        if (response.ok) {
          fetchEmployees();
        }
        else {
          alert('Что-то пошло не так!');
        }
      })
      .catch(err => console.error(err))
    }
  
    // Update existing car
    const updateEmployee = (employee, link) => {
      fetch(link.replace(SERVER_URL, ''),
        { 
          method: 'PUT', 
          headers: {
          'Content-Type':  'application/json',
        },
        body: JSON.stringify(employee)
      })
      .then(response => {
        if (response.ok) {
          fetchEmployees();
        }
        else {
          alert('Что-то пошло не так!');
        }
      })
      .catch(err => console.error(err))
    }
     
    // const updateButton = [
    //   {
    //     field: '_links.serviceEmployee.href', 
    //     headerName: '', 
    //     sortable: false,
    //     filterable: false,
    //     renderCell: row => <EditEmployee 
    //                           data={row} 
    //                           updateCar={updateEmployee} />
    //   }
    // ]
    // const deleteButton = [
    //   {
    //     field: '_links.self.href', 
    //     headerName: '', 
    //     sortable: false,
    //     filterable: false,
    //     renderCell: row => 
    //       <button className='shine-button' onClick={() => onDelClick(row.id)}> </button>
    //   }
    // ]
    
    const columns = [
      {field: 'firstName', headerName: 'Имя', width: 100},
      {field: 'surName', headerName: 'Фамилия', width: 150},
      {field: 'patrSurName', headerName: 'Отчество', width: 150},
      {field: 'phoneNumber', headerName: 'Номер телефона', width: 200},
      {field: 'birthDate', headerName: 'Дата рождения', width: 170},
      {field: 'salary', headerName: 'Оклад(бел.руб.)', width: 200},
      {field: 'additionalSalary', headerName: 'Премиальные(бел.руб.)', width: 200},
      {
        field: '_links.employee.href', 
        headerName: '', 
        sortable: false,
        filterable: false,
        width: 100,
        renderCell: row => <EditEmployee 
                              data={row} 
                              updateEmployee={updateEmployee} />
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
    <React.Fragment>
      <AddEmployee addEmployee={addEmployee} />
      <div className="container" style={{ height: 400, width: "100%"}}>
        <DataGrid localeText={ruRU.components.MuiDataGrid.defaultProps.localeText} className="grid_component" 
          columns={columns} 
          rows={employees} 
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
    // <div>
    // <table>
    //   <thead>
    //     <tr>
    //       <th>ID</th>
    //       <th>Имя</th>
    //       <th>Фамилия</th>
    //       <th>Отчество</th>
    //       <th>Номер</th>
    //       <th>Дата рождения</th>
    //       <th>Оклад(бел.руб.)</th>
    //       <th>Премиальные(бел.руб.)</th>
    //     </tr>
    //   </thead>
    //   <tbody>
    //     <tr>
    //         {employees}
    //         <td>{updateButton}</td>
    //         <td>{deleteButton}</td>
    //     </tr>
    //   </tbody>
    // </table>
    // <AddEmployee />
    // </div>
  );
}

export default EmployeeTable;
