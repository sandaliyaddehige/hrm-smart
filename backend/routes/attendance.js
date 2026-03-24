const express = require('express');
const router = express.Router();
const Attendance = require('../models/Attendance');


router.post('/punch-in', async (req, res) => {
    try {
        const { employeeId, date, time } = req.body;

       
        const existingRecord = await Attendance.findOne({ employeeId, date });

        if (existingRecord) {
            return res.status(400).json({ message: "Already punched in for today" });
        }

        const newAttendance = new Attendance({
            employeeId,
            date,
            punchIn: time,
            status: 'Present'
        });

        await newAttendance.save();
        res.status(201).json({ message: "Punched in successfully", data: newAttendance });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.get('/status/:employeeId/:date', async (req, res) => {
    try {
        const record = await Attendance.findOne({ 
            employeeId: req.params.employeeId, 
            date: req.params.date 
        });
        res.status(200).json({ isPunchedIn: !!record, data: record });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.post('/mark', async (req, res) => {
    try {
        const { attendanceData, date } = req.body;
        if (!date || !attendanceData || !Array.isArray(attendanceData)) {
            return res.status(400).json({ message: "Invalid data provided" });
        }
        await Attendance.deleteMany({ date: date });
        const updatedData = attendanceData.map(item => ({ ...item, date: date }));
        const savedRecords = await Attendance.insertMany(updatedData);
        res.status(200).json({ message: "Attendance marked successfully", count: savedRecords.length, data: savedRecords });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.get('/:date', async (req, res) => {
    try {
        const targetDate = req.params.date; 
        const records = await Attendance.find({ date: targetDate }).populate('employeeId', 'name role dept'); 
        res.status(200).json(records);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;