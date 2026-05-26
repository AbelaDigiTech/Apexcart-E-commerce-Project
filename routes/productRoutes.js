const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const protect = require('../middleware/authMiddleware');
const adminOnly = require('../middleware/adminMiddleware');

// Public catalog access
router.get('/', productController.getAllProducts);

// Admin guarded routes
router.post('/', protect, adminOnly, productController.createProduct);
router.put('/:id', protect, adminOnly, productController.updateProduct);
router.delete('/:id', protect, adminOnly, productController.deleteProduct);

// CRITICAL: Express needs this export to prevent the 'argument handler must be a function' error!
module.exports = router;