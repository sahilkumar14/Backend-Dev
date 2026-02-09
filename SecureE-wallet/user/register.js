import fs from "fs";
import {StatusCodes} from "http-status-pro-js";
import bcrypt, { hashSync } from "bcrypt";

function register(req,res){
    try{
        let userdb = [];
        let {name,email,password,pin} = req.body;

        let salt = bcrypt.genSaltSync(10);
        let hashpassword = hashSync(password,salt);
        let Hashpin = hashSync(pin,salt);
        let userObj = {
            id:Date.now(),
            name:name,
            email:email,
            password:hashpassword,
            pin:Hashpin,
            balance:0,
            transaction:[]
        }
        if(fs.existsSync("userDB.json")){
            let data = JSON.parse(fs.readFileSync("userDB.json","utf-8"));
            let ifUserExist = data.find((value)=>value.email === email);
            if(ifUserExist){
                return res.status(StatusCodes.CONFLICT.code).json({
                    code:StatusCodes.CONFLICT.code,
                    message:StatusCodes.CONFLICT.message,
                    data:null
                });
            }

            userdb = userObj;
        }
        userdb.push(userObj);
        fs.writeFileSync("userDB.json",JSON.stringify(userdb,null,2));
        return res.status(StatusCodes.CREATED.code).json({
            code:StatusCodes.CREATED.code,
            message:StatusCodes.CREATED.message,
            data:null
        })

    }catch(err){
        console.log(err)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR.code).json({
            code:StatusCodes.INTERNAL_SERVER_ERROR.code,
            message:StatusCodes.INTERNAL_SERVER_ERROR.message,
            data:null
        })
    }
}

export default register