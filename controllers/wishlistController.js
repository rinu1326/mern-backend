const Wishlist = require("../models/Wishlist");

// Add to wishlist
exports.addToWishlist = async (req, res) => {
  try {
    const existing = await Wishlist.findOne({ user: req.user.id, product: req.body.productId });
    if (existing) return res.status(400).json({ msg: "Already in wishlist" });

    const wish = await Wishlist.create({
      user: req.user.id,
      product: req.body.productId
    });

    res.json(wish);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

// Get user's wishlist
exports.getWishlist = async (req, res) => {
  const wishes = await Wishlist.find({ user: req.user.id }).populate("product");
  res.json(wishes);
};

// Remove from wishlist
exports.removeWishlist = async (req, res) => {
  await Wishlist.findOneAndDelete({ user: req.user.id, product: req.params.productId });
  res.json({ msg: "Removed from wishlist" });
};
