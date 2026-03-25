import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

import AdminLayout   from './components/Admin/AdminLayout'
import ManagerLayout from './components/Manager/ManagerLayout'

import AdminDashboard  from './pages/AdminDashboard'
import AdminEmployees  from './pages/AdminEmployees'
import AdminSettings   from './pages/AdminSettings'

import EmployeeDashboard   from './pages/EmployeeDashboard'
import EmployeeList        from './pages/EmployeeList'
import EmployeePerformance from './pages/EmployeePerformance'
import EmployeeAttendance  from './pages/EmployeeAttendance'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* Admin */}
        <Route path="/dashboard" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
        <Route path="/employees" element={<AdminLayout><AdminEmployees /></AdminLayout>} />
        <Route path="/settings"  element={<AdminLayout><AdminSettings /></AdminLayout>} />

        {/* Manager */}
        <Route path="/manager/dashboard"   element={<ManagerLayout><EmployeeDashboard /></ManagerLayout>} />
        <Route path="/manager/employees"   element={<ManagerLayout><EmployeeList /></ManagerLayout>} />
        <Route path="/manager/performance" element={<ManagerLayout><EmployeePerformance /></ManagerLayout>} />
        <Route path="/manager/attendance"  element={<ManagerLayout><EmployeeAttendance /></ManagerLayout>} />

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  )
}