const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const upload = require("../controller/uplodeMiddleware");

const {
  addproduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controller/addproduct");

// Public routes
router.get("/", getAllProducts);       // Get all products
router.get("/:id", getProductById);    // Get single product by ID

// Admin routes
router.post("/add", protect, upload.single("image"), addproduct); // Add product
router.put("/:id", protect, upload.single("image"), updateProduct); // Update product
router.delete("/:id", protect, deleteProduct); // Delete product

module.exports = router;
