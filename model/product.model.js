import { required } from "joi";
import mongoose from "mongoose";

let productSchema = new mongoose.Schema({
    name:{
        type:string,
        minLength:2,
        maxLength:20,
        lowercase:true,
        trim:true,
        required:true
    },
    price:{
        type:number,
        min:1,
        required:true
    },
    stock:{
        type:number,
        min:1,
        required:true
    },
    category:{
        type:string,
        minLength:[5],
        maxLength:[20],
        required:true,
        trim:true,
        lowercase:true
    }
})

export default mongoose.model("Product",productSchema)