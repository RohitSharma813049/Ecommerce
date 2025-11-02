const Product = require("../models/product");

// Add a new product (Admin only)
const addproduct = async (req, res) => {
  try {
    // Only admin can add products
    if (req.user.role !== "admin") {
      return res.status(403).json({
        message: "Access denied: only admin can add product",
      });
    }

    const {
      name,
      description,
      cutPrice,
      offer,
      price,
      category,
      subCategory,
      stock,
    } = req.body;

    // Save uploaded file URL if file exists
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : "";

    const product = await Product.create({
      name,
      description,
      cutPrice,
      offer,
      price,
      category,
      subCategory,
      stock,
      imageUrl,
    });

    return res.status(201).json({
      message: "Product added successfully",
      product,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error in addproduct",
      error: error.message,
    });
  }
};

// Get all products
const getAllProducts = async (req, res) => {
  try {
    // Fix: use sort() instead of toSorted()
    const products = await Product.find().sort({ createdAt: -1 });

    return res.status(200).json(products);
  } catch (error) {
    return res.status(400).json({
      message: "Error fetching products",
      error: error.message,
    });
  }
};

module.exports = {
  addproduct,
  getAllProducts,
};
