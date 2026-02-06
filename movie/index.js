import express from "express"
import register from "./sourceCode/User/registerUser.js";
import LoginUser from "./sourceCode/User/login.js";
import usermidd from "./sourceCode/middleware/middlewareUser.js";
import LoginMid from "./sourceCode/middleware/LoginMidd.js";
import dotenv from "dotenv";

dotenv.config();

let app = express();
let port = process.env.PORT;
app.use(express.json())

app.post("/signup",usermidd,register)
app.post("/login",LoginMid,LoginUser)
// app.post("/movies",Addmovie)
// app.put("/update",updateUser)
// app.delete("/delete",deleteUser)

app.listen(port,()=>{
    console.log("connected")
})