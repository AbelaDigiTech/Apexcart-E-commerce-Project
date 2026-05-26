const mongoose = require('mongoose');

const OrderItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
  priceAtPurchase: { type: Number, required: true }
});

const OrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [OrderItemSchema],
  totalAmount: { type: Number, required: true },
  status: { type: String, enum: ['pending_payment', 'paid_processing', 'failed'], default: 'pending_payment' },
  paystackReference: { type: String, unique: true, sparse: true }
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);