const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const doctorSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: { type: String, required: [true, "Please enter name!"] },
  age: { type: Number, required: [true, "Please enter age!"] },
  speciality: {
    type: String,
    enum: [
      "Internist",
      "Optometrist",
      "orthopedist",
      "Dentist",
      "Urologist",
      "Surgeon",
    ],
    required: [true, "Please enter speciality!"],
  },
  email: {
    type: String,
    unique: [true, "duplicated email!"],
    match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/],
    required: [true, "Please enter email!"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 8,
    select: false,
  },
  workingHours: { type: Number, default: 6 },
  appointmentNo: [{ type: Number, ref: "appointmentScheduler" }],
});

mongoose.model("doctor", doctorSchema);
