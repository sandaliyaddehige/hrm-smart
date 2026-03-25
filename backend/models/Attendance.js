import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: "Employee", required: true },
  employee:   { type: String, required: true },
  date:       { type: String, required: true },
  day:        { type: Number, required: true },
  time:       { type: String, default: "--" },
  hours:      { type: String, default: "--" },
  status:     { type: String, enum: ["Present", "Absent", "Late", "On Leave"], required: true },
}, { timestamps: true });

export default mongoose.model("Attendance", attendanceSchema);