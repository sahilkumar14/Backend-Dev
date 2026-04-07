import mongoose from "mongoose";



let userSchema = new mongoose.Schema({
    name:{
       type:String,
       minlength:3,
       maxlength:100,
       trim:true,
       required:true 
    },
    email:{
        type:String,
        trim:true,
        match:[/@gmail\.com$/],
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})


export const User = mongoose.model("user",userSchema)
