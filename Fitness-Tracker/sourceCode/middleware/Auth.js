import jwt from "jsonwebtoken";
import {StatusCodes} from "http-status-pro-js"
import dotenv from "dotenv";
dotenv.config();
function auth(req, res, next){
    try {
        let auth = req.headers.authorization
        if(!auth || !auth.startsWith("Bearer ")){
                 res.status(StatusCodes.UNAUTHORIZED.code).json({
            code:StatusCodes.UNAUTHORIZED.code,
            message:StatusCodes.UNAUTHORIZED.message,
            data:null
        })
        return;
        }
    let auths = auth.split(" ")[1]
    let token = jwt.verify(auths, process.env.TOKENKEY)
    req.body.Id = token.Id
   
    next()
       
    } catch (error) {
        console.log(error);
        res.status(StatusCodes.UNAUTHORIZED.code).json({
            code:error.message,
            data:null
        })
       
    }

}
export default auth
