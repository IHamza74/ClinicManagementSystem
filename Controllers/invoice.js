const mongoose = require("mongoose");
require("../Models/invoiceModel");
const InvoiceSchema = mongoose.model("invoices");

exports.getAllInvoices = (request, response, next) => {
  InvoiceSchema.find()
    .then((data) => {
      response.status(200).json(data);
    })
    .catch((error) => next(error));
  // response.status(200).json({ status: "get done" });
};

exports.addInvoice = (req, res, next) => {
  console.log(req.body.medicine, req.body.medicine);
  let newInvoice = new InvoiceSchema({
    // _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    medicine: req.body.medicine,
    money: req.body.money,
    appointmentID: req.body.appointmentID,
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
