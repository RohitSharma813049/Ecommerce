// routes/cartrouter.js
const express = require("express");
const router = express.Router();
const {
  addproductcart,
  getproductcart,
  deleteproductcart,
} = require("../controller/cartcontroller");

// Add product to cart
router.post("/add", addproductcart);

// Get user's cart by userId
router.get("/:userId", getproductcart);

// Delete product from cart
router.delete("/delete", deleteproductcart);

module.exports = router;
