const mongoose = require("mongoose")

mongoose.connect(process.env.MONGO_URL)
.then((req,res)=>{
   return console.log("Mongo is running", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

})

.catch((error)=>{
     console.log(error)
})