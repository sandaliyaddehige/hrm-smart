const express = require('express');
const router = express.Router();
const Recruitment = require('../models/Recruitment');
const Payroll = require('../models/Payroll');
const Employee = require('../models/Employee'); // Kalin thibba model eka

// 1. Dashboard Stats API
router.get('/dashboard-stats', async (req, res) => {
    try {
        const totalEmp = await Employee.countDocuments();
        const pendingRecruits = await Recruitment.countDocuments({ status: 'Pending' });
        const onLeave = 15; // Meka Leave model eken ganna puluwan

        res.json({ totalEmp, pendingRecruits, onLeave });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 2. Recruitment API
router.post('/add-candidate', async (req, res) => {
    const newCandidate = new Recruitment(req.body);
    try {
        const saved = await newCandidate.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// 3. Payroll History API
router.get('/payroll-history', async (req, res) => {
    try {
        const history = await Payroll.find().sort({ date: -1 });
        res.json(history);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;