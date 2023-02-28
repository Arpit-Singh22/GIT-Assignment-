const verifyToken = require("../utils/verifyToken")
const getTokenFromHeader = require("../utils/getTokenFromHeader")
const appError = require("../utils/appError")

const isLogin = (req, res, next) => {
    // get token from header
    const token = getTokenFromHeader(req)
    // console.log(req, token);
    // verify the token
    const decodedToken = verifyToken(token)

    // save the user into req object
    req.userAuth = decodedToken.id

    if (!decodedToken) {
        return next(appError('Invalid/Expired Token, please login again !'))
    }
    else {
        next()
    }
}

module.exports = isLogin