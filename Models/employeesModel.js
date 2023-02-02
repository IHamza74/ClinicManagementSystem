const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

let schema = new mongoose.Schema({
  _id: {
    type: Number,
    required: [true, "You must enter an id for employee"],
  },
  name: {
    type: String,
    required: [true, "You must enter employee name"],
  },
  email: {
    type: String,
    required: [true, "you must enter an e_mail for employee"],
  },
  password: {
    type: String,
    required: [true, "You must enter a password"],
  },
  age: {
    type: String,
  },
  address: {
    type: String,
  },
});

schema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  next();
});

mongoose.model("employees", schema);
