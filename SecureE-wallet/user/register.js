import fs from "fs";
import { StatusCodes } from "http-status-pro-js";
import bcrypt from "bcrypt";


function register(req,res){
    try{
    let users = [];
    const {name,email,password,pin} = req.body;
    
    let salt = bcrypt.genSaltSync(10)
    const hashpassword = bcrypt.hashSync(password,salt);
    const hashpin = bcrypt.hashSync(pin,salt);
    let Obj = {
        id:Date.now(),
        name,
        email,
        password:hashpassword,
        pin:hashpin,
        balance:0,
        transaction:[]
    }

    if(fs.existsSync("userDB.json")){
        let data = JSON.parse(fs.readFileSync("userDB.json","utf-8"));
        const IsUserAlready = data.find((value)=>value.email === email);
        if(IsUserAlready){
            return res.status(StatusCodes.CONFLICT.code).json({
                code:StatusCodes.CONFLICT.code,
                message:StatusCodes.CONFLICT.message,
                data:null
            });
        }
        users = data
        fs.writeFileSync("userDB.json",JSON.stringify(users,null,2));
    }
    users.push(Obj)
    fs.writeFileSync("userDB.json",JSON.stringify(users,null,2));

    return res.status(StatusCodes.CREATED.code).json({
        code:StatusCodes.CREATED.code,
        message:StatusCodes.CREATED.message,
        data:null
    });


    }catch(error){
        console.log(error)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR.code).json({
            code:StatusCodes.INTERNAL_SERVER_ERROR.code,
            message:StatusCodes.INTERNAL_SERVER_ERROR.message,
            data:null
        })
    }
}

export default register;
