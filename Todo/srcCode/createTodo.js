import fs from "fs"

function createTodo(name, task){
    try{
        let obj = {
            id : new Date(),
            createTime : new Date().toLocaleTimeString(),
            task,
            status : "pending"
        }

        if(fs.existsSync("todo.json")){
            let data = JSON.parse(fs.readFileSync("todo.json","utf-8"))
                for(let i = 0;i<data.length;i++){
                    if(data[i].name===name){
                        data[i].todo.push(obj)
                    }
                
            }
            fs.writeFileSync("todo.json",JSON.stringify(data,null,2))
            console.log("todo added")
        }
        // fs.writeFileSync("todo.json",JSON.stringify(data,null,2))
        //     console.log("todo added")
    }catch(err){
        console.log(err)
    }
}

export default createTodo