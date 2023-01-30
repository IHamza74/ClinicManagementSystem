exports.getAllInvoices = (request, response, next) => {
  response.status(200).json({ status: "get done" });
};

exports.addInvoice = (req, res, next) => {
  res.status(201).json({ status: "post done" });
};

exports.editInvoice = (req, res, next) => {
  res.status(200).json({ status: "patch done" });
};

exports.deleteInvoice = (req, res, next) => {
  res.status(200).json({ status: "delete done" });
};
