const mongoose = require("mongoose");
require("../Models/clinicModel");
const clinicSchema = mongoose.model("clinic");

exports.getAllClinics = (request, response, next) => {
  //FILTERING DATA
  const Obj = { ...request.query };
  delete Obj["sort"]; //if user enter sort in query string
  let ObjStr = JSON.stringify(Obj);
  ObjStr = ObjStr.replace(/\b(gte|gt|lte|lt)\b/g, (matched) => `$${matched}`);
  ObjStr = JSON.parse(ObjStr);

  //OBJECT RESULTED FROM QUERY
  let resultedObj = clinicSchema.find(ObjStr);

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

exports.addClinic = (req, res, next) => {
  let newClinic = new clinicSchema({
    // _id: req.body.id,
    clinicName: req.body.clinicName,
    clinicAddress: req.body.clinicAddress,
    doctorsID: req.body.doctorsID

  })
    .save()
    .then((result) => {
      res.status(201).json({ status: "clinic added successfully" });
    })
    .catch((err) => {
      console.log(err)
      next(err);
    });
};

exports.editClinic = (req, res, next) => {
  clinicSchema
    .updateOne(
      { _id: req.body._id },
      {
        $set: {
          // _id: req.body.id,
          clinicName: req.body.clinicName,
          clinicAddress: req.body.clinicAddress,
          //  doctorsID: req.body.doctors
        },
      }
    )
    .then((result) => {
      res.status(200).json({ status: result });
    })
    .catch((error) => {
      console.log(error)
      next(error)
    });
};

exports.deleteClinic = (req, res, next) => {
  clinicSchema.deleteOne({ _id: req.params.id })
    .then((result) => {
      if (result != null)
        res.status(200).json({ status: "Clinic deleted successfully" });
      else {
        next(new Error("Wrong clinic ID, Process was cancelled."))
      }
    })
    .catch((error) => next(error));
};

/****DELETE DATA USING FILTER****/
exports.deleteFilteredClinic = (req, res, next) => {
  const Obj = { ...req.query };
  let ObjStr = JSON.stringify(Obj);
  ObjStr = ObjStr.replace(/\b(gte|gt|lte|lt)\b/g, (matched) => `$${matched}`);
  ObjStr = JSON.parse(ObjStr);

  clinicSchema
    .deleteMany(ObjStr)
    .then((result) => {
      if (result != null) res.status(200).json(result);
      else next(new Error("Data is not found!"));
    })
    .catch((error) => {
      next(error);
    });
};

/**  add doctor to  work at clinic */
exports.addDoctor = (req, res, next) => {

  clinicSchema.updateOne({ _id: req.params.id }, { $addToSet: { "doctorsID": req.body.id } }).then((result) => {
    res.status(200).json(result);
  }).catch(error => next(error))
}
/** delete doctor from clinic */
exports.deleteDoctor = (req, res, next) => {
  clinicSchema.updateOne({ _id: req.params.id }, { $pull: { "doctorsID": req.body.id } }).then((result) => {
    res.status(200).json(result);
  }).catch(error => next(error))
}

exports.getClinicsCount = (req, res, next) => {
  clinicSchema.countDocuments({}).then((data) => {
    res.status(200).json(data);

  }).catch((err) => {
    console.log(err);
  })
}


