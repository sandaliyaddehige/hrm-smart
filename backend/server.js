const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path'); 


dotenv.config();

const app = express();

// --- 1. Middleware ---
app.use(cors()); 
app.use(express.json()); 



app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// --- 3. Routes ---
app.use('/api/auth', require('./routes/auth'));
app.use('/api/employee', require('./routes/employee'));
app.use('/api/payroll', require('./routes/payroll'));
app.use('/api/attendance', require('./routes/attendance'));
app.use('/api/leave', require('./routes/leave'));
app.use('/api/recruitment', require('./routes/recruitment'));
app.use('/api/dashboard', require('./routes/dashboard'));
app.use('/api/reports', require('./routes/report'));
app.use('/api/performance', require('./routes/performance')); 


// Basic testing route
app.get('/', (req, res) => {
  res.send('HRM Smart Backend is Running...');
});

// --- 4. Error Handling Middleware ---
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong! Please check server logs.',
    details: err.message 
  });
});

// --- 5. Database Connection ---
mongoose.set('strictQuery', false); 
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB Connected Successfully!');
  })
  .catch((err) => {
    console.log('❌ MongoDB Connection Error:');
    console.error(err.message);
  });

// --- 6. Server Start ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});