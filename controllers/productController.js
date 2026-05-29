const Product = require('../models/Product');

exports.createProduct = async (req, res) => {
  try {

    const product = new Product({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      stockCount: req.body.stockCount,
      image: req.file ? req.file.path :''
    });

    await product.save();

    res.status(201).json({
      message: 'Product created successfully',
      product
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// GET SINGLE PRODUCT BY ID
exports.getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    // Check if product exists
    if (!product) {
      return res.status(404).json({
        message: 'Product not found'
      });
    }

    // Success response
    res.status(200).json(product);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    // FIXED: Changed req.top to req.params.id to catch url parameters correctly
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product successfully deleted from catalog' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};