import joi from "joi";
import { StatusCodes } from "http-status-pro-js";

function registermid(req,res,next){
    try{
        let schema = joi.object({
            name:joi.string().lowercase().trim().min(3).max(200).required(),
            email:joi.string().trim().email().min(8).max(100).required(),
            password:joi.string().alphanum().trim().min(6).max(10).required(),
            pin:joi.string().min(4).max(6).required()
        })

        let{error,value} = schema.validate(req.body)
        if(error){
            console.log(error)
            return res.status(StatusCodes.BAD_REQUEST.code).json({
                code:StatusCodes.BAD_REQUEST.code,
                Message:StatusCodes.BAD_REQUEST.message,
                data:null
            })
        }
        req.body = value;
        next()
    }catch(err){
        console.log(err)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR.code).json({
            code:StatusCodes.INTERNAL_SERVER_ERROR.code,
            message:StatusCodes.INTERNAL_SERVER_ERROR.message,
            date:null
        })
    }
}

export default registermid