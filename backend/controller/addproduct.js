const Product = require("../models/addproduct");

const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      cutPrice,
      offer = 0,
      price,
      category,
      subCategory = "",  // optional field
      stock = 0,
    } = req.body;

    // Validate required fields
    if (!name || !cutPrice || !price || !category) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    // Convert to numbers
    const cutPriceNum = Number(cutPrice);
    const offerNum = Number(offer);
    const priceNum = Number(price);
    const stockNum = Number(stock);

    // Validate number fields
    if (isNaN(cutPriceNum) || isNaN(offerNum) || isNaN(priceNum) || isNaN(stockNum)) {
      return res.status(400).json({ message: "Price, offer, and stock must be numbers." });
    }

    // Validate offer range
    if (offerNum < 0 || offerNum > 100) {
      return res.status(400).json({ message: "Offer must be between 0 and 100." });
    }

    // Validate price logic
    if (priceNum > cutPriceNum) {
      return res.status(400).json({ message: "Final price cannot exceed original price." });
    }

    // Check for uploaded image
    if (!req.file) {
      return res.status(400).json({ message: "Product image is required." });
    }

    // Prepare image URL
    const imageUrl = `/uploads/${req.file.filename}`;

    // Create new product
    const newProduct = new Product({
      name,
      description,
      cutPrice: cutPriceNum,
      offer: offerNum,
      price: priceNum,
      category,
      subCategory,   // save subcategory here
      stock: stockNum,
      imageUrl,
    });

    await newProduct.save();

    res.status(201).json({ message: "Product added successfully.", product: newProduct });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ message: "Server error." });
  }
};

module.exports = {
  addProduct
};
