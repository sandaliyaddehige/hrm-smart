import React from 'react';
import { FaSearch, FaBell } from 'react-icons/fa';

const TopNav = ({ title }) => {
  return (
    <div className="h-20 w-full bg-white border-b border-slate-100 flex items-center justify-between px-8 sticky top-0 z-40 shadow-sm">
      
      {/* Title Section */}
      <h1 className="text-xl font-bold text-[#1e293b] tracking-tight">
        {title || "Admin Dashboard"}
      </h1>

      {/* Right Controls Section */}
      <div className="flex items-center gap-6">
        
        {/* Search Bar */}
        <div className="hidden md:flex items-center bg-[#f8fafc] border border-slate-200 rounded-xl px-4 py-2 w-64 transition-all focus-within:border-indigo-400 focus-within:bg-white focus-within:ring-2 focus-within:ring-indigo-50">
          <FaSearch className="text-slate-400 text-sm" />
          <input 
            type="text" 
            placeholder="Search data..." 
            className="bg-transparent border-none outline-none ml-3 text-sm text-[#1e293b] w-full placeholder:text-slate-400"
          />
        </div>

        {/* Notification Icon */}
        <div className="relative p-2 rounded-xl bg-white border border-slate-100 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 transition-all cursor-pointer group">
          <FaBell className="text-lg" />
          {/* Notification Dot */}
          <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
        </div>

        {/* Vertical Divider */}
        <div className="h-8 w-[1px] bg-slate-200 mx-1"></div>

        {/* User Profile */}
        <div className="flex items-center gap-3 pl-2 group cursor-pointer">
          <div className="flex flex-col items-end hidden sm:flex">
            <span className="text-sm font-bold text-[#1e293b] leading-tight group-hover:text-indigo-600 transition-colors">
              Alex Rivera
            </span>
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
              Administrator
            </span>
          </div>
          
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-indigo-100 group-hover:scale-105 transition-transform">
            AR
          </div>
        </div>

      </div>
    </div>
  );
};

export default TopNav;