
const mongoose =require("mongoose")
const valodator = require("validator")
const userSchema = new mongoose.Schema({
    fullname:{
        type:String,
        minLegth:[4,"full name should have minimum 4 characters"],
        maxLegth:[16,"full name should have maximum 16 characters"],
        require : [true,"entre your  full name "]
    },
    email:{
        type:String,
        require : [true,"entre your email "],
        unique:true,
        validate:[valodator.isEmail, "enter a valid email"]
    },
    password:{
        type:String,
    }
});
const User = mongoose.model("user",userSchema)

module.exports=mongoose.model("user",userSchema)