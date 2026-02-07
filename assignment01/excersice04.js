const http = require('http');
const fs = require('fs');

http.createServer(function(req,res){

    //reading todos
    if(req.method === "GET" && req.url === "/todos"){
        let data = fs.readFileSync("todo.json","utf-8");
        res.end(data);
    }

    //create todo
    else if(req.method === "POST" && req.url === "/create"){
        let body = "";
        req.on("data",function(chunk){
            body += chunk;
        });

        req.on("end",function(){
            let data = fs.readFileSync("todo.json","utf-8",function(err,data){
            let todos = JSON.parse(data);

            let newTodo = {
                id :Date.now(),
                title:JSON.parse(body).title,
                status:"pending"
            };
            todos.push(newTodo);

            fs.writeFileSync("todo.json",JSON.stringify(todos,null,2), function(){
                res.end(JSON.stringify(newTodo));
            });
            });

        });
    }

    //updating todo
    else if(req.method === "PUT" && req.url.startsWith("/todos/")){
        let id  = Number(req.url.split("/")[2]);
        let body = "";

        req.on("data",function(chunk){
            body += chunk;
        })

        req.on("data",function(){
            let todos = JSON.parse(fs.readFileSync("todo.json","utf-8"));
            let update = JSON.parse(body);

            for(let i = 0;i<todos.length;i++){
                if(todos[i].id===id){
                    if(update.title !== undefined) todos[i].title = update.title;
                    if(update.status !== undefined) todos[i].status = update.status;
                }
            }
            fs.writeFileSync("todo.json",JSON.stringify(todos));
            res.end(JSON.stringify({message:"updated"}));
        });
    }

    //delete todo
    else if(req.method === "DELETE"&&req.url.startsWith("/todos")){
        let id = Number(req.url.split("/")[2]);

        let todos = JSON.parse(fs.readFileSync("todo.json","utf-8"));
        todos = todos.filter((value) => value.id != id);

        fs.writeFileSync("todo.json",JSON.stringify(todos));
        res.end(JSON.stringify({message:"Deleted"}));
    }
    else{
        res.statusCode = 500;
        res.end(JSON.stringify({message:"internal server error"}));
    }
}).listen(8080);

console.log("connected");