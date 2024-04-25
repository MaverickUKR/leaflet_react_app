const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  itemNo: {
    type: Number,
  },
  enabled: {
    type: Boolean,
    default: true,
  },
  categories: {
    type: String,
  },
  article: {
    type: String,
  },
  description: {
    type: String,
  },
  currentPrice: {
    type: Number,
  },
  email: {
    type: String,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  telephone: {
    type: String,
    required: true,
  },
  coordinates: {
    type: Object,
    required: true,
  },
  imageUrls: [
    {
      type: String,
    },
  ],
  productUrl: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

ProductSchema.index({ "$**": "text" });

module.exports = Product = mongoose.model("products", ProductSchema);
