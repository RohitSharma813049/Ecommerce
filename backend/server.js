const express = require("express");
require("dotenv").config();

const path = require("path"); 
const Port = process.env.PORT || 6523;  // default to 6523 if not set
const bodyparser = require("body-parser");
const cors = require("cors");
const app = express();

const userAccount = require("./routes/useraccount");
const ProductRoutes =  require("./routes/product")


require("./config/db");

app.use(bodyparser.json());
app.use(cors());

app.get("/", (req, res) => {
  return res.send("Welcome To App");
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/auth", userAccount);
app.use("/api/products",ProductRoutes)

app.listen(Port, (error) => {
  if (error) {
    return console.log(`Error: ${error}`);
  }
  console.log(`Server is running at http://localhost:${Port}`);
});
