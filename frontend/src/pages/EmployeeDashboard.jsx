import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Label } from 'recharts'
import { FaUsers, FaUserCheck, FaUserClock, FaClipboardList } from 'react-icons/fa'

const barData = [
  { month: 'Jan', value: 110 }, { month: 'Feb', value: 125 }, { month: 'Mar', value: 138 },
  { month: 'Apr', value: 118 }, { month: 'May', value: 150 }, { month: 'Jun', value: 40  },
]
const pieData = [
  { name: 'Engineering', value: 40 }, { name: 'Sales', value: 30 },
  { name: 'HR', value: 15 },          { name: 'Other', value: 15 },
]
const PIE_COLORS = ['#4f46e5', '#6366f1', '#a5b4fc', '#e0e7ff']

const activities = [
  { initials: 'AJ', name: 'Alice Johnson', action: 'Performance Review Submitted', date: 'Jun 15, 2026', status: 'APPROVED',     sc: 'text-emerald-600', sb: 'bg-emerald-50' },
  { initials: 'BS', name: 'Bob Smith',     action: 'Onboarding Completed',         date: 'Jun 14, 2026', status: 'PENDING',      sc: 'text-indigo-600',  sb: 'bg-indigo-50'  },
  { initials: 'CD', name: 'Carla Diaz',    action: 'Leave Request (Sick)',         date: 'Jun 14, 2026', status: 'UNDER REVIEW', sc: 'text-amber-600',   sb: 'bg-amber-50'   },
]

const statCards = [
  { title: 'Total Employees', value: '150', trend: '↑ 2% vs Last Month', icon: FaUsers,         bg: 'bg-indigo-600',  shadow: 'shadow-indigo-200' },
  { title: 'Present Today',   value: '120', trend: '80% Attendance Rate', icon: FaUserCheck,     bg: 'bg-emerald-500', shadow: 'shadow-emerald-200' },
  { title: 'On Leave',        value: '15',  trend: '10% Total Workforce', icon: FaUserClock,     bg: 'bg-amber-500',   shadow: 'shadow-amber-200' },
  { title: 'Pending Reviews', value: '8',   trend: 'Requires Action',     icon: FaClipboardList, bg: 'bg-rose-500',    shadow: 'shadow-rose-200' },
]

export default function EmployeeDashboard() {
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
          <h3 className="text-base font-bold text-slate-800 mb-5">Monthly Attendance Overview</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} barCategoryGap="40%">
                <defs>
                  <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%"   stopColor="#4f46e5" />
                    <stop offset="100%" stopColor="#818cf8" />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} domain={[0, 160]} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }} />
                <Bar dataKey="value" fill="url(#barGrad)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-7 border border-slate-200 shadow-sm">
          <h3 className="text-base font-bold text-slate-800 mb-4">Department Distribution</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} innerRadius={55} outerRadius={75} paddingAngle={6} dataKey="value">
                  {pieData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} strokeWidth={0} />)}
                  <Label value="150" position="center" fill="#1e293b" style={{ fontSize: '20px', fontWeight: '800' }} />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 mt-3">
            {pieData.map((d, i) => (
              <div key={i} className="flex items-center justify-between text-xs font-semibold text-slate-500">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: PIE_COLORS[i] }} />
                  {d.name}
                </div>
                <span className="font-bold text-slate-700">{d.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
        <h3 className="text-lg font-extrabold text-slate-800 mb-5">Recent Activities</h3>
        <table className="w-full border-separate border-spacing-y-2">
          <thead>
            <tr className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
              <th className="px-5 pb-2 text-left">Employee</th>
              <th className="px-5 pb-2 text-left">Action</th>
              <th className="px-5 pb-2 text-left">Date</th>
              <th className="px-5 pb-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((a, i) => (
              <tr key={i} className="group">
                <td className="px-5 py-3.5 bg-slate-50 rounded-l-2xl border-y border-l border-slate-100 group-hover:bg-white group-hover:shadow-md transition-all">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-indigo-50 flex items-center justify-center text-[11px] font-extrabold text-indigo-600 shrink-0">{a.initials}</div>
                    <span className="font-bold text-indigo-600 text-sm">{a.name}</span>
                  </div>
                </td>
                <td className="px-5 py-3.5 bg-slate-50 border-y border-slate-100 text-slate-600 text-sm group-hover:bg-white transition-all">{a.action}</td>
                <td className="px-5 py-3.5 bg-slate-50 border-y border-slate-100 text-slate-500 text-sm group-hover:bg-white transition-all">{a.date}</td>
                <td className="px-5 py-3.5 bg-slate-50 rounded-r-2xl border-y border-r border-slate-100 group-hover:bg-white transition-all">
                  <span className={`px-3 py-1.5 rounded-lg text-[10px] font-extrabold ${a.sb} ${a.sc}`}>{a.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}