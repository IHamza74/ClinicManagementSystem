const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const appointmentSchema = new Schema({
  _id: Schema.Types.ObjectId,
  patientID: { type: Schema.Types.ObjectId, ref: "Patients" },
  doctorID: { type: Schema.Types.ObjectId, ref: "doctor" },
  clinicID: { type: Schema.Types.ObjectId, ref: "clinic" },
  employeeID: { type: Schema.Types.ObjectId, ref: "employees" },
  date: {
    type: Date,
    default: Date.now(),
  },
});

mongoose.model("appointmentScheduler", appointmentSchema);
