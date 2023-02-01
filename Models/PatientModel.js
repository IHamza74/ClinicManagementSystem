const mongoose = require("mongoose")


const schema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    auto: true,
  },
  Name: { type: String, required: [true, 'enter valid name'] },
  Age: { type: Number, required: [true, 'enter valid age'] },
  Address: { type: String, required: [true, 'enter valid address'] },
  Apointments: { type: [{type:Number,ref:"appointmentScheduler"}] },
  Disease: {
    type: String,
    required: [true, 'enter valid disease'],
  },
  Section: {
    type: String,
    required: [true, 'enter valid Section'],
    enum: ['Dermatology', 'Diagnostic radiology', 'Emergency medicine', 'Neurology', 'Ophthalmology', 'Pediatrics', 'Psychiatry']
  },
  Password: { type: String, required: [true, 'enter strong password'] },
  Email: {
    type: String, required: [true, 'enter valid mail'],
    match: [/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/, 'Please fill a valid email address'], unique: true
  },
},

)

mongoose.model("Patients", schema);