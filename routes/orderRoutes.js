const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const protect = require('../middleware/authMiddleware');

router.post('/', protect, orderController.initializeOrder);

module.exports = router;