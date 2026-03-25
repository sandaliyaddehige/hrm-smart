import mongoose from 'mongoose'

const attendanceSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: [true, 'Employee is required'],
  },
  month:   { type: String, required: [true, 'Month is required'] }, // e.g. "2026-03"
  present: { type: Number, default: 0 },
  absent:  { type: Number, default: 0 },
  leave:   { type: Number, default: 0 },
}, { timestamps: true })

// Prevent duplicate record for same employee + month
attendanceSchema.index({ employee: 1, month: 1 }, { unique: true })

export default mongoose.model('Attendance', attendanceSchema)