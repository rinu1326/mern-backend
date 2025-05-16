const mongoose = require("mongoose");

const variantSchema = new mongoose.Schema({
  ram: String,
  price: Number,
  quantity: Number,
});

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    subCategory: { type: mongoose.Schema.Types.ObjectId, ref: "SubCategory" },
    variants: [variantSchema],
    image: { type: String }, // ✅ added
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
