const joi = require("joi")

const registerSchema = joi.object({
    name : joi.string().min(3).max(100).required(),
    email : joi.string().email().required(),
    password : joi.string().min(4).required(),
    role:joi.string().valid("user","admin").optional()
})

const loginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required()
});

const RegisterValidation = (req,res,next) =>{
    try{
    const {error} = registerSchema.validate(req.body);

     if(error){
     return res.status(400).json({
         messsage : error.details[0].message
        })
     }

     next()
     

    }
    catch(error){
        return res.status(400).json({
            messsage : "Bad request in register"
        })
    }
}

const LoginValidation = (req,res,next) =>{
    try{
     
    const {error} = loginSchema.validate(req.body);
      if(error){
     return res.status(400).json({
         messsage : error.details[0].message
        })
     }
     next()
    }
    catch(error){
        return res.status(400).json({
            messsage : "Bad request in login"
        })
    }
}


module.exports = {
    RegisterValidation,
    LoginValidation
}