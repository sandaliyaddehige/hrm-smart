import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FaThLarge, FaUsers, FaMoneyBillWave, FaCalendarCheck, 
  FaUserTie, FaFileAlt, FaCog, FaSignOutAlt 
} from 'react-icons/fa';

import logo from '../../assets/logo.webp'; 

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', icon: <FaThLarge />, path: '/dashboard' },
    { name: 'Employees', icon: <FaUsers />, path: '/employees' },
    { name: 'Payrolls', icon: <FaMoneyBillWave />, path: '/payrolls' },
    { name: 'Attendance', icon: <FaCalendarCheck />, path: '/attendance' },
    { name: 'Recruitment', icon: <FaUserTie />, path: '/recruitment' },
    { name: 'Report', icon: <FaFileAlt />, path: '/reports' },
    { name: 'Settings', icon: <FaCog />, path: '/settings' },
  ];

  return (
    
    <div className="w-full h-full bg-white flex flex-col p-6 overflow-hidden">
      
      {/* 2. Brand Section */}
      <div className="flex items-center gap-4 px-2 mb-8">
        <img src={logo} alt="Logo" className="w-10 h-10 object-contain" />
        <div>
          <h3 className="font-extrabold text-[#1e293b] text-base leading-none tracking-tight">Admin view</h3>
          <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider">ADVERA HR</p>
        </div>
      </div>

      {/* 3. Menu Section - Scrollable if items are many */}
      <nav className="flex-1 flex flex-col gap-2 overflow-y-auto pr-1 custom-scrollbar">
        {menuItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          return (
            <Link 
              key={index} 
              to={item.path} 
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-[15px] transition-all duration-300 group ${
                isActive 
                ? 'bg-[#4f46e5] text-white shadow-lg shadow-indigo-200' 
                : 'text-[#64748b] hover:bg-[#f8fafc] hover:text-[#4f46e5] hover:pl-6'
              }`}
            >
              <span className={`text-lg ${isActive ? 'text-white' : 'text-[#94a3b8] group-hover:text-[#4f46e5]'}`}>
                {item.icon}
              </span>
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* 4. Footer / Logout */}
      <div className="mt-auto pt-6 border-t border-slate-50">
        <button className="w-full flex items-center justify-center gap-3 py-3 rounded-xl font-bold bg-[#fff1f2] text-[#e11d48] border border-[#ffe4e6] transition-all hover:bg-[#ffe4e6] active:scale-95">
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;