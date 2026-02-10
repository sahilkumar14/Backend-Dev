import express from "express"
import dotenv from "dotenv"
import login from "./sourceCode/user/login.js"
import register from "./sourceCode/user/register.js"
import registerMid from "./sourceCode/middleware/registerMid.js"

dotenv.config()
let app = express()
app.use(express.json())


app.post("/signup",registerMid,register)
app.post("/login",login)

app.listen(process.env.PORT,()=>{
    console.log("Successfully connected to the server")
})