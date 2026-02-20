import express from "express"

//import for middleware layer

//employee
import employeeSignMidd from "../middleware/employee/signupMiddleware.js"
import employeeLoginMidd from "../middleware/employee/loginMiddleware.js"
import employeeUpdateMidd from "../middleware/employee/updateMiddleware.js"
//admin
import adminUpdateMidd from "../middleware/admin/admin.updateMiddleware.js"
import adminLoginMidd from "../middleware/admin/admin.loginMiddleware.js"
import adminSignMidd from "../middleware/admin/admin.signupMiddleware.js"


//import for service layer

//employee
import employeeUpdate from "../employee/service/employee/employee.update.js"
import EmployeeDelete from "../employee/service/employee/employee.delete.js"
import employeeLogin from "../employee/service/employee/employee.login.js"
import employeeSignup from "../employee/service/employee/employee.signup.js"

//admin
import adminSignup from "../employee/service/admin/admin.signup.js"
import adminLogin from "../employee/service/admin/admin.login.js"
import adminUpdate from "../employee/service/admin/admin.update.js"
import Delete from "../employee/service/admin/admin.delete.js"

const router = express.Router()

function requireAuth(req, res, next) {
    if (!req.sessionUser) {
        if (req.is("application/x-www-form-urlencoded")) {
            return res.redirect("/employee/login")
        }

        return res.status(401).json({
            code: 401,
            message: "unauthorized"
        })
    }

    next()
}

function requireAdmin(req, res, next) {
    if (!req.sessionUser || req.sessionUser.role !== "admin") {
        if (req.is("application/x-www-form-urlencoded")) {
            return res.redirect("/home")
        }

        return res.status(403).json({
            code: 403,
            message: "admin access required"
        })
    }

    next()
}

//routes for employees
router.post("/employee/signup", employeeSignMidd, employeeSignup)
router.post("/employee/login", employeeLoginMidd, employeeLogin)
router.post("/employee/update", requireAuth, employeeUpdateMidd, employeeUpdate)
router.post("/employee/delete/:id", requireAdmin, EmployeeDelete)

//routes for admin
router.post("/admin/signup", adminSignMidd, adminSignup)
router.post("/admin/login", adminLoginMidd, adminLogin)
router.patch("/admin/update", requireAdmin, adminUpdateMidd, adminUpdate)
router.delete("/admin/delete/:id", requireAdmin, Delete)

export default router
