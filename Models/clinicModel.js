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
    clinicAddress: { type: String, required: [true, "Please enter Clinic address!"] },
    doctorsID:{type:[
      {
        type:schema.Types.ObjectId,unique:true,ref:"doctor"
      }
    ]}
  }
)

mongoose.model("clinic", clinicSchema);
