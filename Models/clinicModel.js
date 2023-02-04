const mongoose = require("mongoose");
const addressSchema = require("../Models/addressSchemaModel")
const schema = mongoose.Schema;
let clinicSchema = new schema(
    {
        _id: {
            type: schema.Types.ObjectId,
        },
        clinicName: {
            type: String,
            required: [true, 'You must enter a clinic name']
        },
        clinicAddress: {
            type: addressSchema
        }
    }
)

mongoose.model("clinic", clinicSchema);
