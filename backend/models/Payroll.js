const mongoose = require('mongoose');

const PayrollSchema = new mongoose.Schema({
    employeeName: String,
    amount: Number,
    status: String,
    date: { type: Date, default: Date.now },
    transactionId: String
});

module.exports = mongoose.model('Payroll', PayrollSchema);