const express = require("express");
require("dotenv").config();
const path = require("path");
const bodyparser = require("body-parser");
const cors = require("cors");

const app = express();
const Port = process.env.PORT || 6523; // default port if not set

// 🗄️ Database connection
require("./config/db");

// 🌐 Routes
const userAccount = require("./routes/useraccount");
const ProductRoutes = require("./routes/product");
const CartRoutes = require("./routes/cart")
const AddressRoutes = require("./routes/address")

// ⚙️ Middleware
app.use(bodyparser.json());
app.use(cors());

// 🏠 Static folder for uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// 🧩 Base routes
app.get("/", (req, res) => {
  res.send("Welcome To App");
});

app.use("/auth", userAccount);        // User authentication
app.use("/api/products", ProductRoutes); // Products
app.use("/auth",CartRoutes)
app.use("/auth",AddressRoutes)
// 🚀 Start server
app.listen(Port, (error) => {
  if (error) {
    return console.log(`Error: ${error}`);
  }
  console.log(`Server is running at http://localhost:${Port}`);
});
