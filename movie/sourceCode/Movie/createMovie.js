import fs from "fs"
import logger from "../Logger.js";

function Addmovie(req,res){
    try{
    let movies = []
    let{MovieName,price} = req.body;
    let movieObj = {
        id : Date.now(),
        MovieName,
        price
    }
    if(fs.existsSync("movies.json")){
        let data = JSON.parse(fs.readFileSync("movies.json","utf-8"));
        let movieExist = data.some((value) => value.MovieName === MovieName);
        if(movieExist){
            return res.status(409).send("movie already exists")  
        }
        movies = data
        fs.writeFileSync("movies.json",JSON.stringify(movies,null,2))
    }
    movies.push(movieObj)
    fs.writeFileSync("movies.json",JSON.stringify(movies,null,2))

    res.status(201).send("movie added")
   }catch(err){
     logger("error","error occured while adding movie",err)
     return res.status(500).send("internal server error");
   }
}

export default Addmovie