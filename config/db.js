const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://kidtech:1KDd8BbqanMuhVD9@serverecommerce.hldda98.mongodb.net/');
    console.log(`Database engine securely connected to MongoDB: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Database configuration error encountered: ${error.message}`);
    process.exit(1); // Crash the server immediately if the database cannot be reached
  }
};

module.exports = connectDB;