import { Todo } from "../../schema/todo.schema.js";

export async function createTodo(title,description,user_id){
    try {
        const newTodo = new Todo({
            title,
            description,
            status:"pending",
            user_id:user_id
        });

        const saveTodo = await newTodo.save()
        return saveTodo
    } catch (error) {
        console.log(error)
        throw error
    }
}