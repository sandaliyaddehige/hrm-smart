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
    <div className="w-[260px] h-screen bg-white border-r border-slate-100 flex flex-col fixed left-0 top-0 z-[1000] shadow-[4px_0_15px_rgba(0,0,0,0.02)] p-[30px_20px]">
      
      {/* 1. Brand Section */}
      <div className="flex items-center gap-[15px] p-[10px] mb-5">
        <img src={logo} alt="Logo" className="w-10 object-contain" />
        <div className="brand-text">
          <h3 className="font-extrabold text-[#1e293b] text-base m-0 tracking-tight">Admin view</h3>
          <p className="text-xs font-bold text-slate-400 m-0">ADVERA HR</p>
        </div>
      </div>

      {/* 2. Menu Section */}
      <nav className="mt-[30px] flex flex-col gap-2 overflow-y-auto custom-scrollbar">
        {menuItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          return (
            <Link 
              key={index} 
              to={item.path} 
              className={`flex items-center gap-3 px-[15px] py-3 rounded-xl font-semibold text-[15px] transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group ${
                isActive 
                ? 'bg-[#4f46e5] text-white shadow-[0_10px_15px_-3px_rgba(79,70,229,0.3)]' 
                : 'text-[#64748b] hover:bg-[#f8fafc] hover:text-[#4f46e5] hover:translate-x-2'
              }`}
            >
              <span className={`text-lg transition-transform duration-300 group-hover:scale-110 ${isActive ? 'text-white' : 'text-[#64748b]'}`}>
                {item.icon}
              </span>
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* 3. Footer / Logout */}
      <div className="mt-auto pb-5">
        <button className="w-full flex items-center justify-center gap-[10px] py-3 rounded-xl font-bold bg-[#fff0f0] text-[#ff4d4d] border border-[#fee2e2] transition-all duration-300 hover:bg-[#ffeded] hover:-translate-y-0.5 hover:shadow-[0_4px_10px_rgba(255,77,77,0.15)]">
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;