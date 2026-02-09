import express from "express"
import dotenv from "dotenv"
import search from "./QuerySearch.js"

dotenv.config();
let app = express();
app.use(express());

app.get("/search",search)
app.listen(process.env.PORT,()=>{
    console.log("Connected to server");
})