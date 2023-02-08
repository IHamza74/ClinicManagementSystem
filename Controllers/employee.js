const mongoose = require("mongoose");
require("../Models/employeesModel");
require("../Models/sharedData");
const multer = require("multer");
const sharedMail = mongoose.model("SharedData")

const employeesSchema = mongoose.model("employees");

//creating img file
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "img");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `employee-${req.body.id}-${Date.now()}.${ext}`);
  },
});

//checking the uploaded file
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Not an image!"), false);
  }
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });
/**** UPLOAD IMAGE ****/
exports.uploadEmployeeImg = upload.single("photo");

const mailschema = mongoose.model("SharedData");

exports.getAllEmployees = (request, response, next) => {
  //FILTERING DATA
  const Obj = { ...request.query };
  delete Obj["sort"]; //if user enter sort in query string
  let ObjStr = JSON.stringify(Obj);
  ObjStr = ObjStr.replace(/\b(gte|gt|lte|lt)\b/g, (matched) => `$${matched}`);
  ObjStr = JSON.parse(ObjStr);

  //OBJECT RESULTED FROM QUERY
  let resultedObj = employeesSchema.find(ObjStr);

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

exports.addEmployee = (req, res, next) => {
  let newEmp = new employeesSchema({
    _id: mongoose.Types.ObjectId(),
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    age: req.body.age,
    address: req.body.address,
  })
    .save()
    .then((data) => {
      res.status(201).json({ status: "employee added successfully" });
    })
    .catch((error) => {
      sharedMail.deleteOne({email:request.body.email}).then((data)=>{console.log("mail deleted from data shared")})
      next(error)}
    );
};

exports.editEmployee = (req, res, next) => {
  employeesSchema
    .updateOne(
      { _id: req.body.id },
      {
        $set: {
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          age: req.body.age,
          address: req.body.address,
          photo: req.file.filename,
        },
      }
    )
    .then((data) => {
      res.status(200).json({ status: "Employee updated successfully" });
    })
    .catch((error) => next(error));
};

exports.deleteEmployee = (req, res, next) => {
  employeesSchema
    .deleteOne({
      _id: req.body.id,
    })
    .then((data) => {
      res.status(200).json({ status: "Employee deleted successfully" });
    })
    .catch((error) => next(error));
};

/****DELETE DATA USING FILTER****/
exports.deleteFilteredEmployee = (req, res, next) => {
  const Obj = { ...req.query };
  let ObjStr = JSON.stringify(Obj);
  ObjStr = ObjStr.replace(/\b(gte|gt|lte|lt)\b/g, (matched) => `$${matched}`);
  ObjStr = JSON.parse(ObjStr);

  employeesSchema
    .deleteMany(ObjStr)
    .then((result) => {
      if (result != null) res.status(200).json(result);
      else next(new Error("Data is not found!"));
    })
    .catch((error) => {
      next(error);
    });
};
