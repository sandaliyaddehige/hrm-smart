import { useState } from 'react'
// Importing files from the 'pages' folder based on your terminal output
import Dashboard from './pages/EmployeeDashboard'
import Attendance from './pages/EmployeeAttendance'
import Leave from './pages/AttendanceLeaveRequest'

function App() {
  const [view, setView] = useState('dashboard') 

  return (
    <div className="App">
      {/* Navigation Bar matching Figma blue theme */}
      <nav style={{ 
        padding: '15px', 
        background: '#4F46E5', 
        display: 'flex', 
        gap: '20px', 
        justifyContent: 'center',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)' 
      }}>
        <button 
          onClick={() => setView('dashboard')} 
          style={{ 
            padding: '10px 20px', 
            cursor: 'pointer', 
            borderRadius: '8px', 
            border: 'none', 
            backgroundColor: view === 'dashboard' ? 'white' : 'transparent',
            color: view === 'dashboard' ? '#4F46E5' : 'white',
            fontWeight: 'bold'
          }}
        >
          Dashboard
        </button>
        <button 
          onClick={() => setView('attendance')} 
          style={{ 
            padding: '10px 20px', 
            cursor: 'pointer', 
            borderRadius: '8px', 
            border: 'none', 
            backgroundColor: view === 'attendance' ? 'white' : 'transparent',
            color: view === 'attendance' ? '#4F46E5' : 'white',
            fontWeight: 'bold'
          }}
        >
          Attendance
        </button>
        <button 
          onClick={() => setView('leave')} 
          style={{ 
            padding: '10px 20px', 
            cursor: 'pointer', 
            borderRadius: '8px', 
            border: 'none', 
            backgroundColor: view === 'leave' ? 'white' : 'transparent',
            color: view === 'leave' ? '#4F46E5' : 'white',
            fontWeight: 'bold'
          }}
        >
          Leave Request
        </button>
      </nav>

      {/* Rendering components based on selected view */}
      <main style={{ padding: '20px' }}>
        {view === 'dashboard' && <Dashboard />}
        {view === 'attendance' && <Attendance />}
        {view === 'leave' && <Leave />}
      </main>
    </div>
  )
}

export default App