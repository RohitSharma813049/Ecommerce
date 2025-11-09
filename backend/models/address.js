const mongoose = require("mongoose");

const userAddressSchema = new mongoose.Schema({
  label: {
    type: String,
    default: "Home",
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  pincode: {
    type: Number,
    required: true,
  },
  housenumber: {
    type: Number,
    required: true,
  },
});

// ✅ Export only the schema (not model)
module.exports = userAddressSchema;
