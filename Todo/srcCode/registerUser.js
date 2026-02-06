import fs from "fs"


//for registering user
//this function register user and check if user already exist 
//this is the very first step that should appear in todo
function registerUser(name, email, password){
    try{
        let user = [];
        let obj = {
            id : new Date(), name, email, password, todo : []
        }
        if(fs.existsSync("todo.json")){
            let data = JSON.parse(fs.readFileSync("todo.json","utf-8"));

            //check if the email exists for particular user in user array or not
            //return true if email exist in user array for particular user
            let isUser = data.some((value)=>value.email===email)
            if(isUser){
                return "user exists"
            }
            user = data;
        }
        user.push(obj)
        fs.writeFileSync("todo.json", JSON.stringify(user,null, 2))
        console.log("user create");

        }catch(err){
            console.log(err)
        }
    }

    export default registerUser
