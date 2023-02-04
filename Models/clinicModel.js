const mongoose = require("mongoose");
const addressSchema = require("../Models/addressSchemaModel")
const schema = mongoose.Schema;
let clinicSchema = new schema(
  {
    _id: {
      type: schema.Types.ObjectId, auto: true
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

mongoose.model("clinic", clinicSchema);
