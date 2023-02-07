const mongoose = require("mongoose");
require("../Models/invoiceModel");
const InvoiceSchema = mongoose.model("invoices");

exports.getAllInvoices = (request, response, next) => {
  //FILTERING DATA
  const Obj = { ...request.query };
  delete Obj["sort"]; //if user enter sort in query string
  let ObjStr = JSON.stringify(Obj);
  ObjStr = ObjStr.replace(/\b(gte|gt|lte|lt)\b/g, (matched) => `$${matched}`);
  ObjStr = JSON.parse(ObjStr);

  //OBJECT RESULTED FROM QUERY
  let resultedObj = InvoiceSchema.find(ObjStr)
    .populate({
      path: "appointmentID",
      select: { _id: 0, patientID: 0, employeeID: 0 },
      populate: [
        { path: "doctorID", select: { _id: 0, Password: 0 } },
        { path: "clinicID", select: { _id: 0 } },
      ],
    })
    .populate({ path: "patientID", select: { _id: 0, Password: 0 } })
    .populate({
      path: "medicine",
      populate: { path: "medicineID", select: { _id: 0 } },
    });

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

exports.addInvoice = (req, res, next) => {
  let newInvoice = new InvoiceSchema({
    // _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    medicine: req.body.medicine,
    money: req.body.money,
    appointmentID: req.body.appointmentId,
    paymentMethod: req.body.paymentMethod,
    patientID: req.body.patientID,
  });
  newInvoice
    .save()
    .then((result) => {
      res.status(201).json({ status: "post done" });
    })
    .catch((error) => next(error));
};

exports.editInvoice = (req, res, next) => {
  InvoiceSchema.updateOne(
    { _id: req.body.id },
    {
      $set: {
        medicine: req.body.medicine,
        money: req.body.money,
        appointmentID: req.body.appointmentId,
        paymentMethod: req.body.paymentMethod,
      },
    }
  )
    .then((data) => {
      res.status(201).json({ data });
    })
    .catch((error) => next(error));
};

exports.deleteInvoice = (req, res, next) => {
  InvoiceSchema.deleteOne({ _id: req.params.id })
    .then((data) => {
      res.status(201).json({ message: "Delete invoice" });
    })
    .catch((error) => next(error));
};

/****DELETE DATA USING FILTER****/
exports.deleteFilteredInvoice = (req, res, next) => {
  const Obj = { ...req.query };
  let ObjStr = JSON.stringify(Obj);
  ObjStr = ObjStr.replace(/\b(gte|gt|lte|lt)\b/g, (matched) => `$${matched}`);
  ObjStr = JSON.parse(ObjStr);

  InvoiceSchema.deleteMany(ObjStr)
    .then((result) => {
      if (result != null) res.status(200).json(result);
      else next(new Error("Data is not found!"));
    })
    .catch((error) => {
      next(error);
    });
};

exports.getInvoicebyID = (req, res, next) => {
  InvoiceSchema.findOne({ _id: req.params.id })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => next(error));
};

exports.AllInvoicesReports = (req, res, next) => {
  InvoiceSchema.find()
    .populate({
      path: "appointmentID",
      select: { _id: 0, patientID: 0, employeeID: 0 },
      populate: [
        { path: "doctorID", select: { _id: 0, Password: 0 } },
        { path: "clinicID", select: { _id: 0 } },
      ],
    })
    .populate({ path: "patientID", select: { _id: 0, Password: 0 } })

    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => next(error));
};

exports.DailyInvoicesReports = (req, res, next) => {
  let date = new Date();
  date.setHours(0, 0, 0, 0);
  InvoiceSchema.find()
    .where("date")
    .gt(date)
    .populate({
      path: "appointmentID",
      select: { _id: 0, patientID: 0, employeeID: 0 },
      populate: [
        { path: "doctorID", select: { _id: 0, Password: 0 } },
        { path: "clinicID", select: { _id: 0 } },
      ],
    })
    .populate({ path: "patientID", select: { _id: 0, Password: 0 } })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => next(error));
};

exports.PatientInvoicesReports = (req, res, next) => {
  InvoiceSchema.find({ patientID: req.params.id })
    .populate({
      path: "appointmentID",
      select: { _id: 0, patientID: 0, employeeID: 0 },
      populate: [
        { path: "doctorID", select: { _id: 0, Password: 0 } },
        { path: "clinicID", select: { _id: 0 } },
      ],
    })
    .populate({ path: "patientID", select: { _id: 0, Password: 0 } })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => next(error));
};
