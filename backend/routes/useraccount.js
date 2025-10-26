const router = require("express").Router()
const { Registercontroller, Logincontroller,  Otpsend,
    Otpveryfy,
    resetpassword} = require("../controller/useraccountcontroller")
const {RegisterValidation , LoginValidation} = require("../middleware/uservalidation")

router.post("/register",RegisterValidation,Registercontroller)

router.post("/login",LoginValidation, Logincontroller)

router.post("/user/sendotp",Otpsend)

router.post("/user/veryfyotp",Otpveryfy)

router.post("/user/resetpassword",resetpassword)



module.exports = router