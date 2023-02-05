const mongoose = require("mongoose");




const schema = new mongoose.Schema(
   {

      _id: {
         type: mongoose.Schema.Types.ObjectId,
         required: true,
         auto: true,
      },
      Name: { type: String, required: true },
      Dose: { type: Number },
      Price: { type: Number },
      Stock: { type: Number }

   }

);

mongoose.model("Medicine", schema);