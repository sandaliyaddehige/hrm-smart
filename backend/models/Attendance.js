const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    employeeId: String,
    name: String,
    date: { type: String, default: () => new Date().toLocaleDateString() },
    status: String
});

module.exports = mongoose.model('Attendance', attendanceSchema);