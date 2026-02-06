import joi from "joi"
import {StatusCodes} from "http-status-pro-js"
import logger from "../Logger.js"

function usermidd(req,res,next){
    try{
        let schema = joi.object({
            name:joi.string().trim().lowercase().min(2).max(200).required(),
            email:joi.string().lowercase().trim().email().min(8).max(200).required(),
            password:joi.string().trim().min(6).max(10).required()
        })
        let{error, value} = schema.validate(req.body)
        if(error){
            return res.status(StatusCodes.BAD_REQUEST.code).json({
                code:StatusCodes.BAD_REQUEST.code,
                message:error.message,
                data:null
            })
        }
        req.body = value;
        next()
    }catch(err){
        console.log(err);
        logger("error",err)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR.code).json({
            code:StatusCodes.INTERNAL_SERVER_ERROR.code,
            message:StatusCodes.INTERNAL_SERVER_ERROR.message,
            data:null
        })
    }
}

export default usermidd