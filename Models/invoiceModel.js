const mongoose = require("mongoose");

// let medicineSchema = new mongoose.Schema(
//   {
//     medicineID: { type: Number, ref: "medicines" },
//     quantity: { type: Number },
//   },
//   {
//     _id: false,
//   }
// );

const schema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  medicine: [medicineSchema],
  money: { type: Number, required: true },
  appointmentID: { type: Number, ref: "appointments" },
  paymentMethod: {
    type: String,
    enum: ["Cash", "Credit Card", "Insurance Card"],
  },
});

mongoose.model("invoices", schema);
