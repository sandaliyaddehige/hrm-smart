import React, { useState } from 'react'
import { FaSearch, FaDownload, FaChevronLeft, FaChevronRight } from 'react-icons/fa'

const allEmployees = [
  { name: 'Alice Johnson', id: 'MGR-001', dept: 'Engineering',    present: 21, absent: 1, leave: 1, att: 91.3 },
  { name: 'Bob Smith',     id: 'MGR-002', dept: 'Sales',          present: 20, absent: 2, leave: 1, att: 87.0 },
  { name: 'Carla Diaz',    id: 'MGR-003', dept: 'HR',             present: 15, absent: 6, leave: 2, att: 65.2 },
  { name: 'David Miller',  id: 'MGR-004', dept: 'Engineering',    present: 22, absent: 0, leave: 1, att: 95.7 },
  { name: 'Emma Wilson',   id: 'MGR-005', dept: 'Sales',          present: 23, absent: 0, leave: 0, att: 100  },
  { name: 'Frank Garcia',  id: 'MGR-006', dept: 'Engineering',    present: 18, absent: 4, leave: 1, att: 78.3 },
  { name: 'Rasil Laksika', id: 'MGR-007', dept: 'HR',             present: 22, absent: 0, leave: 1, att: 98.5 },
  { name: 'John Silva',    id: 'MGR-008', dept: 'IT/Engineering',  present: 18, absent: 4, leave: 1, att: 78.0 },
]
const departments = ['All', 'Engineering', 'Sales', 'HR', 'IT/Engineering']
const PER_PAGE = 5

const getStatus = (att) => {
  if (att >= 90) return { label: 'ACTIVE',   cls: 'bg-emerald-50 text-emerald-600' }
  if (att >= 75) return { label: 'WARNING',  cls: 'bg-amber-50 text-amber-600'     }
  return               { label: 'CRITICAL', cls: 'bg-rose-50 text-rose-500'        }
}

export default function EmployeeAttendance() {
  const [search, setSearch] = useState('')
  const [dept, setDept]     = useState('All')
  const [page, setPage]     = useState(1)

  const filtered = allEmployees.filter(e =>
    e.name.toLowerCase().includes(search.toLowerCase()) &&
    (dept === 'All' || e.dept === dept)
  )
  const totalPages = Math.ceil(filtered.length / PER_PAGE)
  const paginated  = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)
  const avgAtt     = (allEmployees.reduce((s, e) => s + e.att, 0) / allEmployees.length).toFixed(1)
  const onLeave    = allEmployees.reduce((s, e) => s + e.leave, 0)

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">Team Attendance Report</h2>
          <p className="text-sm text-slate-500 font-medium">Mar 01, 2026 – Mar 31, 2026</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 border border-slate-200 bg-white text-slate-600 px-5 py-2.5 rounded-2xl font-bold text-sm hover:bg-slate-50 transition-all shadow-sm cursor-pointer">
            <FaDownload size={11} /> PDF
          </button>
          <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-2xl font-bold text-sm shadow-lg shadow-indigo-200 transition-all cursor-pointer border-none">
            <FaDownload size={11} /> Excel
          </button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-4 gap-5">
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Total Team Members</p>
          <h2 className="text-2xl font-extrabold text-slate-900">{allEmployees.length}</h2>
        </div>
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Avg. Attendance</p>
          <h2 className="text-2xl font-extrabold text-indigo-600">{avgAtt}%</h2>
        </div>
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">On Leave Today</p>
          <h2 className="text-2xl font-extrabold text-amber-500">{String(onLeave).padStart(2, '0')}</h2>
        </div>
        <div className="bg-slate-800 rounded-3xl p-6 shadow-sm">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2.5">Monthly Trend</p>
          <div className="flex gap-1.5 mb-2">
            {['bg-emerald-400','bg-emerald-400','bg-rose-400','bg-emerald-400','bg-amber-400','bg-emerald-400'].map((c, i) => (
              <span key={i} className={`w-5 h-5 rounded-md inline-block ${c}`} />
            ))}
          </div>
          <p className="text-white text-sm font-extrabold">Healthy</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-4 flex-wrap">
        <div className="relative flex-1 min-w-[200px] group">
          <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors text-sm" />
          <input type="text" placeholder="Search employee name..."
            onChange={e => { setSearch(e.target.value); setPage(1) }}
            className="w-full bg-white border border-slate-200 rounded-2xl py-3.5 pl-14 pr-5 text-sm font-medium text-slate-700 placeholder:text-slate-400 outline-none focus:ring-4 focus:ring-indigo-50 focus:border-indigo-300 shadow-sm transition-all" />
        </div>
        <select value={dept} onChange={e => { setDept(e.target.value); setPage(1) }}
          className="bg-white border border-slate-200 rounded-2xl py-3.5 px-5 text-sm font-bold text-slate-600 outline-none focus:ring-4 focus:ring-indigo-50 shadow-sm cursor-pointer min-w-[180px]">
          {departments.map(d => <option key={d} value={d}>Dept: {d}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm overflow-x-auto">
        <table className="w-full border-separate border-spacing-y-2">
          <thead>
            <tr className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
              {['Employee','ID','Department','Present','Absent','Leave','Att. %','Status'].map(h => (
                <th key={h} className="px-4 pb-2 text-left">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginated.map((e, i) => {
              const s = getStatus(e.att)
              return (
                <tr key={i} className="group">
                  <td className="px-4 py-3.5 bg-slate-50 rounded-l-2xl border-y border-l border-slate-100 font-bold text-indigo-600 text-sm group-hover:bg-white group-hover:shadow-md transition-all">{e.name}</td>
                  <td className="px-4 py-3.5 bg-slate-50 border-y border-slate-100 text-slate-400 font-bold text-sm group-hover:bg-white transition-all">{e.id}</td>
                  <td className="px-4 py-3.5 bg-slate-50 border-y border-slate-100 text-slate-600 text-sm group-hover:bg-white transition-all">{e.dept}</td>
                  <td className="px-4 py-3.5 bg-slate-50 border-y border-slate-100 text-slate-700 font-bold text-sm group-hover:bg-white transition-all">{e.present}</td>
                  <td className="px-4 py-3.5 bg-slate-50 border-y border-slate-100 text-slate-700 font-bold text-sm group-hover:bg-white transition-all">{e.absent}</td>
                  <td className="px-4 py-3.5 bg-slate-50 border-y border-slate-100 text-slate-700 font-bold text-sm group-hover:bg-white transition-all">{e.leave}</td>
                  <td className="px-4 py-3.5 bg-slate-50 border-y border-slate-100 group-hover:bg-white transition-all">
                    <span className={`text-sm font-extrabold ${e.att >= 90 ? 'text-emerald-600' : e.att >= 75 ? 'text-amber-500' : 'text-rose-500'}`}>{e.att.toFixed(1)}%</span>
                  </td>
                  <td className="px-4 py-3.5 bg-slate-50 rounded-r-2xl border-y border-r border-slate-100 group-hover:bg-white transition-all">
                    <span className={`px-2.5 py-1.5 rounded-lg text-[10px] font-extrabold ${s.cls}`}>{s.label}</span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2">
          <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="w-10 h-10 rounded-xl border border-slate-200 bg-white flex items-center justify-center text-slate-400 hover:text-indigo-600 disabled:opacity-40 cursor-pointer">
            <FaChevronLeft size={12} />
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button key={i} onClick={() => setPage(i + 1)} className={`w-10 h-10 rounded-xl font-bold text-sm cursor-pointer transition-all ${page === i + 1 ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 border-none' : 'bg-white border border-slate-200 text-slate-500'}`}>
              {i + 1}
            </button>
          ))}
          <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)} className="w-10 h-10 rounded-xl border border-slate-200 bg-white flex items-center justify-center text-slate-400 hover:text-indigo-600 disabled:opacity-40 cursor-pointer">
            <FaChevronRight size={12} />
          </button>
        </div>
      )}
    </div>
  )
}