import { useState } from 'react'

import Dashboard from './pages/EmployeeDashboard'
import Attendance from './Attendance' 
import Leave from './Leave'

function App() {
  const [view, setView] = useState('dashboard')

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      
      <aside className="w-64 bg-indigo-700 text-white flex flex-col">
        <div className="p-6 text-2xl font-bold border-b border-indigo-600">
          Smart HRM
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button 
            onClick={() => setView('dashboard')}
            className={`w-full text-left p-3 rounded-lg transition ${view === 'dashboard' ? 'bg-white text-indigo-700 shadow' : 'hover:bg-indigo-600'}`}
          >
            📊 Dashboard
          </button>
          <button 
            onClick={() => setView('attendance')}
            className={`w-full text-left p-3 rounded-lg transition ${view === 'attendance' ? 'bg-white text-indigo-700 shadow' : 'hover:bg-indigo-600'}`}
          >
            📅 Attendance
          </button>
          <button 
            onClick={() => setView('leave')}
            className={`w-full text-left p-3 rounded-lg transition ${view === 'leave' ? 'bg-white text-indigo-700 shadow' : 'hover:bg-indigo-600'}`}
          >
            📝 Leave Request
          </button>
        </nav>
        <div className="p-4 border-t border-indigo-600 text-sm text-indigo-200">
          Logged in as Nasli
        </div>
      </aside>


      <main className="flex-1 overflow-y-auto p-8">
        <header className="mb-8 flex justify-between items-center bg-white p-4 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold capitalize">{view} View</h2>
          <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold">N</div>
        </header>

        {view === 'dashboard' && <Dashboard />}
        {view === 'attendance' && <Attendance />}
        {view === 'leave' && <Leave />}
      </main>
    </div>
  )
}

export default App