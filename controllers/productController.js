
const Product = require("../models/Product");

//  Add a product
exports.addProduct = async (req, res) => {
  try {
    const { name, description, subCategory, variants, image } = req.body;

    if (!name || !description || !subCategory || !variants || !image) {
      return res.status(400).json({ msg: "All fields are required including image." });
    }

    const formattedVariants = variants.map(v => ({
      ram: v.ram,
      price: Number(v.price),
      quantity: Number(v.quantity)
    }));

    const product = await Product.create({
      name,
      description,
      subCategory,
      variants: formattedVariants,
      image,
      createdBy: req.user?.id || null,
    });

    res.status(201).json(product);
  } catch (err) {
    console.error("Add product error:", err);
    res.status(500).json({ msg: "Server error while adding product" });
  }
};

// Get all products
exports.getProducts = async (req, res) => {
  try {
    const { search, subCategory, page = 1, limit = 6 } = req.query;
    const query = {};
    if (search) query.name = { $regex: search, $options: "i" };
    if (subCategory) query.subCategory = subCategory;

    const products = await Product.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Product.countDocuments(query);

    res.json({ products, total });
  } catch (err) {
    console.error("Get products error:", err);
    res.status(500).json({ msg: "Server error while fetching products" });
  }
};

//  Get single product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ msg: "Product not found" });
    res.json(product);
  } catch (err) {
    console.error("Get product by ID error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

//  Edit a product by ID
exports.editProduct = async (req, res) => {
  try {
    const { name, description, subCategory, variants, image } = req.body;
    const formattedVariants = variants.map(v => ({
      ram: v.ram,
      price: Number(v.price),
      quantity: Number(v.quantity)
    }));

    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
        subCategory,
        variants: formattedVariants,
        image
      },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    console.error("Edit product error:", err);
    res.status(500).json({ msg: "Server error while editing product" });
  }
};
