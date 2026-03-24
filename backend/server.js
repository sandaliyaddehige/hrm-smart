const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Import Models
const Attendance = require('./models/Attendance');
const Leave = require('./models/Leave');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection String
const MONGO_URI = "mongodb+srv://admin:Nasli12345@cluster0.4ob5ugv.mongodb.net/hrm_smart?retryWrites=true&w=majority&appName=Cluster0";

// Connecting to MongoDB
mongoose.connect(MONGO_URI)
    .then(() => {
        console.log("✅ Database Connected Successfully");
    })
    .catch((err) => {
        console.error("❌ Database Connection Error:", err.message);
    });

// --- API ROUTES ---

// 1. Test Route
app.get('/', (req, res) => {
    res.send("HRM Smart Backend is Running");
});

// 2. Attendance Route (Save Data)
app.post('/api/attendance', async (req, res) => {
    try {
        const newAttendance = new Attendance(req.body);
        await newAttendance.save();
        res.status(201).json({ message: "Attendance marked successfully!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 3. Leave Route (Save Data)
app.post('/api/leave', async (req, res) => {
    try {
        const newLeave = new Leave(req.body);
        await newLeave.save();
        res.status(201).json({ message: "Leave request submitted!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Port Configuration
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server is active on port ${PORT}`);
});