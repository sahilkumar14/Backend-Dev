import fs from "fs"

function NewMember(name,email,type){
try{
    let mem = []
    let memObj = {
        id : new Date(),
        name,
        email,
        type
    }

    if(fs.existsSync("members.json")){
        let data = JSON.parse(fs.readFileSync("members.json","utf-8"));
        let memcheck = data.some((value)=>value.email == email);
        if(memcheck){
            console.log("member already exists");
        }

        mem = data;
        fs.writeFileSync("members.json",JSON.stringify(mem,null,2));
    }
    mem.push(memObj)
    fs.writeFileSync("members.json",JSON.stringify(mem,null,2));
  }catch(err){
    console.log(err,"some error Occurred.")
  }
}


export default NewMember
