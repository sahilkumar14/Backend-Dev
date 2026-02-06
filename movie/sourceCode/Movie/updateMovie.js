import fs from "fs"
import logger from "../Logger.js"
function updateMovie(req,res){
    try{
        const {id} = req.body;
        const {MovieName,price} = req.body;

        if(!id||!MovieName||!price){
            return res.status(409).send("enter all fields");
        }

        const moviedata = JSON.parse(fs.readFileSync("movies.json","utf-8"));
        const movieIndex = moviedata.findIndex(value => value.id === id);
        if(movieIndex === -1){
            return res.status(404).send("movies not found");
        }

        moviedata[movieIndex].MovieName = MovieName;
        movieIndex[movieIndex].price = price;

        fs.writeFileSync("movies.json",JSON.stringify(moviedata,null,2));
        return res.status(200).send("movie updated successfully");
    } catch(err){
        logger("error occurred while updating movie")
        res.status(500).send("server error occurred.")
    }
}

export default updateMovie