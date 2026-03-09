import React, { useState } from 'react';
import { FaCamera, FaUser, FaLock, FaEnvelope, FaPhone, FaCrown, FaMoon, FaSun } from 'react-icons/fa';

const Settings = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div className="p-4 md:p-8 min-h-screen bg-slate-50/50">
      {/* --- Header Section --- */}
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-800 tracking-tight">Settings</h1>
        <p className="text-slate-500 font-medium">Manage your account settings and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* --- LEFT COLUMN (Profile & Summary) --- */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Profile Card */}
          <div className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm text-center">
            <div className="relative w-32 h-32 mx-auto mb-4">
              <img 
                src="https://ui-avatars.com/api/?name=Admin&background=4f46e5&color=fff&size=128" 
                alt="Admin" 
                className="w-full h-full rounded-[40px] object-cover ring-4 ring-indigo-50 shadow-md" 
              />
              <label className="absolute bottom-0 right-0 w-10 h-10 bg-[#4f46e5] text-white rounded-2xl flex items-center justify-center cursor-pointer hover:scale-110 transition-transform shadow-lg border-4 border-white">
                <FaCamera size={14} />
                <input type="file" className="hidden" />
              </label>
            </div>
            <h3 className="text-xl font-bold text-slate-800">System Admin</h3>
            <p className="text-indigo-600 font-bold text-xs uppercase tracking-widest mb-6">Superuser</p>
            <button className="w-full py-3 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-2xl font-bold text-sm transition-colors border border-slate-100">
              Change Picture
            </button>
          </div>

          {/* Info & Preferences Card */}
          <div className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm space-y-8">
            <section>
              <h4 className="flex items-center gap-2 text-sm font-black text-slate-400 uppercase tracking-wider mb-4">
                <FaUser size={12} /> Information
              </h4>
              <div className="space-y-4">
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-slate-400">Name:</span>
                  <span className="text-slate-700">Sandali Perera</span>
                </div>
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-slate-400">Email:</span>
                  <span className="text-slate-700">admin@hrms.com</span>
                </div>
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-slate-400">Plan:</span>
                  <span className="bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-tighter flex items-center gap-1">
                    <FaCrown size={10} /> Enterprise
                  </span>
                </div>
              </div>
            </section>

            <section className="pt-8 border-t border-slate-50">
              <h4 className="text-sm font-black text-slate-400 uppercase tracking-wider mb-4">Preferences</h4>
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                <div className="flex items-center gap-3">
                  {isDarkMode ? <FaMoon className="text-indigo-600" /> : <FaSun className="text-amber-500" />}
                  <span className="text-sm font-bold text-slate-700">Display Theme</span>
                </div>
                <button 
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className={`w-12 h-6 rounded-full transition-all relative ${isDarkMode ? 'bg-indigo-600' : 'bg-slate-300'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${isDarkMode ? 'left-7' : 'left-1'}`} />
                </button>
              </div>
            </section>
          </div>
        </div>

        {/* --- RIGHT COLUMN (User Settings Form) --- */}
        <div className="lg:col-span-8">
          <div className="bg-white rounded-[32px] p-8 md:p-10 border border-slate-100 shadow-sm">
            <h2 className="text-2xl font-black text-slate-800 mb-8">User Settings</h2>
            
            <div className="space-y-10">
              {/* Details Section */}
              <section className="space-y-6">
                <h4 className="text-xs font-black text-indigo-600 uppercase tracking-[0.2em]">Profile Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 ml-1">First Name</label>
                    <input type="text" placeholder="Sandali" className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-indigo-500/20 font-medium text-slate-700" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 ml-1">Last Name</label>
                    <input type="text" placeholder="Perera" className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-indigo-500/20 font-medium text-slate-700" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 ml-1">Email Address</label>
                    <div className="relative">
                      <FaEnvelope className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" />
                      <input type="email" placeholder="admin@hrms.com" className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-12 pr-6 focus:ring-2 focus:ring-indigo-500/20 font-medium text-slate-700" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 ml-1">Contact Number</label>
                    <div className="flex gap-2">
                      <span className="bg-slate-100 px-4 py-4 rounded-2xl text-slate-500 font-bold text-sm flex items-center">+94</span>
                      <input type="text" placeholder="77 123 4567" className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-indigo-500/20 font-medium text-slate-700" />
                    </div>
                  </div>
                </div>
                <button className="bg-[#4f46e5] hover:bg-[#4338ca] text-white px-8 py-4 rounded-2xl font-bold text-sm shadow-lg shadow-indigo-100 transition-all active:scale-95">
                  Save General Changes
                </button>
              </section>

              {/* Password Section */}
              <section className="pt-10 border-t border-slate-100 space-y-6">
                <h4 className="text-xs font-black text-rose-500 uppercase tracking-[0.2em]">Security & Password</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 ml-1">Current Password</label>
                    <input type="password" placeholder="••••••••" className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-rose-500/10 font-medium text-slate-700" />
                  </div>
                  <div className="space-y-2 no-label md:pt-6">
                    <input type="password" placeholder="Confirm Current Password" className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-rose-500/10 font-medium text-slate-700" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 ml-1">New Password</label>
                    <input type="password" placeholder="New Password" className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-indigo-500/20 font-medium text-slate-700" />
                  </div>
                  <div className="space-y-2 no-label md:pt-6">
                    <input type="password" placeholder="Confirm New Password" className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-indigo-500/20 font-medium text-slate-700" />
                  </div>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <button className="bg-slate-800 hover:bg-black text-white px-8 py-4 rounded-2xl font-bold text-sm shadow-lg shadow-slate-100 transition-all active:scale-95">
                    Update Password
                  </button>
                  <a href="#" className="text-indigo-600 text-xs font-bold hover:underline">Forgot your password?</a>
                </div>
              </section>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Settings;