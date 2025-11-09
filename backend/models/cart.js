const mongoose = require("mongoose")
const product = require("./product")

const cartItemSchema = new mongoose.Schema({
  product : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "Product",
    required : true
  },
  price :{
    type : Number,
    required : true
  },
  quantity : {
    type : Number,
   default : 1,
  }
});

module.exports = cartItemSchema;