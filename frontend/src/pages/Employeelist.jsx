import React, { useEffect, useState } from 'react'
import { FaPlus, FaSearch, FaEdit, FaTrash, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { fetchEmployees, createEmployee, updateEmployee, deleteEmployee } from '../api/api'

const empty = { name: '', role: '', email: '', phone: '', dept: '', joinDate: '', status: 'Active' }
const PER_PAGE = 6

export default function EmployeeList() {
  const [employees, setEmployees] = useState([])
  const [loading, setLoading]     = useState(true)
  const [error, setError]         = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editId, setEditId]       = useState(null)
  const [search, setSearch]       = useState('')
  const [page, setPage]           = useState(1)
  const [form, setForm]           = useState(empty)
  const [saving, setSaving]       = useState(false)

  const loadEmployees = async (q = '') => {
    try {
      setLoading(true)
      const res = await fetchEmployees(q)
      setEmployees(res.data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { loadEmployees() }, [])

  const handleSearch = (e) => {
    setSearch(e.target.value)
    setPage(1)
    loadEmployees(e.target.value)
  }

  const totalPages = Math.ceil(employees.length / PER_PAGE)
  const paginated  = employees.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  const openAdd    = () => { setForm(empty); setIsEditing(false); setShowModal(true) }
  const openEdit   = (emp) => {
    setForm({ ...emp, joinDate: emp.joinDate ? emp.joinDate.slice(0, 10) : '' })
    setEditId(emp._id)
    setIsEditing(true)
    setShowModal(true)
  }
  const closeModal = () => { setShowModal(false); setForm(empty) }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      if (isEditing) {
        const res = await updateEmployee(editId, form)
        setEmployees(employees.map(emp => emp._id === editId ? res.data : emp))
      } else {
        const res = await createEmployee(form)
        setEmployees([res.data, ...employees])
      }
      closeModal()
    } catch (err) {
      alert(err.response?.data?.message || err.message)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this employee?')) return
    try {
      await deleteEmployee(id)
      setEmployees(employees.filter(e => e._id !== id))
    } catch (err) {
      alert(err.response?.data?.message || err.message)
    }
  }

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
    </div>
  )

  if (error) return (
    <div className="bg-rose-50 border border-rose-200 text-rose-600 p-5 rounded-2xl text-sm font-medium">
      Failed to load employees: {error}
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">Employee Management</h2>
          <p className="text-sm text-slate-500 font-medium">Manage your team of {employees.length} members</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-lg shadow-indigo-200 transition-all active:scale-95 cursor-pointer border-none">
          <FaPlus size={11} /> Add Employee
        </button>
      </div>

      <div className="relative group">
        <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors text-sm" />
        <input type="text" placeholder="Search by name or role..." value={search} onChange={handleSearch}
          className="w-full bg-white border border-slate-200 rounded-2xl py-3.5 pl-14 pr-5 text-sm font-medium text-slate-700 placeholder:text-slate-400 outline-none focus:ring-4 focus:ring-indigo-50 focus:border-indigo-300 shadow-sm transition-all" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {paginated.map(emp => (
          <div key={emp._id} className="group bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative">
            <div className={`absolute top-5 right-5 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase ${emp.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
              {emp.status}
            </div>
            <div className="flex items-center gap-4 mb-5">
              <img src={emp.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(emp.name)}&background=4f46e5&color=fff`}
                alt={emp.name} className="w-14 h-14 rounded-2xl object-cover ring-4 ring-slate-50 shrink-0" />
              <div className="min-w-0">
                <h3 className="font-bold text-slate-800 text-base truncate">{emp.name}</h3>
                <p className="text-indigo-600 font-bold text-[11px] uppercase tracking-wide truncate">{emp.role}</p>
                <p className="text-slate-400 text-xs truncate">{emp.email}</p>
              </div>
            </div>
            <div className="grid grid-cols-3 text-center py-3 border-t border-slate-50">
              {[['Dept', emp.dept], ['Status', emp.status], ['Joined', emp.joinDate?.slice(0, 4)]].map(([l, v], i) => (
                <div key={l} className={i > 0 ? 'border-l border-slate-100' : ''}>
                  <p className="text-[9px] font-bold text-slate-400 uppercase mb-1">{l}</p>
                  <p className="text-[11px] font-bold text-slate-700 truncate px-1">{v}</p>
                </div>
              ))}
            </div>
            <div className="flex gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={() => openEdit(emp)} className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-slate-50 hover:bg-indigo-50 text-indigo-600 rounded-xl font-bold text-xs transition-colors cursor-pointer border-none">
                <FaEdit size={10} /> Edit
              </button>
              <button onClick={() => handleDelete(emp._id)} className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-slate-50 hover:bg-rose-50 text-rose-500 rounded-xl font-bold text-xs transition-colors cursor-pointer border-none">
                <FaTrash size={10} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

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

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl">
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-black text-slate-800">{isEditing ? 'Update Employee' : 'New Employee'}</h3>
                <button onClick={closeModal} className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition-colors cursor-pointer border-none">
                  <FaTimes />
                </button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-3 mb-5">
                  {[['name','Full Name','text'],['role','Job Role','text'],['email','Email','email'],['phone','Phone','text'],['dept','Department','text'],['joinDate','Join Date','date']].map(([f, l, t]) => (
                    <div key={f}>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">{l}</label>
                      <input name={f} type={t} value={form[f] || ''} required={['name','role','email'].includes(f)}
                        onChange={e => setForm({ ...form, [e.target.name]: e.target.value })}
                        className="w-full bg-slate-50 rounded-xl py-3 px-4 text-sm font-medium text-slate-700 outline-none focus:ring-2 focus:ring-indigo-200 border-none" />
                    </div>
                  ))}
                </div>
                <div className="flex gap-3">
                  <button type="button" onClick={closeModal} className="flex-1 py-3.5 rounded-2xl font-bold text-slate-500 hover:bg-slate-50 border border-slate-200 bg-white cursor-pointer transition-colors">Cancel</button>
                  <button type="submit" disabled={saving} className="flex-1 py-3.5 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all cursor-pointer border-none disabled:opacity-60">
                    {saving ? 'Saving...' : isEditing ? 'Update' : 'Save Employee'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}