const mongoose = require("mongoose")


const schema = new mongoose.Schema({
_id:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    auto: true,
  },
  Name:{type :String ,required :true},
  Age:{type:Number,required :true},
  Address:{type:String,required:true},
  Apointments:{type:[]},
  Disease:{type:String,required:true},
  Password:{type:String,required:true,bcrypt:true},
  Email:{type:String,required:true,
    match: [/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/, 'Please fill a valid email address'],unique:true},
},

)

mongoose.model("Patients",schema);