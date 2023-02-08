const mongoose = require("mongoose");
const medicineSchema = require("./medicineSchema");
// const medicineModel = mongoose.model("Medicine");
// let medicineSchema = new mongoose.Schema(
//   {
//     medicineID: { type: mongoose.Schema.Types.ObjectId, ref: "Medicine" },
//     quantity: { type: Number },
//   },
//   {
//     _id: false,
//   }
// );

const schema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  medicine: [medicineSchema],
  money: { type: Number, required: [true, "Please enter the invoice total money!"] },
  appointmentID: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Please enter appointment ID!"],
    unique: true,
    ref: "appointmentScheduler",
  },
  paymentMethod: {
    type: String,
    required: [true, "Please enter the payment method!"],
    enum: ["Cash", "Credit Card", "Insurance Card"],
  },
  patientID: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Please enter the patient ID!"],
    ref: "Patients",
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  payment_status: {
    type: Boolean,
    default: false,
  },
  discount_percentage: {
    type: Number,
    default: 0.1,
    min: [0.1, "discount_percentage must be above .1"],
    max: [0.3, "discount_percentage must be below .3"],
    select: false,
  },
});

//handle payment by insurance card and Cash
schema.pre("save", function (next) {
  if (this.paymentMethod === "Insurance Card") {
    this.money *= 1 - this.discount_percentage;
    this.payment_status = true;
  } else if (this.paymentMethod === "Cash") this.payment_status = true;
  next();
});
// schema.pre("save", async function (next) {
//   console.log(this.medicine);
//   if (this.medicine) {
//     let price = 0;
//     try {
//       let medicine_array = this.medicine;
//       for (let medicine of medicine_array) {
//         console.log(medicine.quantity);
//         let med = await medicineModel
//           .findOneAndUpdate({ _id: medicine.medicineID }, { $inc: { Stock: -medicine.quantity } })
//           .then()
//           .catch((error) => {
//             // next(error);
//           });
//         price += med.Price * medicine.quantity;
//         console.log(price + "\n");
//         if (med.Stock < 1000) {
//           console.log(`low stock of medicine ${med.Name}`.bgRed);
//         }
//       }
//       this.money = price;
//     } catch (error) {
//       console.log(error);
//     }
//   }
// });

mongoose.model("invoices", schema);
