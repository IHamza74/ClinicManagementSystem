exports.getAllEmployees = (request, response, next) => {
  response.status(200).json({ status: "get done" });
};

exports.addEmployee = (req, res, next) => {
  res.status(201).json({ status: "post done" });
};

exports.editEmployee = (req, res, next) => {
  res.status(200).json({ status: "patch done" });
}

exports.deleteEmployee = (req, res, next) => {
  res.status(200).json({ status: "delete done" });
} 

