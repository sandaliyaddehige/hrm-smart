const express = require('express');
const router = express.Router();
const Leave = require('../models/Leave');


router.get('/all', async (req, res) => {
  try {
    const leaves = await Leave.find().populate('employeeId');
    res.status(200).json(leaves);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.put('/update/:id', async (req, res) => {
  try {
    const updatedLeave = await Leave.findByIdAndUpdate(
      req.params.id, 
      { status: req.body.status }, 
      { new: true }
    );
    res.status(200).json(updatedLeave);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;