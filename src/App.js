
import React from 'react';
import './App.css';
import Login from './components/Authentication/Login';
function App() {
  return (
    <div className="App">
      <div className="main_nav">
       <a href="/admin_main" className="navigation_element">Главная страница</a>
       <a href="/" className="navigation_element">Клиенты</a>
       <a href="/" className="navigation_element">Сооружения комплекса</a>
      </div>
      <h1>Сотрудники спортивно-оздоровительного комплекса</h1>
      <h2>Сотрудники, зарегестрированные в системе</h2>
      <Login />
    </div>
  );
}

export default App;

