const User = require("../models/usermodel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const sendmail = require("../utils/sendmail")

const Registercontroller = async (req,res) =>{
    
    const {name,email,password,role} =  req.body

  try{
        const exists = await User.findOne({email})

    if(exists){
        return res.status(401).json({
            message : "User is already exists"
        })
    }
   
    const harsedpassword = await bcrypt.hash(password,10)
   
    const newuser = new User(
         {
            name,
            email,
            password : harsedpassword,
            role : role || "user"
        }
    )

   await newuser.save();

    return res.status(200).json({
        message : "Register Sucessful"
    })

  }
  catch(error){
    return res.status(400).json({
        message : "Error in Register"
    })
  }


}

const Logincontroller = async (req,res) =>{
    
    const {email,password} =  req.body

  try{
    
    const exists = await User.findOne({email})

    if(!exists){
        return res.status(401).json({
            message : "User is not exists"
        })
    }
   
    const  ismatch = await bcrypt.compare(password,exists.password)
    
    if(!ismatch){
   return res.status(501).json({
    message : "password is incorrect"
   })
    }
   
    const Token = jwt.sign({
        
        email : exists.email ,
        role : exists.role
    },
    process.env.SECRET_KEY,
    {expiresIn : "1hr"}
)

    return res.status(200).json({
       message : "Register Login",
       Token,
        user : {
        id: exists._id,
        name: exists.name,
        email: exists.email,
        role: exists.role,
      }
    })

  }
  catch(error){
    return res.status(400).json({
        message : "Error in Login"
    })
  }


}


const Otpsend = async (req,res) =>{
    
    const {email} =  req.body

  try{
    
    const exists = await User.findOne({email})

    if(!exists){
        return res.status(401).json({
            message : "User is not exists"
        })
    }

    const otp = Math.floor(100000+Math.random()*900000).toString();
    const otpExpire = new Date(Date.now()+10*60*1000);
    
    exists.otp = otp
    exists.otpexpire = otpExpire
    await exists.save();

    console.log(`otp ${otp}`)

    sendmail({otp, email : exists.email})

    return res.status(200).json({
       message : "Otp send",
    })

  }
  catch(error){
    return res.status(400).json({
        message : "Error in Otp send"
    })
  }

}

const Otpveryfy = async (req,res) =>{
    
    const {email,otp} =  req.body

  try{
    
    const exists = await User.findOne({email})

    if(!exists){
        return res.status(401).json({
            message : "User is not exists"
        })
    }
   
    if(otp !== exists.otp){
          return res.status(400).json({ message: "Invalid OTP" });
    }
    if(exists.otpexpire < Date.now()){
      return res.status(400).json({
        message : "OTP expired"
      })
    }

    exists.otp = undefined;
    exists.otpexpire = undefined;
    await exists.save();

    return res.status(200).json({
       message : "Otp veryfy",
    })

  }
  catch(error){
    return res.status(400).json({
        message : "Error in Login"
    })
  }


}

const resetpassword = async (req,res) =>{
    
    const {email,password} =  req.body

  try{
    
    const exists = await User.findOne({email})

    if(!exists){
        return res.status(401).json({
            message : "User is not exists"
        })
    }
   
  const hashedpassword = await bcrypt.hash(password, 10);
  exists.password = hashedpassword;
  exists.resetToken = undefined;
  exists.resetTokenexpire = undefined;

  await exists.save()

    return res.status(200).json({
       message : "reset Password Sucessfull",
    })

  }
  catch(error){
    return res.status(400).json({
        message : "Error in Login"
    })
  }


}

module.exports = {
    Registercontroller,
    Logincontroller,
    Otpsend,
    Otpveryfy,
    resetpassword

}