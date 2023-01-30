exports.getAllMedicines = (request, response, next) => {
  response.status(200).json({ status: "get done" });
};

exports.addMedicine = (req, res, next) => {
  res.status(201).json({ status: "post done" });
};

exports.editMedicine = (req, res, next) => {
  res.status(200).json({ status: "patch done" });
};

exports.deleteMedicine = (req, res, next) => {
  res.status(200).json({ status: "delete done" });
};
