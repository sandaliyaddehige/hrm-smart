const mongoose = require('mongoose');

const PayrollSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee', 
    required: true
  },
  amount: { type: Number, required: true },
  month: { type: String, required: true }, 
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Payroll', PayrollSchema);