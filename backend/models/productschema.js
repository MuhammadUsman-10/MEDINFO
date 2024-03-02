const mongoose = require('mongoose');

// Define Product Schema
const productschema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  formula: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  company:{
    type: String
  },
  imageUrl: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Define Product model
const Product = mongoose.model('Product', productschema);

module.exports = Product;
