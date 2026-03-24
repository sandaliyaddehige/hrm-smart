const mongoose = require('mongoose');

const RecruitmentSchema = new mongoose.Schema({
    candidateName: String,
    position: String,
    status: { type: String, default: 'Pending' },
    matchPercentage: String,
    appliedDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Recruitment', RecruitmentSchema);