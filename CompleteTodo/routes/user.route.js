import userSignupMidware from "../middleware/users/user.signupmidware.js"
import usersignup from "../service/user.signupservice.js"

const router = express.Router()
router.post('/signup',userSignupMidware,usersignup)


export default router