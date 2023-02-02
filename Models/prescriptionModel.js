const mongoose = require("mongoose");

const medicineSchema = require("./medicineSchema");

const prescriptionSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "You must enter an doctor id for prescription"],
  },
  medicine: [medicineSchema],
  appointmentId: {
    type: mongoose.Schema.ObjectId,
    required: [true, "You must enter an appointment id for prescription"],
    unique: true,
    ref: "appointmentScheduler",
  },
});

mongoose.model("Prescriptions", prescriptionSchema);
