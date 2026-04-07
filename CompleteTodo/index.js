import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import userSchema from "./schema/user.schema.js"
import TodoSchema from "./schema/todo.schema.js"
import usersignup from "./service/user.signupservice.js"
import userSignupMidware from "./middleware/user.signupmidware.js"
dotenv.config()

const App = express()
App.use(express.json())
mongoose.connect(process.env.MONGODB_URL)
.then(() => console.log("successfully connected to mongoDB"))
.catch(()=>console.log("some error occured in connecting to mongoDB"))


App.post('/signup',userSignupMidware,usersignup)


// userSchema()
// TodoSchema()
App.listen(process.env.PORT || 8000,()=>{
    console.log("server connected at localhost:8080")
})