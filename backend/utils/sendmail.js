const  nodemailer = require("nodemailer")
require("dotenv").config(); 

const sendmail=async({otp,email})=>{
    try{ 
  const transporter =  nodemailer.createTransport({
    service:"gmail",
    auth:{
      user : process.env.EMAIL_USER,
      pass : process.env.EMAIL_PASS
    }
  })

  const mailOptions = {
    from : process.env.EMAIL_USER,
    to : email,
    subject : "send Otp",
    text : `This is the myapp  ${otp}`,
    html: `<p><strong>Your OTP:</strong> ${otp}</p><p>It will expire in 10 minutes.</p>`
  }
   const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${email}: ${info.response}`);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

module.exports = sendmail