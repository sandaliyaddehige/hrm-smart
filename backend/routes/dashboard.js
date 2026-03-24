const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');
const Attendance = require('../models/Attendance');
const Leave = require('../models/Leave');
const Payroll = require('../models/Payroll'); 
const auth = require('../middleware/auth');

router.get('/stats', auth, async (req, res) => {
  try {
    
    const totalEmployees = await Employee.countDocuments();
    
    
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    const presentToday = await Attendance.countDocuments({
      date: { $gte: todayStart, $lte: todayEnd },
      status: 'Present'
    });

    const onLeaveToday = await Attendance.countDocuments({
      date: { $gte: todayStart, $lte: todayEnd },
      status: 'On Leave'
    });

    
    const pendingApprovals = await Leave.countDocuments({ status: 'Pending' });

    
    const attendanceRate = totalEmployees > 0 
      ? Math.round((presentToday / totalEmployees) * 100) 
      : 0;

   
    const recentLeaves = await Leave.find({ status: 'Pending' })
      .populate('employeeId', 'name')
      .sort({ createdAt: -1 })
      .limit(3);

    const formattedLeaves = recentLeaves.map(leave => ({
      employeeName: leave.employeeId ? leave.employeeId.name : 'Unknown User',
      leaveType: leave.type || 'Annual Leave',
      date: leave.startDate || leave.createdAt
    }));

    
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const payrollHistory = [];
    const now = new Date();

   
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      payrollHistory.push({
        month: monthNames[d.getMonth()],
        year: d.getFullYear(),
        amount: 0
      });
    }

  
    const allPayrolls = await Payroll.find();

    allPayrolls.forEach(record => {
     
      const date = new Date(record.createdAt); 
      const mName = monthNames[date.getMonth()];
      const yName = date.getFullYear();

     
      const match = payrollHistory.find(h => h.month === mName && h.year === yName);
      if (match) {
        match.amount += (record.netSalary || 0); 
      }
    });

    
    res.json({
      totalEmployees,
      presentToday,
      onLeave: onLeaveToday,
      pendingApprovals,
      attendanceRate,
      payrollHistory: payrollHistory.map(h => ({ month: h.month, amount: h.amount })),
      recentLeaves: formattedLeaves
    });

  } catch (err) {
    console.error("Dashboard Error:", err.message);
    res.status(500).json({ error: "Server Error: Dashboard stats load failed" });
  }
});

module.exports = router;