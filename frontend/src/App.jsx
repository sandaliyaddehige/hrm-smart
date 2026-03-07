
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; 
import Sidebar from './components/Admin/Sidebar';
import TopNav from './components/Admin/TopNav'; 
import Dashboard from './pages/Dashboard';
import Employees from './pages/Employees';
//import Settings from './pages/Settings';


function App() {
  return (
    <Router>
      <div className="dashboard-layout" style={{ display: 'flex' }}>
      
        <Sidebar />

      
        <div className="main-viewport" style={{ flex: 1, marginLeft: '260px', display: 'flex', flexDirection: 'column' }}>
          
        
          <TopNav title="Admin Dashboard" /> 

    
          <div className="content-area" style={{ padding: '20px 40px' }}>
            <Routes>
            {/* --- Most important change: If someone comes to "/" (the root), the Dashboard will be shown to them --- */}
              <Route path="/" element={<Navigate to="/dashboard" replace />} />

              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/employees" element={<Employees />} />
                <Route path="/settings" element={<Settings />} />
              
           {/* If you enter an incorrect URL, you will be redirected back to the Dashboard */}
              <Route path="*" element={<Navigate to="/dashboard" replace />} />

            </Routes>
          </div>
          
        </div>
      </div>
    </Router>
  );
}

export default App;