const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const addressSchema = require("../Models/addressSchemaModel");

const schema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  },
  Name: { type: String, required: [true, "enter valid name"] },
  Age: { type: Number, required: [true, "enter valid age"] },

  photo: {
    type: String,
    default: "default.jpg",
  },
  Address: { type: addressSchema, required: [true, "enter valid address"] },
  Apointments: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "appointmentScheduler" }],
  },
  Disease: {
    type: String,
    required: [true, "enter valid disease"],
  },
  Section: {
    type: String,
    required: [true, "enter valid Section"],
    enum: [
      "Dermatology",
      "Diagnostic radiology",
      "Emergency medicine",
      "Neurology",
      "Ophthalmology",
      "Pediatrics",
      "Psychiatry",
    ],
  },
  Password: { type: String, required: [true, "enter strong password"] },
  Email: {
    type: String,
    required: [true, "enter valid mail"],
    match: [/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/, "Please fill a valid email address"],
    unique: true,
  },
});

schema.pre("save", async function (next) {
  if (!this.isModified("Password")) return next();

  this.Password = await bcrypt.hash(this.Password, 12);
  next();
});

mongoose.model("Patients", schema);
