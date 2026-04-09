import { createTodo } from "../service/todo/createtodoservice.js";
import { StatusCodes } from "http-status-pro-js";

export async function createTodoController(req,res) {
    try {
        let{title,description} = req.body
        let addedTodo = await createTodo(title,description,req.user.id)

        return res.status(StatusCodes.CREATED.code).json({
            code:StatusCodes.CREATED.code,
            message:"todo added successfully",
            data:addedTodo
        })
    } catch (error) {
        console.log(error)
        throw error
    }
}