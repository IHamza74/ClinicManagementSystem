const verifyusers = (...allowed) => {
  return (req, res, next) => {
    let userRole = req.role;
    if (!userRole) return res.status(401).json({ message: "not authorized xx" });

    let getAllowedRoles = [...allowed];

    const isvalid = getAllowedRoles.includes(userRole);
    if (!isvalid) return res.status(401).json({ message: "not authorized xxy" });
    else next();
  };
};
module.exports = verifyusers;
