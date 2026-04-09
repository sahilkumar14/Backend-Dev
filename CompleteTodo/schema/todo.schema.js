import mongoose from "mongoose";


let TodoSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        trim: true,
        required: true
    },
    status: {
        type: String,
        trim: true,
        enum:["pending","ongoing","completed"]
    },
    user_id: {
        type: mongoose.Schema.ObjectId,
        ref: "user"
    }
},{timestamps:true})

export const Todo = mongoose.model("todo",TodoSchema)
