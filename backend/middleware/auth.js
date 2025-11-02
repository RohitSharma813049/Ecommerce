const jwt = require("jsonwebtoken")
const User = require("../models/usermodel")

const protect = async(req,res,next) =>{
 
 let token;

if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
  try {
    token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (err) {
    return res.status(401).json({ message: "Session expired. Please login again." });
  }
} else {
  return res.status(401).json({ message: "No token provided" });
}

  }

  module.exports = {protect}