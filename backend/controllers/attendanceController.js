import Attendance from '../models/Attendance.js'
import Employee   from '../models/Employee.js'

// GET /api/attendance?month=2026-03&search=alice&dept=Engineering
export const getAttendances = async (req, res) => {
  try {
    const { month, search, dept } = req.query

    // Filter employees by search/dept
    let employeeIds = null
    if (search || dept) {
      const empFilter = {}
      if (search) empFilter.name = { $regex: search, $options: 'i' }
      if (dept && dept !== 'All') empFilter.dept = { $regex: dept, $options: 'i' }
      const employees = await Employee.find(empFilter).select('_id')
      employeeIds = employees.map(e => e._id)
    }

    const filter = {}
    if (month)       filter.month = month
    if (employeeIds) filter.employee = { $in: employeeIds }

    const records = await Attendance.find(filter)
      .populate('employee', 'name dept email')
      .sort({ createdAt: -1 })

    // Calculate summary stats
    const total   = records.length
    const avgAtt  = total > 0
      ? (records.reduce((sum, r) => {
          const days = r.present + r.absent + r.leave || 1
          return sum + (r.present / days) * 100
        }, 0) / total).toFixed(1)
      : 0
    const onLeave = records.reduce((sum, r) => sum + r.leave, 0)

    res.json({ records, stats: { total, avgAtt, onLeave } })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// GET /api/attendance/:id
export const getAttendanceById = async (req, res) => {
  try {
    const record = await Attendance.findById(req.params.id)
      .populate('employee', 'name dept email')
    if (!record) return res.status(404).json({ message: 'Record not found' })
    res.json(record)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// POST /api/attendance
export const createAttendance = async (req, res) => {
  try {
    const record = await Attendance.create(req.body)
    const populated = await record.populate('employee', 'name dept email')
    res.status(201).json(populated)
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: 'Attendance record already exists for this employee and month' })
    }
    res.status(400).json({ message: err.message })
  }
}

// PUT /api/attendance/:id
export const updateAttendance = async (req, res) => {
  try {
    const record = await Attendance.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('employee', 'name dept email')
    if (!record) return res.status(404).json({ message: 'Record not found' })
    res.json(record)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

// DELETE /api/attendance/:id
export const deleteAttendance = async (req, res) => {
  try {
    const record = await Attendance.findByIdAndDelete(req.params.id)
    if (!record) return res.status(404).json({ message: 'Record not found' })
    res.json({ message: 'Attendance record deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}