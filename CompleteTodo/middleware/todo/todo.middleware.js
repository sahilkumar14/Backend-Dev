import { StatusCodes } from "http-status-pro-js"
import joi from "joi"

export default function todoMiddleware(req,res,next){
    try {
        let todoSchema = joi.object({
            title:joi.string().trim().max(20).required(),
            description:joi.string().required()
        })

        let{error,value} = todoSchema.validate(req.body)
        if(error){
            return res.status(StatusCodes.BAD_REQUEST.code).json({
                code:StatusCodes.BAD_REQUEST.code,
                message:"enter all details",
                data:null
            })
        }

        req.body = value
        next()
    } catch (error) {
        console.log(error)
    }
}