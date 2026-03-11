import React from 'react';
import { Link } from 'react-router-dom'; 
import { MdDashboard } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { BsCalendarCheck } from "react-icons/bs";
import { AiOutlineBarChart } from "react-icons/ai";
import { IoSettings, IoLogOutOutline } from "react-icons/io5";


const navItems = [
  { id: "dashboard",   label: "Dashboard",   icon: MdDashboard,       path: "/manager/dashboard" },
  { id: "employees",   label: "Employees",   icon: FaUsers,           path: "/manager/employees" },
  { id: "attendance",  label: "Attendance",  icon: BsCalendarCheck,   path: "/manager/attendance" },
  { id: "performance", label: "Performance", icon: AiOutlineBarChart, path: "/manager/performance" },
  { id: "settings",    label: "Settings",    icon: IoSettings,        path: "/manager/settings" },
];

const ManagerSidebar = ({ activePage, setActivePage }) => {
  return (
    <aside className="w-full h-full bg-white flex flex-col py-8 px-5 shrink-0 border-r border-slate-100 relative">
      
      {/* 1. Logo Section */}
      <div className="flex flex-col items-center mb-10 px-2">
        <img
          src="/logo.png"
          alt="Advera HR Logo"
          className="w-32 h-auto object-contain"
        />
        <div className="mt-4 text-center">
            <h3 className="text-[15px] font-extrabold text-slate-800 leading-none tracking-tight">Manager View</h3>
            <p className="text-[10px] font-bold text-slate-400 mt-1.5 uppercase tracking-[0.15em]">Advera HR</p>
        </div>
      </div>

      {/* 2. Navigation Section */}
      <nav className="flex flex-col gap-2 flex-1 overflow-y-auto custom-scrollbar">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;
          
          return (
            
            <Link
              key={item.id}
              to={item.path}
              onClick={() => setActivePage(item.id)}
              className={`group flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] font-bold transition-all duration-300 ${
                isActive
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-100 translate-x-1"
                  : "text-slate-500 hover:bg-slate-50 hover:text-indigo-600 hover:pl-6"
              }`}
            >
              <Icon 
                size={20} 
                className={`transition-colors duration-300 ${
                  isActive ? "text-white" : "text-slate-400 group-hover:text-indigo-600"
                }`} 
              />
              <span className="tracking-tight">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* 3. Logout Section */}
      <div className="mt-auto pt-6 border-t border-slate-50">
        <Link 
          to="/login" 
          className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 active:scale-95 rounded-xl transition-all border border-rose-100 group"
        >
          <IoLogOutOutline size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span>Logout</span>
        </Link>
      </div>
    </aside>
  );
};

export default ManagerSidebar;