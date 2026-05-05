import jwt, { decode } from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

function userAuth(req,res,next){
    try {
        const authentication = req.header.authorization;
        if(!authentication || !authorization.statswith("Bearer")){
            return res.status(403).json({
                message:"some error occured while authentication"
            })
        }
        const token = authentication.split(" ")[1];
        const decoded = jwt.verify(token,process.env.TOKEN)
        if(!decoded){
            return res.status(403).json({
                message:"token not valid"
            })
        }
        req.user = decoded
        next()
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message:"authentication failed"
        })
    }
}