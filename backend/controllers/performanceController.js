import Performance from '../models/Performance.js'
import Employee    from '../models/Employee.js'

// GET /api/performance?search=alice&dept=Engineering
export const getPerformances = async (req, res) => {
  try {
    const { search, dept } = req.query

    // Build employee filter first if search or dept provided
    let employeeIds = null
    if (search || dept) {
      const empFilter = {}
      if (search) empFilter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { role: { $regex: search, $options: 'i' } },
      ]
      if (dept) empFilter.dept = { $regex: dept, $options: 'i' }
      const employees = await Employee.find(empFilter).select('_id')
      employeeIds = employees.map(e => e._id)
    }

    const filter = employeeIds ? { employee: { $in: employeeIds } } : {}
    const performances = await Performance.find(filter)
      .populate('employee', 'name role dept email image')
      .sort({ createdAt: -1 })

    res.json(performances)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// GET /api/performance/:id
export const getPerformanceById = async (req, res) => {
  try {
    const performance = await Performance.findById(req.params.id)
      .populate('employee', 'name role dept email image')
    if (!performance) return res.status(404).json({ message: 'Review not found' })
    res.json(performance)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// POST /api/performance
export const createPerformance = async (req, res) => {
  try {
    const performance = await Performance.create(req.body)
    const populated = await performance.populate('employee', 'name role dept email image')
    res.status(201).json(populated)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

// PUT /api/performance/:id  — submit or save draft review
export const updatePerformance = async (req, res) => {
  try {
    const performance = await Performance.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('employee', 'name role dept email image')

    if (!performance) return res.status(404).json({ message: 'Review not found' })
    res.json(performance)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

// DELETE /api/performance/:id
export const deletePerformance = async (req, res) => {
  try {
    const performance = await Performance.findByIdAndDelete(req.params.id)
    if (!performance) return res.status(404).json({ message: 'Review not found' })
    res.json({ message: 'Review deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}