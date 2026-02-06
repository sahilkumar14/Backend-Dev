import fs from "fs"

function update(id,name,classes){
    try{
        let data = JSON.parse(fs.readFileSync("student.json","utf-8"));
        data.map((value)=>{
            if(value.id == id){
                value.name = name;
                value.classes = classes;
            }
        })

        fs.writeFileSync("student.json",JSON.stringify(data,null,2));
    }catch(error){
        console.log("some error occured.",error);
    }
    
}

export default update