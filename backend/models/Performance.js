import mongoose from 'mongoose'

const performanceSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: [true, 'Employee is required'],
  },
  kpi:           { type: Number, default: 0, min: 0, max: 100 },
  tasks:         { type: Number, default: 0, min: 0, max: 100 },
  attendance:    { type: Number, default: 0, min: 0, max: 100 },
  collaboration: { type: Number, default: 0, min: 1, max: 5 },
  rating: {
    type: String,
    enum: ['Outstanding', 'Exceeds Expectations', 'Meets Expectations', 'Below Expectations'],
    default: 'Meets Expectations',
  },
  comment:      { type: String, default: '' },
  reviewPeriod: { type: String, default: 'Q1 2026' },
}, { timestamps: true })

export default mongoose.model('Performance', performanceSchema)