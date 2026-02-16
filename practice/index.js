import express from "express";
import path from "path";
let app = express()
let port = 8080;
//when handling data through json
app.use(express.json())
//when handling data through forms
app.use(express.urlencoded({extended:true}))
app.set("view engine","ejs")
app.set("views",path.join(process.cwd(),"/views"))


let ObjArr = [
    {
    id:1,
    name:"Sahil",
    email:"sahil@gmail.com",
    gender:"male"
    },
    {
    id:2,
    name:"Raj",
    email:"raj@gmail.com",
    gender:"male"
    },
    {
    id:3,
    name:"aman",
    email:"an@gmail.com",
    gender:"male"
    },
    {
    id:4,
    name:"Rahul",
    email:"rahul@gmail.com",
    gender:"male"
    }
]

app.get("/",(req,res)=>{
    res.send("server is running.")
})
app.get("/user",(req,res)=>{
    res.status(200).json({ObjArr})
})

app.get("/page",(req,res)=>{
    res.render("index",{userdata:ObjArr})
})

app.post("/user",(req,res)=>{
    const{name,email,gender} = req.body
    let newUser = {
        id:ObjArr.length + 1,
        name,
        email,
        gender
    }

    ObjArr.push(newUser)
    res.redirect("/page")
})

app.listen(port,()=>{
    console.log("connected.")
})