import fs from "fs"

function NewBook(name,genre,price,author){
    
try{
    let book = [];
    let bookObj = {
        id : new Date(),
        name,
        genre,
        price,
        author
    }

    if(fs.existsSync("book.json")){
        let data = JSON.parse(fs.readFileSync("book.json","utf-8"));
        let bookcheck = data.some((value) => value.name == name);
        if(bookcheck){
            console.log("book already exists.");
        }
        book = data
        fs.writeFileSync("book.json",JSON.stringify(book,null,2))
    }
    book.push(bookObj);
    fs.writeFileSync("book.json",JSON.stringify(book,null,2))
   }catch(err){
    console.log("some error Occurred.", err)
   }
}

export default NewBook