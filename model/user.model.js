import { date, required, string } from "joi";
import mongoose from "mongoose";

let userSchema = new mongoose.Schema({
    name:{
        type:string,
        minLength:[3],
        maxLength:[100],
        trim:true,
        lowercase:true,
        required:true
    },
    email:{
        type:string,
        trim:true,
        lowercase:true,
        pattern:["@gmail.com$"],
        required:true
    },
    password:{
        type:string,
        minLength:[4],
        maxLength:[20],
        required:true
    },
    role:{
        type:string,
        trim:true,
        lowercase:true,
        enum:["admin","user"],
        required:true
    },
    createdAt:new Date().toLocaleDateString()
},{timestamps:true})

export default mongoose.model("User",userSchema)