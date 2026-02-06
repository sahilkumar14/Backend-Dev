import fs from "fs"

function deleteUser(req,res){
    try{
        let {email,password} = req.body;
        if(!email || !password){
            return res.status(400).send("enter email and password");
        }
        if(!fs.existsSync("user.json")) return res.status(404).send("no file exist that contain users.")
        let data  = JSON.parse(fs.readFileSync("user.json","utf-8"));
        let newData = data.filter((value) => value.email != email && value.password != password)
        fs.writeFileSync("user.json",JSON.stringify(newData,null,2))
        return res.status(201).send("user deleted");
    }catch(err){
        return res.status(500).send("server error");
    }
}

export default deleteUser