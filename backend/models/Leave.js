import mongoose from "mongoose";

const leaveSchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: "Employee", required: true },
  name:       { type: String, required: true },
  empNum:     { type: String, required: true },
  leaveType:  { type: String, enum: ["Annual", "Sick", "Casual", "Unpaid", "Education"], required: true },
  startDate:  { type: String },
  endDate:    { type: String },
  enabled:    { type: String, enum: ["Active", "Inactive"], default: "Active" },
  status:     { type: String, enum: ["Pending", "Approved", "Rejected"], default: "Pending" },
}, { timestamps: true });

export default mongoose.model("Leave", leaveSchema);