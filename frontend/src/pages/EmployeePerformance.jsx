import React, { useState } from 'react'
import { FaSearch, FaTimes } from 'react-icons/fa'

const employees = [
  { id: 'MGR-001', name: 'Alice Johnson', role: 'Product Manager',  dept: 'Engineering', kpi: 92, tasks: 88, attendance: 98, collaboration: 4, rating: 'Exceeds Expectations' },
  { id: 'MGR-002', name: 'Bob Smith',     role: 'Team Lead',        dept: 'Sales',       kpi: 78, tasks: 82, attendance: 91, collaboration: 3, rating: 'Meets Expectations'   },
  { id: 'MGR-003', name: 'Carla Diaz',    role: 'HR Specialist',    dept: 'HR',          kpi: 85, tasks: 90, attendance: 95, collaboration: 5, rating: 'Outstanding'          },
  { id: 'MGR-004', name: 'David Miller',  role: 'Senior Developer', dept: 'Engineering', kpi: 60, tasks: 65, attendance: 72, collaboration: 2, rating: 'Below Expectations'   },
  { id: 'MGR-005', name: 'Emma Wilson',   role: 'Sales Executive',  dept: 'Sales',       kpi: 95, tasks: 93, attendance: 99, collaboration: 5, rating: 'Outstanding'          },
  { id: 'MGR-006', name: 'Frank Garcia',  role: 'QA Engineer',      dept: 'Engineering', kpi: 80, tasks: 77, attendance: 88, collaboration: 3, rating: 'Meets Expectations'   },
]

const ratingOptions = ['Outstanding', 'Exceeds Expectations', 'Meets Expectations', 'Below Expectations']

const ratingCls = {
  'Outstanding':          'bg-emerald-50 text-emerald-600',
  'Exceeds Expectations': 'bg-indigo-50 text-indigo-600',
  'Meets Expectations':   'bg-amber-50 text-amber-600',
  'Below Expectations':   'bg-rose-50 text-rose-500',
}

const MetricBar = ({ label, value, color }) => (
  <div>
    <div className="flex justify-between mb-1.5">
      <span className="text-xs font-bold text-slate-500">{label}</span>
      <span className="text-xs font-extrabold text-slate-800">{value}%</span>
    </div>
    <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
      <div className={`h-full rounded-full ${color} transition-all duration-700`} style={{ width: `${value}%` }} />
    </div>
  </div>
)

export default function EmployeePerformance() {
  const [search, setSearch]     = useState('')
  const [selected, setSelected] = useState(null)
  const [comment, setComment]   = useState('')
  const [rating, setRating]     = useState('Exceeds Expectations')

  const filtered = employees.filter(e =>
    e.name.toLowerCase().includes(search.toLowerCase()) ||
    e.dept.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">Performance Reviews</h2>
        <p className="text-sm text-slate-500 font-medium">Q1 Review 2026 — {employees.length} employees</p>
      </div>

      <div className="relative group">
        <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors text-sm" />
        <input type="text" placeholder="Search by name or department..."
          onChange={e => setSearch(e.target.value)}
          className="w-full bg-white border border-slate-200 rounded-2xl py-3.5 pl-14 pr-5 text-sm font-medium text-slate-700 placeholder:text-slate-400 outline-none focus:ring-4 focus:ring-indigo-50 focus:border-indigo-300 shadow-sm transition-all" />
      </div>

      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm overflow-x-auto">
        <table className="w-full border-separate border-spacing-y-2">
          <thead>
            <tr className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
              {['Employee', 'Department', 'KPI', 'Tasks', 'Attendance', 'Rating', 'Action'].map(h => (
                <th key={h} className="px-4 pb-2 text-left">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((emp, i) => (
              <tr key={i} className="group">
                <td className="px-4 py-3.5 bg-slate-50 rounded-l-2xl border-y border-l border-slate-100 group-hover:bg-white group-hover:shadow-md transition-all">
                  <div className="flex items-center gap-3">
                    <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(emp.name)}&background=4f46e5&color=fff`} alt={emp.name} className="w-9 h-9 rounded-xl shrink-0" />
                    <div>
                      <p className="font-bold text-indigo-600 text-sm leading-tight">{emp.name}</p>
                      <p className="text-[10px] text-slate-400 font-semibold">{emp.role}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3.5 bg-slate-50 border-y border-slate-100 text-slate-600 text-sm group-hover:bg-white transition-all">{emp.dept}</td>
                <td className="px-4 py-3.5 bg-slate-50 border-y border-slate-100 group-hover:bg-white transition-all">
                  <span className={`text-sm font-extrabold ${emp.kpi >= 80 ? 'text-emerald-600' : emp.kpi >= 65 ? 'text-amber-500' : 'text-rose-500'}`}>{emp.kpi}%</span>
                </td>
                <td className="px-4 py-3.5 bg-slate-50 border-y border-slate-100 text-slate-700 font-bold text-sm group-hover:bg-white transition-all">{emp.tasks}%</td>
                <td className="px-4 py-3.5 bg-slate-50 border-y border-slate-100 group-hover:bg-white transition-all">
                  <span className={`text-sm font-extrabold ${emp.attendance >= 90 ? 'text-emerald-600' : 'text-amber-500'}`}>{emp.attendance}%</span>
                </td>
                <td className="px-4 py-3.5 bg-slate-50 border-y border-slate-100 group-hover:bg-white transition-all">
                  <span className={`px-2.5 py-1.5 rounded-lg text-[10px] font-extrabold ${ratingCls[emp.rating]}`}>{emp.rating.toUpperCase()}</span>
                </td>
                <td className="px-4 py-3.5 bg-slate-50 rounded-r-2xl border-y border-r border-slate-100 group-hover:bg-white transition-all">
                  <button onClick={() => { setSelected(emp); setRating(emp.rating); setComment('') }}
                    className="px-3.5 py-1.5 bg-indigo-50 hover:bg-indigo-600 text-indigo-600 hover:text-white rounded-xl text-[11px] font-extrabold transition-all cursor-pointer border-none">
                    Review
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl">
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-black text-slate-800">Performance Review</h3>
                <button onClick={() => setSelected(null)} className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition-colors cursor-pointer border-none">
                  <FaTimes />
                </button>
              </div>
              <div className="flex items-center gap-5 p-5 bg-slate-50 rounded-2xl mb-6">
                <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(selected.name)}&background=4f46e5&color=fff&size=80`} alt={selected.name} className="w-16 h-16 rounded-2xl shrink-0" />
                <div>
                  <h4 className="text-lg font-extrabold text-slate-800 mb-0.5">{selected.name}</h4>
                  <p className="text-[11px] font-bold text-indigo-600 uppercase tracking-wide">{selected.role}</p>
                  <p className="text-xs text-slate-400 font-semibold">{selected.dept}</p>
                </div>
                <div className="ml-auto text-center">
                  <p className="text-3xl font-black text-indigo-600">{((selected.kpi + selected.tasks + selected.attendance) / 3).toFixed(1)}%</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Avg Score</p>
                </div>
              </div>
              <div className="space-y-4 mb-5">
                <MetricBar label="KPI Score"             value={selected.kpi}        color="bg-indigo-600" />
                <MetricBar label="Task Completion Rate"  value={selected.tasks}       color="bg-indigo-400" />
                <MetricBar label="Attendance Percentage" value={selected.attendance}  color="bg-emerald-500" />
              </div>
              <div className="mb-5">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2.5">Team Collaboration</p>
                <div className="flex gap-2">
                  {[1,2,3,4,5].map(d => (
                    <div key={d} className={`w-8 h-8 rounded-xl ${d <= selected.collaboration ? 'bg-indigo-600' : 'bg-slate-100'}`} />
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">Manager Comments</label>
                  <textarea value={comment} onChange={e => setComment(e.target.value)} placeholder="Enter your feedback..." rows={4}
                    className="w-full bg-slate-50 rounded-2xl py-3 px-4 text-sm font-medium text-slate-700 outline-none resize-none border-none focus:ring-2 focus:ring-indigo-200" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">Performance Rating</label>
                  <select value={rating} onChange={e => setRating(e.target.value)}
                    className="w-full bg-slate-50 rounded-2xl py-3 px-4 text-sm font-medium text-slate-700 outline-none cursor-pointer border-none focus:ring-2 focus:ring-indigo-200">
                    {ratingOptions.map(r => <option key={r}>{r}</option>)}
                  </select>
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setSelected(null)} className="flex-1 py-4 rounded-2xl font-bold text-slate-500 hover:bg-slate-50 border border-slate-200 bg-white cursor-pointer transition-colors">Save Draft</button>
                <button onClick={() => setSelected(null)} className="flex-1 py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all cursor-pointer border-none">Submit Review</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}