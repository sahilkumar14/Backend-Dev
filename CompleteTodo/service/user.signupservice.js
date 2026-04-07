import userSchema from "../schema/user.schema.js"
import bcrypt from "bcrypt"
import {StatusCodes} from "http-status-pro-js"


export default function usersignup(req,res){
    try {
        let{name,email,password} = req.body
        let salt = bcrypt.genSaltSync(10)
        let hashpassword = bcrypt.hashSync(password,salt)
        let user = userSchema(name,email,hashpassword)
        if(!user){
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR.code).json({
                code:StatusCodes.INTERNAL_SERVER_ERROR.code,
                message:StatusCodes.INTERNAL_SERVER_ERROR.message,
                data:null
            })
        }
        return res.status(StatusCodes.CREATED.code).json({
            code:StatusCodes.CREATED.code,
            message:"user added",
            data:null
        })
    } catch (error) {
        console.log(error)
    }
}