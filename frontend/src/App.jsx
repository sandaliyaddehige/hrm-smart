import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Components Imports
import Sidebar from './components/Admin/sidebar';
import TopNav from './components/Admin/TopNav';
import HrSidebar from './components/Hr/Sidebar';
import HrTopNav from './components/Hr/TopNav';
import ManagerSidebar from './components/Manager/Sidebar';
import ManagerTopNav from './components/Manager/TopNav'; 
import EmployeeSidebar from './components/Employee/sidebar'; 
import EmployeeTopNav from './components/Employee/TopNav';

// Pages Imports
import Login from './pages/login';
import Signup from './pages/signup';
import Admindashboard from './pages/Admindashboard';
import HRDashboard from './pages/HRDashboard';
import Managerdashboard from './pages/Managerdashboard'; 
import EmployeeDashboard from './pages/EmployeeDashboard';
import Employees from './pages/Employees';
import Attendance from './pages/Attendance';
import Payroll from './pages/Payroll';
import Recruitment from './pages/Recruitment';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import EmployeePerformance from './pages/EmployeePerformance';

function App() {
  const role = localStorage.getItem("role")?.toLowerCase();
  const token = localStorage.getItem("token");
  const isAuthenticated = !!token;

  // --- Layout Components ---

  const AdminLayout = ({ children }) => (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900">
      <aside className="w-64 fixed inset-y-0 left-0 z-50 bg-white border-r border-slate-200"><Sidebar /></aside>
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-100"><TopNav /></header>
        <main className="p-8"><div className="max-w-[1400px] mx-auto">{children}</div></main>
      </div>
    </div>
  );

  const HrLayout = ({ children }) => (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      <aside className="w-64 fixed inset-y-0 left-0 z-50 bg-white border-r border-slate-200"><HrSidebar /></aside>
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        <header className="sticky top-0 z-40 bg-white border-b border-slate-100"><HrTopNav /></header>
        <main className="p-8"><div className="max-w-[1400px] mx-auto">{children}</div></main>
      </div>
    </div>
  );

  // 3. Manager Layout 
const ManagerLayout = ({ children }) => (
  <div className="flex min-h-screen bg-slate-50 font-sans">
    <aside className="w-64 fixed inset-y-0 left-0 z-50">
      <ManagerSidebar />
    </aside>
    <div className="flex-1 ml-64 flex flex-col min-h-screen">
      <header className="sticky top-0 z-40 bg-white border-b border-slate-100">
      
        <ManagerTopNav /> 
      </header>
      <main className="p-8">
        <div className="max-w-[1400px] mx-auto">{children}</div>
      </main>
    </div>
  </div>
);
  const EmployeeLayout = ({ children }) => (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      <aside className="w-64 fixed inset-y-0 left-0 z-50 bg-white border-r border-slate-200"><EmployeeSidebar /></aside>
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        <header className="sticky top-0 z-40 bg-white border-b border-slate-100"><EmployeeTopNav /></header>
        <main className="p-8"><div className="max-w-[1400px] mx-auto">{children}</div></main>
      </div>
    </div>
  );

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Dashboards */}
        <Route path="/Admindashboard" element={isAuthenticated && role === 'admin' ? <AdminLayout><Admindashboard /></AdminLayout> : <Navigate to="/login" />} />
        <Route path="/HRDashboard" element={isAuthenticated && role === 'hr' ? <HrLayout><HRDashboard /></HrLayout> : <Navigate to="/login" />} />
        <Route path="/ManagerDashboard" element={isAuthenticated && role === 'manager' ? <ManagerLayout><Managerdashboard /></ManagerLayout> : <Navigate to="/login" />} />
        <Route path="/EmployeeDashboard" element={isAuthenticated && role === 'employee' ? <EmployeeLayout><EmployeeDashboard /></EmployeeLayout> : <Navigate to="/login" />} />

        {/* Shared Pages  */}
        
        <Route path="/employees" element={
          isAuthenticated && (role === 'admin' || role === 'hr' || role === 'manager') ? 
          (role === 'admin' ? <AdminLayout><Employees /></AdminLayout> : role === 'manager' ? <ManagerLayout><Employees /></ManagerLayout> : <HrLayout><Employees /></HrLayout>) 
          : <Navigate to="/login" />} 
        />

        <Route path="/recruitment" element={
          isAuthenticated && (role === 'admin' || role === 'hr' || role === 'manager') ? 
          (role === 'admin' ? <AdminLayout><Recruitment /></AdminLayout> : role === 'manager' ? <ManagerLayout><Recruitment /></ManagerLayout> : <HrLayout><Recruitment /></HrLayout>) 
          : <Navigate to="/login" />} 
        />

        <Route path="/payroll" element={
          isAuthenticated && (role === 'admin' || role === 'hr' || role === 'manager') ? 
          (role === 'admin' ? <AdminLayout><Payroll /></AdminLayout> : role === 'manager' ? <ManagerLayout><Payroll /></ManagerLayout> : <HrLayout><Payroll /></HrLayout>) 
          : <Navigate to="/login" />} 
        />

       
          <Route  path="/attendance" element={
          isAuthenticated && (role === 'admin' || role === 'hr' || role === 'manager' || role === 'employee') ? (
            role === 'admin' ? <AdminLayout><Attendance /></AdminLayout> : 
            role === 'hr' ? <HrLayout><Attendance /></HrLayout> : 
            role === 'manager' ? <ManagerLayout><Attendance /></ManagerLayout> : 
          <EmployeeLayout><Attendance /></EmployeeLayout>
    ) : (
      <Navigate to="/login" />
    )
  } 
/>
        <Route path="/reports" element={
          isAuthenticated && (role === 'admin' || role === 'hr') ? 
          (role === 'admin' ? <AdminLayout><Reports /></AdminLayout> : <HrLayout><Reports /></HrLayout>) 
          : <Navigate to="/login" />} 
        />

        <Route path="/employeeperformance" element={
          isAuthenticated && (role === 'manager' || role === 'employee') ? 
          (role === 'manager' ? <ManagerLayout><EmployeePerformance /></ManagerLayout> : <EmployeeLayout><EmployeePerformance /></EmployeeLayout>) 
          : <Navigate to="/login" />} 
        />

        <Route path="/settings" element={
          isAuthenticated ? 
          (role === 'admin' ? <AdminLayout><Settings /></AdminLayout> : role === 'hr' ? <HrLayout><Settings /></HrLayout> : role === 'manager' ? <ManagerLayout><Settings /></ManagerLayout> : <EmployeeLayout><Settings /></EmployeeLayout>) 
          : <Navigate to="/login" />} 
        />

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;