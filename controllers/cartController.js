const Cart = require("../models/Cart");
const Product = require("../models/Product");

exports.addToCartOrUpdate = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const product = await Product.findById(productId);

    if (!product) return res.status(404).json({ message: "Product not found" });

    // Client Inventory Rule Check
    if (product.stockCount < quantity) {
      return res
        .status(400)
        .json({
          message: `Insufficient Stock. Maximum available is ${product.stockCount}`,
        });
    }

    let cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) cart = new Cart({ userId: req.user._id, items: [] });

    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId,
    );
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity = quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id }).populate(
      "items.productId",
    );
    if (!cart) return res.json({ userId: req.user._id, items: [] });
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.removeItemFromCart = async (req, res) => {
  try {
    const { productId } = req.params;

    const cart = await Cart.findOne({ userId: req.user._id });

    if (!cart) {
      return res.status(404).json({
        message: 'Cart not found'
      });
    }

    // Check if product exists in cart
    const productExists = cart.items.find(
      item => item.productId.toString() === productId
    );

    if (!productExists) {
      return res.status(404).json({
        message: 'Product not found in cart'
      });
    }
console.log(cart.items);
    // Remove item
    cart.items = cart.items.filter(
      item => item.productId.toString() !== productId
    );

    await cart.save();

    res.status(200).json({
      message: 'Product removed from cart successfully',
      cart
    });

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};
