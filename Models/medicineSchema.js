const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema(
  {
    medicineID: { type: mongoose.Schema.Types.ObjectId, ref: "Medicine", required: [true, "Please enter medicine ID!"] },
    quantity: { type: Number, required: [true, "Please enter medicine quantity!"] },
  },
  { _id: false }
);

module.exports = medicineSchema;
