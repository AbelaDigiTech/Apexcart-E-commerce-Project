const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  category: { type: String, required: true },
  stockCount: { type: Number, required: true, min: 0, default: 0 },
  image: {type: String,required: false, default: ''}

}, { timestamps: true });



// Client Rule: Automatically switch availability status based on stockCount
ProductSchema.virtual('availabilityStatus').get(function() {
  return this.stockCount > 0 ? 'In Stock' : 'Out of Stock';
});

ProductSchema.set('toJSON', { virtuals: true });
ProductSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Product', ProductSchema);