const express = require("express")
const { userRegisterCtrl, userLoginCtrl } = require("../Controllers/userCtrl")

const userRouter = express.Router()


// POST  /api/users/register
userRouter.post("/register", userRegisterCtrl)

// POST  /api/users/login
userRouter.post("/login", userLoginCtrl)



module.exports = userRouter