
// import React from 'react';
// import './App.css';
// import Login from './components/Authentication/Login';
// import AdminMain from './components/MainNavs/AdminMain';
// import EmployeeTable from './components/Employees/EmployeeTable';
// import AccountantMain from './components/MainNavs/AccountantMain';
// import ManagerMain from './components/MainNavs/ManagerMain';
// import CoachMain from './components/MainNavs/CoachMain';
// import MarketerMain from './components/MainNavs/MarketerMain';

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//           <Route path="/" element={<AdminMain/> } />
//           <Route path="service_employees" element={<EmployeeTable />} />
//           <Route path="admin_main" element={<AdminMain />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;


import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import Main from './components/MainPage/Main'
import ServiceEmployeesPage from './components/Employees/ServiceEmployeesPage'
import ComplexfacilitiesPage from './components/ComplexFacility/ComplexFacilitiesPage'
import EmployeeFacilityPage from './components/ServiceEmployee_ComplexFacility/EmployeeFacilityPage';
import TrainingPage from './components/Training/TrainingsPage';
import ClientsPage from './components/Client/ClientsPage';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
          <Route path="/" element={<Main />} />
          <Route path="service_employees" element={<ServiceEmployeesPage />} />
          <Route path="complex_facilities" element={<ComplexfacilitiesPage />} />
          <Route path="trainings" element={<TrainingPage />} />
          <Route path="clients" element={<ClientsPage  />} />
          <Route path="test" element={<EmployeeFacilityPage  />} />
          <Route path="main" element={<Main />} />
      </Routes>
    </BrowserRouter>
    </div>

  )
}

export default App
