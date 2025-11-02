const express = require("express")
const {  addproduct, getAllProducts } = require("../controller/addproduct")
const {protect } = require("../middleware/auth")
const upload = require("../middleware/uplodeMiddleware")
const router = express.Router()

router.post("/add", protect, upload.single("image"), addproduct);


// Public route for all products
router.get("/", getAllProducts);

module.exports = router;