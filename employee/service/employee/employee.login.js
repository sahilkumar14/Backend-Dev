import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { randomUUID } from "crypto"
import { StatusCodes } from "http-status-pro-js"
import { employeeExist } from "../../model/employee/employee.model.js"

export default function employeeLogin(req, res) {
 try {
    const isHtmlForm = req.is("application/x-www-form-urlencoded")
    const { email, password } = req.body
    let employee = employeeExist(email)

    if (!employee || typeof employee !== "object") {
        if (isHtmlForm) {
            return res.status(StatusCodes.BAD_REQUEST.code).redirect("/employee/login")
        }

        return res.status(StatusCodes.BAD_REQUEST.code).json({
            code: StatusCodes.BAD_REQUEST.code,
            message: StatusCodes.BAD_REQUEST.message,
            data: null
        })
    }

    let isEmployee = bcrypt.compareSync(password, employee.password)
    if (!isEmployee) {
        if (isHtmlForm) {
            return res.status(StatusCodes.UNAUTHORIZED.code).redirect("/employee/login")
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
            id: employee.id,
            email: employee.email,
            role: "employee"
        })
        res.setHeader("Set-Cookie", `sid=${sid}; Path=/; HttpOnly; SameSite=Lax`)
        return res.redirect("/home")
    }

    const token = jwt.sign({ id: employee.id }, process.env.TOKEN, { expiresIn: "12h" })
    return res.status(StatusCodes.ACCEPTED.code).json({
        code: StatusCodes.ACCEPTED.code,
        message: "logged in successfully",
        data: { email: employee.email, token: token }
    })
 } catch (err) {
    console.log("service/employee.login: ", err)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR.code).json({
        code: StatusCodes.INTERNAL_SERVER_ERROR.code,
        message: StatusCodes.INTERNAL_SERVER_ERROR.message,
        data: null
    })
 }
}
