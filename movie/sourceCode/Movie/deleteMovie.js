import fs from "fs"
import logger from "../Logger.js"

function deleteMovie(req,res){
    try{
        const {id} = req.body;
        if(fs.existsSync("movies.json")){
            const moviedata = JSON.parse("movies.json","utf-8");
            
        }

    }catch(err){
        logger("error","some error occurred while deleting movie")
    }
}