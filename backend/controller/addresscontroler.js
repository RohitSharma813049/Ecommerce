const User = require("../models/usermodel")

const addaddress = async (req,res) =>{
 try{
 const {userId , lable ,country , city , pincode , housenumber } = req.body ; 

    if (!userId || !country || !city || !pincode || !housenumber) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    
     user.address.push({
      label: label || "Home",
      country,
      city,
      pincode,
      housenumber,
    });

     await user.save();

    return res.status(200).json({
      message: "Address added successfully",
      address: user.address,
    });

 }
 catch(error){
  return res.status().json({
    message : "addadress is not working"
  })
 }
}

const deleteaddress = async (req,res) =>{
 try{
const { userId, addressId } = req.body;

if (!userId || !addressId) {
      return res.status(400).json({ message: "Missing userId or addressId" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }


     user.address = user.address.filter(
      (addr) => addr._id.toString() !== addressId
    );

    await user.save();

    return res.status(200).json({
      message: "Address deleted successfully",
      address: user.address,
    });

 }
 catch(error){
  return res.status().json({
    message : "deleteadress is not working"
  })
 }
}

const getaddress = async (req,res) =>{
 try{
 const {userId} = req.params;

 if(!userId){
  return res.status().json({
    message : "USerId is not found"
  })
 }
  const user = await User.findById(userId);

  if(!user){
  return res.status().json({
    message : "USer is not found"
  })
 }

 return res.status(200).json({
      message: "Addresses fetched successfully",
      address: user.address,
    });

}
 catch(error){
  return res.status().json({
    message : "getadress is not working"
  })
 }
}

module.exports = {
  addaddress,
  deleteaddress,
  getaddress,
};