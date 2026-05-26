const Order = require('../models/Order');
const Cart = require('../models/Cart');

exports.initializeOrder = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id }).populate('items.productId');
    if (!cart || cart.items.length === 0) return res.status(400).json({ message: 'Your shopping cart is empty' });

    let totalAmount = 0;
    const orderItems = [];

    // Final security loop check on stock availability
    for (let item of cart.items) {
      if (item.productId.stockCount < item.quantity) {
        return res.status(400).json({ message: `Transaction blocked: ${item.productId.title} is now out of stock.` });
      }
      totalAmount += item.productId.price * item.quantity;
      orderItems.push({
        productId: item.productId._id,
        quantity: item.quantity,
        priceAtPurchase: item.productId.price
      });
    }

    const order = await Order.create({
      userId: req.user._id,
      items: orderItems,
      totalAmount,
      status: 'pending_payment'
    });

    res.status(201).json({ message: 'Order created successfully. Next up: Webhook verification simulation.', order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};