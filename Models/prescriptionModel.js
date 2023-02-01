const mongoose = require("mongoose");

const medicineSchema = require("./medicineSchema");

const prescriptionSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  medicine: [medicineSchema],
  appointmentId: {
    type: Number,
    required: [true, "You must enter an appointment id for prescription"],
    unique: true,
    ref: "appointmentScheduler",
  },
});

mongoose.model("Prescriptions", prescriptionSchema);
