import React from 'react';
import './employeeCSS.css';
import './table.css';

const AddEmployee = () => {
  return (
    <div>
    <h2>Добавление сотрудников</h2>
    <table>
      <thead>
      </thead>
      <tbody>
        <tr>
            <td><input type='text' placeholder='Введите Имя'></input></td>
            <td><input type='text' placeholder='Введите Фамилию'></input></td>
            <td><input type='text' placeholder='Введите Отчество'></input></td>
            <td><input type='text' placeholder='Введите уровень образования'></input></td>
            <td><input type='text' placeholder='Введите номер телефона'></input></td>
            <td><input type='date' placeholder='Введите дату рождения'></input></td>
            <td><input type='number' placeholder='Введите размер оклада'></input></td>
            <td><input type='number' placeholder='Введите размер премиальных'></input></td>
            <td>
            <button type="submit" className="shine-button"><i>Добавить</i>
                </button>
            </td>
        </tr>
      </tbody>
    </table>
    </div>
  );
}

export default AddEmployee;
