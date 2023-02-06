const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
    {
        government: { type: String, required: [true, "Please enter Government !"] },
        city: { type: String, required: [true, "Please enter City !"] },
        street: { type: String },
        building: { type: String },
    },
    { _id: false }

);

module.exports = addressSchema;
