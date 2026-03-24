import React from 'react';
import { FaSearch, FaBell, FaUserCircle } from 'react-icons/fa';

const HrTopNav = () => {
    return (
        <div className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-100 flex items-center justify-between px-10 sticky top-0 z-10">
            <div className="relative w-96">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                <input 
                    type="text" 
                    placeholder="Search for employees or tasks..." 
                    className="w-full bg-slate-50 border-none rounded-2xl py-3 pl-12 pr-4 text-sm focus:ring-2 focus:ring-indigo-100 transition-all"
                />
            </div>

            <div className="flex items-center gap-6">
                <button className="relative text-slate-400 hover:text-indigo-600 transition-all">
                    <FaBell size={20} />
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
                </button>
                
                <div className="flex items-center gap-3 pl-6 border-l border-slate-100">
                    <div className="text-right">
                        <p className="text-sm font-black text-slate-800"></p>
                        <p className="text-[10px] font-bold text-indigo-500 uppercase">HR STAFF</p>
                    </div>
                    <FaUserCircle size={35} className="text-slate-200" />
                </div>
            </div>
        </div>
    );
};

export default HrTopNav;