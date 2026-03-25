import mongoose from 'mongoose'

const employeeSchema = new mongoose.Schema({
  name:     { type: String, required: [true, 'Name is required'] },
  role:     { type: String, required: [true, 'Role is required'] },
  email:    { type: String, required: [true, 'Email is required'], unique: true, lowercase: true },
  phone:    { type: String },
  dept:     { type: String },
  joinDate: { type: Date },
  status:   { type: String, enum: ['Active', 'On-Leave', 'Inactive'], default: 'Active' },
  image:    { type: String, default: null },
}, { timestamps: true })

export default mongoose.model('Employee', employeeSchema)