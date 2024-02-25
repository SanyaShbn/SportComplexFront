
import React from 'react';
import './employeeCSS.css';
import './table.css';
import AddEmployee from './AddEmployee';

const EmployeeTable = () => {
  return (
    <div>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Имя</th>
          <th>Фамилия</th>
          <th>Отчество</th>
          <th>Номер</th>
          <th>Дата рождения</th>
          <th>Оклад(бел.руб.)</th>
          <th>Премиальные(бел.руб.)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
            <td><input></input></td>
            <td><input></input></td>
            <td><input></input></td>
            <td><input></input></td>
            <td><input></input></td>
            <td><input></input></td>
            <td><input></input></td>
            <td><input></input></td>
            <td>
                <button className="shine-button"><i>Обновить</i></button>
            </td>
            <td>
                <button className="shine-button"><i>Удалить</i></button>
            </td>
        </tr>
      </tbody>
    </table>
    <AddEmployee />
    </div>
  );
}

export default EmployeeTable;
