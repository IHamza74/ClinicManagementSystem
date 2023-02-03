const mongoose = require("mongoose");

let medicineSchema = new mongoose.Schema(
  {
    medicineID: { type: mongoose.Schema.Types.ObjectId, ref: "Medicine" },
    quantity: { type: Number },
  },
  {
    _id: false,
  }
);

const schema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  medicine: [medicineSchema],
  money: { type: Number, required: true },
  appointmentID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "appointmentScheduler",
  },
  paymentMethod: {
    type: String,
    enum: ["Cash", "Credit Card", "Insurance Card"],
  },
  patientID: { type: mongoose.Schema.Types.ObjectId, ref: "Patients" },
  date: {
    type: Date,
    default: Date.now(),
  },
});

mongoose.model("invoices", schema);
