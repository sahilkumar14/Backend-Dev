import joi from "joi";
import { StatusCodes } from "http-status-pro-js";
import logger from "../Logger.js"

function LoginMid(req, res, next) {
    try {
        let schema = joi.object({
            email: joi.string().lowercase().email().trim().min(8).max(200).required(),
            password: joi.string().trim().min(5).max(10).required()
        })
        let { error, value } = schema.validate(req.body)
        if (error) {
            return res.status(StatusCodes.BAD_REQUEST.code).json({
                code: StatusCodes.BAD_REQUEST.code,
                message: StatusCodes.BAD_REQUEST.message,
                data: null
            })
        }
        req.body = value;
        next()
    } catch (err) {
        console.log(err);
        logger("error: ", err)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR.code).json({
            code: StatusCodes.INTERNAL_SERVER_ERROR.code,
            message: StatusCodes.INTERNAL_SERVER_ERROR.message,
            data: null
        })
    }
}
export default LoginMid