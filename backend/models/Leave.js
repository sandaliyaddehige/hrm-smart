const mongoose = require('mongoose');

const leaveSchema = new mongoose.Schema({
    employeeId: String,
    name: String,
    reason: String,
    startDate: String,
    endDate: String,
    status: { type: String, default: 'Pending' }
});

module.exports = mongoose.model('Leave', leaveSchema);