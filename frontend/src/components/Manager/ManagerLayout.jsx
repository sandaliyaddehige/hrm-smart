import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { MdDashboard } from 'react-icons/md'
import { FaUsers, FaSignOutAlt, FaBell, FaSearch, FaCog } from 'react-icons/fa'
import { BsCalendarCheck } from 'react-icons/bs'
import { AiOutlineBarChart } from 'react-icons/ai'
import logo from '../../assets/logo.webp'

const navItems = [
  { path: '/manager/dashboard',   label: 'Dashboard',   icon: MdDashboard       },
  { path: '/manager/employees',   label: 'Employees',   icon: FaUsers           },
  { path: '/manager/attendance',  label: 'Attendance',  icon: BsCalendarCheck   },
  { path: '/manager/performance', label: 'Performance', icon: AiOutlineBarChart },
  { path: '/settings',            label: 'Settings',    icon: FaCog             },
]

export default function ManagerLayout({ children }) {
  const navigate = useNavigate()
  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden font-sans">

      {/* Sidebar */}
      <aside className="w-[260px] min-w-[260px] h-screen bg-white border-r border-slate-100 flex flex-col px-5 py-8 shadow-[4px_0_15px_rgba(0,0,0,0.02)]">

        {/* Logo */}
        <div className="flex items-center gap-3 px-2 mb-6">
          <img src={logo} alt="logo" className="w-10 object-contain" />
          <div>
            <h3 className="font-extrabold text-slate-800 text-[15px] m-0 tracking-tight">Manager View</h3>
            <p className="text-[11px] font-bold text-slate-400 m-0">ADVERA HR</p>
          </div>
        </div>

        {/* Switch */}
        <button onClick={() => navigate('/dashboard')}
          className="w-full py-2 text-xs font-bold text-slate-400 border border-slate-200 rounded-xl bg-slate-50 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 transition-all mb-4 cursor-pointer">
          ← Switch to Admin
        </button>

        {/* Nav */}
        <nav className="flex flex-col gap-1.5 flex-1 overflow-y-auto custom-scrollbar mt-2">
          {navItems.map(({ path, label, icon: Icon }) => (
            <NavLink key={path} to={path} end
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-[15px] transition-all duration-200 no-underline ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-[0_8px_16px_rgba(79,70,229,0.3)]'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-indigo-600 hover:translate-x-1'
                }`
              }>
              <Icon size={17} />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <button className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-sm text-red-500 bg-red-50 border border-red-100 hover:bg-red-100 hover:-translate-y-0.5 transition-all cursor-pointer mt-4">
          <FaSignOutAlt /> Logout
        </button>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* TopNav */}
        <header className="flex items-center justify-between px-8 py-4 bg-white/80 backdrop-blur-md border-b border-slate-100 shrink-0">
          <h1 className="text-xl font-extrabold text-slate-800 tracking-tight m-0">HRM Smart Portal</h1>
          <div className="flex items-center gap-5">
            <div className="flex items-center bg-slate-100 rounded-2xl px-4 py-2.5 w-64 focus-within:bg-white focus-within:ring-2 focus-within:ring-indigo-200 transition-all">
              <FaSearch className="text-slate-400 text-sm shrink-0" />
              <input type="text" placeholder="Search data..." className="bg-transparent border-none outline-none ml-3 text-sm font-medium text-slate-600 w-full placeholder:text-slate-400" />
            </div>
            <button className="relative text-slate-500 hover:text-indigo-600 transition-colors text-xl">
              <FaBell />
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
            </button>
            <div className="flex items-center gap-2.5 pl-4 border-l border-slate-200">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-indigo-400 flex items-center justify-center text-white text-xs font-bold shadow-md">AR</div>
              <span className="text-sm font-bold text-slate-700">Alex Rivera</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          {children}
        </main>
      </div>
    </div>
  )
}