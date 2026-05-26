const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const protect = require('../middleware/authMiddleware');

router.use(protect); // All shopping cart management requires logging in first

router.get('/', cartController.getCart);
router.post('/', cartController.addToCartOrUpdate);
router.delete('/:productId', cartController.removeItemFromCart);

module.exports = router;