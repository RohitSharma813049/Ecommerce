const express = require("express");
require("dotenv").config();

const Port = process.env.PORT || 6523;  // default to 6523 if not set
const bodyparser = require("body-parser");
const cors = require("cors");
const app = express();

const userAccount = require("./routes/useraccount");
const productRoutes = require("./routes/product");  // assuming you have product routes

require("./config/db");

app.use(bodyparser.json());
app.use(cors());

app.get("/", (req, res) => {
  return res.send("Welcome To App");
});

app.use("/auth", userAccount);
app.use("/admin", productRoutes); // example path for product routes

app.listen(Port, (error) => {
  if (error) {
    return console.log(`Error: ${error}`);
  }
  console.log(`Server is running at http://localhost:${Port}`);
});
