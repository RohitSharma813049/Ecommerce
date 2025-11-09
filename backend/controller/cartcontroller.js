// controller/cartcontroller.js
const Product = require("../models/product");
const User = require("../models/usermodel");

// Add to cart
const addproductcart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    if (!userId || !productId) {
      return res.status(400).json({ message: "Missing userId or productId" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const existingItem = user.cart.find(
      (item) => item.product.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity || 1;
    } else {
      user.cart.push({
        product: productId,
        price: product.price,
        quantity: quantity || 1,
      });
    }

    await user.save();
    res.status(200).json({ message: "Product added to cart", cart: user.cart });
  } catch (error) {
    console.error("Error in addproductcart:", error);
    res.status(500).json({ message: "addproductcart not working", error: error.message });
  }
};

// Get cart
const getproductcart = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).populate("cart.product");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "Cart fetched successfully", cart: user.cart });
  } catch (error) {
    console.error("Error in getproductcart:", error);
    res.status(500).json({ message: "getproductcart not working", error: error.message });
  }
};

// Delete product
const deleteproductcart = async (req, res) => {
  try {
    const { userId, productId } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.cart = user.cart.filter((item) => item.product.toString() !== productId);
    await user.save();

    res.status(200).json({ message: "Product removed from cart", cart: user.cart });
  } catch (error) {
    console.error("Error in deleteproductcart:", error);
    res.status(500).json({ message: "deleteproductcart not working", error: error.message });
  }
};

module.exports = { addproductcart, getproductcart, deleteproductcart };
