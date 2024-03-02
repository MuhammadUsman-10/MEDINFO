const express = require('express');
const Product = require('../models/productschema');
const isAdmin = require ('../middleware/isAdmin');

const router = express.Router();

// Get all products
router.get('/products', async (req, res) => {
  // try {
  //   const products = await Product.find();
  //   res.json(products);
  // } catch (error) {
  //   res.status(500).json({ error: error.message });
  // }

  try {
    // Check if a formula parameter is provided in the query
    const {formula} = req.body;

    if (formula) {
      // If formula is provided, filter products by formula
      const products = await Product.find({formula: formula.toLowerCase() });
      res.json(products);
    } else {
      // If no formula is provided, return all products
      const products = await Product.find();
      res.json(products);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/products/:id', async (req, res) => {
  try {
    const productId = req.params.id;

    // Use findById to retrieve a single product based on the id
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add a new product
router.post('/addproduct' , isAdmin.authAdmin, async (req, res) => {
  const { name, description, price, imageUrl } = req.body;
  try {
    const existingProduct = await Product.findOne({ productId });
    if (existingProduct) {
      return res.status(400).json({ message: 'Product with the same productId already exists.' });
    }
    const newProduct = new Product({ name, description, price, imageUrl });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a product by ID
router.put('/products/:id', isAdmin.authAdmin, async (req, res) => {
  const { id } = req.params;
  const { name, description, price, imageUrl } = req.body;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, description, price, imageUrl },
      { new: true }
    );
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a product by ID
router.delete('/products/:id', isAdmin.authAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    res.json({ message: 'Product deleted', deletedProduct });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
