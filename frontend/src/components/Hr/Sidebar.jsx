import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
    FaThLarge, FaUsers, FaMoneyCheckAlt, FaCalendarCheck, 
    FaUserPlus, FaCog, FaSignOutAlt 
} from 'react-icons/fa';

const HrSidebar = () => {
    // --- Logout Function ---
    const handleLogout = () => {
        localStorage.clear(); 
        window.location.href = '/login'; 
    };

    
    const menuItems = [
        { name: 'Dashboard', icon: <FaThLarge />, path: '/HRDashboard' },
        { name: 'Employees', icon: <FaUsers />, path: '/Employees' },
       { name: 'Payroll', icon: <FaMoneyCheckAlt />, path: '/payroll' },
        { name: 'Attendance', icon: <FaCalendarCheck />, path: '/attendance' },
        { name: 'Recruitment', icon: <FaUserPlus />, path: '/recruitment' },
        { name: 'Settings', icon: <FaCog />, path: '/settings' },
       
    ];

    return (
        <div className="h-screen w-64 bg-white border-r border-slate-100 flex flex-col shadow-sm fixed left-0 top-0">
            
          
            <div className="p-6">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                        H
                    </div>
                    <div>
                        <h1 className="text-sm font-bold text-slate-800 leading-none">HRM SMART</h1>
                        <p className="text-[10px] text-slate-400 font-medium tracking-wider uppercase mt-1">HR STAFF</p>
                    </div>
                </div>
            </div>

            {/* Navigation Links - Admin Style (Simple Indigo-50 background) */}
            <nav className="flex-1 px-4 space-y-1 mt-4">
                {menuItems.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group ${
                                isActive 
                                ? 'bg-indigo-50 text-indigo-600' 
                                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                            }`
                        }
                    >
                        <span className="text-lg">{item.icon}</span>
                        <span className="text-sm font-semibold">{item.name}</span>
                    </NavLink>
                ))}
            </nav>

           
            <div className="p-4 border-t border-slate-50">
                <button 
                    onClick={handleLogout}
                    className="w-full flex items-center gap-4 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-all duration-200 font-semibold text-sm cursor-pointer"
                >
                    <FaSignOutAlt />
                    <span>Logout</span>
                </button>
            </div>
        </div>
    );
};

export default HrSidebar;