require("../Models/medecineModel");

const mongoose = require("mongoose");

const medicineSchema = mongoose.model("Medicine");

exports.getAllMedicines = (request, response, next) => {
  //FILTERING DATA
  const Obj = { ...request.query };
  delete Obj["sort"]; //if user enter sort in query string
  let ObjStr = JSON.stringify(Obj);
  ObjStr = ObjStr.replace(/\b(gte|gt|lte|lt)\b/g, (matched) => `$${matched}`);
  ObjStr = JSON.parse(ObjStr);

  //OBJECT RESULTED FROM QUERY
  let resultedObj = medicineSchema.find(ObjStr);

  //IF SORTING DATA
  if (request.query.sort) {
    let sortBy = request.query.sort.split(",").join(" ");
    resultedObj = resultedObj.sort(sortBy);
  }

  //TO RETRIEVE DATA
  resultedObj
    .then((data) => {
      response.status(200).json(data);
    })
    .catch((error) => next(error));
};

exports.addMedicine = (req, res, next) => {
  let addmedicine = new medicineSchema({
    Name: req.body.name,
    Dose: req.body.dose,
    Price: req.body.price,
    Stock: req.body.stock,
  });
  addmedicine
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((error) => {
      next(error);
    });
};

exports.editMedicine = (req, res, next) => {
  medicineSchema
    .updateOne(
      { _id: req.body.id },
      {
        $set: {
          Name: req.body.Name,
          Dose: req.body.Dose,
          Price: req.body.Price,
          Stock: req.body.Stock,
        },
      }
    )
    .then((result) => {
      res.status("201").json(result);
    })
    .catch((error) => next(error));
};

exports.getMedicine= (req, res, next) => {
  medicineSchema.findById(req.params.id).then((data)=>{
    res.status("201").json(data);
  }).catch(error=>next(error))
}

exports.deleteMedicineByid= (req, res, next) => {
  medicineSchema.findByIdAndDelete(req.params.id).then((result)=>{
    res.status("201").json({message:"medicine has deleted"});
  }).catch(error=>next(error))
}

exports.deleteMedicine = (req, res, next) => {
  medicineSchema
    .deleteOne({ _id: req.body.id })
    .then((data) => {
      res.status(201).json({ messageL: "medicine has deleted" });
    })
    .catch((error) => next(error));
};

/****DELETE DATA USING FILTER****/
exports.deleteFilteredMedicine = (req, res, next) => {
  const Obj = { ...req.query };
  let ObjStr = JSON.stringify(Obj);
  ObjStr = ObjStr.replace(/\b(gte|gt|lte|lt)\b/g, (matched) => `$${matched}`);
  ObjStr = JSON.parse(ObjStr);

  medicineSchema
    .deleteMany(ObjStr)
    .then((result) => {
      if (result != null) res.status(200).json(result);
      else next(new Error("Data is not found!"));
    })
    .catch((error) => {
      next(error);
    });
};
