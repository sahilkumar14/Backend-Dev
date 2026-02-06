import fs from "fs";
import { StatusCodes } from "http-status-pro-js";
import logger from "../Logger.js";
import bcrypt from "bcrypt";


function LoginUser(req,res){

    try{
        let{email, password} = req.body
        if(!email||!password){
            return res.status(StatusCodes.BAD_REQUEST.code).json({
                code:StatusCodes.BAD_REQUEST.code,
                message:StatusCodes.BAD_REQUEST.message,
                data:null
            })
        }
        if(fs.existsSync("user.json")){
            let data = fs.readFileSync("user.json","utf-8");
            let users =  JSON.parse(data)
            let user = users.find((value)=> value.email === email)
            if(!user){
                return res.status(StatusCodes.BAD_REQUEST.code).json({
                    code:StatusCodes.BAD_REQUEST.code,
                    message:"this user doesn't exists.",
                    data:null
                })
            }
            
            let decryptPassword = bcrypt.compareSync(password,user.password);
            if(decryptPassword){
                return res.status(StatusCodes.ACCEPTED.code).json({
                    code:StatusCodes.ACCEPTED.code,
                    message:"logged in successfully",
                    data:null
                })
            }else{
                return res.status(StatusCodes.FORBIDDEN.code).json({
                    code:StatusCodes.FORBIDDEN.code,
                    message:StatusCodes.FORBIDDEN.message,
                    data:null
                })
            }
        }

    }catch(err){
        console.log(err)
        logger("error: ",err)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR.code).json({
            code:StatusCodes.INTERNAL_SERVER_ERROR.code,
            message:StatusCodes.INTERNAL_SERVER_ERROR.message,
            data:null
        })
    }
}

export default LoginUser