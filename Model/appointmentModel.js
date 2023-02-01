const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const appointmentSchema = new Schema({
  _id: Number,
  patientID: Number,
  doctorID: { type: Schema.Types.ObjectId, ref: "doctor" },
  clinicID: Number,
  employeeID: Number,
  date: {
    type: Date,
    default: Date.now(),
  },
});

mongoose.model("appointmentScheduler", appointmentSchema);
