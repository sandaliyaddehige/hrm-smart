const express = require('express');
const router = express.Router();
const Payroll = require('../models/Payroll');


router.post('/add', async (req, res) => {
  try {
    const newPayroll = new Payroll(req.body);
    await newPayroll.save();
    res.status(201).json(newPayroll);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/all', async (req, res) => {
  try {
    const payrolls = await Payroll.find().populate('employeeId', 'name role');
    res.status(200).json(payrolls);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;