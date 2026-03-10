import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; 

// Components
import Sidebar from './components/Admin/Sidebar';
import TopNav from './components/Admin/TopNav'; 

// Admin Pages 
import Dashboard from './pages/Dashboard';
import Employees from './pages/Employees';
import Settings from './pages/Settings';

// Manager Pages 
import EmployeeDashboard from "./pages/EmployeeDashboard";
import EmployeeList from "./pages/EmployeeList";
import EmployeePerformance from "./pages/EmployeePerformance";
import EmployeeAttendance from "./pages/EmployeeAttendance";

function App() {
  return (
    <Router>
      <div className="flex h-screen w-full bg-[#f8fafc] font-sans overflow-hidden">
        
        {/* Sidebar */}
        <aside className="w-64 h-full flex-shrink-0 border-r border-gray-100">
          <Sidebar />
        </aside>

        <div className="flex-1 flex flex-col min-w-0 h-full">
          
          {/* Top Navigation */}
          <TopNav title="HRM Smart Portal" /> 

          <main className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
            <div className="max-w-[1400px] mx-auto">
              <Routes>
                {/* Default Redirection */}
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                
                {/* Admin Routes */}
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/employees" element={<Employees />} />
                <Route path="/settings" element={<Settings />} />

                {/* Manager Routes */}
                <Route path="/manager/dashboard" element={<EmployeeDashboard />} />
                <Route path="/manager/employees" element={<EmployeeList />} />
                <Route path="/manager/performance" element={<EmployeePerformance />} />
                <Route path="/manager/attendance" element={<EmployeeAttendance />} />

                {/* 404 - Redirect to dashboard */}
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;