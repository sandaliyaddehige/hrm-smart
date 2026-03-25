const express = require("express");
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './config/db.js'

import dashboardRoutes   from './routes/dashboardRoutes.js'
import employeeRoutes    from './routes/employeeRoutes.js'
import performanceRoutes from './routes/performanceRoutes.js'
import attendanceRoutes  from './routes/attendanceRoutes.js'

dotenv.config()
connectDB()

const app = express()

app.use(cors({ origin: 'http://localhost:5174' }))
app.use(express.json())

// Routes
app.use('/api/manager',     dashboardRoutes)
app.use('/api/employees',   employeeRoutes)
app.use('/api/performance', performanceRoutes)
app.use('/api/attendance',  attendanceRoutes)

// Health check
app.get('/', (req, res) => res.json({ message: 'HRM API is running' }))

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ message: err.message || 'Server Error' })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`))