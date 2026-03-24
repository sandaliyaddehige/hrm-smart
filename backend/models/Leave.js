const mongoose = require('mongoose');

const LeaveSchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  leaveType: { type: String, enum: ['Annual', 'Sick', 'Casual', 'Unpaid'], required: true },
  fromDate: { type: String, required: true },
  toDate: { type: String, required: true },
  reason: { type: String },
  status: { type: String, enum: ['Pending', 'Approved', 'Cancelled'], default: 'Pending' }
}, { timestamps: true });

module.exports = mongoose.model('Leave', LeaveSchema);