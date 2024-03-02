const mongoose = require('mongoose');

// Define Admin Schema
const adminschema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  role:{
    type: String,
    default: "admin"
  }
});

// Define Admin model
const Admin = mongoose.model('Admin', adminschema);

module.exports = Admin;
