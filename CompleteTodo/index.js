import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import cookieParser from "cookie-parser"
import {rateLimit} from 'express-rate-limit'
import router from "./routes/user.route.js"

dotenv.config()

const App = express()
App.use(express.json())
App.use(cookieParser)

mongoose.connect(process.env.MONGODB_URL)
.then(() => console.log("successfully connected to mongoDB"))
.catch(()=>console.log("some error occured in connecting to mongoDB"))


const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit:10,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    ipv6Subnet: 56
})
App.use(limiter)

App.use('/',router)

App.listen(process.env.PORT || 8000,()=>{
    console.log("server connected at localhost:8080")
})