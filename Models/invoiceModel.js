const mongoose = require("mongoose");
const medicineSchema = require("./medicineSchema");

// let medicineSchema = new mongoose.Schema(
//   {
//     medicineID: { type: mongoose.Schema.Types.ObjectId, ref: "Medicine" },
//     quantity: { type: Number },
//   },
//   {
//     _id: false,
//   }
// );

const schema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  medicine: [medicineSchema],
  money: { type: Number, required: [true, "Please enter the invoice total money!"] },
  appointmentID: {
    type: mongoose.Schema.Types.ObjectId, required: [true, "Please enter appointment ID!"],
    unique: true,
    ref: "appointmentScheduler",
  },
  paymentMethod: {
    type: String,
    required: [true, "Please enter the payment method!"],
    enum: ["Cash", "Credit Card", "Insurance Card"],
  },
  patientID: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Please enter the patient ID!"],
    ref: "Patients"
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});
mongoose.model("invoices", schema);
