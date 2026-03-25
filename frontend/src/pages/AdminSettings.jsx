import React, { useState } from 'react'
import { FaCamera, FaUser, FaCrown, FaMoon, FaSun, FaEnvelope } from 'react-icons/fa'

export default function AdminSettings() {
  const [isDark, setIsDark] = useState(false)

  const inputCls = "w-full bg-slate-50 rounded-xl py-3.5 px-5 text-sm font-medium text-slate-700 outline-none focus:ring-2 focus:ring-indigo-200 border-none"

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-800 tracking-tight">Settings</h1>
        <p className="text-sm text-slate-500 font-medium">Manage your account settings and preferences</p>
      </div>

      <div className="grid grid-cols-12 gap-6 items-start">

        {/* Left */}
        <div className="col-span-4 space-y-5">

          {/* Profile Card */}
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm text-center">
            <div className="relative w-28 h-28 mx-auto mb-4">
              <img src="https://ui-avatars.com/api/?name=Admin&background=4f46e5&color=fff&size=128" alt="Admin"
                className="w-28 h-28 rounded-3xl object-cover shadow-md ring-4 ring-indigo-50" />
              <label className="absolute -bottom-1 -right-1 w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center cursor-pointer text-white shadow-lg border-2 border-white hover:bg-indigo-700 transition-colors">
                <FaCamera size={12} />
                <input type="file" className="hidden" />
              </label>
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-0.5">System Admin</h3>
            <p className="text-[10px] font-extrabold text-indigo-600 uppercase tracking-widest mb-5">Superuser</p>
            <button className="w-full py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-xl font-bold text-sm border border-slate-100 transition-colors cursor-pointer">
              Change Picture
            </button>
          </div>

          {/* Info Card */}
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm space-y-6">
            <div>
              <h4 className="flex items-center gap-2 text-[11px] font-black text-slate-400 uppercase tracking-wider mb-4">
                <FaUser size={10} /> Information
              </h4>
              <div className="space-y-3">
                {[['Name', 'Sandali Perera'], ['Email', 'admin@hrms.com']].map(([l, v]) => (
                  <div key={l} className="flex justify-between text-sm font-medium">
                    <span className="text-slate-400">{l}:</span>
                    <span className="text-slate-700 font-semibold">{v}</span>
                  </div>
                ))}
                <div className="flex justify-between text-sm font-medium items-center">
                  <span className="text-slate-400">Plan:</span>
                  <span className="bg-indigo-50 text-indigo-600 px-2.5 py-1 rounded-lg text-[10px] font-black flex items-center gap-1">
                    <FaCrown size={9} /> Enterprise
                  </span>
                </div>
              </div>
            </div>
            <div className="border-t border-slate-50 pt-5">
              <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-wider mb-3">Preferences</h4>
              <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl">
                <div className="flex items-center gap-2.5">
                  {isDark ? <FaMoon className="text-indigo-600" /> : <FaSun className="text-amber-500" />}
                  <span className="text-sm font-bold text-slate-700">Display Theme</span>
                </div>
                <button onClick={() => setIsDark(!isDark)}
                  className={`relative w-11 h-6 rounded-full transition-colors cursor-pointer border-none ${isDark ? 'bg-indigo-600' : 'bg-slate-300'}`}>
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${isDark ? 'left-6' : 'left-1'}`} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="col-span-8 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
          <h2 className="text-xl font-black text-slate-800 mb-7">User Settings</h2>
          <div className="space-y-8">

            {/* Profile Details */}
            <section className="space-y-5">
              <h4 className="text-[11px] font-black text-indigo-600 uppercase tracking-[0.15em]">Profile Details</h4>
              <div className="grid grid-cols-2 gap-5">
                {[['First Name','text','Sandali'],['Last Name','text','Perera']].map(([l,t,p]) => (
                  <div key={l}>
                    <label className="block text-xs font-bold text-slate-500 mb-1.5">{l}</label>
                    <input type={t} placeholder={p} className={inputCls} />
                  </div>
                ))}
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1.5">Email Address</label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 text-sm" />
                    <input type="email" placeholder="admin@hrms.com" className={`${inputCls} pl-11`} />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1.5">Contact Number</label>
                  <div className="flex gap-2">
                    <span className="bg-slate-100 px-3.5 py-3.5 rounded-xl text-slate-500 font-bold text-sm flex items-center shrink-0">+94</span>
                    <input type="text" placeholder="77 123 4567" className={inputCls} />
                  </div>
                </div>
              </div>
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-7 py-3.5 rounded-2xl font-bold text-sm shadow-lg shadow-indigo-200 transition-all active:scale-95 cursor-pointer border-none">
                Save General Changes
              </button>
            </section>

            {/* Password */}
            <section className="pt-7 border-t border-slate-100 space-y-5">
              <h4 className="text-[11px] font-black text-rose-500 uppercase tracking-[0.15em]">Security & Password</h4>
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1.5">Current Password</label>
                  <input type="password" placeholder="••••••••" className={inputCls} />
                </div>
                <div className="pt-6">
                  <input type="password" placeholder="Confirm Current Password" className={inputCls} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1.5">New Password</label>
                  <input type="password" placeholder="New Password" className={inputCls} />
                </div>
                <div className="pt-6">
                  <input type="password" placeholder="Confirm New Password" className={inputCls} />
                </div>
              </div>
              <div className="flex items-center justify-between flex-wrap gap-4">
                <button className="bg-slate-800 hover:bg-black text-white px-7 py-3.5 rounded-2xl font-bold text-sm shadow-lg transition-all active:scale-95 cursor-pointer border-none">
                  Update Password
                </button>
                <a href="#" className="text-indigo-600 text-xs font-bold hover:underline">Forgot your password?</a>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}