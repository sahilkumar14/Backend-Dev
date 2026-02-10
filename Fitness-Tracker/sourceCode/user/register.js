import fs from "fs";
import bcrypt from "bcrypt";
import {StatusCodes} from "http-status-pro-js";

function register(req,res){
    try{
        const{name, email, dailyGoal, password} = req.body
        const salt = bcrypt.genSaltSync(10);
        const hashpassword = bcrypt.hashSync(password,salt)
        let users = []
        let obj = {
            userID : Date.now(),
            name,
            email,
            dailyGoal,
            password:hashpassword,
            logs:[]
        }

        if(fs.existsSync("user.json")){
            let data = JSON.parse(fs.readFileSync("user.json","utf-8"))
            if(data.find((value)=>value.email === email)){
                return res.status(StatusCodes.CONFLICT.code).json({
                    code:StatusCodes.CONFLICT.code,
                    message:"this user already exists",
                    data:null
                });
            }
            users = data
            fs.writeFileSync("user.json",JSON.stringify(users,null,2));
        }
        users.push(obj)
        fs.writeFileSync("user.json",JSON.stringify(users,null,2));
    }catch(error){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR.code).json({
            code:StatusCodes.INTERNAL_SERVER_ERROR.code,
            message:StatusCodes.INTERNAL_SERVER_ERROR.message,
            data:null
        })
    }
}


export default register