// ✅ BACKEND ROUTES: routes/productRoutes.js
const express = require("express");
const router = express.Router();
const {
  addProduct,
  getProducts,
  getProductById,
  editProduct
} = require("../controllers/productController");

// ✅ Create product
router.post("/", addProduct);

// ✅ Get all products (with optional search, filters, pagination)
router.get("/", getProducts);

// ✅ Get single product by ID
router.get("/:id", getProductById);

// ✅ Edit product by ID
router.put("/:id", editProduct);

module.exports = router;
