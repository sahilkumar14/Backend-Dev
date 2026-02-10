import fs from "fs";
import { StatusCodes } from "http-status-pro-js";
import bcrypt from "bcrypt";

function withdrawFunds(req,res){
    try{
        const {email,password,pin,amount} = req.body;
        const amountDedected = Number(amount);

        if(amountDedected <= 0){
            return res.status(StatusCodes.BAD_REQUEST.code).json({
                code:StatusCodes.BAD_REQUEST.code,
                message:StatusCodes.BAD_REQUEST.message,
                data:null
            });
        }
    }catch(error){
        console.log(error)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR.code).json({
            code:StatusCodes.INTERNAL_SERVER_ERROR.code,
            message:StatusCodes.INTERNAL_SERVER_ERROR.message,
            data:null
        })
    }
}