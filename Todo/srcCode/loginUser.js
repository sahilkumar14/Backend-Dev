import fs from 'fs'


function loginUSer(email, password){
    try{
    
        if(fs.existsSync("todo.json")){
            let data = JSON.parse(fs.readFileSync("todo.json","utf-8"));
            let isUser = data.find((value)=>(value.email === email) && (value.password === password))
            if(isUser){
                console.log("login successfull")
            }else{
                console.log("invaild credentials")
            }
           
        }
        
        }catch(err){
            console.log(err)
        }
    }

    export default loginUSer;
