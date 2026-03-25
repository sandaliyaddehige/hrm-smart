const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  date: { type: String, required: true }, 
  status: { type: String, enum: ['Present', 'Absent'], default: 'Present' }
}, { timestamps: true });

module.exports = mongoose.model('Attendance', AttendanceSchema);