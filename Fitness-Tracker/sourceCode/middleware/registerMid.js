import joi from "joi"
import { StatusCodes } from "http-status-pro-js";

function registerMid(req,res,next){
    try{
    let schema = joi.object({
        name:joi.string().trim().lowercase().min(3).max(100).required(),
        email:joi.string().trim().email().min(8).max(10).required(),
        dailyGoal:joi.number().required(),
        password:joi.string().alphanum().min(4).max(6).required()
    });

    let{value,error} = joi.validate(schema)
    if(error){
        return res.status(StatusCodes.BAD_REQUEST.code).json({
            code:StatusCodes.BAD_REQUEST.code,
            message:"make sure you added all the required fields",
            data:null
        })
    }

    req.body = value
    next()
    }catch(error){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR.code).json({
            code:StatusCodes.INTERNAL_SERVER_ERROR.code,
            message:StatusCodes.INTERNAL_SERVER_ERROR.message,
            data:null
        })
    }
}

export default registerMid