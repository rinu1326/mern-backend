const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

app.use(cors());

// Remove default express.json()
// app.use(express.json());

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "20mb" }));

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api", require("./routes/categoryRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/wishlist", require("./routes/wishlistRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
