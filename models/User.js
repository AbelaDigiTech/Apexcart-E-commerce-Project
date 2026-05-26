const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true }, // Keeping plain text for this educational demo
  role: { type: String, enum: ['customer', 'admin'], default: 'customer' }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);