import fs from "fs"

function deleteStudent(id){
    try {
        if(!fs.existsSync("student.json")) return  new Error("  file is not  exit")
        let data = JSON.parse( fs.readFileSync("student.json", "utf-8"))
    if(!(data && data.length>0)) {
        throw new Error(" data is not exit ")
    }
    let isid = data.some((value)=> value.id==id)
    if(!isid) {
        throw new Error(" id  is  not exit")

    }
    let newData = data.filter((value)=> value.id!=id)

    fs.writeFileSync("student.json", JSON.stringify(newData, null, 2))
    console.log(" student delete successfull");

    }
   
    catch (error) {
        console.log("error from delete  student ", error);
       
    }

}
export default deleteStudent