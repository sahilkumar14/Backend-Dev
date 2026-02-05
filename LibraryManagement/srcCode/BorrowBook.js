import fs from "fs";
function borrowRecord(memberName,bookName,quantity){
    let borrowRecord =[]
    let ob ={
        id:new Date(),
        memberName,
        bookName,
        quantity

    }
try {
    if(fs.existsSync("book.json") && fs.existsSync("members.json")){
        let book = JSON.parse(fs.readFileSync("book.json","utf-8"))
        let member = JSON.parse(fs.readFileSync("members.json","utf-8"))
        let bookPrice = book.find((value)=> value.name===bookName)
        let memberType = member.find((value)=> value.name ===memberName)
        if(fs.existsSync("borrowRecord.json")){
        }
        borrowRecord.push(ob)
        fs.writeFileSync("borrowRecord.json",JSON.stringify(borrowRecord,null,2))
        
        if(memberType.type == "gold"){
            let res = bookPrice.price * quantity 
            res = Math.ceil((res*15)/100)
            return res
        }
        else{
            let res = bookPrice.price * quantity
            res = Math.ceil((res*5)/100)
            return res

        }
    }
} catch (error) {
    console.log("error")
}
}

export default borrowRecord