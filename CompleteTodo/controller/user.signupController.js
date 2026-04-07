import bcrypt from "bcrypt";
import { User } from "../schema/user.schema.js";


export default function createUser(name,email,password){
    try {
        let salt = bcrypt.genSaltSync(10)
        let hashpassword = bcrypt.hashSync(password,salt)
        let newUser = new User({name,email,password:hashpassword})
        let savedUser = newUser.save()
        if(!savedUser) return false
        return true
    } catch (error) {
        console.log(error)
    }
}