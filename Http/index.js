import express from "express"
import fs from "fs"

let port = 8080;
let app = express();

app.use(express.json())


app.get("/",(req,res) =>{
    res.send("this is home")
})
app.post("/home",(req,res)=>{
    let{id,name} = req.body
    console.log(id,name)
    res.send(`${id} and ${name}`)
})

app.post("/book",(req,res)=>{
    let {id,bookName,author} = req.body
    let book = []
    let bookObj = {
        Bookid : id,
        BookName : bookName,
        BookAuthor : author
    }
    if(fs.existsSync("book.json")){
        let data = fs.readFileSync("book.json","utf-8")
        let bookExist = data.some((value) => value.BookName == bookName)
        if(bookExist){
            res.send("this book already exist")
        }
        book = data
        fs.writeFileSync("book.json",JSON.stringify(book,null,2))
    }
    book.push(bookObj)
    fs.writeFileSync("book.json",JSON.stringify(book,null,2))

    res.send("successfully added")
})
app.listen(port, ()=>{
    console.log("connect");
})