
import React from 'react';
import './App.css';
import EmployeeTable from './components/Employees/EmployeeTable';

function App() {
  return (
    <div className="App">
      <div className="main_nav">
       <a href="/" className="navigation_element">Главная страница</a>
       <a href="/" className="navigation_element">Клиенты</a>
       <a href="/" className="navigation_element">Сооружения комплекса</a>
      </div>
      <h1>Сотрудники спортивно-оздоровительного комплекса</h1>
      <h2>Сотрудники, зарегестрированные в системе</h2>
      <EmployeeTable />
    </div>
  );
}

export default App;

