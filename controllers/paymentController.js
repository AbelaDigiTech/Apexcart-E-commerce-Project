const Order = require('../models/Order');
const Product = require('../models/Product');
const Cart = require('../models/Cart');

exports.handlePaystackWebhook = async (req, res) => {
  const event = req.body;

  // In production, you would run verification checks on headers here using the crypto utility
  if (event.event === 'charge.success') {
    const { reference } = event.data;

    try {
      // Find our oldest initialized payment order to process
      const order = await Order.findOne({ status: 'pending_payment' });
      if (!order) return res.status(404).json({ message: 'No matching open order found to fulfill' });

      // Action i: Flip order status to paid_processing
      order.status = 'paid_processing';
      order.paystackReference = reference;
      await order.save();

      // Action ii: Safely deduct ordered quantities from Product stockCount
      for (let item of order.items) {
        await Product.findByIdAndUpdate(item.productId, {
          $inc: { stockCount: -item.quantity } // Safe native MongoDB decrement action
        });
      }

      // Action iii: Clear active persistent shopping cart
      await Cart.findOneAndDelete({ userId: order.userId });

      return res.status(200).json({ status: 'success', message: 'Inventory deducted and cart cleared!' });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  res.status(200).send('Event recorded');
};