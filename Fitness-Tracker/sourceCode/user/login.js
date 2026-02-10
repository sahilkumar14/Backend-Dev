import fs from "fs";
import bcrypt from "bcrypt";
import {StatusCodes} from "http-status-pro-js";

function login(req,res){
    try{
    const{email,password} = req.body;
    if(!fs.existsSync("user.json")){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR.code).json({
            code:StatusCodes.INTERNAL_SERVER_ERROR.code,
            message:StatusCodes.INTERNAL_SERVER_ERROR.message,
            data:null
        });
    }

    let data = JSON.parse(fs.readFileSync("user.json","utf-8"))
    const isUser = data.find((value)=>value.email === email)
    if(isUser){
        if(bcrypt.compareSync(password,isUser.password)){
            return res.status(StatusCodes.ACCEPTED.code).json({
                code:StatusCodes.ACCEPTED.code,
                message:"login successfully",
                data:null
            });
        }else{
            return res.status(StatusCodes.FORBIDDEN.code).json({
                code:StatusCodes.FORBIDDEN.code,
                message:"something went wrong while login",
                data:null
            })
        }
    }else{
        return res.status(StatusCodes.FORBIDDEN.code).json({
            code:StatusCodes.FORBIDDEN.code,
            message:"something went wrong while login",
            data:null
        });
    }
    }catch(error){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR.code).json({
            code:StatusCodes.INTERNAL_SERVER_ERROR.code,
            message:StatusCodes.INTERNAL_SERVER_ERROR.message,
            data:null
        });
    }

}

export default login