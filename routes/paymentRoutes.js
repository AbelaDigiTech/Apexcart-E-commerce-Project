const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// Open endpoint exposed to allow Paystack background servers to knock
router.post('/webhook', paymentController.handlePaystackWebhook);

module.exports = router;