import Employee   from '../models/Employee.js'
import Attendance from '../models/Attendance.js'
import Performance from '../models/Performance.js'

// GET /api/manager/dashboard
export const getDashboardStats = async (req, res) => {
  try {
    const currentMonth = new Date().toISOString().slice(0, 7) // "2026-03"

    // Total employees
    const totalEmployees = await Employee.countDocuments()

    // Present today = Active employees (simplified — real app would track daily)
    const presentToday = await Employee.countDocuments({ status: 'Active' })

    // On leave
    const onLeave = await Employee.countDocuments({ status: 'On-Leave' })

    // Pending reviews = performances without a submitted rating
    const pendingReviews = await Performance.countDocuments({ rating: 'Meets Expectations' })

    // Monthly attendance bar chart — last 6 months
    const months = []
    for (let i = 5; i >= 0; i--) {
      const d = new Date()
      d.setMonth(d.getMonth() - i)
      months.push(d.toISOString().slice(0, 7))
    }

    const attendanceChart = await Promise.all(
      months.map(async (month) => {
        const records = await Attendance.find({ month })
        const total   = records.reduce((s, r) => s + r.present, 0)
        return {
          month: new Date(month + '-01').toLocaleString('default', { month: 'short' }),
          value: total,
        }
      })
    )

    // Department distribution
    const deptAgg = await Employee.aggregate([
      { $group: { _id: '$dept', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ])
    const deptData = deptAgg.map(d => ({
      name:  d._id || 'Other',
      value: Math.round((d.count / totalEmployees) * 100),
    }))

    // Recent activities — last 5 employees updated
    const recentEmployees = await Employee.find()
      .sort({ updatedAt: -1 })
      .limit(5)
      .select('name status updatedAt')

    const recentActivities = recentEmployees.map(e => ({
      name:   e.name,
      action: e.status === 'Active' ? 'Status Updated — Active' : 'Status Updated — On Leave',
      date:   e.updatedAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: e.status === 'Active' ? 'Approved' : 'Under Review',
    }))

    res.json({
      stats: { totalEmployees, presentToday, onLeave, pendingReviews },
      attendanceChart,
      deptData,
      recentActivities,
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}