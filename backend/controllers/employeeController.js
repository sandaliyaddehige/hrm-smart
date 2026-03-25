import Employee from '../models/Employee.js'

// GET /api/employees?search=alice
export const getEmployees = async (req, res) => {
  try {
    const { search } = req.query
    const filter = search
      ? { $or: [
          { name:  { $regex: search, $options: 'i' } },
          { role:  { $regex: search, $options: 'i' } },
          { dept:  { $regex: search, $options: 'i' } },
        ]}
      : {}
    const employees = await Employee.find(filter).sort({ createdAt: -1 })
    res.json(employees)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// GET /api/employees/:id
export const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id)
    if (!employee) return res.status(404).json({ message: 'Employee not found' })
    res.json(employee)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// POST /api/employees
export const createEmployee = async (req, res) => {
  try {
    const employee = await Employee.create(req.body)
    res.status(201).json(employee)
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: 'Email already exists' })
    }
    res.status(400).json({ message: err.message })
  }
}

// PUT /api/employees/:id
export const updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    if (!employee) return res.status(404).json({ message: 'Employee not found' })
    res.json(employee)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

// DELETE /api/employees/:id
export const deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id)
    if (!employee) return res.status(404).json({ message: 'Employee not found' })
    res.json({ message: 'Employee deleted successfully' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}