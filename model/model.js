const mongoose=require("mongoose")

const userSchema=mongoose.Schema({
   name:String,
   email:String,
   password:String,
   age:Number
})

const userModel=mongoose.model("usercollection",userSchema)

module.exports={userModel}