const express = require('express');
require('dotenv').config();
const connectDB = require('./config/db');

// Route Import Hub
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

const app = express();

// Connect to Database
connectDB();

// Global Middleware
app.use(express.json());

// Main App Router Mappings
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payment', paymentRoutes);

// Server Listening Initialization
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🌍 Server operational on port: ${PORT}`));

module.exports = app;