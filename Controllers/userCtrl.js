const User = require("../model/User/User")
const appError = require("../utils/appError")
const bcrypt = require("bcryptjs")
const generateToken = require("../utils/generateToken")


const userRegisterCtrl = async (req, res, next) => {
    const { name, email, password } = req.body
    try {
        // check if email exist
        const userFound = await User.findOne({ email })
        if (userFound) {
            return next(appError("User already registered", 500))
        }
        else {
            // hash the password
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, salt)

            // create the user
            const user = await User.create({
                name,
                email,
                password: hashedPassword,
            })
            res.json({
                status: 'Success',
                data: user
            })
        }

    } catch (error) {
        next(appError(error.message))
    }
}

const userLoginCtrl = async (req, res, next) => {
    const { email, password } = req.body
    try {
        // check if email exist
        const userFound = await User.findOne({ email })
        if (!userFound) {
            return next(appError('Invalid login creadentials'))
        }

        // verify the password
        const isPasswordMatched = await bcrypt.compare(password, userFound.password)
        if (!isPasswordMatched) {
            return next(appError('Invalid login creadentials'))
        }
        res.json({
            name: userFound.name,
            email: userFound.email,
            token: generateToken(userFound._id)
        })

    } catch (error) {
        next(appError(error.message))
    }
}


module.exports = {
    userRegisterCtrl,
    userLoginCtrl,
}
