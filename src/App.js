
import React from 'react';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
// import Login from './components/Authentication/Login';
import AdminMain from './components/MainNavs/AdminMain';
import EmployeeTable from './components/Employees/EmployeeTable';
// import AccountantMain from './components/MainNavs/AccountantMain';
// import ManagerMain from './components/MainNavs/ManagerMain';
// import CoachMain from './components/MainNavs/CoachMain';
// import MarketerMain from './components/MainNavs/MarketerMain';

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<AdminMain/> } />
          <Route path="service_employees" element={<EmployeeTable />} />
          <Route path="admin_main" element={<AdminMain />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

