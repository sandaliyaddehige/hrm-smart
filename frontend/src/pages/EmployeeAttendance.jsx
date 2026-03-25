import React, { useEffect, useState } from 'react'
import { FaSearch, FaDownload, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { fetchAttendances } from '../api/api'

const departments = ['All', 'Engineering', 'Sales', 'HR', 'IT/Engineering']
const PER_PAGE = 5

const getStatus = (att) => {
  if (att >= 90) return { label: 'ACTIVE',   cls: 'bg-emerald-50 text-emerald-600' }
  if (att >= 75) return { label: 'WARNING',  cls: 'bg-amber-50 text-amber-600'     }
  return               { label: 'CRITICAL', cls: 'bg-rose-50 text-rose-500'        }
}

export default function EmployeeAttendance() {
  const [records, setRecords]   = useState([])
  const [stats, setStats]       = useState({ total: 0, avgAtt: 0, onLeave: 0 })
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState(null)
  const [search, setSearch]     = useState('')
  const [dept, setDept]         = useState('All')
  const [page, setPage]         = useState(1)
  const currentMonth = new Date().toISOString().slice(0, 7)

  const load = async (params = {}) => {
    try {
      setLoading(true)
      const res = await fetchAttendances({ month: currentMonth, ...params })
      setRecords(res.data.records)
      setStats(res.data.stats)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const handleSearch = (e) => {
    setSearch(e.target.value)
    setPage(1)
    load({ search: e.target.value, dept: dept !== 'All' ? dept : '' })
  }

  const handleDept = (e) => {
    setDept(e.target.value)
    setPage(1)
    load({ search, dept: e.target.value !== 'All' ? e.target.value : '' })
  }

  const totalPages = Math.ceil(records.length / PER_PAGE)
  const paginated  = records.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
    </div>
  )

  if (error) return (
    <div className="bg-rose-50 border border-rose-200 text-rose-600 p-5 rounded-2xl text-sm font-medium">
      Failed to load attendance data: {error}
    </div>
  )

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">Team Attendance Report</h2>
          <p className="text-sm text-slate-500 font-medium">
            {new Date(currentMonth + '-01').toLocaleString('default', { month: 'long', year: 'numeric' })}
          </p>
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
          <h2 className="text-2xl font-extrabold text-slate-900">{stats.total}</h2>
        </div>
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Avg. Attendance</p>
          <h2 className="text-2xl font-extrabold text-indigo-600">{stats.avgAtt}%</h2>
        </div>
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">On Leave Today</p>
          <h2 className="text-2xl font-extrabold text-amber-500">{String(stats.onLeave).padStart(2, '0')}</h2>
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
          <input type="text" placeholder="Search employee name..." value={search} onChange={handleSearch}
            className="w-full bg-white border border-slate-200 rounded-2xl py-3.5 pl-14 pr-5 text-sm font-medium text-slate-700 placeholder:text-slate-400 outline-none focus:ring-4 focus:ring-indigo-50 focus:border-indigo-300 shadow-sm transition-all" />
        </div>
        <select value={dept} onChange={handleDept}
          className="bg-white border border-slate-200 rounded-2xl py-3.5 px-5 text-sm font-bold text-slate-600 outline-none focus:ring-4 focus:ring-indigo-50 shadow-sm cursor-pointer min-w-[180px]">
          {departments.map(d => <option key={d} value={d}>Dept: {d}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm overflow-x-auto">
        <table className="w-full border-separate border-spacing-y-2">
          <thead>
            <tr className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
              {['Employee','Department','Present','Absent','Leave','Att. %','Status'].map(h => (
                <th key={h} className="px-4 pb-2 text-left">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginated.map((r, i) => {
              const emp     = r.employee || {}
              const total   = r.present + r.absent + r.leave || 1
              const attPct  = ((r.present / total) * 100).toFixed(1)
              const s       = getStatus(Number(attPct))
              return (
                <tr key={i} className="group">
                  <td className="px-4 py-3.5 bg-slate-50 rounded-l-2xl border-y border-l border-slate-100 font-bold text-indigo-600 text-sm group-hover:bg-white group-hover:shadow-md transition-all">{emp.name}</td>
                  <td className="px-4 py-3.5 bg-slate-50 border-y border-slate-100 text-slate-600 text-sm group-hover:bg-white transition-all">{emp.dept}</td>
                  <td className="px-4 py-3.5 bg-slate-50 border-y border-slate-100 text-slate-700 font-bold text-sm group-hover:bg-white transition-all">{r.present}</td>
                  <td className="px-4 py-3.5 bg-slate-50 border-y border-slate-100 text-slate-700 font-bold text-sm group-hover:bg-white transition-all">{r.absent}</td>
                  <td className="px-4 py-3.5 bg-slate-50 border-y border-slate-100 text-slate-700 font-bold text-sm group-hover:bg-white transition-all">{r.leave}</td>
                  <td className="px-4 py-3.5 bg-slate-50 border-y border-slate-100 group-hover:bg-white transition-all">
                    <span className={`text-sm font-extrabold ${Number(attPct) >= 90 ? 'text-emerald-600' : Number(attPct) >= 75 ? 'text-amber-500' : 'text-rose-500'}`}>{attPct}%</span>
                  </td>
                  <td className="px-4 py-3.5 bg-slate-50 rounded-r-2xl border-y border-r border-slate-100 group-hover:bg-white transition-all">
                    <span className={`px-2.5 py-1.5 rounded-lg text-[10px] font-extrabold ${s.cls}`}>{s.label}</span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        {records.length === 0 && (
          <p className="text-center text-slate-400 text-sm py-8">No attendance records found for this period.</p>
        )}
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