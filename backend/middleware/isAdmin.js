const jwt = require('jsonwebtoken');
const admin = require("../models/adminschema");

// Middleware to verify admin token and role
const authAdmin = async (req, res, next) => {
  const token = req.header('Authorization');

  if (!token || !token.startsWith('Bearer')) {
    return res.status(401).json({ message: 'Access denied! Not an Admin' });
  }

  try {
    const secretkey= "#hhfu7%jhf!y90#gyo02%";
    const tokenWithoutBearer = token.slice(7);
    const decoded = jwt.verify(tokenWithoutBearer, secretkey);
    const admin = await admin.findById(decoded.admin._id);
    if (!admin){
      return res.status(500).json({message: "Admin not authenticated!"});
    }
    req.admin=admin;
    if (req.admin.role !== "admin") {
      return res.status(403).json({ message: 'Access denied. Not authorized as an admin.' });
    }
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token, Admin not Found.' });
  }
};

module.exports = { authAdmin };
