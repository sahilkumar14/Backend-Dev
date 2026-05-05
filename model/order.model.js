import { required } from "joi";
import mongoose from "mongoose";

let orderSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    products:[],
    totalamount:{
        type:number,
        min:[1],
        required:true
    },
    status:{
        enum:["in process","order placed"]
    },
    createdAt:{
        type:new Date().toLocaleDateString()
    }
},{timestamps:true})

export default mongoose.model("order",orderSchema)