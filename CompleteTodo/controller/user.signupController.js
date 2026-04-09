import createUser from "../../controller/user.signupController.js"
import {StatusCodes} from "http-status-pro-js"


export default async function usersignup(req,res){
    try {
        let{name,email,password} = req.body
        let user = await createUser(name,email,password)
        if(!user){
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR.code).json({
                code:StatusCodes.INTERNAL_SERVER_ERROR.code,
                message:StatusCodes.INTERNAL_SERVER_ERROR.message,
                data:null
            })
        }
        // res.cookie('userId',user._id.toString(),{
        //     httpOnly:true,
        //     maxAge: 24 * 60 * 60 * 1000
        // })

        return res.status(StatusCodes.CREATED.code).json({
            code:StatusCodes.CREATED.code,
            message:"user added",
            data:null
        })
    } catch (error) {
        console.log(error)
    }
}