import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; 
import Sidebar from './components/Admin/Sidebar';
import TopNav from './components/Admin/TopNav'; 
import Dashboard from './pages/Dashboard';
import Employees from './pages/Employees';
import Settings from './pages/Settings';
//import Payroll from './pages/Payroll'; 
//import Attendance from './pages/Attendance';

function App() {
  return (
    <Router>
  
      <div className="flex h-screen w-full bg-[#f8fafc] overflow-hidden">
        
        
        <aside className="w-64 h-full flex-shrink-0 border-r border-gray-100">
          <Sidebar />
        </aside>

      
        <div className="flex-1 flex flex-col min-w-0 h-full">
          
       
          <TopNav title="Admin Dashboard" /> 

         
          <main className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
            <div className="max-w-[1400px] mx-auto">
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/employees" element={<Employees />} />
                {/*<Route path="/payrolls" element={<Payroll />} />
                <Route path="/attendance" element={<Attendance />} />*/}
                <Route path="/settings" element={<Settings />} />
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