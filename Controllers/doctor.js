exports.getAllDoctors = (request, response, next) => {
  response.status(200).json({ status: "get done" });
};

exports.addDoctor = (req, res, next) => {
  res.status(201).json({ status: "post done" });
};

exports.editDoctor = (req, res, next) => {
  res.status(200).json({ status: "patch done" });
};

exports.deleteDoctor = (req, res, next) => {
  res.status(200).json({ status: "delete done" });
};
