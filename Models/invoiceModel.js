
const mongoose = require("mongoose")




const schema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  medicine:{type: mongoose.Schema.Types.ObjectId,ref:"Medicine"},
  money: { type: Number, required: true },
  appointmentID: { type: Number, ref: "appointments" },
  paymentMethod: {
    type: String,
    enum: ["Cash", "Credit Card", "Insurance Card"],
  },
});

mongoose.model("invoices", schema);
