const mongoose = require("mongoose")
const cartItemSchema = require("./cart")
const userAddressSchema = require("./address")


const  userSchema  =  new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
       email : {
        type : String,
        required : true,
        unique : true
    },
       password : {
        type : String,
        required : true
    },
    role : {
        type: String ,
       enum  : ["admin","user"],
       default : "user" 
    },
    otp : {
        type : String
    },
    otpexpire : {
        type : Date
    },
    resetToken : {
        type : String
    },
    resetTokenexpire : {
        type : Date
    },
    cart : [cartItemSchema],
    address : [userAddressSchema]
},
{
    timestamps : true
})

module.exports = mongoose.model("User",userSchema)