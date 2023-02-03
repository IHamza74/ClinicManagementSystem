const mongoose = require("mongoose");




const schema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  email: {
    type: String,
    unique: [true, "duplicated email!"],
    match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/],
    required: [true, "Please enter email!"],
  },
});

mongoose.model("SharedData", schema);

