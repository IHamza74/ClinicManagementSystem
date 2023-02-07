const mongoose = require("mongoose")


const Schema = mongoose.Schema;
const pendingAppointmentSchema = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true,
    },

    patientID: { type: Schema.Types.ObjectId, ref: "Patients", required: [true, "not valid Patient ID!"] },
    clinicID: { type: Schema.Types.ObjectId, ref: "clinic" },
    date: {
        type: Date,
        default: Date.now(),
    },
    painDescription: { type: String, required: [true, "please descripe what you suffer from "] }
});

mongoose.model("PendingAppointment", pendingAppointmentSchema);
