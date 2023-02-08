const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const addressSchema = require("../Models/addressSchemaModel");
const schema = mongoose.Schema;
let employeeSchema = new schema({
  _id: schema.Types.ObjectId,
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
  photo: {
    type: String,
    default: "default.jpg",
  },
  address: {
    type: addressSchema,
  },
});

employeeSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  next();
});

mongoose.model("employees", employeeSchema);
