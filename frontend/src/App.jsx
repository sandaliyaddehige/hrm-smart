import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'; 

// Components
import Sidebar from './components/Admin/Sidebar'; 
import TopNav from './components/Admin/TopNav'; 
import ManagerSidebar from './components/ManagerSidebar'; 

// Pages
import Dashboard from './pages/Dashboard';
import Employees from './pages/Employees';
import Settings from './pages/Settings';

import UserProfile from './pages/UserProfile';
import EmployeeProfileView from './pages/EmployeeProfileView';
//import AttendanceLeaveRequest from './pages/AttendanceLeaveRequest';
import AttendanceLeaveRequest from './pages/AttendanceLeaveRequest';


import EmployeeDashboard from "./pages/EmployeeDashboard";
import EmployeeList from "./pages/EmployeeList";
import EmployeePerformance from "./pages/EmployeePerformance";
import EmployeeAttendance from "./pages/EmployeeAttendance";

const LayoutWrapper = () => {
  const location = useLocation();
  const isManagerPath = location.pathname.startsWith('/manager');
  const [activePage, setActivePage] = useState('dashboard');


  return (
   
    <div className="flex flex-row h-screen w-full bg-[#f8fafc] overflow-hidden">
      
    
      <aside className="w-64 h-full flex-shrink-0 bg-white border-r border-slate-200 z-30">
        {isManagerPath ? (
          <ManagerSidebar activePage={activePage} setActivePage={setActivePage} />
        ) : (
          <Sidebar activePage={activePage} setActivePage={setActivePage} />
        )}
      </aside>

     
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        
        <header className="w-full flex-shrink-0 bg-white border-b border-slate-200">
          <TopNav title={isManagerPath ? "Manager Portal" : "HRM Admin Portal"} /> 
        </header>

        
        <main className="flex-1 overflow-y-auto p-6 custom-scrollbar bg-[#f8fafc]">
          <div className="w-full h-full"> 
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              
              {/* Admin Routes */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/employees" element={<Employees />} />

                <Route path="/settings" element={<Settings />} />

              <Route path="/profile" element={<UserProfile />} />
              <Route path="/employee-profile" element={<EmployeeProfileView />} />
              {/* <Route path="/attendance" element={<AttendanceLeaveRequest />} /> */}
                <Route path="/manager/attendance" element={<AttendanceLeaveRequest />} />
              
           {/* If you enter an incorrect URL, you will be redirected back to the Dashboard */}
              <Route path="*" element={<Navigate to="/dashboard" replace />} />

              <Route path="/settings" element={<Settings />} />

              {/* Manager Routes */}
              <Route path="/manager/dashboard" element={<EmployeeDashboard />} />
              <Route path="/manager/employees" element={<EmployeeList />} />
              <Route path="/manager/performance" element={<EmployeePerformance />} />
              <Route path="/manager/attendance" element={<EmployeeAttendance />} />


              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <LayoutWrapper />
    </Router>
  );
}

export default App;