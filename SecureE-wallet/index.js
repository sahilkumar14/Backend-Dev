import express from "express"
import dotenv from "dotenv"
import registermid from "./middleware/registerMid.js";
import register from "./user/register.js";
import login from "./user/login.js";
import addFunds from "./wallet/addFunds.js";

dotenv.config();

let app = express();
app.use(express.json());


app.post("/signup",registermid,register);
app.post("/login",login);
app.put("/funds",addFunds);


app.listen(process.env.PORT,()=>{
    console.log("Successfully connected to the server.")
})