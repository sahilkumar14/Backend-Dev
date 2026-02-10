import fs from "fs";
import {StatusCodes} from "http-status-pro-js";
import bcrypt from "bcrypt";

function login(req,res){
    try{
    let{email, password} = req.body;
    if(!email || !password){
        return res.status(StatusCodes.BAD_REQUEST.code).json({
            code:StatusCodes.BAD_REQUEST.code,
            message:StatusCodes.BAD_REQUEST.message,
            data:null
        });
    }

    if(fs.existsSync("userDB.json")){
        let data = JSON.parse(fs.readFileSync("userDB.json","utf-8"));
        let isUser = data.find((value)=>value.email===email)
        if(!isUser){
            return res.status(StatusCodes.FORBIDDEN.code).json({
                code:StatusCodes.FORBIDDEN.code,
                message:StatusCodes.FORBIDDEN.message,
                data:null
            });
        }

        let decryptPassword = bcrypt.compareSync(password,isUser.password)
        if(decryptPassword){
            return res.status(StatusCodes.ACCEPTED.code).json({
                code:StatusCodes.ACCEPTED.code,
                message:StatusCodes.ACCEPTED.message,
                data:null
            });
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
    res.status(StatusCodes.INTERNAL_SERVER_ERROR.code).json({
        code:StatusCodes.INTERNAL_SERVER_ERROR.code,
        message:StatusCodes.INTERNAL_SERVER_ERROR.message,
        data:null
    })
  }
}

export default login