const mongoose = require("mongoose");
const schema = mongoose.Schema;
let clinicSchema = new schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  clinicName: {
    type: String,
    required: [true, "You must enter a clinic name"],
  },
  clinicAddress: {
    type: String,
  },
});

mongoose.model("clinic", clinicSchema);
