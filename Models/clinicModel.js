const mongoose = require("mongoose");

let schema = new mongoose.Schema(
    {
        _id: {
            type: Number,
            required: [true, 'You must enter an id for clinic']
        },
        clinicName: {
            type: String,
            required: [true, 'You must enter a clinic name']
        },
        clinicAddress: {
            type: String
        }
    }
)

mongoose.model("clinic", schema);
