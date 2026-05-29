const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const protect = require('../middleware/authMiddleware');
const adminOnly = require('../middleware/adminMiddleware');
const upload = require('../middleware/uploadMiddleware');

// Public catalog access
router.get('/get-product', productController.getAllProducts);
router.get('/:id', productController.getSingleProduct);

// Admin guarded routes
router.post('/create-product', upload.single('image'),protect, adminOnly, productController.createProduct);
router.put('/update-product/:id', protect, adminOnly, productController.updateProduct);
router.delete('/delete-product/:id', protect, adminOnly, productController.deleteProduct);

// CRITICAL: Express needs this export to prevent the 'argument handler must be a function' error!
module.exports = router;