import fs from "fs"

//this function will read the file that is passed to it as parameter.
function Read(filepath){
    try{
        if(fs.existsSync(filepath)){
            let data = fs.readFileSync(filepath,"utf-8")
            return data;
        }
    }catch(err){
        console.log(err);
    }
}

//this function write in a new and also append data if file already exists
function write(filepath,content){
    try{
        if(fs.existsSync(filepath)){
            fs.appendFileSync(filepath,content);
        }else{
            fs.writeFileSync(filepath,content);
        }
    }catch(err){
        console.log(err);
    }
}

//this function copy data from one file and paste it to another file
function copy(source,destination){
    try{

        if(!fs.existsSync(source)){
            console.log("there is no file copy from.")
            return;
        }
        let data = fs.readFileSync(source,"utf-8");
        fs.writeFileSync(destination,data);
    }catch(err){
        console.log(err);
    }
}

function deleteFile(filepath){
    try{
        if(!fs.existsSync(filepath)){
            console.log("this seems like this file is already deleted.");
            return;
        }
        fs.unlinkSync(filepath);
        console.log("file deleted successfully!");
    }catch(err){    
        console.log(err);
    }
}


export {Read, write, copy, deleteFile};