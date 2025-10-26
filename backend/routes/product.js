const express = require("express");
const router = express.Router();
const productController = require("../controller/addproduct");
const { verifyToken, verifyAdmin } = require("../middleware/auth");
const multer = require("multer");
const path = require("path");

// Setup multer storage for image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Make sure this folder exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // unique filename with original extension
  },
});

const upload = multer({ storage });

// Route to add a product (only accessible by admin, with image upload)
router.post('/products', verifyToken, verifyAdmin, upload.single('image'), productController.addProduct);

module.exports = router;
