const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const appointmentSchema = new Schema({
  _id: Schema.Types.ObjectId,
  patientID: { type: Schema.Types.ObjectId, ref: "Patients", required: [true, "Please enter Patient ID!"] },
  doctorID: { type: Schema.Types.ObjectId, ref: "doctor", required: [true, "Please enter doctor ID!"] },
  clinicID: { type: Schema.Types.ObjectId, ref: "clinic", required: [true, "Please enter dlinic ID!"] },
  employeeID: { type: Schema.Types.ObjectId, ref: "employees", required: [true, "Please enter employee ID!"] },
  date: {
    type: Date,
    default: Date.now(),
  },
});

mongoose.model("appointmentScheduler", appointmentSchema);
