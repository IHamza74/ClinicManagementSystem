const mongoose = require("mongoose");




const schema = new mongoose.Schema(
   {

      _id: {
         type: mongoose.Schema.Types.ObjectId,
         required: true,
         auto: true,
      },
      Name: { type: String, required: [true, "Please enter the medicine Name!"] },
      Dose: { type: Number, required: [true, "Please enter medicine dose!"] },
      Price: { type: Number, required: [true, "Please enter medicine price!"] },
      Stock: { type: Number, default: 1000 }

   }

);

mongoose.model("Medicine", schema);