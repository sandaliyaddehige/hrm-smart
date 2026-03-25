import express from "express";
import Attendance from "../models/Attendance.js";
import Leave from "../models/Leave.js";

const router = express.Router();

// GET - Attendance by day
router.get("/attendance/:day", async (req, res) => {
  try {
    const records = await Attendance.find({ day: req.params.day });
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET - All Leave Requests
router.get("/leaves", async (req, res) => {
  try {
    const leaves = await Leave.find();
    res.json(leaves);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT - Approve Leave
router.put("/leaves/:id/approve", async (req, res) => {
  try {
    const leave = await Leave.findByIdAndUpdate(
      req.params.id,
      { status: "Approved" },
      { new: true }
    );
    res.json(leave);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT - Reject Leave
router.put("/leaves/:id/reject", async (req, res) => {
  try {
    const leave = await Leave.findByIdAndUpdate(
      req.params.id,
      { status: "Rejected" },
      { new: true }
    );
    res.json(leave);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;