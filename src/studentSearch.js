import fs from "fs"

function studentSearch(id){
    try {
        if(fs.existsSync("student.json")){
             let data =  JSON.parse(fs.readFileSync("student.json", "utf-8"))
          if(!data)  throw new Error(" file is not exit ")
        //     let res = data.some((value)=> value.id ==id )
        // if(res){
        //     console.log("student is exit");
        // }
        // else{
        //     console.log("not found");
        // }

        // }
        // else{
        //     console.log("file  is not found");
        // }
        let res = data.find((value) => value.id == id);
        if(res){
            console.log(res)
        }else{
            console.log("student doesnt exist")
        }
    }
       
    } catch (error) {
        console.log(error);
       
    }
    return "function worked";

}
 export  default studentSearch