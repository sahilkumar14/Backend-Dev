import bcrypt from "bcrypt";
import { User } from "../schema/user.schema.js";


export default async function createUser(name,email,password){
    try {
        let salt = bcrypt.genSalt(10)
        let hashpassword = bcrypt.hash(password,salt)
        let newUser = new User({name,email,password:hashpassword})
        let savedUser = await newUser.save()
        if(!savedUser) return false
        return true
    } catch (error) {
        console.log(error)
    }
}