import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName:        { type: String, required: true },
  lastName:         { type: String, required: true },
  email:            { type: String, required: true, unique: true },
  password:         { type: String, required: true },
  address:          { type: String },
  contactNumber:    { type: String },
  emergencyContact: { type: String },
  employeeId:       { type: String },
  department:       { type: String },
  joinDate:         { type: String },
  role:             { type: String },
  jobTitle:         { type: String },
  employmentType:   { type: String },
  workLocation:     { type: String },
}, { timestamps: true });

export default mongoose.model("User", userSchema);