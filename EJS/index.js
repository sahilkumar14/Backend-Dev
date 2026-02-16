import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config()
let app = express()
let port = process.env.PORT || 8000
app.use(express.json());
app.use(cors());
app.set("view engine","ejs")

app.get('/home',(req,res)=>{
    let name = "sahil"
    let obj = {
        "ID":2342424,
        "name":"sahil",
        "email":"sahil@gmail.com"
    }


    res.render("index",{name:name,student:obj})
})
app.listen(port,()=>{
    console.log("connected to the server")
})