import fs from "fs"
import {StatusCodes} from "http-status-pro-js"
import logger from "../Logger.js";
import bcrypt, { hashSync } from "bcrypt";

function register(req,res){
    try{  
        let users = [];
        let {name, email, password} = req.body;
        if(!name || !email || !password){
            // return res.status(StatusCodes.BAD_REQUEST).send("All fields are required.");
            return res.status(StatusCodes.BAD_REQUEST.code).json({
                code:StatusCodes.BAD_REQUEST.code,
                message:StatusCodes.BAD_REQUEST.message,
                data:null
            })
        }
        
        let salt = bcrypt.genSaltSync(10)
        let hashpassword = hashSync(password,salt)
        let obj = {
            id : Date.now(),
            name, 
            email, 
            password : hashpassword
        }
        if(fs.existsSync("user.json")){
            let user = JSON.parse(fs.readFileSync("user.json","utf-8"));
            let isUserExists = user.some((value)=>value.email === email);
            if(isUserExists){
                // return res.status(StatusCodes.CONFLICT).send("user exists.");
                return res.status(StatusCodes.CONFLICT.code).json({
                    code:StatusCodes.CONFLICT.code,
                    message:StatusCodes.CONFLICT.message,
                    data:null
                })
            }
            users = user
            fs.writeFileSync("user.json",JSON.stringify(users,null,2));
        }
        users.push(obj)
        fs.writeFileSync("user.json",JSON.stringify(users,null,2));

        // return res.status(StatusCodes.CREATED).send("user registered")
        return res.status(StatusCodes.CREATED.code).json({
            code:StatusCodes.CREATED.code,
            message:StatusCodes.CREATED.message,
            data:null
        })
        // next()
    }catch(err){
        logger("error","internal server error")
        res.status(StatusCodes.INTERNAL_SERVER_ERROR.code).json({
            code:StatusCodes.INTERNAL_SERVER_ERROR.code,
            message:StatusCodes.INTERNAL_SERVER_ERROR.message,
            data:null
        })
        // next(err)
    }
}

export default register

