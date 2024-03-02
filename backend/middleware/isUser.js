const jwt = require('jsonwebtoken');
const user= require("../models/userschema");

// Middleware to verify user token and role
const authUser = async (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Authorization denied. No token provided.' });
  }

  try {
    const secretKey = '@djfsjjsv&khg#ggt452!i0%3J4KK';
    const decoded = jwt.verify(token, secretKey);
    const user = await user.findById(decoded.user._id).populate("cart.product");
    if (!user) {
      return res.status(500).json({ message: 'Access denied. Invalid User.' });
    }
    req.user=user;
    return res.message("Decoded User", req.user);
  } catch (error) {
    res.status(401).json({ message: 'User Not found.' });
  }
};

module.exports = { authUser };
