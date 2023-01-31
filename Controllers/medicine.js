 require("../Models/medecineModel")

 const mongoose =require("mongoose");

 const medicineSchema =mongoose.model("Medicine")
 






exports.getAllMedicines = (request, response, next) => {
  response.status(200).json({ status: "get done" });
};

exports.addMedicine = (req, res, next) => {
  let addmedicine = new medicineSchema({
    Name:req.body.Name,
    Dose:req.body.Dose,
    Price:req.body.Price,
    Strock:req.body.Stock
  })
  addmedicine.save().then((result)=>{
    res.status(201).json(result)
  }).catch((error)=>{
    next(error)
  })
};

exports.editMedicine = (req, res, next) => {
  medicineSchema.updateOne({_id:req.body.id},{

    $set:{
      Name:req.body.Name,
    Dose:req.body.Dose,
    Price:req.body.Price,
    Strock:req.body.Stock
    }
  }).then((result)=>{
    res.status("201").json(result)
  }).catch(error=>next(error))


};

exports.deleteMedicine = (req, res, next) => {
 medicineSchema.deleteOne({_id:req.body.id}).then((data)=>{
  res.status(201).json({messageL:"medicine has deleted"})
 }).catch(error=>next(error))
};
