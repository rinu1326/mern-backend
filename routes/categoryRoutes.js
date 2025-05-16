const express = require("express");
const router = express.Router();
const Category = require("../models/Category");
const SubCategory = require("../models/SubCategory");

// Add Category
router.post("/category", async (req, res) => {
  try {
    const category = new Category({ name: req.body.name });
    await category.save();
    res.json(category);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});

// Add SubCategory
router.post("/subcategory", async (req, res) => {
  try {
    const sub = new SubCategory({
      name: req.body.name,
      category: req.body.categoryId
    });
    await sub.save();
    res.json(sub);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});

// Get all categories
router.get("/categories", async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
});

// Get subcategories for a category
router.get("/subcategories/:categoryId", async (req, res) => {
  const subs = await SubCategory.find({ category: req.params.categoryId });
  res.json(subs);
});

module.exports = router;
