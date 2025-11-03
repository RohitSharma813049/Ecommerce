const Product = require("../models/product");

// Add a new product (Admin only)
const addproduct = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied: only admin can add product" });
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

    return res.status(201).json({ message: "Product added successfully", product });
  } catch (error) {
    return res.status(400).json({ message: "Error in addproduct", error: error.message });
  }
};

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    return res.status(200).json(products);
  } catch (error) {
    return res.status(400).json({ message: "Error fetching products", error: error.message });
  }
};

// Get product by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    return res.status(200).json(product);
  } catch (error) {
    return res.status(400).json({ message: "Error fetching product", error: error.message });
  }
};

// Update product by ID (Admin only)
const updateProduct = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied: only admin can update product" });
    }

    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

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

    if (req.file) {
      product.imageUrl = `/uploads/${req.file.filename}`;
    }

    product.name = name || product.name;
    product.description = description || product.description;
    product.cutPrice = cutPrice !== undefined ? cutPrice : product.cutPrice;
    product.offer = offer !== undefined ? offer : product.offer;
    product.price = price !== undefined ? price : product.price;
    product.category = category || product.category;
    product.subCategory = subCategory || product.subCategory;
    product.stock = stock !== undefined ? stock : product.stock;

    await product.save();

    return res.status(200).json({ message: "Product updated successfully", product });
  } catch (error) {
    return res.status(400).json({ message: "Error updating product", error: error.message });
  }
};

// Delete product by ID (Admin only)
const deleteProduct = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied: only admin can delete product" });
    }

    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    await product.remove();

    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    return res.status(400).json({ message: "Error deleting product", error: error.message });
  }
};

module.exports = {
  addproduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
