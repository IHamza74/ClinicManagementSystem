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
  let resultedObj = InvoiceSchema.find(ObjStr);

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
  console.log(req.body.medicine, req.body.medicine);
  let newInvoice = new InvoiceSchema({
    // _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    medicine: req.body.medicine,
    money: req.body.money,
    appointmentID: req.body.appointmentId,
    paymentMethod: req.body.paymentMethod,
  });
  newInvoice
    .save()
    .then((result) => {
      res.status(201).json({ status: "post done" });
    })
    .catch((error) => next(error));
};

exports.editInvoice = (req, res, next) => {
  console.log(req.body);
  InvoiceSchema.updateOne(
    { _id: req.body.id },
    {
      $set: {
        medicine: req.body.medicine,
        money: req.body.money,
        appointmentID: req.body.appointmentID,
        paymentMethod: req.body.paymentMethod,
      },
    }
  )
    .then((data) => {
      res.status(201).json({ message: "Update invoice" });
    })
    .catch((error) => next(error));
};

exports.deleteInvoice = (req, res, next) => {
  InvoiceSchema.deleteOne({ _id: req.params.id })
    .then((data) => {
      res.status(201).json({ message: "Delete child" });
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
