import { StatusCodes } from "http-status-pro-js"
import joi from "joi"
function loginMidware(req,res,next){
    try {
        let user = joi.object({
            email:joi.string().trim().email().pattern(/gmail\.com$/).required(),
            password:joi.string().alphanum().min(4).max(8).required()
        })

        let{error,value} = user.validate(req.body)
        if(error){
            return res.status(StatusCodes.BAD_REQUEST.code).json({
                code:StatusCodes.BAD_REQUEST.code,
                message:"enter all the details"
            })
        }

        req.body = value
        next()
    } catch (error) {
        console.log(error)
    }
}