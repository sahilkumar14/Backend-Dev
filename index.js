import express from "express"
import dotenv from "dotenv"
import dbconnection from "./config/db.config.js"
dotenv.config()

const app = express()
app.use(express.json())
dbconnection()
app.listen(process.env.PORT,()=>{
    console.log("server running")
})