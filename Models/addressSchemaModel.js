const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
    {
        government: { type: String },
        city: { type: String },
        street: { type: String },
        building: { type: String },
    },
    { _id: false }

);

module.exports = addressSchema;
