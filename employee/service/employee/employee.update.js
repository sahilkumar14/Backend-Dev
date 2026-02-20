import bcrypt from "bcrypt"
import { StatusCodes } from "http-status-pro-js"
import fs from "fs"

export default function employeeUpdate(req, res) {
    try {
        const isHtmlForm = req.is("application/x-www-form-urlencoded")

        let { id, current_email, email, password, new_password, name, department, basic_salary } = req.body
        if (!fs.existsSync("Employee.json")) {
            if (isHtmlForm) {
                return res.status(StatusCodes.NOT_FOUND.code).redirect("/home")
            }

            return res.status(StatusCodes.NOT_FOUND.code).json({
                code: StatusCodes.NOT_FOUND.code,
                message: "employee not found"
            })
        }

        const lookupEmail = current_email || email
        let data = JSON.parse(fs.readFileSync("Employee.json", "utf-8"))
        let index = data.findIndex((value) => value.email === lookupEmail)

        if (index === -1) {
            if (isHtmlForm) {
                return res.status(StatusCodes.NOT_FOUND.code).redirect("/home")
            }

            return res.status(StatusCodes.NOT_FOUND.code).json({
                code: StatusCodes.NOT_FOUND.code,
                message: "employee not found"
            })
        }

        if (req.sessionUser?.role === "employee" && req.sessionUser.email !== data[index].email) {
            if (isHtmlForm) {
                return res.status(StatusCodes.FORBIDDEN.code).redirect("/home")
            }

            return res.status(StatusCodes.FORBIDDEN.code).json({
                code: StatusCodes.FORBIDDEN.code,
                message: "you can update only your own profile"
            })
        }

        const savedPassword = data[index].password
        let isMatch = false

        if (typeof savedPassword === "string" && savedPassword.startsWith("$2")) {
            isMatch = bcrypt.compareSync(password, savedPassword)
        } else {
            isMatch = password === savedPassword
        }

        if (!isMatch) {
            if (isHtmlForm) {
                const redirectId = id || data[index].id
                return res.status(StatusCodes.UNAUTHORIZED.code).redirect(`/employee/edit/${redirectId}`)
            }

            return res.status(StatusCodes.UNAUTHORIZED.code).json({
                code: StatusCodes.UNAUTHORIZED.code,
                message: "you are not allowed to make changes to this employee"
            })
        }

        const duplicateEmail = data.find((value) => value.email === email && value.id !== data[index].id)
        if (duplicateEmail) {
            if (isHtmlForm) {
                const redirectId = id || data[index].id
                return res.status(StatusCodes.BAD_REQUEST.code).redirect(`/employee/edit/${redirectId}`)
            }

            return res.status(StatusCodes.BAD_REQUEST.code).json({
                code: StatusCodes.BAD_REQUEST.code,
                message: "email already exists"
            })
        }

        data[index].name = name
        data[index].email = email

        if (req.sessionUser?.role === "admin") {
            data[index].department = department
            data[index].basic_salary = basic_salary
        }

        if (req.sessionUser?.role === "employee" && new_password) {
            const salt = bcrypt.genSaltSync(10)
            data[index].password = bcrypt.hashSync(new_password, salt)
        }

        fs.writeFileSync("Employee.json", JSON.stringify(data, null, 2))

        if (req.sessionUser?.role === "employee" && req.sessionId) {
            req.app.locals.sessions.set(req.sessionId, {
                ...req.sessionUser,
                email
            })
        }

        if (isHtmlForm) {
            return res.redirect("/home")
        }

        return res.status(StatusCodes.ACCEPTED.code).json({
            code: StatusCodes.ACCEPTED.code,
            message: "employee details updated"
        })

    } catch (error) {
        console.log("service/employeeUpdate: ", error)
        const isHtmlForm = req.is("application/x-www-form-urlencoded")

        if (isHtmlForm) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR.code).redirect("/home")
        }

        return res.status(StatusCodes.INTERNAL_SERVER_ERROR.code).json({
            code: StatusCodes.INTERNAL_SERVER_ERROR.code,
            message: StatusCodes.INTERNAL_SERVER_ERROR.message
        })
    }
}
