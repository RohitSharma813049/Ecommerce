const express = require("express");
const router = express.Router();
const {
  addaddress,
  deleteaddress,
  getaddress,
} = require("../controller/addresscontroler");

router.post("/address/add", addaddress);
router.delete("/address/delete", deleteaddress);
router.get("/address/:userId", getaddress);

module.exports = router;