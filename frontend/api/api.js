import axios from 'axios'

const BASE = 'http://localhost:5000/api'

// ── Employees ──────────────────────────────────────────────
export const fetchEmployees       = (search = '') => axios.get(`${BASE}/employees?search=${search}`)
export const createEmployee       = (data)        => axios.post(`${BASE}/employees`, data)
export const updateEmployee       = (id, data)    => axios.put(`${BASE}/employees/${id}`, data)
export const deleteEmployee       = (id)          => axios.delete(`${BASE}/employees/${id}`)

// ── Performance ────────────────────────────────────────────
export const fetchPerformances    = (search = '', dept = '') => axios.get(`${BASE}/performance?search=${search}&dept=${dept}`)
export const createPerformance    = (data)        => axios.post(`${BASE}/performance`, data)
export const updatePerformance    = (id, data)    => axios.put(`${BASE}/performance/${id}`, data)
export const deletePerformance    = (id)          => axios.delete(`${BASE}/performance/${id}`)

// ── Attendance ─────────────────────────────────────────────
export const fetchAttendances     = (params = {}) => axios.get(`${BASE}/attendance`, { params })
export const createAttendance     = (data)        => axios.post(`${BASE}/attendance`, data)
export const updateAttendance     = (id, data)    => axios.put(`${BASE}/attendance/${id}`, data)
export const deleteAttendance     = (id)          => axios.delete(`${BASE}/attendance/${id}`)

// ── Dashboard ──────────────────────────────────────────────
export const fetchDashboardStats  = ()            => axios.get(`${BASE}/manager/dashboard`)