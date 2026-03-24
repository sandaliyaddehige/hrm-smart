const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    role: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    dept: { type: String, required: true },
    joinDate: { type: String, required: true },
    status: { type: String, default: 'Active' },
    image: { type: String, default: null } 
}, { timestamps: true });

module.exports = mongoose.model('Employee', EmployeeSchema);