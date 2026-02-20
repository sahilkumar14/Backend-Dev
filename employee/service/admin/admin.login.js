import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { randomUUID } from "crypto"
import { StatusCodes } from "http-status-pro-js"
import { adminExist } from "../../model/admin/admin.model.js"

export default function adminLogin(req, res) {
 try {
    const isHtmlForm = req.is("application/x-www-form-urlencoded")
    const { email, password } = req.body
    let admin = adminExist(email)

    if (!admin || typeof admin !== "object") {
        if (isHtmlForm) {
            return res.status(StatusCodes.BAD_REQUEST.code).redirect("/admin/login")
        }

        return res.status(StatusCodes.BAD_REQUEST.code).json({
            code: StatusCodes.BAD_REQUEST.code,
            message: StatusCodes.BAD_REQUEST.message,
            data: null
        })
    }

    let isadmin = bcrypt.compareSync(password, admin.password)
    if (!isadmin) {
        if (isHtmlForm) {
            return res.status(StatusCodes.UNAUTHORIZED.code).redirect("/admin/login")
        }

        return res.status(StatusCodes.UNAUTHORIZED.code).json({
            code: StatusCodes.UNAUTHORIZED.code,
            message: "email or password maybe wrong",
            data: null
        })
    }

    if (isHtmlForm) {
        const sid = randomUUID()
        req.app.locals.sessions.set(sid, {
            id: admin.id,
            email: admin.email,
            role: "admin"
        })
        res.setHeader("Set-Cookie", `sid=${sid}; Path=/; HttpOnly; SameSite=Lax`)
        return res.redirect("/home")
    }

    const token = jwt.sign({ id: admin.id }, process.env.TOKEN, { expiresIn: "12h" })
    return res.status(StatusCodes.ACCEPTED.code).json({
        code: StatusCodes.ACCEPTED.code,
        message: "logged in successfully",
        data: { email: admin.email, token: token }
    })
 } catch (err) {
    console.log("service/admin.login: ", err)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR.code).json({
        code: StatusCodes.INTERNAL_SERVER_ERROR.code,
        message: StatusCodes.INTERNAL_SERVER_ERROR.message,
        data: null
    })
 }
}
