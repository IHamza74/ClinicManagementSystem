const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema(
  {
    medicineID: { type: mongoose.Schema.Types.ObjectId, ref: "Medicine", required: true },
    quantity: { type: Number, required: true },
  },
  { _id: false }
);

module.exports = medicineSchema;
