const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema(
  {
    medicineID: { type: Number, ref: "Medicine", required: true },
    quantity: { type: Number, required: true },
  },
  { _id: false }
);

module.exports = medicineSchema;
