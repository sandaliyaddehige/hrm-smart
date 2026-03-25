import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  name:        { type: String, required: true },
  fathersName: { type: String },
  dob:         { type: String },
  gender:      { type: String },
  email:       { type: String, required: true, unique: true },
  phone:       { type: String },
  address:     { type: String },
  empId:       { type: String, required: true, unique: true },
  department:  { type: String },
  designation: { type: String },
  role:        { type: String },
  joinDate:    { type: String },
  attendance:  { present: { type: Number, default: 0 }, total: { type: Number, default: 0 } },
  leaves:      { taken: { type: Number, default: 0 }, total: { type: Number, default: 0 } },
  awards:      { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model("Employee", employeeSchema);