import React from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Label } from 'recharts'
import { FaUsers, FaUserCheck, FaUserClock, FaClipboardList } from 'react-icons/fa'

const payrollData = [
  { month: 'Jan', amount: 4500 }, { month: 'Feb', amount: 5200 },
  { month: 'Mar', amount: 4800 }, { month: 'Apr', amount: 6100 },
  { month: 'May', amount: 5500 }, { month: 'Jun', amount: 6700 },
]
const attendanceData = [
  { name: 'Present', value: 120 },
  { name: 'On Leave', value: 15 },
  { name: 'Absent', value: 15 },
]
const ATT_COLORS = ['#4f46e5', '#f59e0b', '#ef4444']

const statCards = [
  { title: 'Total Employees',   value: '150', trend: '+ 2% vs Last Month', icon: FaUsers,         bg: 'bg-indigo-600',  shadow: 'shadow-indigo-200' },
  { title: 'Present Today',     value: '120', trend: '80% Attendance Rate', icon: FaUserCheck,     bg: 'bg-emerald-500', shadow: 'shadow-emerald-200' },
  { title: 'On Leave',          value: '15',  trend: '10% Total Workforce', icon: FaUserClock,     bg: 'bg-amber-500',   shadow: 'shadow-amber-200' },
  { title: 'Pending Approvals', value: '8',   trend: 'Requires Action',     icon: FaClipboardList, bg: 'bg-rose-500',    shadow: 'shadow-rose-200' },
]

const pendingRows = [
  { name: 'Alice Johnson', type: 'Vacation Leave', date: 'Jun 15, 2026' },
  { name: 'Bob Smith',     type: 'Personal Leave',  date: 'Jun 14, 2026' },
  { name: 'John Doe',      type: 'Sick Leave',       date: 'Jun 13, 2026' },
]

export default function AdminDashboard() {
  return (
    <div className="space-y-6">

      {/* Stat Cards */}
      <div className="grid grid-cols-4 gap-5">
        {statCards.map((card, i) => {
          const Icon = card.icon
          return (
            <div key={i} className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
              <div className={`w-14 h-14 ${card.bg} rounded-2xl flex items-center justify-center text-white text-xl shrink-0 shadow-lg ${card.shadow}`}>
                <Icon />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">{card.title}</p>
                <h2 className="text-2xl font-extrabold text-slate-900 mb-0.5">{card.value}</h2>
                <p className="text-[11px] text-slate-400 font-semibold">{card.trend}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-3 gap-5">
        <div className="col-span-2 bg-white rounded-3xl p-7 border border-slate-200 shadow-sm">
          <h3 className="text-base font-bold text-slate-800 mb-5">Payroll Overview</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={payrollData}>
                <defs>
                  <linearGradient id="payGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#4f46e5" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}   />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }} />
                <Area type="monotone" dataKey="amount" stroke="#4f46e5" fill="url(#payGrad)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-7 border border-slate-200 shadow-sm">
          <h3 className="text-base font-bold text-slate-800 mb-4">Attendance Rate</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={attendanceData} innerRadius={60} outerRadius={80} paddingAngle={6} dataKey="value">
                  {attendanceData.map((_, i) => <Cell key={i} fill={ATT_COLORS[i]} strokeWidth={0} />)}
                  <Label value="150" position="center" fill="#1e293b" style={{ fontSize: '22px', fontWeight: '800' }} />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 mt-2">
            {attendanceData.map((d, i) => (
              <div key={i} className="flex items-center justify-between text-xs font-semibold text-slate-500">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: ATT_COLORS[i] }} />
                  {d.name}
                </div>
                <span className="font-bold text-slate-700">{d.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pending Approvals */}
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
        <h3 className="text-lg font-extrabold text-slate-800 mb-5">Pending Approvals</h3>
        <table className="w-full border-separate border-spacing-y-2">
          <thead>
            <tr className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
              <th className="px-5 pb-2 text-left">Employee</th>
              <th className="px-5 pb-2 text-left">Leave Type</th>
              <th className="px-5 pb-2 text-left">Date</th>
              <th className="px-5 pb-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {pendingRows.map((row, i) => (
              <tr key={i} className="group">
                <td className="px-5 py-3.5 bg-slate-50 rounded-l-2xl border-y border-l border-slate-100 font-bold text-indigo-600 text-sm group-hover:bg-white group-hover:shadow-md transition-all">{row.name}</td>
                <td className="px-5 py-3.5 bg-slate-50 border-y border-slate-100 text-slate-600 text-sm group-hover:bg-white transition-all">{row.type}</td>
                <td className="px-5 py-3.5 bg-slate-50 border-y border-slate-100 text-slate-500 text-sm group-hover:bg-white transition-all">{row.date}</td>
                <td className="px-5 py-3.5 bg-slate-50 rounded-r-2xl border-y border-r border-slate-100 group-hover:bg-white transition-all">
                  <span className="px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-lg text-[10px] font-extrabold">PENDING</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}