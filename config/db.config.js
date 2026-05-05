import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()

async function dbconnection(){
    await mongoose.connect(process.env.MONGO_URL)
          .then(()=>{
        console.log("mongodb connected")
    })
    .catch((error)=>{
        console.log("some error occured connecting mongodb")
    })
}


export default dbconnection()